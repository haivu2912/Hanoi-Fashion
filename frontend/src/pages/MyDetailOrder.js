import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../redux/apiCall';
import { Link, useLocation } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { userRequest } from '../requestMethod';

const Container = styled.div`
    height: 500px;
`;

const ButtonRatting = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 5px;
`

const ButtonReport = styled.button`
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    cursor: pointer;
    margin-left: 5px;
`
const MyDetailOrder = () => {
    const location = useLocation();
    const orderId = location.pathname.split('/')[2];
    const order = useSelector(state => state.order.orders.find(order => order._id === orderId));
    const userId = useSelector(state => state.user.currentUser._id);
    const [id, setId] = useState('');
    const [openReview, setOpenReview] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [report, setReport] = useState("");
    const [action, setAction] = useState('');

    const submitReviewToggle = (id) => {
        setId(id);
        setAction('rating');
        openReview ? setOpenReview(false) : setOpenReview(true);
    };
    const submitReportToggle = (id) => {
        setId(id);
        setAction('report');
        openReport ? setOpenReport(false) : setOpenReport(true);
    };

    const handleSubmitReview = async (id) => {
        const product = order.products.find(product => product._id === id);
        const review = {
            userId: userId,
            rating: rating,
            comment: comment
        }

        try {
            const res = await userRequest.patch(`/product/update/${product.productId._id}`, {
                reviews: [...product.productId.reviews, review]
            });
            setOpenReview(false);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmitReport = async (id) => {
        const product = order.products.find(product => product._id === id);
        const productId = product.productId._id;
        const reportObj = {
            userId: userId,
            productId: productId,
            report: report
        }
        try {
            const res = await userRequest.post(`/report/create`, reportObj);
            setOpenReport(false);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        {
            field: "id",
            headerName: "STT",
            width: 110,
        },
        {
            field: "product",
            headerName: "Tên sản phẩm",
            width: 200,
        },
        {
            field: "color",
            headerName: "Màu sắc",
            width: 200,
        },
        {
            field: "size",
            headerName: "Kích cỡ",
            width: 200,
        },
        {
            field: "quantity",
            headerName: "Số lượng",
            width: 200,
        },
        {
            field: "price",
            headerName: "Giá",
            width: 100,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                params.row.status === 'Đã nhận hàng'
                    ?
                    <>
                        <ButtonRatting onClick={() => submitReviewToggle(params.row._id)}>Đánh giá</ButtonRatting>
                        <ButtonReport onClick={() => submitReportToggle(params.row._id)}>Khiếu nại</ButtonReport>
                    </>
                    :
                    ''
            )
        },
    ];
    const rows = order.products.map((product, index) => (
        {
            id: index + 1,
            product: product.productId.title,
            color: product.color,
            size: product.size,
            price: product.productId.price,
            quantity: product.quantity,
            status: order.shipping
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
                getRowId={row => row.id}
                pageSize={8}
                checkboxSelection
            />
            {
                action === 'rating'
                    ?
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={openReview}
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

                            <textarea
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </button>
                            <button color="primary" onClick={() => handleSubmitReview(id)}>
                                Submit
                            </button>
                        </DialogActions>
                    </Dialog>
                    :
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={openReport}
                        onClose={submitReportToggle}
                    >
                        <DialogTitle>Submit Report</DialogTitle>
                        <DialogContent style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <textarea
                                cols="30"
                                rows="5"
                                value={report}
                                onChange={e => setReport(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <button onClick={submitReportToggle} color="secondary">
                                Cancel
                            </button>
                            <button color="primary" onClick={() => handleSubmitReport(id)}>
                                Submit
                            </button>
                        </DialogActions>
                    </Dialog>
            }
        </Container>
    )
}

export default MyDetailOrder
