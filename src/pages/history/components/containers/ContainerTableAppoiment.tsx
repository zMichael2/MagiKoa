import { Button, Box, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DatePicker } from "@mui/x-date-pickers";
import { IContainerTableHistory } from "../../../../interfaces";

import dayjs from "dayjs";

const tomorrow = dayjs().add(0, "day");

export const ContainerTableAppoiment: React.FC<IContainerTableHistory> = ({
  children,
  rows,
  setFilteredRows,
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
        <h1 className="font-bold text-2xl">Historial de citas</h1>
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <Button
            onClick={() => setFilteredRows(rows)}
            variant="outlined"
            endIcon={<VisibilityIcon />}
          >
            Ver todos
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={6} sm={2}>
              <DatePicker
                format="DD/MM/YYYY"
                minDate={tomorrow}
                onChange={(value) => {
                  const newDate = value!.format("DD/MM/YYYY");
                  console.log({ value, newDate, rows });

                  const productosFiltrados = rows.filter(
                    (row) => dayjs(row.fecha).format("DD/MM/YYYY") === newDate
                  );

                  if (newDate !== "") {
                    if (productosFiltrados.length) {
                      setFilteredRows(productosFiltrados);
                    } else {
                      setFilteredRows([]);
                    }

                    return;
                  }
                }}
                views={["day", "month", "year"]}
                label="Fecha"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
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
