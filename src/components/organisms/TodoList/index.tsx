import { useEffect } from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { Container, ErrorMessage } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoListStore } from '@/store';
import { Task } from '@/types';

import { InfiniteScroll } from '../InfiniteScroll';
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
  const getTasks = useTodoListStore((state) => state.getTasks);
  const deleteTask = useTodoListStore((state) => state.deleteTask);
  const updateTask = useTodoListStore((state) => state.updateTask);
  const changeFavorite = useTodoListStore((state) => state.changeFavorite);

  const onObserve = () => {
    console.log('Изменить максимальную длинну');
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
    getTasks();
  }, [getTasks]);

  if (isLoading) {
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

  if (tasks !== null && !error)
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
            isLoading={false}
            isStopScroll={false}
            loader={'Загрузка'}
            onObserve={onObserve}
          />
        </Container>
      </TodoWrapper>
    );
};

export { TodoList };
