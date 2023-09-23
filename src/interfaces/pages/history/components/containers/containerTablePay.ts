import { SelectChangeEvent } from "@mui/material";
import { IContainerTableHistory } from "../containers/containerTableHistory";

export interface IContainerTablePay extends IContainerTableHistory {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleChangeSelected: (event: SelectChangeEvent<string>) => void;
  options: string[];
}
