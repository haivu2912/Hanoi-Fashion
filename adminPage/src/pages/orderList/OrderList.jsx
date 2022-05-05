import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCall";

export default function OrderList() {
    const orders = useSelector(state => state.order.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    console.log(orders);
      const handleDelete = (id) => {
        deleteOrder(id, dispatch);
      };

    const columns = [
        { field: "_id", headerName: "Mã", width: 200 },
        {
            field: "user",
            headerName: "Khách hàng",
            width: 200
        },
        {
            field: "amount",
            headerName: "Tổng tiền",
            width: 200
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 200,
        },
        {
            field: "shipping",
            headerName: "Giao hàng",
            width: 150,
        },
        { field: "address", headerName: "Địa chỉ", width: 200 },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link> */}
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    const rows = orders.map(order => (
        {
            _id: order._id,
            user: order.userId.username,
            amount: order.amount,
            status: order.status,
            shipping: order.shipping,
            address: order.address.line1 + '-' + order.address.city + '-' + order.address.country
        }
    ))
    return (
        <div className="userList">
            <DataGrid
                rows={rows}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
