import './App.css';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Home from './pages/Home'
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';
import Order from './pages/Order';
import ConfirmOrder from './pages/ConfirmOrder';
import Success2 from './pages/Success2';
import MyInfo from './pages/MyInfo';
import MyOrder from './pages/MyOrder';
import MyDetailOrder from './pages/MyDetailOrder';
import ProductSearchList from './pages/ProductSearchList';

import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


const App = () => {
  const user = useSelector(state => state.user.currentUser);
  // const {password, ...others} = useSelector(state => state.newUser.newUser);

  // console.log(others);
  return (
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/products/:category' element={<ProductList/>}/>
            <Route path='/productsSearch' element={<ProductSearchList/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/cart/:userId' element={<Cart/>}/>
            <Route path='/wishlist/:userId' element={<WishList/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/login' element={
              user ? <Navigate to='/'/> : <Login/>
            }/>
            {/* {user ? <Route path='/login' element={<Home/>}/> : <Route path='/login' element={<Login/>}/>} */}
            {/* <Route path='/register' element={
              others ? <Navigate to='/login'/> : <Register/>
            }/> */}
            <Route path='/register' element={<Register/>}/>
            <Route path='/shipping' element={<Order/>}/>
            <Route path='/confirm' element={<ConfirmOrder/>}/>
            <Route path='/successOff' element={<Success2/>}/>
            <Route path='/myInfo' element={<MyInfo/>}/>
            <Route path='/myOrder' element={<MyOrder/>}/>
            <Route path='/myDetailOrder/:id' element={<MyDetailOrder/>}/>
          </Routes>
        </Router>
  )
}

export default App;
