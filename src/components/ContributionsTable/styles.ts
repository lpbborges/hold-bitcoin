import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;
  
  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    border-radius: 0.5rem;
    background: var(--white);

    th {
      color: var(--text-title);
      font-weight: 500;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      color: var(--text-body);

      &.negative {
        color: #E52E4D;
      }

      &.positive {
        color: #33CC95;
      }
    }
  }
`