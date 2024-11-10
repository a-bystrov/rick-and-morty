import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { useSearchParams } from 'react-router-dom';

export function FilterInput({ name, placeholder }) {
  const { apiURL, setApiURL } = useData();
  const refInput = useRef();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newURL = new URL(apiURL);

    newURL.search = searchParams;

    if (searchParams.get(name)) {
      refInput.current.value = searchParams.get(name);
    }
  }, [searchParams]);

  function handlerOnChange() {
    const valueInput = refInput.current.value;
    const newURL = new URL(apiURL);

    if (valueInput === '') {
      newURL.searchParams.delete(name);
    } else {
      newURL.searchParams.set(name, valueInput);
    }
    setApiURL(newURL);
  }

  return (
    <StyledFilterInput
      ref={refInput}
      placeholder={placeholder}
      onChange={handlerOnChange}
    />
  );
}

const StyledFilterInput = styled.input`
  width: 120px;
  height: 30px;
  border: 2px solid rgb(131, 191, 70);
  background: #263750;
  color: white;
  border-radius: 10px;
  padding-left: 10px;
  outline: none;

  @media (max-width: 930px) {
    width: 100px;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;
