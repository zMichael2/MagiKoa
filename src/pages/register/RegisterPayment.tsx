import {
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";

import { ContainerMain } from "../../components/containers/ContainerMain";
import { ButtonBackAndRegister } from "../../components/buttons/ButtonBackAndRegister";

import logo from "../../assets/Estilo.jpg";

const today = dayjs();
const tomorrow = dayjs().add(0, "day");

interface FormData {
  employee: string;
  nameClient: string;
  gasto: number;
  insumo: number;
  servicio: number;
  typePay: string;
  date: Dayjs | null | string;
  description: string;
}

export default function RegisterPayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      employee: "",
      nameClient: "",
      date: today.format("DD-MM-YYYY"),
      description: "",
      typePay: "Efectivo",
      gasto: 0,
      insumo: 0,
      servicio: 0,
    },
  });

  const onRegisterForm = ({
    employee,
    nameClient,
    date,
    description,
    typePay,
    gasto,
    insumo,
    servicio,
  }: FormData) => {
    console.warn("Datos");
    console.log({
      employee,
      nameClient,
      date,
      description,
      typePay,
      gasto,
      insumo,
      servicio,
    });
  };
  return (
    <ContainerMain>
      <div className="flex flex-row ">
        <div className="h-[865px] w-[980px] p-14">
          <h1>Registrar Cítas</h1>
          <h3>Introduzca los datos para el registro de la cita</h3>
          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Empleado"
                  type="text"
                  placeholder="Nombre del empleado"
                  fullWidth
                  {...register("employee", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.employee}
                  helperText={errors.employee?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Cliente"
                  placeholder="Nombre del Cliente"
                  fullWidth
                  {...register("nameClient", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.nameClient}
                  helperText={errors.nameClient?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Gasto"
                  type="number"
                  {...register("gasto", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.gasto}
                  helperText={errors.gasto?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Insumo"
                  type="number"
                  {...register("insumo", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.insumo}
                  helperText={errors.insumo?.message}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Servicio"
                  type="number"
                  {...register("servicio", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.servicio}
                  helperText={errors.servicio?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de pago</InputLabel>
                  <Select
                    {...register("typePay", {
                      required: "Este campo es requerido",
                    })}
                    defaultValue={"Efectivo"}
                    error={!!errors.typePay}
                    label="Tipo de pago"
                  >
                    <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                    <MenuItem value={"Tarjeta debito / credito"}>
                      Tarjeta debito / credito
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    defaultValue={today}
                    minDate={tomorrow}
                    views={["day", "month", "year"]}
                    label="Fecha"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
              </LocalizationProvider>

              <Grid item xs={12} sm={12}>
                <TextField
                  type="text"
                  label="Descripción"
                  multiline
                  rows={4}
                  placeholder="Descripcion"
                  variant="outlined"
                  fullWidth
                  {...register("description", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
            </Grid>
            <ButtonBackAndRegister
              titleBackButton="Volver"
              titleRegisterButton="Registrar Pago"
            />
          </form>
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
