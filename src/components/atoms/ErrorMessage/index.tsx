import { Typography } from 'antd';
import { FC } from 'react';

import styled from 'styled-components';

const ErrorContainer = styled.div`
  text-align: center;
`;

type Props = {
  title: string;
  description: string;
};

const ErrorMessage: FC<Props> = ({ title, description }) => {
  return (
    <ErrorContainer>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography>{description}</Typography>
    </ErrorContainer>
  );
};

export { ErrorMessage };
