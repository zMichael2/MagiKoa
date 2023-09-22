import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";
import { FormData } from "../../interfaces";

export const putAppoiment = async (
  { employee, description, nameClient: user, phone, date, hour }: FormData,
  id: string
) => {
  try {
    const data = {
      id,
      empleado_id: employee,
      descripcion: description,
      usuario: user,
      celular: phone,
      fecha: date,
      hora: hour,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/update/appointment`, options);
    if (response.status == 200) {
      return toast.success("Modificacion del registro exitoso");
    }
    return toast.error("Ha ocurrido un error");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
