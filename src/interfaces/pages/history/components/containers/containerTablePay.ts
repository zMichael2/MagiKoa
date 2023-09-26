import { SelectChangeEvent } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";

import { IContainerTableHistory } from "../containers/containerTableHistory";

export interface IContainerTablePay extends IContainerTableHistory {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleChangeSelected: (event: SelectChangeEvent<string>) => void;
  options: string[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
}
