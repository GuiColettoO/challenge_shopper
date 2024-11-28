import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type NewHistoryModalProps = {
  close: () => void;
};

export function NewHistoryModal({ close }: NewHistoryModalProps) {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [driver, setDriver] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      close();
      navigate(`/history?customer_id=${customer}&driver_id=${driver}`);
    } catch (error) {
      console.error("Failed to create estimate:", error);
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>History</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer ID"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />

          <select value={driver} onChange={(e) => setDriver(e.target.value)}>
            <option value="" disabled selected>
              Select Driver
            </option>
            <option value="1">Homer Simpson</option>
            <option value="2">Dominic Toretto</option>
            <option value="3">James Bond</option>
          </select>

          <button type="submit">Estimate Ride</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
