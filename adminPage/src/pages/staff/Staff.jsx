import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
    Room,
    Wc,
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
import "./staff.css";
import { updateStaff } from "../../redux/apiCall";

export default function Staff() {
    const location = useLocation();
    const staffId = location.pathname.split('/')[2];
    const staff = useSelector(state => state.staff.staffs.find(staff => staff._id === staffId));
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
    console.log(inputs);
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
                    const staffInfoUpdate = { ...inputs, avatar: downloadURL };
                    updateStaff(staffId, staffInfoUpdate, dispatch);
                });
            }
        );
    }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">C???p nh???t th??ng tin</h1>
                <Link to="/newStaff">
                    <button className="userAddButton">T???o m???i</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={staff.avatar ? staff.avatar : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{staff.name}</span>
                            <span className="userShowUserTitle">Nh??n vi??n</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Th??ng tin li??n h???</span>
                        <div className="userShowInfo">
                            <Wc className="userShowIcon" />
                            <span className="userShowInfoTitle">{staff.gender}</span>
                        </div>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{staff.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{staff.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{staff.age}</span>
                        </div>
                        <div className="userShowInfo">
                            <Room className="userShowIcon" />
                            <span className="userShowInfoTitle">{staff.address}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">C???p nh???t</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>T??n</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={staff.name}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Gi???i t??nh</label>
                                <div className="newStaffGender">
                                    <input type="radio" name="gender" id="male" value="nam" onChange={handleChange}/>
                                    <label for="male">Nam</label>
                                    <input type="radio" name="gender" id="female" value="n???" onChange={handleChange}/>
                                    <label for="female">N???</label>
                                    <input type="radio" name="gender" id="other" value="kh??c" onChange={handleChange}/>
                                    <label for="other">Kh??c</label>
                                </div>
                            </div>
                            <div className="userUpdateItem">
                                <label>Tu???i</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={staff.age}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>S??T</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder={staff.phone}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={staff.email}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>?????a ch???</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder={staff.address}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Ca l??m vi???c</label>
                                <select className="workTime" name="shift" id="active" onChange={handleChange}>
                                    <option value="Ca s??ng">S??ng</option>
                                    <option value="Ca t???i">T???i</option>
                                </select>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={staff.avatar ? staff.avatar : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <button className="userUpdateButton" onClick={handleUpdate}>C???p nh???t</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
