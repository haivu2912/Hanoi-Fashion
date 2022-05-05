import "./receiveList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReceive, getReceives } from "../../redux/apiCall";

export default function ReceiveList() {
    const [data, setData] = useState(userRows);
    const receives = useSelector(state => state.receive.receives);
    const dispatch = useDispatch();

    useEffect(() => {
        getReceives(dispatch);
    }, [dispatch]);

    //   console.log(users);
    const handleDelete = (id) => {
        deleteReceive(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "Mã", width: 200 },
        {
            field: "provider",
            headerName: "Nhà cung cấp",
            width: 200,
        },
        {
            field: "products",
            headerName: "Sản phẩm",
            width: 150,
            renderCell: (params) => {
                return (
                    params.row.products.length
                );
            },
        },
        {
            field: "amount",
            headerName: "Tổng tiền",
            width: 150,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/receive/" + params.row._id}>
                            <button className="userListEdit">Chi tiết</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <Link to={"/newReceive"}>
                <button className="userAddButton">Tạo mới</button>
            </Link>
            <DataGrid
                rows={receives}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}
