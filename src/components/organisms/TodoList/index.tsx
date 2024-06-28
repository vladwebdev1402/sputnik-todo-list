import { Container } from '@/components/atoms';
import { TaskCard } from '@/components/molecules';
import { useTodoListStore } from '@/store';
import { Space } from 'antd';

const TodoList = () => {
  const tasks = useTodoListStore((state) => state.tasks);

  if (tasks !== null)
    return (
      <Container>
        <Space direction="vertical" style={{ display: 'flex' }}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </Space>
      </Container>
    );
};

export { TodoList };
