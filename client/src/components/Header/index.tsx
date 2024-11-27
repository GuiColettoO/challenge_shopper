import { HeaderContainer, HeaderContent, NewEstimateButton } from "./style";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "../../assets/logo.png";
import { NewEstimateModal } from "../NewEstimateDialog";
import { NewHistoryModal } from "../NewHistoryDialog";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="Logo" />

        <div className="button-group">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewEstimateButton>Start Ride</NewEstimateButton>
            </Dialog.Trigger>

            <NewEstimateModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Link to="/history">
                <NewEstimateButton>History</NewEstimateButton>
              </Link>
            </Dialog.Trigger>

            <NewHistoryModal />
          </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
