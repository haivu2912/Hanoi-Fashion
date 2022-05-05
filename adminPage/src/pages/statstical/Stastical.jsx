import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { getStat } from "../../redux/apiCall";
import { userRequest } from '../../requestMethod';

export default function Statstical() {
    const [inputs, setInputs] = useState(new Date().getMonth() + 1);
    // const [data, setData] = useState([]);
    const products = useSelector(state => state.product.products);
    const receive = useSelector(state => state.receive.receives);
    const stat = useSelector(state => state.stat.statistical);
    const dispatch = useDispatch();
    useEffect(() => {
        getStat(inputs, dispatch)
    }, [dispatch]);
    console.log(inputs);

    //console.log(data);
    let receiveInSearchMonth = receive.filter(item => new Date(item.createdAt).getMonth() + 1 == inputs);
    let totalInStore = products.reduce((total, product) => total + (product.price * product.quantity), 0);
    let receiveTotal = receiveInSearchMonth.reduce((total, receive) => (total + receive.amount), 0);
    // let sell = data.reduce((total, order) => (total + order.sales), 0);
    console.log(receiveInSearchMonth);
    const handleChange = (e) => {
        // setInputs(prev => {
        //     return {
        //         ...prev,
        //         [e.target.name]: e.target.value
        //     }
        // })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        getStat(inputs, dispatch)
        // getStat(inputs, dispatch);
        // createReceive({...inputs, amount});
    }

    const columns = [
        { field: "_id", headerName: "Đơn hàng", width: 150 },
        {
            field: "quantity",
            headerName: "Số lượng",
            width: 150,
        },
        {
            field: "sell",
            headerName: "Tiền bán hàng",
            width: 200,
        },
        {
            field: "pay",
            headerName: "Tiền nhập hàng",
            width: 200,
        },
        {
            field: "amount",
            headerName: "Lãi",
            width: 150,
        },
    ];

    const rows = stat?.map(item => (
        {
            _id: item._id,
            quantity: item.products.length,
            sell: item.sales.toLocaleString('en'),
            pay: receiveTotal.toLocaleString('en'),
            amount: (item.sales + totalInStore - receiveTotal).toLocaleString('en'),
        }
    ))

    return (
        <div className="userList">
             <h1 className="addProductTitle">Thêm mới đơn hàng</h1>
             <form className="addProductForm">
                 <div className="addProductItem">
                     <label>Nhập tháng</label>
                     <input name="month" type="number" onChange={e => setInputs(e.target.value)} />
                 </div>
                 <button className="addProductButton" onClick={handleCreate}>Xác nhận</button>
             </form>
             <h2 style={{
                 margin: '10px 0'
             }}>{`Tháng ${inputs} có ${stat.length} đơn hàng`}</h2>
            <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
        // <div className="newProduct">
        //     {/* <h1 className="addProductTitle">Thêm mới đơn hàng</h1>
        //     <form className="addProductForm">
        //         <div className="addProductItem">
        //             <label>Nhập tháng</label>
        //             <input name="month" type="text" onChange={handleChange} />
        //         </div>
        //         <button className="addProductButton" onClick={handleCreate}>Xác nhận</button>
        //     </form> */}
        //     {/* <DataGrid
        //         rows={rows}
        //         disableSelectionOnClick
        //         columns={columns}
        //         getRowId={row => row._id}
        //         pageSize={8}
        //         checkboxSelection
        //     /> */}
        // </div>
    );
}
