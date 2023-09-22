import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";

export const getAppoiment = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Appointments`);
    const data = await response.json();
    if (response.status == 200) {
      return data;
    }
    return [];
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrion un error en el servidor");
  }
};
