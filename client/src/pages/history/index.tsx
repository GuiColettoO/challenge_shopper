import { useEffect, useState } from "react";
import {
  HistoryContainer,
  ListDriverContainer,
  TransactionsTable,
} from "./style";
import { api } from "../../lib/axios";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export type Ride = {
  id: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  customer_id: string;
  driver: {
    id: string;
    name: string;
  };
  value: string;
  created_at: Date;
};

export type RideResponse = {
  response: {
    rides: Ride[];
  };
};

export function History() {
  const [list, setList] = useState<Ride[]>([]);
  const { search } = useLocation();

  const getSearchParams = () => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };

  useEffect(() => {
    const searchParams = getSearchParams();
    console.log("Search Params:", searchParams);

    const driverId = searchParams["driver_id"] || "defaultDriverId";
    const customerId = searchParams["customer_id"] || "defaultRideId";

    api
      .get<RideResponse>(`ride/${customerId}?driver_id=${driverId}`)
      .then(({ data }) => {
        setList(data.response.rides);
        console.log("List:", data.response.rides);
      })
      .catch((error) => {
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
      });
  }, [search]);

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
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item.id}>
                  <td title="Date">
                    {format(new Date(item.created_at), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td title="Driver">{item.driver.name}</td>
                  <td title="Origen">{item.origin}</td>
                  <td title="Destination">{item.destination}</td>
                  <td title="Distance">{item.distance}</td>
                  <td title="Time">{item.duration}</td>
                  <td title="Value">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(item.value))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </TransactionsTable>
      </ListDriverContainer>
    </HistoryContainer>
  );
}
