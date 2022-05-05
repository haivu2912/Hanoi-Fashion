import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder, updateUserOrderShipping } from '../redux/apiCall';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';

const Container = styled.div`
    height: 500px;
`;

const ButtonDetail = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 5px;
`;

const ButtonCheck = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: blue;
    color: white;
    cursor: pointer;
    margin-left: 5px;
`;

const MyOrder = () => {
    const userId = useSelector(state => state.user.currentUser._id);
    const dispatch = useDispatch();
    useEffect(() => {
        getUserOrder(dispatch, userId);
    }, [userId, dispatch])
    const orders = useSelector(state => state.order.orders);
    const handleCheck = (order) => {
        let shippingStatus = order.shipping;
        shippingStatus = 'Đã nhận hàng';
        const orderId = order._id;
        updateUserOrderShipping(orderId, shippingStatus, dispatch);
    };

    const columns = [
        {
            field: "_id",
            headerName: "Mã",
            width: 200,
        },
        {
            field: "amount",
            headerName: "Tổng tiền",
            width: 200,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 200,
        },
        {
            field: "shipping",
            headerName: "Giao hàng",
            width: 200,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 350,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/myDetailOrder/" + params.row._id}>
                            <ButtonDetail>Chi tiết</ButtonDetail>
                        </Link>
                        {
                            params.row.shipping !== 'Đã nhận hàng' ? <ButtonCheck onClick={() => handleCheck(params.row)}>Xác nhận đơn</ButtonCheck> : '' 
                        }
                    </>
                );
            },
        },
    ];
    const rows = orders.map(order => (
        {
            _id: order._id,
            amount: order.amount,
            status: order.status,
            shipping: order.shipping,
            address: order.address.line1 + '-' + order.address.city + '-' + order.address.country
        }
    ))
    console.log(rows);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </Container>
    )
}

export default MyOrder
