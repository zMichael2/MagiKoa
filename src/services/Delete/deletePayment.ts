import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";

export const deletePayment = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/payment/${id}`);

    if (response.status == 200) {
      return toast.success("Se ha eliminado el registro de pago correctamente");
    }

    return toast.error("No se ha podido eliminar el pago");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
