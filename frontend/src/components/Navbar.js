import { Badge } from '@material-ui/core'
import { AccountCircle, ExitToApp, FavoriteBorderOutlined, Search, ShoppingBasket, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { useNavigate } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logoutCart } from '../redux/cartRedux';
import { logoutWishList } from '../redux/wishListRedux';
import { logoutOrder } from '../redux/orderRedux';
import { publicRequest } from '../requestMethod';
const Container = styled.div`
    height: 60px;
    ${mobile({
    height: '50px',
    marginBottom: '20px'
})
    }
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    padding: '10px 0'
})
    }
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
    justifyContent: 'center',
    flex: 2
})
    }
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
    display: 'none'
})
    }
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({
    width: '50px'
})
    }
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({
    fontSize: '18px',
    marginLeft: '30px'
})
    }
`

const MyMenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({
    fontSize: '12px',
    marginLeft: '10px'
})
    }
`

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishList);
    const user = useSelector(state => state.user.currentUser);
    const order = useSelector(state => state.order);
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch(logout(user));
        dispatch(logoutCart(cart));
        dispatch(logoutWishList(wishlist));
        dispatch(logoutOrder(order))
        navigate('/');
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = async () => {
        try {
            const res = await publicRequest.get(`/product/search?name=${input}`);
            console.log(res.data);
            navigate('/productsSearch', {
                state: {
                    products: res.data,
                    input: input
                }
            });
            // if(res.data[0]._id !== '') {
            //     console.log(res.data);
            //     //navigate(`/product/${res.data[0]._id}`);
            // }else {
            //     //alert('Không có sản phẩm này');
            // }
        }catch(err) {
            
        }
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    {/* <Language>ENG</Language> */}
                    <SearchContainer>
                        <Input placeholder='Tìm kiếm' onChange={e => setInput(e.target.value)}/>
                        <Search style={{ 
                            color: "gray", 
                            fontSize: 16,
                            cursor: 'pointer'
                        }} 
                        onClick={handleSearch}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to='/' style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <Logo>
                            Hanoi Fashion.
                        </Logo>
                    </Link>
                </Center>
                <Right>
                    {
                        user ?
                            <>
                                <Avatar style={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer'
                                }} onClick={handleClick}>
                                    {user.username.charAt(0)}
                                </Avatar>
                                <MyMenuItem style={{ marginLeft: '10px' }}>{user.username}</MyMenuItem>
                                <Menu style={{
                                    marginTop: '45px'
                                }}
                                    id='navbar-menu'
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <Link to='/myInfo' style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}>
                                        <MenuItem>
                                            <AccountCircle style={{
                                                fontSize: '18px',
                                                marginRight: '8px'
                                            }} />
                                            Thông tin
                                        </MenuItem>
                                    </Link>
                                    <Link to='/myOrder' style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}>
                                        <MenuItem>
                                            <ShoppingBasket style={{
                                                fontSize: '18px',
                                                marginRight: '8px'
                                            }} />
                                            Đặt hàng
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={handleLogout}>
                                        <ExitToApp style={{
                                            fontSize: '16px',
                                            marginRight: '10px'
                                        }} />
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                            </>
                            :
                            <>
                                <Link to='/register' style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}>
                                    <MyMenuItem>
                                        Đăng ký
                                    </MyMenuItem>
                                </Link>
                                <Link to='/login' style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}>
                                    <MyMenuItem>
                                        Đăng nhập
                                    </MyMenuItem>
                                </Link>
                            </>
                    }

                    {
                        user ?
                            <>
                                <Link to={`/wishlist/${user._id}`}>
                                    <MenuItem>
                                        <Badge badgeContent={
                                            wishlist?.userId === user._id
                                                ?
                                                wishlist.quantity
                                                :
                                                0
                                        } color="primary">
                                            <FavoriteBorderOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link>

                                <Link to={`/cart/${user._id}`}>
                                    <MenuItem>
                                        <Badge badgeContent={
                                            cart?.userId === user._id
                                                ?
                                                cart.quantity
                                                :
                                                0
                                        } color="primary">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link>
                            </>
                            :
                            ''
                    }

                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
