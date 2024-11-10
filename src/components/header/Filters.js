import styled from 'styled-components';
import { FilterInput } from './FilterInput';
import { FilterSelect } from './FilterSelect';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useData } from '../providers';

export function Filters() {
  const [searchParams] = useSearchParams();
  const { apiURL, setApiURL, setActivePage } = useData();

  useEffect(() => {
    const newURL = new URL(apiURL);

    newURL.search = searchParams;

    if (searchParams.get('page')) {
      setActivePage(searchParams.get('page') - 1);
    }

    setApiURL(newURL);
  }, [searchParams]);

  return (
    <StyledFilters>
      <FilterInput name="name" placeholder="Name" />
      <FilterSelect
        name="status"
        placeholder="Status"
        options={['alive', 'dead', 'unknown']}
      />
      <FilterInput name="species" placeholder="Species" />
      <FilterInput name="type" placeholder="Type" />
      <FilterSelect
        name="gender"
        placeholder="Gender"
        options={['female', 'male', 'genderless', 'unknow']}
      />
    </StyledFilters>
  );
}

const StyledFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  justify-content: space-between;

  @media (max-width: 930px) {
    width: 95%;
  }

  @media (max-width: 650px) {
    width: 70%;
    flex-direction: column;
    gap: 10px;
  }
`;
