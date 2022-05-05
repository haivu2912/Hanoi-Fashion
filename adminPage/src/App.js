import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import StaffList from "./pages/staffList/StaffList";
import Staff from "./pages/staff/Staff";
import Login from "./pages/login/Login";
import NewStaff from "./pages/newStaff/NewStaff";
import Receive from "./pages/receive/Receive";
import ReceiveList from "./pages/receiveList/ReceiveList";
import ReceiveProduct from "./pages/receiveProduct/ReceiveProduct";
import NewReceiveProduct from "./pages/newReceiveProduct/NewReceiveProduct";
import NewReceive from "./pages/newReceive/NewReceive";
import OrderList from "./pages/orderList/OrderList";
import ReportList from "./pages/reportList/ReportList";
import ReceiveToProduct from "./pages/receiveToProduct/ReceiveToProduct";
import Statstical from "./pages/statstical/Stastical";

function App() {
  const admin = JSON.parse(
    JSON.parse(
      localStorage.getItem("persist:root"))?.user
  ).currentUser?.isAdmin
  console.log(admin);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/staffs">
                <StaffList />
              </Route>
              <Route path="/staff/:staffId">
                <Staff/>
              </Route>
              <Route path="/newStaff">
                <NewStaff/>
              </Route>
              <Route path="/receives">
                <ReceiveList/>
              </Route>
              <Route path="/receive/:receiveId">
                <Receive/>
              </Route>
              <Route path="/receiveProduct/:productId">
                <ReceiveProduct/>
              </Route>
              <Route path="/:receiveId/newReceiveProduct">
                <NewReceiveProduct/>
              </Route>
              <Route path="/:receiveId/addReceiveToProduct">
                <ReceiveToProduct/>
              </Route>
              <Route path="/newReceive">
                <NewReceive/>
              </Route>
              <Route path="/orders">
                <OrderList/>
              </Route>
              <Route path="/statisticals">
                <Statstical/>
              </Route>
              <Route path="/reports">
                <ReportList/>
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
