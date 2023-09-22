import { Dayjs } from "dayjs";

export interface FormDataPayment {
  employee: string;
  nameClient: string;
  gasto: number;
  insumo: number;
  servicio: number;
  typePay: string;
  date: Dayjs | null | string;
  description: string;
}
