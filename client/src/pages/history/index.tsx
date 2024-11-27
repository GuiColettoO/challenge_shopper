import {
  HistoryContainer,
  ListDriverContainer,
  TransactionsTable,
} from "./style";

export function History() {
  return (
    <HistoryContainer>
      <ListDriverContainer>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Driver</th>
              <th>Origen</th>
              <th>Destination</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td title="Date">teste</td>
              <td title="Driver">teste</td>
              <td title="Origen">teste</td>
              <td title="Destination">teste</td>
              <td title="Distance">teste</td>
              <td title="Time">teste</td>
              <td title="Value">teste</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </ListDriverContainer>
    </HistoryContainer>
  );
}
