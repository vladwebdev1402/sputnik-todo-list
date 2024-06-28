import { ChangeEvent, FC, useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type Props = {
  currentDesc: string;
  onUpdateDesc: (newDesc: string) => void;
};

const DescriptionInput: FC<Props> = ({ currentDesc, onUpdateDesc }) => {
  const [value, setValue] = useState(currentDesc);
  const [isDescEdit, setIsDescEdit] = useState(false);

  const onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onIsDescEditChange = () => {
    setIsDescEdit(!isDescEdit);
  };

  const onDescBlur = async () => {
    if (value !== currentDesc) {
      await onUpdateDesc(value);
    }
    onIsDescEditChange();
  };

  return (
    <Flex gap={10}>
      {isDescEdit ? (
        <TextArea
          value={value}
          onChange={onDescChange}
          autoFocus
          style={{ resize: 'none', height: '120px' }}
          onBlur={onDescBlur}
        />
      ) : (
        <Button
          type="text"
          onClick={onIsDescEditChange}
          style={{ width: '100%', display: 'block', textAlign: 'left' }}
        >
          <Typography>
            {currentDesc || 'Нажмите, чтобы добавить описание'}
          </Typography>
        </Button>
      )}
    </Flex>
  );
};

export { DescriptionInput };
