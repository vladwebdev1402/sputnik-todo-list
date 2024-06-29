import { Button, Flex } from 'antd';

import { Container } from '@/components/atoms';
import { TaskFilter } from '@/types';

import { filters } from './data';
import styled from 'styled-components';
import { useTodoFilters } from '@/store';

const FilterWrapper = styled.div`
  margin-top: 32px;
`;

const FilterPanel = () => {
  const currentFilter = useTodoFilters((state) => state.filter);
  const changeFilter = useTodoFilters((state) => state.changeFilter);

  const onFilterClick = (newFilter: TaskFilter) => {
    changeFilter(newFilter);
  };

  return (
    <FilterWrapper>
      <Container>
        <Flex wrap>
          {filters.map((filter) => (
            <Button
              type={
                filter.value === currentFilter.value ? 'primary' : 'default'
              }
              onClick={() => onFilterClick(filter)}
              key={filter.value}
              size="large"
              style={{ flex: '1 0 25%' }}
            >
              {filter.name}
            </Button>
          ))}
        </Flex>
      </Container>
    </FilterWrapper>
  );
};

export { FilterPanel };
