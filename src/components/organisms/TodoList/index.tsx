import { Space } from 'antd';
import styled from 'styled-components';

import { Container } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoListStore } from '@/store';

import { InfiniteScroll } from '../InfiniteScroll';

const TodoWrapper = styled.div`
  margin-top: 32px;
  padding-bottom: 128px;
`;

const TodoList = () => {
  const tasks = useTodoListStore((state) => state.tasks);

  const onObserve = () => {
    console.log('Изменить максимальную длинну');
  };

  if (tasks !== null)
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
