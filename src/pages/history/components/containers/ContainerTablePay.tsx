import dayjs from "dayjs";
import {
  Button,
  FormControl,
  InputLabel,
  Box,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

import { IContainerTablePay } from "../../../../interfaces";

const tomorrow = dayjs().add(0, "day");

export const ContainerTablePay: React.FC<IContainerTablePay> = ({
  children,
  rows,
  setFilteredRows,
  selectedOption,
  setSelectedOption,
  handleChangeSelected,
  options,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingTop={5}
        paddingX={5}
        width={"100%"}
        alignItems={"center"}
      >
        <h1 className="font-bold text-2xl">Historial de Pagos</h1>

        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <Button
            onClick={() => {
              setSelectedOption("");
              setFilteredRows(rows);
            }}
            variant="outlined"
            endIcon={<VisibilityIcon />}
          >
            Ver todos
          </Button>
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Selecciona una opcion</InputLabel>
            <Select
              value={selectedOption}
              onChange={handleChangeSelected}
              input={<OutlinedInput label="Selecciona una opcion" />}
              renderValue={(selected) => selected}
            >
              {options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  <Checkbox checked={selectedOption.indexOf(opt) > -1} />
                  <ListItemText primary={opt} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {selectedOption !== "" ? (
              selectedOption === "Dia" ? (
                <Grid item xs={6} sm={2}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    maxDate={tomorrow}
                    onChange={(value) => {
                      const newDate = value!.format("DD/MM/YYYY");

                      const productosFiltrados = rows.filter(
                        (row) =>
                          dayjs(row.fecha).format("DD/MM/YYYY") === newDate
                      );

                      if (newDate !== "") {
                        if (productosFiltrados.length) {
                          setFilteredRows(productosFiltrados);
                        } else {
                          setFilteredRows([]);
                        }
                      }
                    }}
                    views={["day", "month", "year"]}
                    label="Fecha"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
              ) : (
                <Grid item xs={6} sm={2}>
                  <DemoItem>
                    <DatePicker
                      onChange={(value) => {
                        const newMonth = value!.format("MM");

                        const productosFiltrados = rows.filter((row) =>
                          dayjs(row.fecha)
                            .format("DD/MM/YYYY")
                            .split("/")[1]
                            .includes(newMonth)
                        );

                        if (newMonth !== "") {
                          if (productosFiltrados.length) {
                            setFilteredRows(productosFiltrados);
                          } else {
                            setFilteredRows([]);
                          }
                        }
                      }}
                      maxDate={tomorrow}
                      views={["month"]}
                      label="Mes"
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </DemoItem>
                </Grid>
              )
            ) : (
              <></>
            )}
          </LocalizationProvider>
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 5,
          paddingY: 3,
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};
