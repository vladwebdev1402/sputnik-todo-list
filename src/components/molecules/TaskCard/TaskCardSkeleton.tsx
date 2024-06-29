import { Card, Flex, Skeleton } from 'antd';

const TaskCardSkeleton = () => {
  return (
    <Card
      title={
        <Flex gap={10} align="center">
          <Skeleton.Button shape="circle" active />
          <Skeleton title={{ width: 150 }} paragraph={{ rows: 0 }} active />
        </Flex>
      }
      extra={<Skeleton.Button shape="circle" active />}
    >
      <Skeleton active title={false} />
    </Card>
  );
};

export { TaskCardSkeleton };
