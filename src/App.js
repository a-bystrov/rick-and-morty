import styled from 'styled-components';
import { Pagination, ItemsGrid, useData, Header, AppState } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export function App() {
  const { isFetching, isError } = useData();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <Header />
              <AppState />
              {!isFetching && !isError && (
                <>
                  <ItemsGrid />
                  <Pagination />
                </>
              )}
            </Main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
