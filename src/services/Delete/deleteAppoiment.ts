import { toast } from "react-hot-toast";
import { BASE_URL } from "../../constants";

export const deleteAppoiment = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/appointment/${id}`);

    if (response.status == 200) {
      return toast.success("Se ha eliminado la cita correctamente");
    }
    return toast.error("No se ha podido eliminar la cita");
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrio un error en el servidor");
  }
};
