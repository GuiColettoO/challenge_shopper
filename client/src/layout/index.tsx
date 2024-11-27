import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Container, EstimateContainer } from "./style";

export function Layout() {
  return (
    <Container>
      <Header />

      <EstimateContainer>
        <Outlet />
      </EstimateContainer>
    </Container>
  );
}
