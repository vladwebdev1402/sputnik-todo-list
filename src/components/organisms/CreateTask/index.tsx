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
  const createTask = useTodoListStore((state) => state.createTask);
  const isCreateLoading = useTodoListStore((state) => state.isCreateLoading);
  const [task, setTask] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'Не выполнено',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTask({ title: '', description: '', status: 'Не выполнено' });
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
      status: task.status === 'Не выполнено' ? 'Выполнено' : 'Не выполнено',
    });
  };

  const onTaskCreateSubmit = async () => {
    await createTask(task);
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
                value={task.status === 'Выполнено'}
                onClick={onStatusChange}
              />
              <Typography> Задача не выполнена/выполнена</Typography>
            </Flex>
            <Flex style={{ marginTop: '16px' }} gap={10} justify="end">
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreateLoading}
              >
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
