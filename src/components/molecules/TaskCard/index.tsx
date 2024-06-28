import { FC, MouseEvent, useState } from 'react';
import { Button, Card, Flex, Typography, Modal } from 'antd';
import { CheckOutlined, HeartOutlined } from '@ant-design/icons';

import { Task } from '@/types';

import { TaskCardSkeleton } from './TaskCardSkeleton';
import { DescriptionInput, TitleInput } from '@/components/atoms';

type Props = {
  task: Task;
  isFavorite: boolean;
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onChangeFavorite: (id: number) => void;
};

const TaskCard: FC<Props> = ({
  task,
  isFavorite,
  onDelete,
  onUpdate,
  onChangeFavorite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState({
    delete: false,
    update: false,
    form: false,
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onUpdateDesc = async (description: string) => {
    setIsLoadingState({ ...isLoadingState, form: true });
    await onUpdate({
      ...task,
      attributes: {
        ...task.attributes,
        description,
      },
    });
    setIsLoadingState({ ...isLoadingState, form: false });
  };

  const onUpdateTitle = async (title: string) => {
    setIsLoadingState({ ...isLoadingState, form: true });
    await onUpdate({
      ...task,
      attributes: {
        ...task.attributes,
        title,
      },
    });
    setIsLoadingState({ ...isLoadingState, form: false });
  };

  const onDeleteTask = async () => {
    setIsLoadingState({ ...isLoadingState, delete: true });
    await onDelete(task);
    setIsLoadingState({ ...isLoadingState, delete: false });
  };

  const onFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChangeFavorite(task.id);
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
              {task.attributes.title || 'untitled'}
            </Typography.Title>
          </Flex>
        }
        extra={
          <Button
            type={isFavorite ? 'primary' : 'default'}
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
          <TitleInput
            onUpdateTitle={onUpdateTitle}
            currentTitle={task.attributes.title || 'untitled'}
            isLoading={isLoadingState.form}
          />
        }
      >
        <DescriptionInput
          currentDesc={task.attributes.description}
          onUpdateDesc={onUpdateDesc}
        />
      </Modal>
    </>
  );
};

export { TaskCard, TaskCardSkeleton };
