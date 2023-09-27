import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { ContainerMain } from "../../components/containers/ContainerMain";
import { ButtonBackAndRegister } from "../../components/buttons/ButtonBackAndRegister";

import { useListEmployees } from "../../hooks/useListEmployees";
import { postPayment } from "../../services/Post";

import logo from "../../assets/Estilo.jpg";

import { FormDataPayment } from "../../interfaces";
import { LoaderTriangle } from "../../components/loaders/LoaderTriangle";

const today = dayjs();

const values: FormDataPayment = {
  employee: "",
  nameClient: "",
  date: today.format("DD/MM/YYYY"),
  description: "",
  typePay: "Efectivo",
  gasto: 0,
  insumo: 0,
  servicio: 0,
};

export default function RegisterPayment() {
  const { listEmployees } = useListEmployees();
  const [employeeId, setChangeEmployeeId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormDataPayment>({
    defaultValues: values,
  });

  const onRegisterForm = async (data: FormDataPayment) => {
    setLoading(true);
    const formData = {
      ...data,
      gasto: Number(data.gasto),
      insumo: Number(data.insumo),
      servicio: Number(data.servicio),
    };

    if (typeof data.date === "object") {
      await postPayment(formData);
      setLoading(false);
      return;
    }
    await postPayment({ ...formData, date: dayjs(new Date()) });
    setLoading(false);

    reset(values);
    setChangeEmployeeId("");
  };

  return (
    <ContainerMain>
      {loading ? <LoaderTriangle /> : <></>}
      <div className="flex flex-row ">
        <div className="h-full lg:h-[865px] w-[980px] p-8 lg:p-14">
          <h1 className="font-bold text-2xl">Registrar pagos</h1>
          <h3>Introduzca los datos para el registro de el pago</h3>
          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Empleado</InputLabel>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        style: { overflowY: "scroll", height: "200px" },
                      },
                    }}
                    error={!!errors.employee}
                    label="Empleado"
                    {...register("employee", {
                      required: "Este campo es requerido",
                    })}
                    value={employeeId}
                    onChange={(value) => {
                      setChangeEmployeeId(value.target.value);
                      setValue("employee", value.target.value);
                    }}
                  >
                    {listEmployees.map((employee) => {
                      return (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.employee && !getValues("employee") ? (
                    <FormHelperText style={{ color: "#d32f2f" }}>
                      Este campo es requerido
                    </FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl>
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
                    format="DD/MM/YYYY"
                    views={["day", "month", "year"]}
                    label="Fecha"
                    onChange={(value) => setValue("date", value)}
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
        <div className="hidden lg:flex h-[865px] w-[547px]">
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
