/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode, useState } from "react";
import { api } from "../lib/axios";

export type CreateConfirmInput = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

type ConfirmContextData = {
  handleUpdateConfirm: (data: Partial<CreateConfirmInput>) => void;
  createConfirm: (data: CreateConfirmInput) => Promise<void>;
  confirm: CreateConfirmInput;
};

const ConfirmContext = createContext<ConfirmContextData | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [confirm, setConfirm] = useState({
    customer_id: "",
    origin: "",
    destination: "",
    distance: 0,
    duration: "",
    driver: { id: 0, name: "" },
    value: 0,
  });

  function handleUpdateConfirm(data: Partial<CreateConfirmInput>) {
    setConfirm((state) => ({ ...state, ...data }));
    console.log("Confirm updated:", data);
  }

  const createConfirm = async (data: CreateConfirmInput) => {
    try {
      console.log("testando o confirm:", data);
      await api.patch("/ride/confirm", data);
    } catch (error) {
      console.error("Error creating Confirm:", error);
      throw error;
    }
  };

  return (
    <ConfirmContext.Provider
      value={{ createConfirm, handleUpdateConfirm, confirm }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within an ConfirmProvider");
  }
  return context;
}
