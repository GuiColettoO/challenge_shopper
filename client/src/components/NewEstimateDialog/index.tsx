import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./style";
import { useEstimate } from "../../contexts/estimateContext";
import { useState } from "react";
import { useConfirm } from "../../contexts/confirmContext";

export function NewEstimateModal() {
  const { createEstimate } = useEstimate();
  const { handleUpdateConfirm } = useConfirm();
  const [customerID, setCustomerID] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createEstimate({
        customer_id: customerID,
        origin,
        destination,
      });
      handleUpdateConfirm({
        customer_id: customerID,
        origin,
        destination,
      });
      console.log("Estimate created successfully!");

      setCustomerID("");
      setOrigin("");
      setDestination("");
    } catch (error) {
      console.error("Failed to create estimate:", error);
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Ride</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer ID"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button type="submit">Estimate Ride</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
