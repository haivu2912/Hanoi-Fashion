import styled from 'styled-components';
import { HomeOutlined, LocationCity, Public } from '@material-ui/icons'
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import CheckoutStep from '../components/CheckoutStep';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethod';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    margin-top: 30px;
`;

const H2 = styled.h2`
    width: 15%;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    margin-bottom: 15px;
    font-weight: 300;
`;

const Input = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 15px 0;
    width: 20%;
    border: 1px solid rgba(0, 0, 0, 0.205);
    padding: 10px 0;
    border-radius: 3px;
`;

const InputContent = styled.input`
    border: none;
    outline: none;
    margin-left: 15px;
    width: 80%;
`;

const Button = styled.button`
    padding: 20px;
    background-color: teal;
    color: white;
    font-weight: 600;
    border: none;
    width: 20%;
    cursor: pointer;

    /* &:hover {
        background-color: #0000
    } */
`;

const Order = () => {
    const location = useLocation();
    const cart = location.state.products;
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [inputs, setInputs] = useState({})
    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleContinue = /*async*/ () => {
        if (inputs.line1 === '' || inputs.city === '' || inputs.country === '') {
            alert('Hãy điền đầy đủ thông tin');
        } else {
            navigate('/confirm', {
                state: {
                    shippingInfo: inputs,
                    products: cart
                }
            });
        }
        // try {
        //     const res = await userRequest.post("/order/create", {
        //         userId: currentUser._id,
        //         products: cart.products.map((item) => ({
        //             productId: item.productId._id,
        //             quantity: item.quantity,
        //             color: item.color,
        //             size: item.size
        //         })),
        //         amount: cart.total,
        //         address: inputs,
        //         status: "thanh toán khi nhận hàng"
        //     });
        //     // setOrderId(res.data._id);
        // } catch {

        // }
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <CheckoutStep activeStep={0} />
            <OrderInfo>
                <H2>Thông tin giao hàng</H2>
                <Input>
                    <HomeOutlined />
                    <InputContent
                        type="text"
                        placeholder="Address"
                        required
                        name='line1'
                        onChange={handleChange}
                    />
                </Input>
                <Input>
                    <LocationCity />
                    <InputContent
                        type="text"
                        placeholder="City"
                        required
                        name='city'
                        onChange={handleChange}
                    />
                </Input>
                <Input>
                    <Public />
                    <InputContent
                        type="text"
                        placeholder="Country"
                        required
                        name='country'
                        onChange={handleChange}
                    />
                </Input>
                <Button onClick={handleContinue}>Tiếp</Button>
            </OrderInfo>
        </Container>
    )
}

export default Order