import { useEffect } from "react";
import {
  GridRowModes,
  GridRowId,
  GridRowModel,
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Button } from "@mui/material";

import { getAppoiment } from "../../../services/Get";
import { deleteAppoiment } from "../../../services/Delete";
import { putAppoiment } from "../../../services/Put";
import { ContainerTableAppoiment } from "./containers/ContainerTableAppoiment";
import { useEventsTableHistory } from "../../../hooks/useEventsTableHistory";

export const HistoryAppoiment: React.FC = () => {
  const {
    filteredRows,
    handleCancelClick,
    handleEditClick,
    handleRowEditStop,
    handleRowModesModelChange,
    handleSaveClick,
    rowModesModel,
    rows,
    setFilteredRows,
    setRowModesModel,
    setRows,
  } = useEventsTableHistory();

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deleteAppoiment(String(id));
    setFilteredRows(filteredRows.filter((row) => row.id !== id));
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setFilteredRows(
      rows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );

    const data = {
      employee: newRow.empleado_id,
      description: newRow.descripcion,
      nameClient: newRow.usuario,
      phone: newRow.celular,
      date: newRow.fecha,
      hour: newRow.hora,
    };

    await putAppoiment(data, newRow.id);

    return updatedRow;
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
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
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
    const fetchListHistoryAppoiment = async () => {
      const resp = await getAppoiment();

      setFilteredRows(resp);
      setRows(resp);
    };
    fetchListHistoryAppoiment();

    return () => {
      setFilteredRows([]);
      setRows([]);
    };
  }, []);

  return (
    <>
      <ContainerTableAppoiment rows={rows} setFilteredRows={setFilteredRows}>
        <DataGrid
          style={{ height: "100%" }}
          rows={filteredRows}
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
      </ContainerTableAppoiment>
    </>
  );
};
