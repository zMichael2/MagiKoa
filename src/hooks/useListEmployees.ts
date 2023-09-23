import { useEffect, useState } from "react";
import { getEmployees } from "../services/Get";

interface IListEmployees {
  id: string;
  nombre: string;
}

export const useListEmployees = () => {
  const [listEmployees, setListEmployees] = useState<IListEmployees[]>([]);

  useEffect(() => {
    const fetchDataEmployees = async () => {
      const resp = await getEmployees();

      setListEmployees(resp);
    };
    fetchDataEmployees();
  }, []);

  return { listEmployees };
};
