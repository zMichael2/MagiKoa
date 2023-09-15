import TextField from "@mui/material/TextField";
import { ContainerMain } from "../../components/containers/ContainerMain";
import logo from "../../assets/peluqueria.jpg";

export default function RegisterPayment() {
  return (
    <ContainerMain>
      <div className="flex flex-row ">
        <div className="h-[865px] w-[980px] p-14">
          <h1>Registrar Cítas</h1>
          <h3>Introduzca los datos para el registro de la cita</h3>
          <div className="mt-12 flex flex-col gap-6">
            <div className="flex justify-between gap-6">
              <TextField
                label="Atiende"
                id="outlined-size-normal"
                defaultValue="Jorge"
                className="w-full"
              />
              <TextField
                label="Nombre del Cliente"
                id="outlined-size-normal"
                defaultValue="Lozano"
                className="w-full"
              />
            </div>
            <div className="flex justify-between gap-6">
              <TextField
                id="outlined-number"
                label="Gasto"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Insumo"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Servicios"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-yellow-300 h-[865px] w-[547px]">
          <img
            src={logo}
            alt="logo_peluqueria"
            className="h-[865px] w-[547px] object-cover"
          />
        </div>
      </div>
    </ContainerMain>
  );
}
