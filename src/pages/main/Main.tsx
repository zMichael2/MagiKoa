import { Button } from "@mui/material";
import { ContainerMain } from "../../components/containers/ContainerMain";
import ArticleIcon from "@mui/icons-material/Article";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import logo from "../../assets/Labs.png";
const Main = () => {
  return (
    <ContainerMain>
      <div className="flex-col gap-8 flex">
        <img src={logo} alt="logo" className="h-[300px] rounded-full" />
        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            endIcon={<ArticleIcon />}
            style={{ backgroundColor: "#F05623" }}
          >
            Registrar cita
          </Button>
          <Button
            variant="contained"
            endIcon={<AddBusinessIcon />}
            style={{ backgroundColor: "#F05623" }}
          >
            Registrar pagos
          </Button>
          <Button
            variant="contained"
            endIcon={<ReceiptLongIcon />}
            style={{ backgroundColor: "#F05623" }}
          >
            Historial
          </Button>
        </div>
      </div>
    </ContainerMain>
  );
};
export default Main;
