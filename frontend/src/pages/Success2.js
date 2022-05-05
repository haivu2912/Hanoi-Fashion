import CheckoutStep from "../components/CheckoutStep";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from '../components/Newsletter';
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAfterOrder, updateUserCartProductAfterOrder } from "../redux/apiCall";
import { Link } from "react-router-dom";

const Success2 = () => {
    // const [products, setProducts] = useState([]);
    const cart = useSelector(state => state.cart.products);
    const cartId = useSelector(state => state.cart.cartId);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             const res = await publicRequest.get('/product');
    //             setProducts(res.data);
    //         } catch {

    //         }
    //     }
    //     getProduct();
    // }, []);
    
    const handleUpdate = () => {
        updateProductAfterOrder(cart);
        updateUserCartProductAfterOrder(cartId, dispatch);    
        // try {
        //     const res = await publicRequest.patch('/product/updateProduct', cart);
        //     console.log(res.data);
        // } catch {

        // }
    }

    return (
        <>
            <Navbar/>
            <Announcement/>
            <CheckoutStep activeStep={2} />
            <div
                style={{
                    height: "25vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Successfull. Your order is being prepared...
                <Link to={'/'}>
                    <button style={{ padding: 10, marginTop: 20 }} onClick={handleUpdate}>Go to Homepage</button>
                </Link>
            </div>
            <Newsletter/>
            <Footer/>
        </>
    );
};

export default Success2;
