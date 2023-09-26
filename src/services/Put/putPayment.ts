import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";
import { Dayjs } from "dayjs";

interface IPutPayment {
  employee: string;
  gasto: number;
  insumo: number;
  servicio: number;
  typePay: string;
  date: Dayjs | null | string;
  description: string;
}

export const putPayment = async (
  {
    employee,
    gasto,
    insumo,
    servicio,
    typePay,
    date,
    description,
  }: IPutPayment,
  id: string
) => {
  try {
    const data = {
      id,
      empleado_id: employee,
      descripcion: description,
      gasto: gasto,
      insumo: insumo,
      servicio: servicio,
      tipo_pago: typePay,
      fecha: date,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/update/payment`, options);
    if (response.status == 200) {
      toast.success("Modificacion del registro exitoso");
      return await response.json();
    }
    return toast.error("Ha ocurrido un error");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
