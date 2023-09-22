import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";
import { FormDataPayment } from "../../interfaces";

export const postPayment = async ({
  employee,
  description,
  gasto,
  insumo,
  servicio,
  typePay,
  date,
}: FormDataPayment) => {
  try {
    const data = {
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

    const response = await fetch(`${BASE_URL}/register/payment`, options);
    if (response.status == 200) {
      return toast.success("Creacion del registro exitoso");
    }
    return toast.error("Ha ocurrido un error");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
