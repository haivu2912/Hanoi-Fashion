import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStaff } from "../../redux/apiCall";
import "./newStaff.css";

export default function NewStaff() {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    
    const handleCreate = (e) => {
        e.preventDefault();
        addStaff(inputs, dispatch);
    }
    return (
        <div className="newUser">
            <h1 className="newUserTitle">Thêm mới nhân viên</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Tên</label>
                    <input type="text" name="name" placeholder="Nguyễn Văn A" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Tuổi</label>
                    <input type="text"name="age"  placeholder="18" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="abcd@gmail.com" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>SĐT</label>
                    <input type="text" name="phone" placeholder="+1 123 456 78" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" placeholder="Hà Nội" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Giới tính</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="nam" onChange={handleChange}/>
                        <label for="male">Nam</label>
                        <input type="radio" name="gender" id="female" value="nữ" onChange={handleChange}/>
                        <label for="female">Nữ</label>
                        <input type="radio" name="gender" id="other" value="khác" onChange={handleChange}/>
                        <label for="other">Khác</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Ca làm việc</label>
                    <select className="newUserSelect" name="shift" id="active" onChange={handleChange}>
                        <option value="Ca sáng">Ca Sáng</option>
                        <option value="Ca tối">Ca Tối</option>
                    </select>
                </div>
                <button className="newUserButton" onClick={handleCreate}>Tạo mới</button>
            </form>
        </div>
    );
}
