import { Favorite, FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { addUserCartProduct, addUserWishList, createUserCartProduct, createUserWishList, removeUserWishList } from '../redux/apiCall';
import { mobile } from '../responsive';

const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }

    ${mobile({
    minWidth: '280px',
    height: '350px'
})
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 1;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({ item }) => {
    const wishlist = useSelector(state => state.wishList);
    const user = useSelector(state => state.user.currentUser);
    const cartInfo = useSelector(state => state.cart);
    const cartId = cartInfo.cartId;
    const wishlistInfo = useSelector(state => state.wishList);
    const dispatch = useDispatch();

    const handleAddToCart = item => {
        //console.log(item);
        const cart = {
            userId: user,
            products: {
                productId: item,
                quantity: 1,
                color: 'Black',
                size: 'XL',
            }
        }
        //console.log(cart);
        if(user === null ) {
            alert('Bạn cần đăng nhập');
        } else {
            if(cartId === undefined) {
                createUserCartProduct(cart, dispatch);
            }else {
                addUserCartProduct(cartId, cart, cartInfo.products, dispatch);
            }
        }
    }

    const handleWishList = (param, item) => {
        //console.log(item, wishlistInfo);
        const wishlist = {
            userId: user,
            products: {
                productId: item
            }
        }
        if(user === null) {
            alert('Bạn cần đăng nhập');
        } else {
            if(param === 'add') {
                if(wishlistInfo.wishlistId === undefined) {
                    createUserWishList(wishlist, dispatch);
                }else {
                    addUserWishList(wishlistInfo.wishlistId, wishlist, wishlistInfo.products, dispatch);
                }
            } else {
                removeUserWishList(item, wishlistInfo.wishlistId, wishlistInfo, dispatch)
            }
        }
    }

    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon onClick={() => handleAddToCart(item)}>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ color: 'black' }}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                {
                    wishlist.products.find(product => product.productId._id === item._id)
                        ?
                        <Icon onClick={() => handleWishList('remove', item)}>
                            <Favorite style={{
                                color: '#ed4956'
                            }} />
                        </Icon>
                        :
                        <Icon onClick={() => handleWishList('add', item)}>
                            <FavoriteBorderOutlined/>
                        </Icon>
                }
            </Info>
        </Container>
    )
}

export default Product
