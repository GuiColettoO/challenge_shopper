import { MapView } from "../../components/Map";
import { useConfirm } from "../../contexts/confirmContext";
import { useEstimate } from "../../contexts/estimateContext";
import {
  HomeContainer,
  ListDriverContainer,
  MapContainer,
  TransactionsTable,
} from "./style";

export function Home() {
  const { options, location } = useEstimate();
  const { createConfirm } = useConfirm();

  const handleSelect = async () => {
    try {
      await createConfirm();

      console.log("Estimate created successfully!");
    } catch (error) {
      console.error("Failed to create estimate:", error);
    }
  };

  return (
    <HomeContainer>
      <ListDriverContainer>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Vehicle</th>
              <th>Rating</th>
              <th>Value</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {options.length > 0 ? (
              (console.log(options),
              options.map((option) => (
                <tr key={option.id}>
                  <td>{option.name}</td>
                  <td>{option.description}</td>
                  <td>{option.vehicle}</td>
                  <td>{option.review.rating}</td>
                  <td>{option.value}</td>
                  <td>
                    <button>Select</button>
                  </td>
                </tr>
              )))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </TransactionsTable>
      </ListDriverContainer>
      <MapContainer>
        <MapView location={location} />
      </MapContainer>
    </HomeContainer>
  );
}
