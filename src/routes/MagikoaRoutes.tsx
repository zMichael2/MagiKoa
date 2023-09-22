import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "../pages/main/Main";
import RegisterAppoiment from "../pages/register/RegisterAppoiment";
import RegisterPayment from "../pages/register/RegisterPayment";
import History from "../pages/history/History";
import { ToasterProvider } from "../providers/ToasterProvider";

export default function MagiKoaRoutes() {
  return (
    <BrowserRouter>
      <ToasterProvider />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registerAppoiment" element={<RegisterAppoiment />} />
        <Route path="/registerPayment" element={<RegisterPayment />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
