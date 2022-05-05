import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";

const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/order/create", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        color: item.color,
                        size: item.size
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                    status: "thanh toán online"
                });
                setOrderId(res.data._id);
            } catch {

            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
    );
};

export default Success;
