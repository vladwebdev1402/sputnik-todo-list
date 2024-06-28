import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  FloatButton,
  Form,
  Input,
  Modal,
  Space,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useState } from 'react';

const CreateTask = () => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTask({ title: '', description: '' });
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };

  const onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: e.target.value });
  };

  const onTaskCreateSubmit = () => {
    console.log(123);
  };

  return (
    <>
      <FloatButton
        onClick={handleOpenModal}
        icon={<PlusCircleOutlined />}
        type="primary"
      />
      <Modal
        open={isOpen}
        onCancel={handleCloseModal}
        title={<Typography.Title level={4}>Создание задачи</Typography.Title>}
        footer={[]}
      >
        <Form onSubmitCapture={onTaskCreateSubmit}>
          <Space direction="vertical" style={{ display: 'flex' }}>
            <Input
              placeholder="Название задачи"
              autoFocus
              value={task.title}
              onChange={onTitleChange}
              required
            />
            <TextArea
              placeholder="Описание задачи"
              style={{ resize: 'none', height: '120px' }}
              value={task.description}
              onChange={onDescChange}
            />
            <Flex style={{ marginTop: '16px' }} gap={10} justify="end">
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
              <Button htmlType="button" onClick={handleCloseModal}>
                Отменить
              </Button>
            </Flex>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export { CreateTask };
