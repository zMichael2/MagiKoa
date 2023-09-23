import { useState } from "react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModes,
  GridRowId,
} from "@mui/x-data-grid";

export const useEventsTableHistory = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [filteredRows, setFilteredRows] = useState<GridRowsProp>([]);

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

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return {
    rows,
    setRows,
    filteredRows,
    setFilteredRows,
    rowModesModel,
    setRowModesModel,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleRowModesModelChange,
  };
};
