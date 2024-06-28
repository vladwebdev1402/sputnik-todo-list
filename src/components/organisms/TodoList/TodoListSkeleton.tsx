import { FC } from 'react';
import { Space } from 'antd';

import { TaskCardSkeleton } from '@/components/molecules';

type Props = {
  countTasks: number;
};

const TodoListSkeleton: FC<Props> = ({ countTasks }) => {
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      {Array(countTasks)
        .fill(undefined)
        .map((_, idx) => (
          <TaskCardSkeleton key={idx} />
        ))}
    </Space>
  );
};

export { TodoListSkeleton };
