import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CheckoutStep from '../components/CheckoutStep'
import { mobile } from '../responsive';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethod';

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px 100px;
    ${mobile({
    padding: '10px'
})
    }
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const H2 = styled.h2`
    font-weight: 500;
`;

const Right = styled.div`
    flex: 1;
`;

const ShippingContainer = styled.div`
    margin-bottom: 10px;
`;

const ShippingInfo = styled.div`
    padding: 10px;
`;

const CartInfo = styled.div`
    margin-top: 10px;
`;

const Left = styled.div`
    flex: 2;
`;



const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
    flexDirection: 'column'
})
    }
`;

const ProductDetail = styled.div`
   flex: 2;
   display: flex;
`;

const Image = styled.img`
   width: 125px;
`;

const Details = styled.div`
   padding: 20px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
`;

const ProductName = styled.span`
   
`;

const ProductId = styled.div`
   
`;

const ProductColor = styled.span`
   width: 20px;
   height: 20px;
   border-radius: 50%;
   margin-left: 10px;
   background-color: ${props => props.color};
`;

const ProductSize = styled.span`
   
`;

const ProductQuantity= styled.span`
   
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductPrice = styled.div`
    font-size: 20px;
    font-weight: 300;
    ${mobile({
    marginBottom: '24px'
})
    }
`;

const Summary = styled.div`
    flex: 1;
    border-left: 0.5px solid lightgray;
    padding: 20px;
    height: 50vh;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
    text-align: center;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === 'total' && '500'};
  font-size: ${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span`

`;

const SummaryItemPrice = styled.span`

`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  cursor: pointer;
`;


const ConfirmOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state.products;
    const shippingInfo = location.state.shippingInfo;
    const currentUser = useSelector((state) => state.user.currentUser);
    const amountAfterVAT = cart.total + cart.total * 0.08;
    const handleConfirm = async () => {
        try {
            const res = await userRequest.post("/order/create", {
                userId: currentUser._id,
                products: cart.products.map((item) => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size
                })),
                amount: amountAfterVAT,
                address: shippingInfo,
                status: "thanh toán khi nhận hàng"
            });
            navigate('/successOff');
        } catch {

        }
    };
    return (
        <Container>
            <Navbar />
            <Announcement />
            <CheckoutStep activeStep={1} />
            <Title>
                Xác nhận đơn
            </Title>

            <Wrapper>
                <Left>
                    <ShippingContainer>
                        <H2>Thông tin giao hàng</H2>
                        <ShippingInfo>
                            <b>Tên:</b> {currentUser.username}
                        </ShippingInfo>
                        <ShippingInfo>
                            <b>Địa chỉ:</b> {shippingInfo.line1}
                        </ShippingInfo>
                        <ShippingInfo>
                            <b>Thành phố:</b> {shippingInfo.city}
                        </ShippingInfo>
                        <ShippingInfo>
                            <b>Quốc gia:</b> {shippingInfo.country}
                        </ShippingInfo>
                    </ShippingContainer>
                    <Hr />
                    <CartInfo>
                        <H2>Thông tin giỏ hàng</H2>
                        {
                            cart.products?.map((product) => (
                                <>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={product.productId.img} />
                                            <Details>
                                                <ProductName>
                                                    <b>Tên:</b> {product.productId.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>Mã:</b> {product.productId._id}
                                                </ProductId>
                                                <div style={{
                                                    display: 'flex'
                                                }}>
                                                    <span><b>Màu sắc: </b></span>
                                                    <ProductColor color={product.color} />
                                                </div>
                                                <ProductSize>
                                                    <b>Kích cỡ:</b> {product.size}
                                                </ProductSize>
                                                <ProductQuantity>
                                                    <b>Số lượng:</b> {product.quantity}
                                                </ProductQuantity>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductPrice>
                                                 {(product.quantity * product.productId.price).toLocaleString('en')} VND
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                </>
                            ))
                        }
                    </CartInfo>
                </Left>

                <Right>
                    <Summary>
                        <SummaryTitle>
                            Thanh toán
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Tổng</SummaryItemText>
                            <SummaryItemText>{cart.total} VND</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>VAT</SummaryItemText>
                            <SummaryItemPrice>8 %</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Tổng tiền</SummaryItemText>
                            <SummaryItemPrice>{amountAfterVAT.toLocaleString('en')} VND</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={handleConfirm}>Xác nhận</Button>
                    </Summary>
                </Right>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default ConfirmOrder
