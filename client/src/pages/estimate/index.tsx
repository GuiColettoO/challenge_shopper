import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { MapView } from "../../components/Map";
import { useConfirm } from "../../contexts/confirmContext";
import { Options, useEstimate } from "../../contexts/estimateContext";
import {
  HomeContainer,
  ListDriverContainer,
  MapContainer,
  TransactionsTable,
} from "./style";

export function Estimate() {
  const navigate = useNavigate();
  const { options, location } = useEstimate();
  const { createConfirm, handleUpdateConfirm, confirm } = useConfirm();

  const handleSelect = async (option: Options) => {
    console.log("Option selected:", option);
    try {
      handleUpdateConfirm({
        customer_id: confirm.customer_id,
        origin: confirm.origin,
        destination: confirm.destination,
        distance: location.distance,
        duration: location.duration,
        driver: {
          id: Number(option.id),
          name: option.name,
        },
        value: option.value,
      });

      await createConfirm();

      console.log("Estimate created successfully!");

      navigate(`/history`);
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
              options.map((option) => (
                <tr key={option.id}>
                  <td>{option.name}</td>
                  <td>{option.description}</td>
                  <td>{option.vehicle}</td>
                  <td>{option.review.rating}</td>
                  <td>{option.value}</td>
                  <td>
                    <button onClick={() => handleSelect(option)}>Select</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
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
