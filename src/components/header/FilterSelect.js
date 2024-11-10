import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { useSearchParams } from 'react-router-dom';

export function FilterSelect({ name, placeholder, options }) {
  const { apiURL, setApiURL } = useData();
  const refSelect = useRef();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newURL = new URL(apiURL);

    newURL.search = searchParams;

    if (searchParams.get(name)) {
      refSelect.current.value = searchParams.get(name);
    }
  }, [searchParams]);

  function handlerOnChange() {
    const valueSelect = refSelect.current.value;
    const newURL = new URL(apiURL);

    if (valueSelect === '') {
      newURL.searchParams.delete(name);
    } else {
      newURL.searchParams.set(name, valueSelect);
    }

    setApiURL(newURL);
  }

  return (
    <StyledFilterSelect
      ref={refSelect}
      placeholder={placeholder}
      onChange={handlerOnChange}
    >
      <option value={''}>{placeholder}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </StyledFilterSelect>
  );
}

const StyledFilterSelect = styled.select`
  width: 120px;
  height: 30px;
  border: 2px solid rgb(131, 191, 70);
  background: #263750;
  color: white;
  border-radius: 10px;
  padding-left: 5px;
  outline: none;

  @media (max-width: 930px) {
    width: 100px;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;
