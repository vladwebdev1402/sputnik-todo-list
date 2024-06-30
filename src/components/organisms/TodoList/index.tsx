import { useEffect } from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { Container, ErrorMessage, InfiniteScroll } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoFilters, useTodoListStore } from '@/store';
import { Task } from '@/types';
import { LIMIT } from '@/constants';

import { TodoListSkeleton } from './TodoListSkeleton';

const TodoWrapper = styled.div`
  margin-top: 32px;
  padding-bottom: 128px;
`;

const TodoList = () => {
  const tasks = useTodoListStore((state) => state.tasks);
  const isLoading = useTodoListStore((state) => state.isLoading);
  const error = useTodoListStore((state) => state.error);
  const favorites = useTodoListStore((state) => state.favorites);
  const total = useTodoListStore((state) => state.total);
  const getTasks = useTodoListStore((state) => state.getTasks);
  const deleteTask = useTodoListStore((state) => state.deleteTask);
  const updateTask = useTodoListStore((state) => state.updateTask);
  const changeFavorite = useTodoListStore((state) => state.changeFavorite);

  const filter = useTodoFilters((state) => state.filter);
  const limit = useTodoFilters((state) => state.limit);
  const incrementLimit = useTodoFilters((state) => state.incrementLimit);

  const onObserve = () => {
    incrementLimit();
  };

  const onDeleteTask = async (task: Task) => {
    await deleteTask(task.id);
  };

  const onUpdateTask = async (task: Task) => {
    await updateTask(task);
  };

  const onChangeFavorite = (id: number) => {
    changeFavorite(id);
  };

  useEffect(() => {
    getTasks(limit, filter);
  }, [getTasks, limit, filter]);

  if (isLoading && limit === LIMIT) {
    return (
      <TodoWrapper>
        <Container>
          <TodoListSkeleton countTasks={5} />
        </Container>
      </TodoWrapper>
    );
  }

  if (error) {
    return (
      <TodoWrapper>
        <Container>
          <ErrorMessage title="Произошла ошибка" description={error} />
        </Container>
      </TodoWrapper>
    );
  }

  if (tasks !== null && tasks.length === 0) {
    return (
      <TodoWrapper>
        <Container>
          <ErrorMessage
            title="Список задач пуст"
            description={'Создайте новую задачу или смените фильтры'}
          />
        </Container>
      </TodoWrapper>
    );
  }

  if (tasks !== null)
    return (
      <TodoWrapper>
        <Container>
          <Space direction="vertical" style={{ display: 'flex' }}>
            {tasks.map((task) => (
              <TaskCard
                task={task}
                isFavorite={favorites.includes(task.id)}
                onChangeFavorite={onChangeFavorite}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
                key={task.id}
              />
            ))}
          </Space>
          <InfiniteScroll
            isLoading={isLoading}
            isStopScroll={limit >= total}
            loader={<TodoListSkeleton countTasks={3} />}
            onObserve={onObserve}
          />
        </Container>
      </TodoWrapper>
    );
};

export { TodoList };
