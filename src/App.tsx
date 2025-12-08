import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showcase from "./pages/Showcase";

import ButtonsDemo from "./components/demo/ButtonsDemo";
import InputsDemo from "./components/demo/InputsDemo";
import FormsDemo from "./components/demo/FormsDemo";
import DialogDemo from "./components/demo/DialogDemo";
import MenusDemo from "./components/demo/MenusDemo";
import CardsDemo from "./components/demo/CardsDemo";
import TablesDemo from "./components/demo/TablesDemo";
import AlertsDemo from "./components/demo/AlertsDemo";
import TabsDemo from "./components/demo/TabsDemo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/demo/buttons" element={<ButtonsDemo />} />
        <Route path="/demo/inputs" element={<InputsDemo />} />
        <Route path="/demo/forms" element={<FormsDemo />} />
        <Route path="/demo/dialogs" element={<DialogDemo />} />
        <Route path="/demo/menus" element={<MenusDemo />} />
        <Route path="/demo/cards" element={<CardsDemo />} />
        <Route path="/demo/tables" element={<TablesDemo />} />
        <Route path="/demo/alerts" element={<AlertsDemo />} />
        <Route path="/demo/tabs" element={<TabsDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
