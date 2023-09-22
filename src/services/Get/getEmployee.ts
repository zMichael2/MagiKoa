import { toast } from "react-hot-toast";

import { BASE_URL } from "../../constants";

export const getEmployees = async () => {
  try {
    const response = await fetch(`${BASE_URL}/employees`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return toast.error("Ocurrion un error en el servidor");
  }
};
