import { Layout, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import { CreateTask, TodoList } from '@/components/organisms';

const MainPage = () => {
  return (
    <Layout>
      <Header style={{ textAlign: 'center', padding: '10px 0' }}>
        <Typography.Title style={{ color: 'white' }}>
          Todo List
        </Typography.Title>
      </Header>
      <Content>
        <TodoList />
        <CreateTask />
      </Content>
    </Layout>
  );
};

export { MainPage };
