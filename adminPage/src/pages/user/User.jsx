import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { format } from 'timeago.js';
import "./user.css";
import { updateUser } from "../../redux/apiCall";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const user = useSelector(state => state.user.users.find(user => user._id === userId));
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userInfoUpdate = { ...inputs, avatar: downloadURL};
          updateUser(userId, userInfoUpdate, dispatch);
        });
      }
    );
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Cập nhật thông tin</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Tạo mới</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.avatar ? user.avatar : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {
                  user.name ? user.name : 'NGười dùng' + '-' + user._id
                }
              </span>
              <span className="userShowUserTitle">
                {
                  user.isAdmin ? 'Quản trị viên' : 'Người dùng'
                }
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin tài khoản</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  user.username
                }
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  format(user.createdAt)
                }
              </span>
            </div>
            <span className="userShowTitle">Thông tin liên hệ</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  user.phone ? user.phone : 'Chưa có'
                }
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {
                  user.address ? user.address : 'Chưa có'
                }
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Cập nhật</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên tài khoản</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Tên người dùng</label>
                <input
                  type="text"
                  name="name"
                  placeholder={user.name ? user.name : ''}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>SĐT</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={user.phone ? user.phone : ''}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chi</label>
                <input
                  type="text"
                  name="address"
                  placeholder={user.address ? user.address : ''}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.avatar ? user.avatar : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
