import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ContainerMain } from "../../components/containers/ContainerMain";
import logo from "../../assets/Estilo.jpg";
import { useForm } from "react-hook-form";
import { FormData } from "../../interfaces";
import { ButtonBackAndRegister } from "../../components/buttons/ButtonBackAndRegister";

const today = dayjs();
const tomorrow = dayjs().add(0, "day");
const eightAM = dayjs().set("hour", 8).startOf("hour");

export default function RegisterAppoiment() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, defaultValues },
  } = useForm<FormData>({
    defaultValues: {
      employee: "",
      nameClient: "",
      phone: "",
      hour: eightAM.format("h:mm a"),
      date: today.format("DD-MM-YYYY"),
      description: "",
    },
  });

  const onRegisterForm = ({
    employee,
    nameClient,
    phone,
    date,
    description,
    hour,
  }: FormData) => {
    console.warn("Datos");
    console.log({ employee, nameClient, date, phone, description, hour });
  };
  console.log(defaultValues?.employee, getValues("employee"));

  return (
    <ContainerMain>
      <div className="flex flex-row ">
        <div className="h-[865px] w-[980px] p-14">
          <h1 className="font-bold text-2xl">Registrar Cítas</h1>
          <h3>Introduzca los datos para el registro de la cita</h3>

          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  type="text"
                  label="Empleado"
                  placeholder="Nombre del empleado"
                  fullWidth
                  style={{ fontFamily: "Signika Negative" }}
                  {...register("employee", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.employee}
                  helperText={errors.employee?.message}
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
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
                    <MenuItem value={10}>Jorge Mestre</MenuItem>
                    <MenuItem value={20}>
                      Michael Alexander Martinez Alvarez
                    </MenuItem>
                    <MenuItem value={30}>
                      Dylan Andres Batista Aristizabal
                    </MenuItem>
                    <MenuItem value={10}>Jorge Mestre</MenuItem>
                    <MenuItem value={20}>
                      Michael Alexander Martinez Alvarez
                    </MenuItem>
                    <MenuItem value={30}>
                      Dylan Andres Batista Aristizabal
                    </MenuItem>
                    <MenuItem value={10}>Jorge Mestre</MenuItem>
                    <MenuItem value={20}>
                      Michael Alexander Martinez Alvarez
                    </MenuItem>
                    <MenuItem value={30}>
                      Dylan Andres Batista Aristizabal
                    </MenuItem>
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
                  label="Cliente"
                  placeholder="Nombre del cliente"
                  type="text"
                  fullWidth
                  {...register("nameClient", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.nameClient}
                  helperText={errors.nameClient?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Celular"
                  placeholder="Celular del cliente"
                  type="text"
                  fullWidth
                  {...register("phone", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    defaultValue={today}
                    minDate={tomorrow}
                    views={["day", "month", "year"]}
                    label="Fecha"
                    onChange={(value) =>
                      setValue("date", value!.format("DD-MM-YYYY"))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    defaultValue={eightAM}
                    minTime={eightAM}
                    label="Hora"
                    onChange={(value) =>
                      setValue("hour", value!.format("h:mm a"))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
              </LocalizationProvider>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Descripcion"
                  multiline
                  rows={4}
                  placeholder="Descripcion"
                  variant="outlined"
                  type="text"
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
              titleRegisterButton="Registrar Citas"
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
