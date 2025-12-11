import { Badge } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import Showcase from "./pages/Showcase";
import ButtonsDemo from "./pages/demos/buttondemo";
import Homepage from "./pages/Homepage";
// import InputsDemo from "./components/demo/InputsDemo";
// import FormsDemo from "./components/demo/FormsDemo";
// import DialogDemo from "./components/demo/DialogDemo";
// import MenusDemo from "./components/demo/MenusDemo";
// import CardsDemo from "./components/demo/CardsDemo";
// import TablesDemo from "./components/demo/TablesDemo";
// import AlertsDemo from "./components/demo/AlertsDemo";
// import TabsDemo from "./components/demo/TabsDemo";
import SidebarDemo from "./pages/demos/Sidebar-demo";
import DialogDemo from "./pages/demos/Dialog-demo";
import FormDemo from "./pages/demos/Form-demo";
import DataDisplayDemo from "./pages/demos/Data-display-demo";
import FragmentsDemo from "./pages/demos/Fragments-demo";
import { Test } from "./pages/demos/test";
export default function App() {
  return ( 
    <div>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Showcase />} /> 
          <Route path="/demo/buttons" element={ <ButtonsDemo /> } />
          <Route path="/demo/sidebar" element={ <SidebarDemo /> } />
          <Route path="/demo/dialog" element={ <DialogDemo /> } />
          <Route path="/demo/form" element={ <FormDemo /> } />
          <Route path="/demo/data-display" element={ <DataDisplayDemo /> } />
          <Route path="/demo/fragments" element={ <FragmentsDemo /> } />
          <Route path="/demo/test" element={ <Test /> } />
        {/* <Route path="/" element={<Showcase />} />
        
        <Route path="/demo/inputs" element={<InputsDemo />} />
        <Route path="/demo/forms" element={<FormsDemo />} />
        <Route path="/demo/dialogs" element={<DialogDemo />} />
        <Route path="/demo/menus" element={<MenusDemo />} />
        <Route path="/demo/cards" element={<CardsDemo />} />
        <Route path="/demo/tables" element={<TablesDemo />} />
        <Route path="/demo/alerts" element={<AlertsDemo />} />
        <Route path="/demo/tabs" element={<TabsDemo />} /> */}
      </Routes>
      </BrowserRouter>
   </div>
  );
}
