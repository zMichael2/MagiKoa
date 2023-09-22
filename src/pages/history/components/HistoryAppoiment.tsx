import { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import { Button, Box, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DatePicker } from "@mui/x-date-pickers";
import { getAppoiment } from "../../../services/Get";
import { deleteAppoiment } from "../../../services/Delete";
import { putAppoiment } from "../../../services/Put";

const tomorrow = dayjs().add(0, "day");

export const HistoryAppoiment = () => {
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

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const response = await deleteAppoiment(String(id));
    console.log(response);
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
      nameClient: newRow.usuario,
      phone: newRow.celular,
      date: dayjs(newRow.fecha).format("DD/MM/YYYY"),
      hour: newRow.hora,
    };

    await putAppoiment(data, newRow.id);

    return updatedRow;
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
    { field: "usuario", headerName: "Cliente", width: 182, editable: true },
    {
      field: "celular",
      headerName: "Celular",
      width: 100,
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
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      editable: true,
      type: "date",
      headerClassName: "header-grid",
      valueFormatter: (params) =>
        typeof params.value === "object"
          ? new Date(params.value).toLocaleString("es-CO", {
              dateStyle: "medium",
            })
          : params.value,
    },
    {
      field: "hora",
      headerName: "Hora",
      width: 100,
      editable: true,
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
      const resp = await getAppoiment();

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
        <h1 className="font-bold text-2xl">Historial de citas</h1>
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <Button
            onClick={() => setFilteredAppoiment(rows)}
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

                  const productosFiltrados = rows.filter(
                    (row) => row.fecha === newDate
                  );

                  if (newDate !== "") {
                    if (productosFiltrados.length) {
                      setFilteredAppoiment(productosFiltrados);
                    } else {
                      setFilteredAppoiment([]);
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
