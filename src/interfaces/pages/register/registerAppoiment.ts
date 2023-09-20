import { Dayjs } from "dayjs";

export type FormData = {
  employee: string;
  nameClient: string;
  phone: string;
  date: Dayjs | null | string;
  hour: Dayjs | null | string;
  description: string;
};
