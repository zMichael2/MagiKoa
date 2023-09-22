import { useEffect } from "react";
import {
  GridRowsProp,
  GridRowModes,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  DataGrid,
  GridColDef,
  GridRowModesModel,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
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
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

import { getPayments } from "../../../services/Get";
import { deletePayment } from "../../../services/Delete";
import { putPayment } from "../../../services/Put";

const options = ["Dia", "Mes"];
const tomorrow = dayjs().add(0, "day");

export const HistoryPay = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [filteredAppoiment, setFilteredAppoiment] = useState<GridRowsProp>([]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
    const {
      target: { value },
    } = event;
    setSelectedOption(value);
    setFilteredAppoiment([]);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deletePayment(String(id));
    setFilteredAppoiment(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setFilteredAppoiment(
      rows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    const data = {
      employee: newRow.empleado_id,
      description: newRow.descripcion,
      gasto: +newRow.gasto,
      insumo: +newRow.insumo,
      servicio: +newRow.servicio,
      typePay: newRow.tipo_pago,
      date: dayjs(newRow.fecha).format("DD/MM/YYYY"),
    };
    await putPayment(data, newRow.id);

    const total =
      Number(newRow.insumo) + Number(newRow.servicio) - Number(newRow.gasto);

    return { ...updatedRow, total };
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "Empleado.nombre",
      headerName: "Empleado",
      width: 200,
      editable: true,
      headerClassName: "header-grid",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 200,
      editable: true,
    },
    {
      field: "gasto",
      headerName: "Gasto",
      width: 150,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
      headerClassName: "header-grid",
      valueFormatter: ({ value }) =>
        Number(value).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    {
      field: "insumo",
      headerName: "Insumo",
      width: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
      type: "number",
      valueFormatter: ({ value }) =>
        Number(value).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    {
      field: "servicio",
      headerName: "Servicio",
      editable: true,
      width: 150,
      type: "number",
      align: "left",
      headerAlign: "left",
      headerClassName: "header-grid",
      valueFormatter: ({ value }) =>
        Number(value).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      type: "number",
      align: "left",
      headerAlign: "left",
      valueFormatter: ({ value }) =>
        Number(value).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    {
      field: "tipo_pago",
      headerName: "Metodo de pago",
      width: 130,
      type: "number",
      align: "left",
      headerAlign: "left",
      headerClassName: "header-grid",
    },

    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      editable: true,
      type: "date",
      valueFormatter: (params) =>
        typeof params.value === "object"
          ? new Date(params.value).toLocaleString("es-CO", {
              dateStyle: "medium",
            })
          : params.value,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 270,
      cellClassName: "actions",
      align: "center",
      headerClassName: "header-grid",

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick(id)}
            >
              Guardar
            </Button>,
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancelClick(id)}
            >
              Cancelar
            </Button>,
          ];
        }

        return [
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick(id)}
          >
            Editar
          </Button>,
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick(id)}
          >
            Eliminar
          </Button>,
        ];
      },
    },
  ];

  useEffect(() => {
    const fetchDataEmployees = async () => {
      const resp = await getPayments();
      setFilteredAppoiment(resp);
      setRows(resp);
    };
    fetchDataEmployees();
  }, []);

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
              setFilteredAppoiment(rows);
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
              onChange={handleChange}
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
                        (row) => row.fecha === newDate
                      );

                      if (newDate !== "") {
                        if (productosFiltrados.length) {
                          setFilteredAppoiment(productosFiltrados);
                        } else {
                          setFilteredAppoiment([]);
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
                          row.fecha.split("/")[1].includes(newMonth)
                        );

                        if (newMonth !== "") {
                          if (productosFiltrados.length) {
                            setFilteredAppoiment(productosFiltrados);
                          } else {
                            setFilteredAppoiment([]);
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
        <DataGrid
          style={{ height: "100%" }}
          rows={filteredAppoiment}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
};
