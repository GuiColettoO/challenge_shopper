/* eslint-disable react-refresh/only-export-components */
import {
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import { api } from "../lib/axios";

export type CreateEstimateInput = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type Location = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
};

export type Options = {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
  };
  value: number;
};

type EstimateContextData = {
  options: Options[];
  location: Location;
  createEstimate: (data: CreateEstimateInput) => Promise<void>;
};

const EstimateContext = createContext<EstimateContextData | undefined>(
  undefined
);

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>({
    origin: { latitude: -23.5871708, longitude: -46.6144713 },
    destination: { latitude: -23.5593911, longitude: -46.6209632 },
  });
  const [options, setOptions] = useState<Options[]>([]);

  const createEstimate = useCallback(async (data: CreateEstimateInput) => {
    try {
      const estimate = await api.post("/ride/estimate", data);
      const {
        data: { response },
      } = estimate;

      console.log("MANEIRO:", response);

      setOptions(response.options);
      setLocation({
        origin: {
          latitude: response.origin.latitude,
          longitude: response.origin.longitude,
        },
        destination: {
          latitude: response.destination.latitude,
          longitude: response.destination.longitude,
        },
      });
    } catch (error) {
      console.error("Error creating estimate:", error);
      throw error;
    }
  }, []);

  return (
    <EstimateContext.Provider value={{ options, location, createEstimate }}>
      {children}
    </EstimateContext.Provider>
  );
}

export function useEstimate() {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error("useEstimate must be used within an EstimateProvider");
  }
  return context;
}
