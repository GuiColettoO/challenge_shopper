import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./style";
import { useEstimate } from "../../contexts/estimateContext";
import { useState } from "react";
import { useConfirm } from "../../contexts/confirmContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type NewEstimateModalProps = {
  close: () => void;
};

export function NewEstimateModal({ close }: NewEstimateModalProps) {
  const navigate = useNavigate();
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
      close();
      navigate(`/estimate`);
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
