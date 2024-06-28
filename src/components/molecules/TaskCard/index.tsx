import { FC, MouseEvent, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Button, Card, Flex, Typography, Modal, Input } from 'antd';
import { CheckOutlined, EditOutlined, HeartOutlined } from '@ant-design/icons';

import { Task } from '@/types';

import { TaskCardSkeleton } from './TaskCardSkeleton';

type Props = {
  task: Task;
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
};

const TaskCard: FC<Props> = ({ task, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState({
    delete: false,
    update: false,
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onTitleEditChange = () => {
    setIsTitleEdit(!isTitleEdit);
  };

  const onDescEditChange = () => {
    setIsDescEdit(!isDescEdit);
  };

  const onTitleBlur = () => {
    onTitleEditChange();
  };

  const onDescBlur = () => {
    onDescEditChange();
  };

  const onDeleteTask = async () => {
    setIsLoadingState({ ...isLoadingState, delete: true });
    await onDelete(task);
    setIsLoadingState({ ...isLoadingState, delete: false });
  };

  const onFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const onCompleteClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoadingState({ ...isLoadingState, update: true });
    const currentComplete = task.attributes.status;
    await onUpdate({
      ...task,
      attributes: {
        ...task.attributes,
        status: currentComplete === 'Выполнено' ? 'Не выполнено' : 'Выполнено',
      },
    });
    setIsLoadingState({ ...isLoadingState, update: false });
  };

  return (
    <>
      <Card
        hoverable
        title={
          <Flex gap={12} align="center">
            <Button
              shape="circle"
              type={
                task.attributes.status === 'Выполнено' ? 'primary' : 'default'
              }
              icon={<CheckOutlined />}
              loading={isLoadingState.update}
              onClick={onCompleteClick}
            />
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {task.attributes.title}
            </Typography.Title>
          </Flex>
        }
        extra={
          <Button
            shape="circle"
            icon={<HeartOutlined />}
            onClick={onFavoriteClick}
          />
        }
        onClick={handleOpenModal}
      >
        <Typography>
          {task.attributes.description || 'Описание отсутствует'}
        </Typography>
      </Card>
      <Modal
        closeIcon={null}
        open={isOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button onClick={onDeleteTask} danger loading={isLoadingState.delete}>
            Удалить
          </Button>,
          <Button onClick={handleCloseModal} type="primary">
            Закрыть
          </Button>,
        ]}
        title={
          <Flex align="center" gap={10}>
            <Button
              shape="circle"
              type="text"
              icon={<EditOutlined />}
              onClick={onTitleEditChange}
            />
            {isTitleEdit ? (
              <Input
                value={task.attributes.title}
                autoFocus
                onBlur={onTitleBlur}
              />
            ) : (
              <Typography>{task.attributes.title}</Typography>
            )}
          </Flex>
        }
      >
        <Flex gap={10}>
          <Button
            shape="circle"
            type="text"
            icon={<EditOutlined />}
            onClick={onDescEditChange}
          />
          {isDescEdit ? (
            <TextArea
              value={task.attributes.title}
              autoFocus
              style={{ resize: 'none', height: '120px' }}
              onBlur={onDescBlur}
            />
          ) : (
            <Typography>{task.attributes.description}</Typography>
          )}
        </Flex>
      </Modal>
    </>
  );
};

export { TaskCard, TaskCardSkeleton };
