import { ChangeEvent, FC, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Typography } from 'antd';

type Props = {
  currentTitle: string;
  isLoading: boolean;
  onUpdateTitle: (newTitile: string) => void;
};

const TitleInput: FC<Props> = ({ currentTitle, isLoading, onUpdateTitle }) => {
  const [value, setValue] = useState(currentTitle);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const onTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIsTitleEditChange = () => {
    setIsTitleEdit(!isTitleEdit);
    setValue(currentTitle);
  };

  const onTitleBlur = async () => {
    if (value !== '' && value !== currentTitle) {
      await onUpdateTitle(value);
    }
    onIsTitleEditChange();
  };

  return (
    <Flex align="center" gap={10}>
      <Button
        shape="circle"
        type="text"
        icon={<EditOutlined />}
        onClick={onIsTitleEditChange}
        loading={isLoading}
      />
      {isTitleEdit ? (
        <Input
          value={value}
          autoFocus
          onBlur={onTitleBlur}
          onChange={onTitleInputChange}
        />
      ) : (
        <Typography>{currentTitle}</Typography>
      )}
    </Flex>
  );
};

export { TitleInput };
