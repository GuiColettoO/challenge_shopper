import { useNavigate } from "react-router-dom";
import { MapView } from "../../components/Map";
import { useConfirm } from "../../contexts/confirmContext";
import { Options, useEstimate } from "../../contexts/estimateContext";
import {
  HomeContainer,
  ListDriverContainer,
  MapContainer,
  NewEstimateButton,
  TransactionsTable,
} from "./style";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function Estimate() {
  const navigate = useNavigate();
  const { options, location } = useEstimate();
  const { createConfirm, confirm } = useConfirm();

  const handleSelect = async (option: Options) => {
    console.log("Option selected:", option);
    try {
      await createConfirm({
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

      console.log("Estimate created successfully!");

      navigate(
        `/history?customer_id=${confirm.customer_id}&driver_id=${option.id}`
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message);
          console.error(
            "Failed to create estimate:",
            error.response.data.message
          );
        } else {
          toast.error("An unexpected error occurred.");
          console.error("Failed to create estimate:", error.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      }
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
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(option.value)}
                  </td>
                  <td>
                    <NewEstimateButton onClick={() => handleSelect(option)}>
                      Select
                    </NewEstimateButton>
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
