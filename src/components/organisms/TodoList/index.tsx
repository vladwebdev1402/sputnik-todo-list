import { Space } from 'antd';
import styled from 'styled-components';

import { Container } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoListStore } from '@/store';

const TodoWrapper = styled.div`
  margin-top: 32px;
`;

const TodoList = () => {
  const tasks = useTodoListStore((state) => state.tasks);

  if (tasks !== null)
    return (
      <TodoWrapper>
        <Container>
          <Space direction="vertical" style={{ display: 'flex' }}>
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </Space>
        </Container>
      </TodoWrapper>
    );
};

export { TodoList };
