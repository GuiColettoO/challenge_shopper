import styled from "styled-components";

export const HistoryContainer = styled.main`
  width: 100%;
  max-width: 1780px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
`;

export const MapContainer = styled.section`
  border: 1px solid #ccc;
  background-color: red;
`;

export const ListDriverContainer = styled.aside`
  /* border: 1px solid #ccc; */
  background-color: ${(props) => props.theme["blue-700"]};
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  /* margin-top: 1.5rem; */

  thead th {
    text-align: left;
    padding: 1rem 2rem;
    background: #15173b;
    color: ${(props) => props.theme.white};
    font-weight: bold;
  }

  td {
    padding: 1.25rem 2rem;
    background: #17193b;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;
