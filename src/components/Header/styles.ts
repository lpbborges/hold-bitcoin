import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;

  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;

  label {
    margin-left: auto;
    color: var(--white);

    select {
      margin-left: 1rem;
    }
  }
`;

export const Content = styled.div`
  padding: 3rem 0;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 180px;
    margin-left: 2rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--white);
    background: var(--green-700);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.5rem;
    height: 4rem;

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

