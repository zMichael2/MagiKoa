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

import { DatePicker } from "@mui/x-date-pickers";

const initialRows: GridRowsProp = [
  {
    id: 1,
    empleado: "Viany Lizeth Miranda Marquez",
    description: "Corte de cabello",
    gasto: 100000,
    insumo: 5000,
    servicio: 20000,
    total: 100000,
    metodopago: "Efectivo",
    fecha: new Date(),
  },
  {
    id: 2,
    empleado: "Jorge Mestre Lozano",
    description: "Corte de cabello",
    gasto: 40000,
    insumo: 5000,
    servicio: 20000,
    total: 120000,
    metodopago: "Tarjeta",
    fecha: new Date(),
  },
];

const options = ["Dia", "Mes"];
const tomorrow = dayjs().add(0, "day");

export const HistoryPay = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Dia");

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns: GridColDef[] = [
    {
      field: "empleado",
      headerName: "Empleado",
      width: 200,
      editable: true,
      headerClassName: "header-grid",
    },
    {
      field: "description",
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
    },
    {
      field: "insumo",
      headerName: "Insumo",
      width: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
      type: "number",
    },
    {
      field: "servicio",
      headerName: "Servicio",
      width: 150,
      type: "number",
      align: "left",
      headerAlign: "left",
      headerClassName: "header-grid",
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,

      align: "left",
      headerAlign: "left",
    },
    {
      field: "metodopago",
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

      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
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

          {selectedOption === "Dia" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={6} sm={2}>
                <DatePicker
                  defaultValue={dayjs()}
                  format="DD-MM-YYYY"
                  maxDate={tomorrow}
                  views={["day", "month", "year"]}
                  label="Fecha"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </LocalizationProvider>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={6} sm={2}>
                <DatePicker
                  defaultValue={dayjs()}
                  maxDate={tomorrow}
                  views={["month"]}
                  label="Mes"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </LocalizationProvider>
          )}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={6} sm={2}>
              <DatePicker
                defaultValue={today}
                maxDate={tomorrow}
                views={["day", "month", "year"]}
                label="Fecha"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <DatePicker
                defaultValue={today}
                maxDate={tomorrow}
                views={["month"]}
                label="Mes"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </LocalizationProvider> */}
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
          rows={rows}
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
