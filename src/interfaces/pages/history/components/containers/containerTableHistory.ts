import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";

export interface IContainerTableHistory {
  children: JSX.Element | JSX.Element[];
  rows: GridRowsProp;
  setFilteredRows: React.Dispatch<
    React.SetStateAction<readonly GridValidRowModel[]>
  >;
}
