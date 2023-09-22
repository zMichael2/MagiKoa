import { useEffect, useState } from "react";
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

import { getEmployees } from "../../services/Get";
import { postPayment } from "../../services/Post";

import logo from "../../assets/Estilo.jpg";
import { FormDataPayment } from "../../interfaces";

const today = dayjs();

interface IListEmployees {
  id: string;
  nombre: string;
}

export default function RegisterPayment() {
  const [listEmployees, setListEmployees] = useState<IListEmployees[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormDataPayment>({
    defaultValues: {
      employee: "",
      nameClient: "",
      date: today.format("DD/MM/YYYY"),
      description: "",
      typePay: "Efectivo",
      gasto: 0,
      insumo: 0,
      servicio: 0,
    },
  });

  const onRegisterForm = async (data: FormDataPayment) =>
    await postPayment({
      ...data,
      gasto: Number(data.gasto),
      insumo: Number(data.insumo),
      servicio: Number(data.servicio),
    });

  useEffect(() => {
    const fetchDataEmployees = async () => {
      const resp = await getEmployees();

      setListEmployees(resp);
    };
    fetchDataEmployees();
  }, []);

  return (
    <ContainerMain>
      <div className="flex flex-row ">
        <div className="h-[865px] w-[980px] p-14">
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
                    onChange={(value) =>
                      setValue("date", value!.format("DD/MM/YYYY"))
                    }
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
        <div className=" h-[865px] w-[547px]">
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
