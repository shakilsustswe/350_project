import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ProductsList from "./pages/ProductsList";
import PurchaseProduct from "./pages/PurchaseProduct";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import AddSupplier from "./pages/AddSupplier";
import ViewSupplier from "./pages/ViewSupplier";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import IncomeReport from "./pages/IncomeReport";
import SaleReport from "./pages/SaleReport";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import ShowInvoice from "./pages/ShowInvoice";
import Login from "./pages/Login";
function App() {
  //<Route path="*" element={<> not found</>} />
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/purchase-product" element={<PurchaseProduct />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/view" element={<ViewEmployee />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/supplier/view" element={<ViewSupplier />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/report/income-report" element={<IncomeReport />} />
          <Route path="/report/sale-report" element={<SaleReport />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/showinvoice/:invoice_id" element={<ShowInvoice />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
