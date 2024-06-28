import { useEffect } from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { Container, ErrorMessage } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoListStore } from '@/store';

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
  const getTasks = useTodoListStore((state) => state.getTasks);

  const onObserve = () => {
    console.log('Изменить максимальную длинну');
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
              <TaskCard task={task} key={task.id} />
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
