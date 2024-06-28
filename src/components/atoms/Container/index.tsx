import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  max-width: 992px;
`;

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return <BaseContainer>{children}</BaseContainer>;
};

export { Container };
