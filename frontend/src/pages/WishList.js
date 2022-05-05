import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { getUserWishList, removeUserWishList } from '../redux/apiCall';
import { mobile } from '../responsive';
import DeleteIcon from '@material-ui/icons/Delete';

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
   border: 1px solid #ddd;
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

const WishList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userId = location.pathname.split('/')[2];
    useEffect(() => {
        getUserWishList(dispatch, userId)
    }, [dispatch, userId])
    const wishlist = useSelector(state => state.wishList);
    const handleRemove = (product) => {
        console.log(product);
        removeUserWishList(product.productId, wishlist.wishlistId, wishlist, dispatch)
    }

    return (
        <Container>
            <Navbar />
            <Announcement />

            <Wrapper>
                <Title>
                    Danh sách ưa thích
                </Title>

                {/* <Top>
                    <TopButton>Tiếp tục mua sắm</TopButton>

                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>

                    <TopButton type='filled'>CHECKOUT NOW</TopButton>
                </Top> */}

                <Bottom>
                    <Info>
                        {
                            wishlist.products?.map((product) => (
                                <>
                                    <Product key={product._id}>
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
                                                    {
                                                        product.productId.color?.map(color => <ProductColor color={color} />)
                                                    }
                                                </div>
                                                <ProductSize>
                                                    <b>Kích thước:</b> {product.productId.size?.join(', ')}
                                                </ProductSize>
                                                <DeleteIcon onClick={() => handleRemove(product)} style={{
                                                    cursor: 'pointer'
                                                }} />
                                            </Details>
                                        </ProductDetail>
                                    </Product>
                                    <Hr />
                                </>
                            ))
                        }
                    </Info>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default WishList
