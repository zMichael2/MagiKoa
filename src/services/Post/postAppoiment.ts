import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";
import { FormData } from "../../interfaces/pages/register/registerAppoiment";

export const postAppoiment = async ({
  employee,
  description,
  nameClient: user,
  phone,
  date,
  hour,
}: FormData) => {
  try {
    console.log("aca");
    const data = {
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

    const response = await fetch(`${BASE_URL}/register/appointment`, options);

    if (response.status == 200) {
      return toast.success("Creacion del registro exitoso");
    }
    return toast.error("Ha ocurrido un error");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
