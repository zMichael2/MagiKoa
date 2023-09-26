import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Button } from "@mui/material";
import { ContainerMain } from "../../components/containers/ContainerMain";
import { purpleDark } from "../../constants/colors";
import logo from "../../assets/LOGOFINAL.jpg";

const Main = () => {
  const navigate = useNavigate();
  const onNagivate = (route: string) => navigate(route);
  return (
    <ContainerMain isPadding>
      <div className="flex justify-center items-center h-full">
        <div className="flex-col gap-8 flex">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full md:h-[300px] rounded-full"
          />
          <div className="flex flex-col gap-4">
            <Button
              variant="contained"
              endIcon={<ArticleIcon />}
              style={{ backgroundColor: purpleDark, padding: ".8rem" }}
              onClick={() => onNagivate("/registerAppoiment")}
            >
              Registrar cita
            </Button>
            <Button
              variant="contained"
              endIcon={<AddBusinessIcon />}
              style={{ backgroundColor: purpleDark, padding: ".8rem" }}
              onClick={() => onNagivate("/registerPayment")}
            >
              Registrar pagos
            </Button>
            <Button
              variant="contained"
              endIcon={<ReceiptLongIcon />}
              style={{ backgroundColor: purpleDark, padding: ".8rem" }}
              onClick={() => onNagivate("/history")}
            >
              Historial
            </Button>
          </div>
        </div>
      </div>
    </ContainerMain>
  );
};
export default Main;
