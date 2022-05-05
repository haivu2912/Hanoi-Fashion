import "./StaffList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteStaff, getStaff } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";

export default function StaffList() {
  const dispatch = useDispatch();
  const staffs = useSelector(state => state.staff.staffs);
  useEffect(() => {
    getStaff(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteStaff(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "Mã", width: 200 },
    {
      field: "staff",
      headerName: "Nhân viên",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar ? params.row.avatar : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
        field: "shift",
        headerName: "Giờ làm việc",
        width: 150,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/staff/" + params.row._id}>
              <button className="userListEdit">Cập nhật</button>
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
      <DataGrid
        rows={staffs}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
 