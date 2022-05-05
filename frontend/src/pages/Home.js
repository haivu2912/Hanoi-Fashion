import React, { useEffect } from 'react'
import Slider from '../components/Slider';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartProduct, getUserWishList } from '../redux/apiCall';

const Home = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const userId = user.currentUser?._id;
    useEffect(() => {
        if(userId !== undefined) {
            getUserCartProduct(dispatch, userId);
            getUserWishList(dispatch, userId);
        }
    }, [dispatch, userId])
    // useEffect(() => {
    //     getUserCartProduct(dispatch, userId)
    // }, [dispatch, userId, userId !== undefined])
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home