import "./reportList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getReports } from "../../redux/apiCall";

export default function ReportList() {
    const reports = useSelector(state => state.report.reports);
    const dispatch = useDispatch();

    useEffect(() => {
        getReports(dispatch);
    }, [dispatch]);

    console.log(reports);
    const handleDelete = (id) => {
        deleteReport(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "Mã", width: 200 },
        {
            field: "user",
            headerName: "Người dùng",
            width: 200
        },
        {
            field: "product",
            headerName: "Sản phẩm",
            width: 200
        },
        {
            field: "report",
            headerName: "Khiếu nại",
            width: 200,
        },
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

    const rows = reports.map(report => (
        {
            _id: report._id,
            user: report.userId.username,
            product: report.productId.title,
            report: report.report 
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
