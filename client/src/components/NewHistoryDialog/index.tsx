import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { CloseButton, Content, Overlay } from "./style";

export function NewHistoryModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>History</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input type="text" placeholder="Customer ID" />

          <select>
            <option value="" disabled selected>
              Select Driver
            </option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
          </select>

          <button type="submit">Estimate Ride</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
