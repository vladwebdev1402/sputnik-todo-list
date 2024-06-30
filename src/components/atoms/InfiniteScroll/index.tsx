import { FC, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ObserverBlock = styled.div`
  width: 100%;
  height: 100px;
`;

const ObserverWrapper = styled.div`
  margin-top: 8px;
`;

type Props = {
  isLoading: boolean;
  isStopScroll: boolean;
  onObserve: () => void;
  loader: ReactNode;
};

const InfiniteScroll: FC<Props> = ({
  isLoading,
  isStopScroll,
  loader,
  onObserve,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerRef.current;

    const options = {
      root: null,
      rootMargin: '10px',
      thresold: 1,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) onObserve();
    };

    const observer = new IntersectionObserver(callback, options);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [observerRef, onObserve]);

  return (
    <ObserverWrapper>
      {isLoading && loader}
      {!isLoading && !isStopScroll && (
        <ObserverBlock ref={observerRef}></ObserverBlock>
      )}
    </ObserverWrapper>
  );
};

export { InfiniteScroll };
