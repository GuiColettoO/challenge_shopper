import styled from "styled-components";

export const HomeContainer = styled.main`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  height: 100%;
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

export const NewEstimateButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["green-700"]};
    transition: background-color 0.2s;
  }
`;
