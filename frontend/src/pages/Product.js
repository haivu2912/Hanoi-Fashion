import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { createUserCartProduct, addUserCartProduct, createUserWishList, addUserWishList } from '../redux/apiCall';
import { addProductSuccess } from '../redux/cartRedux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    padding: 50px;
    ${mobile({
    padding: '10px',
    flexDirection: 'column'
})
    }
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 80%;
    height: 80vh;
    object-fit: cover;
    ${mobile({
    width: '100%',
    height: '35vh'
})
    }
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({
    padding: '10px',
})
    }
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 50px 0;
    ${mobile({
    width: '100%'
})
    }
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`

`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    ${mobile({
    width: '100%'
})
    }
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const Button = styled.button`
    width: 45%;
    margin-top: 15px;
    padding: 15px;
    border: none;
    /* border: 1px solid teal; */
    background-color: teal;
    color: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
    margin-left: 20px;

    &:hover{
        background-color: white;
        color: teal;
        border: 1px solid teal;
    }
`;

const ReviewArea = styled.textarea`
    border: 1px solid rgba(0, 0, 0, 0.082);
    margin: 10px 0;
    outline: none;
    padding: 10px;
    font-weight: 300;
    resize: none;
`;

const WrapperComment = styled.div`

`;

const H1Comment = styled.h1`
    text-align: center;
    font-weight: 400;
`;

const RatingInfo = styled.div`
    display: flex;
    align-items: center;
`;

const RatingCount = styled.span`
    margin-left: 20px;
`;

const Comment = styled.div`
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Star = styled.p`
    margin-left: 5px;
`;

const Content = styled.div`

`;

const Time = styled.p``
const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('Black');
    const [size, setSize] = useState('XL');
    const user = useSelector(state => state.user.currentUser);
    const cartInfo = useSelector(state => state.cart);
    const cartId = cartInfo.cartId;
    const cartProduct = cartInfo.products;
    const userId = cartInfo.userId;
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const wishlistInfo = useSelector(state => state.wishList);
    //const reviews = useSelector(state => state.review.reviews);
    let avg = 0;
    // const cartUpdate = {
    //     products: cartInfo.products.map(product => product)
    // }
    const dispatch = useDispatch();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get('/product/find/' + id);
                setProduct(res.data);
            } catch (err) {

            }
        }
        getProduct();
    }, [id]);
    console.log(product);
    const handleQuantity = (param) => {
        if (param === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            if(quantity >= product.quantity) {
                // setQuantity(product.quantity);
                alert('Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này');
            }
            else{
                setQuantity(quantity + 1);
            }
        }
    }
    // const submitReviewToggle = () => {
    //     open ? setOpen(false) : setOpen(true);
    // };

    // const handleSubmitReview = async () => {
    //     const review = {
    //         userId: user._id,
    //         rating: rating,
    //         comment: comment
    //     }
    //     product.reviews.push(review);
    //     try {
    //         const res = await userRequest.patch(`/product/update/${id}`, product);
    //         setOpen(false);
    //         console.log(res.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    product?.reviews?.forEach((rev) => {
        avg += rev.rating;
    });

    const handleAdd = () => {
        if(product.quantity > 0) {
            const cart = {
                userId: user,
                products: {
                    productId: product,
                    quantity,
                    color,
                    size,
                }
            }
            if(user === null ) {
                alert('Bạn cần đăng nhập');
            }else {
                // const newQuantity = product.quantity - cart.products.quantity;
                // const handleProductQuantity = async () => {
                //     try {
                //         const res = await publicRequest.patch(`/product/update/${id}`, {
                //             quantity: newQuantity
                //         });
                //         setProduct(res.data);
                //     } catch (err) {
    
                //     }
                // }
                // handleProductQuantity();
                if(cartInfo.cartId === '') {
                    console.log(cart);
                    createUserCartProduct(cart, dispatch);
                }else {
                    addUserCartProduct(cartId, cart, cartInfo.products, dispatch);
                }
            }
        } else {
            alert('Sản phẩm hiện không có sẵn');
        }
    }

    const handleAddWishList = () => {
        const wishlist = {
            userId: user,
            products: {
                productId: product
            }
        }
        if(user === null) {
            alert('bạn cần đăng nhập');
        }else {
            if(wishlistInfo.wishlistId === '') {
                createUserWishList(wishlist, dispatch);
            }else {
                addUserWishList(wishlistInfo.wishlistId, wishlist, wishlistInfo.products, dispatch);
            }
        }
    }
    return (
        <Container>
            <Announcement />
            <Navbar />

            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>

                <InfoContainer>
                    <Title>
                        {product.title}
                    </Title>

                    <Desc>
                        {product.desc}
                    </Desc>
                    <Desc>
                       {
                           product.quantity > 0 ?  `${product.quantity} sản phẩm có sẵn` : 'Hết hàng' 
                       }
                    </Desc>
                    <Desc>
                        {
                            `Đã bán ${product.sold}`
                        }
                    </Desc>
                    <RatingInfo>
                        {
                            product.reviews?.length > 0
                                ?
                                <>
                                    <Rating name="half-rating-read" value={avg / product.reviews?.length} precision={0.5} readOnly />
                                    <RatingCount>
                                        {product.reviews?.length} đánh giá
                                    </RatingCount>
                                </>
                                :
                                <span>
                                    Chưa có đánh giá
                                </span>
                        }
                    </RatingInfo>
                    <Price>
                        {product.price?.toLocaleString('en')} VND
                    </Price>

                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Màu sắc:</FilterTitle>
                            {product.color?.map(color => (
                                <FilterColor key={color} color={color} onClick={
                                    () => setColor(color)
                                } />
                            ))}
                        </Filter>

                        <Filter>
                            <FilterTitle>Kích thước:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map(size => (
                                    <FilterSizeOption key={size}>
                                        {size}
                                    </FilterSizeOption>
                                ))}
                            </FilterSize>

                        </Filter>
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity('dec')} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('inc')} />
                        </AmountContainer>
                    </AddContainer>
                    <Button onClick={() => handleAdd()}>Thêm vào giỏ hàng</Button>
                    <Button style={{
                        backgroundColor: '#ccc',
                        color: '#000'
                    }} onClick={() => handleAddWishList()}>Để xem sau</Button>
                </InfoContainer>
                {/* <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Rating
                            value={rating}
                            size="large"
                            precision={0.5}
                            onChange={e => setRating(e.target.value)}
                            name="rating"
                        />

                        <ReviewArea
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        ></ReviewArea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitReview} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </Wrapper>

            <WrapperComment>
                <H1Comment>
                    Đánh giá
                </H1Comment>
                {
                    product.reviews?.map(rv => (
                        <Comment key={rv._id}>
                            <Header>
                                <Avatar style={{
                                    width: '30px',
                                    height: '30px'
                                }}>
                                    {user?.username.charAt(0)}
                                </Avatar>
                                <Star>
                                    <Typography component="legend">{rv.userId.username}</Typography>
                                    <Rating style={{
                                        fontSize: '18px'
                                    }} name="half-rating-read" defaultValue={rv.rating} precision={0.5} readOnly />
                                </Star>
                            </Header>
                            <Content>
                                {rv.comment}
                            </Content>
                        </Comment>
                    ))
                }
            </WrapperComment>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
