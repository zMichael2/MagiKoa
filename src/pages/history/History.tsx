import { useNavigate } from "react-router-dom";
import { Divider, Button, Box } from "@mui/material";
import { ContainerMain } from "../../components/containers/ContainerMain";
import { HistoryAppoiment } from "./components/HistoryAppoiment";
import { HistoryPay } from "./components/HistoryPay";

import { purpleDark } from "../../constants";

import "./style.css";

export default function History() {
  const navigate = useNavigate();
  return (
    <ContainerMain>
      <HistoryAppoiment />

      <Divider
        sx={{
          my: 4,
          borderStyle: "dashed",
          borderWidth: 2,
        }}
      />

      <HistoryPay />

      <Box display={"flex"} width="100%" justifyContent="center" my={3.5}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{
            backgroundColor: purpleDark,
            width: "20%",
            height: "45px",
            borderRadius: "10px",
          }}
        >
          Regresar
        </Button>
      </Box>
    </ContainerMain>
  );
}
