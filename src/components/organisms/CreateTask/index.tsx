import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  FloatButton,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useState } from 'react';

import { useTodoListStore } from '@/store';

import { TaskFormData } from './type';

const CreateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createTask = useTodoListStore((state) => state.createTask);
  const [task, setTask] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'uncomplete',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTask({ title: '', description: '', status: 'uncomplete' });
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };

  const onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: e.target.value });
  };

  const onStatusChange = () => {
    setTask({
      ...task,
      status: task.status === 'uncomplete' ? 'complete' : 'uncomplete',
    });
  };

  const onTaskCreateSubmit = async () => {
    setIsLoading(true);
    await createTask(task);
    setIsLoading(false);
    handleCloseModal();
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
            <Flex gap={10}>
              <Switch
                value={task.status === 'complete'}
                onClick={onStatusChange}
              />
              <Typography> Задача не выполнена/выполнена</Typography>
            </Flex>
            <Flex style={{ marginTop: '16px' }} gap={10} justify="end">
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
