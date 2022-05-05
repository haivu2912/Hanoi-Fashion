import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
import { useNavigate, useLocation } from 'react-router-dom'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { getUserCartProduct, handleQuantityProduct, removeUserCartProduct } from '../redux/apiCall';
import { decreaseQuantity, increaseQuantity, removeProductSuccess } from '../redux/cartRedux';
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({
    padding: '10px'
})
    }
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' ? 'none' : '1px solid black'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
    ${mobile({
    display: 'none'
})
    }
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
    flexDirection: 'column'
})
    }
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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
   width: 200px;
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

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductAmountContainer = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 20px;
`;

const ProductAmount = styled.span`
    font-size: 24px;
    margin: 0 5px;
    ${mobile({
    margin: '5px 15px'
})
    }
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({
    marginBottom: '24px'
})
    }
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
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
`;

const Input = styled.input`

`;

const Label = styled.label`

`;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    //console.log(cart);
    const dispatch = useDispatch();
    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    const [method, setMethod] = useState('');
    useEffect(() => {
        getUserCartProduct(dispatch, userId)
    }, [dispatch, userId])
    //console.log(cart.products.products[0].productId);
    //const user = useSelector(state => state.user.currentUser);
    // const [userCart, setUserCart] = useState({});
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const getUserCart = async () => {
    //         try {
    //             const res = await userRequest.get('/cart/find/' + userId);
    //             setUserCart(res.data);
    //         } catch (err) {

    //         }
    //     }
    //     getUserCart();
    // }, [userId]);

    const onToken = (token) => {
        setStripeToken(token);
    }
    //console.log(stripeToken);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: (cart.total / 20000) * 100
                })
                navigate('/success', {
                    state: {
                        stripeData: res.data,
                        products: cart
                    }
                });
            } catch {

            }
        }
        stripeToken && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, navigate])

    const handleQuantity = (param, product, quantity, price) => {
        if(param === 'dec') {
            if(quantity > 1) {
                quantity -= 1;
                handleQuantityProduct(param, product, quantity, price, cart.cartId, cart, dispatch);
            }
        }else {
            if(quantity >= product.productId.quantity) {
                // quantity = product.productId.quantity;
                alert('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này');
            } else {
                quantity += 1;
                handleQuantityProduct(param, product, quantity, price, cart.cartId, cart, dispatch);
            }
        }
        // handleQuantityProduct(param, product, quantity, price, cart.cartId, cart, dispatch);
    }
    // const handleIncrease = (quantity, product) => {
    //     // quantity += 1;
    //     // dispatch(increaseQuantity({
    //     //     ...product,
    //     //     quantity
    //     // }))
    //     // dispatch(
    //     //     addProduct({
    //     //        ...cart.products,
    //     //        quantity
    //     //     })
    //     // )
    // }
    // const handleDecrease = (quantity, product) => {
    //     // if (quantity > 1) {
    //     //     quantity -= 1;
    //     // }
    //     // dispatch(decreaseQuantity({
    //     //     ...product,
    //     //     quantity
    //     // }))
    //     // dispatch(
    //     //     addProduct({
    //     //        ...cart.products,
    //     //        quantity
    //     //     })
    //     // )
    // }
    //console.log(cart);
    // const cartUpdate = {
    //     products: cart.products.map(product => product)
    // }
    //console.log(cartUpdate);
    const handleRemove = (product, price) => {
        removeUserCartProduct(product, cart.cartId, price, cart, dispatch)
        // //console.log(id);
        // dispatch(removeProductSuccess(product));
        // console.log(cart);
        // //console.log(cart.cartId);
    }
    const handleCheckout = () => {
        navigate('/shipping', {
            state: {
                products: cart
            }
        });
    }
    // const cartUpdate = {
    //     products: cart.products.map(product => product)
    // }
    // removeUserCartProduct(cart.cartId, cartUpdate)
    return (
        <Container>
            <Navbar />
            <Announcement />

            <Wrapper>
                <Title>
                    Giỏ hàng
                </Title>

                <Top>
                    <TopButton>Tiếp tục mua sắm</TopButton>

                    {/* <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts> */}

                    <TopButton type='filled'>Thanh toán</TopButton>
                </Top>

                <Bottom>
                    <Info>
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
                                                    <b>Kích thước:</b> {product.size}
                                                </ProductSize>
                                                <RemoveShoppingCartIcon onClick={() => handleRemove(product, product.quantity * product.productId.price)} style={{
                                                    cursor: 'pointer'
                                                }} />
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Remove onClick={() => handleQuantity('dec', product, product.quantity, product.productId.price)} />
                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                <Add onClick={() => handleQuantity('inc', product, product.quantity, product.productId.price)} />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                {(product.quantity * product.productId.price).toLocaleString('en')} VND
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </>
                            ))

                            // cart.products.map((product) => (
                            //     <>
                            //         <Product>
                            //             <ProductDetail>
                            //                 <Image src={product.img} />
                            //                 <Details>
                            //                     <ProductName>
                            //                         <b>Product:</b> {product.title}
                            //                     </ProductName>
                            //                     <ProductId>
                            //                         <b>ID:</b> {product._id}
                            //                     </ProductId>
                            //                     <div style={{
                            //                         display: 'flex'
                            //                     }}>
                            //                         <span><b>Màu sắc: </b></span>
                            //                         <ProductColor color={product.color} />
                            //                     </div>
                            //                     <ProductSize>
                            //                         <b>Size:</b> {product.size}
                            //                     </ProductSize>
                            //                     <RemoveShoppingCartIcon onClick={() => handleRemove(product._id, product.price * product.quantity)} style={{
                            //                         cursor: 'pointer'
                            //                     }}/>
                            //                 </Details>
                            //             </ProductDetail>
                            //             <PriceDetail>
                            //                 <ProductAmountContainer>
                            //                     <Remove onClick={() => handleQuantity('dec', product.quantity, product._id)}/>
                            //                     <ProductAmount>{product.quantity}</ProductAmount>
                            //                     <Add onClick={() => handleQuantity('inc', product.quantity, product._id)}/>
                            //                 </ProductAmountContainer>
                            //                 <ProductPrice>
                            //                     $ {product.price * product.quantity}
                            //                 </ProductPrice>
                            //             </PriceDetail>
                            //         </Product>
                            //         <Hr />
                            //     </>
                            // ))
                        }
                    </Info>

                    <Summary>
                        <SummaryTitle>
                            Thanh toán
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Giá</SummaryItemText>
                            <SummaryItemText>{cart.total.toLocaleString('en')} VND</SummaryItemText>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>VAT</SummaryItemText>
                            <SummaryItemPrice>8 %</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Giá</SummaryItemText>
                            <SummaryItemPrice>{(cart.total + cart.total * 0.08).toLocaleString('en')} VND</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Phương thức thanh toán</SummaryItemText>
                            <div onChange={e => setMethod(e.target.value)}>
                                <Input
                                    type="radio"
                                    value="off"
                                    id="off"
                                    name="payment"
                                ></Input>
                                <Label>Thanh toán khi nhận hàng</Label>
                                <br />
                                <Input
                                    type="radio"
                                    value="onl"
                                    id="onl"
                                    name="payment"
                                ></Input>
                                <Label>Thanh toán online</Label>
                            </div>
                        </SummaryItem>
                        {
                            method === 'off'
                                ?
                                <Button onClick={handleCheckout}>Thanh toán</Button>
                                :
                                <StripeCheckout
                                    name='Hanoi Fashion'
                                    image='https://avatars.githubusercontent.com/u/1486366?v=4'
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is ${((cart.total + cart.total * 0.08) / 20000)}`}
                                    amount={((cart.total + cart.total * 0.08) / 20000) * 100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button>Thanh toán</Button>
                                </StripeCheckout>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
