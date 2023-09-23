import { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { Button, SelectChangeEvent } from "@mui/material";
import { ContainerTablePay } from "./containers/ContainerTablePay";
import { useEventsTableHistory } from "../../../hooks/useEventsTableHistory";

import { getPayments } from "../../../services/Get";
import { deletePayment } from "../../../services/Delete";
import { putPayment } from "../../../services/Put";

import { options } from "../../../constants";

export const HistoryPay: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

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

  const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
    const {
      target: { value },
    } = event;
    setSelectedOption(value);
    setFilteredRows([]);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deletePayment(String(id));
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
      gasto: +newRow.gasto,
      insumo: +newRow.insumo,
      servicio: +newRow.servicio,
      typePay: newRow.tipo_pago,
      date: newRow.fecha,
    };
    await putPayment(data, newRow.id);

    const total =
      Number(newRow.insumo) + Number(newRow.servicio) - Number(newRow.gasto);

    return { ...updatedRow, total };
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

  useEffect(() => {
    const fetchListHistoryPay = async () => {
      const resp = await getPayments();
      setFilteredRows(resp);
      setRows(resp);
    };
    fetchListHistoryPay();

    return () => {
      setFilteredRows([]);
      setRows([]);
    };
  }, []);

  return (
    <ContainerTablePay
      rows={rows}
      setFilteredRows={setFilteredRows}
      handleChangeSelected={handleChange}
      options={options}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    >
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
    </ContainerTablePay>
  );
};
