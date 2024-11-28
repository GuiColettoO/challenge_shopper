import { HeaderContainer, HeaderContent, NewEstimateButton } from "./style";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "../../assets/logo.png";
import { NewEstimateModal } from "../NewEstimateDialog";
import { NewHistoryModal } from "../NewHistoryDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [openRide, setOpenRide] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/">
          <img src={logoImg} alt="Logo" />
        </Link>

        <div className="button-group">
          <Dialog.Root open={openRide} onOpenChange={setOpenRide}>
            <Dialog.Trigger asChild>
              <NewEstimateButton>Start Ride</NewEstimateButton>
            </Dialog.Trigger>

            <NewEstimateModal
              close={() => {
                setOpenRide(false);
              }}
            />
          </Dialog.Root>
          <Dialog.Root open={openHistory} onOpenChange={setOpenHistory}>
            <Dialog.Trigger asChild>
              <NewEstimateButton>History</NewEstimateButton>
            </Dialog.Trigger>

            <NewHistoryModal
              close={() => {
                setOpenHistory(false);
              }}
            />
          </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
