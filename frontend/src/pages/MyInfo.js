import { Avatar } from '@material-ui/core'
import { Favorite, MailOutline, PermIdentity, PersonPin, PhoneAndroid, Publish, ShoppingCart } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../firebase';
import { updateUserInfo } from '../redux/apiCall'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'

const Container = styled.div``;

const UserContainer = styled.div`
    display: flex;
    margin-top: 20px;
`

const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const UserUpdate = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`

const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`

const UserShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const UserShowUsername = styled.span`
    font-weight: 600;
`

const UserShowUserTitle = styled.span`
    font-weight: 300;
`

const UserShowBottom = styled.div`
      margin-top: 20px;
`

const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`

const UserShowInfo = styled.div`
      display: flex;
      align-items: center;
      margin: 20px 0px;
      color: #444;
`


const UserShowInfoTitle = styled.span`
      margin-left: 10px;
`

const UserUpdateTitle = styled.span`
      font-size: 24px;
      font-weight: 600;
`

const UserUpdateForm = styled.form`
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
`

const UserUpdateLeft = styled.div``;

const UserUpdateItem = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 10px;
  `

const Label = styled.label`
      margin-bottom: 5px;
      font-size: 14px;
`

const UserUpdateInput = styled.input`
      border: none;
      width: 250px;
      height: 30px;
      border-bottom: 1px solid gray;
      outline: none;
`

const UserUpdateRight = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
`

const UserUpdateUpload = styled.div`
      display: flex;
      align-items: center;
`

const UserUpdateImg = styled.img`
      width: 100px;
      height: 100px;
      border-radius: 10px;
      object-fit: cover;
      margin-right: 20px;
`


const UserUpdateButton = styled.button`
      border-radius: 5px;
      border: none;
      padding: 5px;
      cursor: pointer;
      background-color: darkblue;
      color: white;
      font-weight: 600;
`
const MyInfo = () => {
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishList);

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                    const userInfo = { ...inputs, avatar: downloadURL };
                    updateUserInfo(user._id, userInfo, dispatch)
                });
            }
        );
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <UserContainer>
                <UserShow >
                    <UserShowTop>
                        {
                            user.avatar !== undefined
                                ?
                                <UserShowImg
                                    src={user.avatar}
                                    alt=""
                                />
                                :
                                <Avatar style={{
                                    width: '40px',
                                    height: '40px',
                                }}>
                                    {user.username.charAt(0)}
                                </Avatar>
                        }

                        <UserShowTopTitle>
                            <UserShowUsername>
                                {
                                    user.name !== undefined ? user.name : 'Người dùng' + '-' + user._id
                                }
                            </UserShowUsername>
                            <UserShowUserTitle>
                                {user.isAdmin ? 'Quản trị viên' : 'Người dùng'}
                            </UserShowUserTitle>
                        </UserShowTopTitle>
                    </UserShowTop>
                    <UserShowBottom>
                        <UserShowTitle>Thông tin tài khoản</UserShowTitle>
                        <UserShowInfo>
                            <PermIdentity />
                            <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <ShoppingCart />
                            <UserShowInfoTitle>{cart.quantity}</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <Favorite />
                            <UserShowInfoTitle>{wishlist.quantity}</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowTitle>Thông tin liên hệ</UserShowTitle>
                        <UserShowInfo>
                            <PhoneAndroid />
                            <UserShowInfoTitle>
                                {
                                    user.phone ? user.phone : 'Chưa có'
                                }
                            </UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <MailOutline />
                            <UserShowInfoTitle>{user.email}</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <PersonPin/>
                            <UserShowInfoTitle>
                                {
                                    user.address ? user.address : 'Chưa có'
                                }
                            </UserShowInfoTitle>
                        </UserShowInfo>
                    </UserShowBottom>
                </UserShow>
                <UserUpdate>
                    <UserUpdateTitle>Thay đổi</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateLeft>
                            <UserUpdateItem>
                                <Label>Tên tài khoản</Label>
                                <UserUpdateInput
                                    type="text"
                                    name='username'
                                    placeholder={user.username}
                                    onChange={handleChange}
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Tên người dùng</Label>
                                <UserUpdateInput
                                    type="text"
                                    name='name'
                                    placeholder={user.name ? user.name : ''}
                                    onChange={handleChange}
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Email</Label>
                                <UserUpdateInput
                                    type="text"
                                    name='email'
                                    placeholder={user.email}
                                    onChange={handleChange}
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>SĐT</Label>
                                <UserUpdateInput
                                    type="text"
                                    name='phone'
                                    placeholder={user.phone ? user.phone : ''}
                                    onChange={handleChange}
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <Label>Địa chỉ</Label>
                                <UserUpdateInput
                                    type="text"
                                    name='address'
                                    placeholder={user.address ? user.address : ''}
                                    onChange={handleChange}
                                />
                            </UserUpdateItem>
                        </UserUpdateLeft>
                        <UserUpdateRight>
                            <UserUpdateUpload>
                                {
                                    user.avatar !== undefined
                                        ?
                                        <UserUpdateImg
                                            src={user.avatar}
                                            alt=""
                                        />
                                        :
                                        <Avatar style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '10px',
                                            objectFit: 'cover',
                                            marginRight: '20px'
                                        }} />
                                }
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            </UserUpdateUpload>
                            <UserUpdateButton onClick={handleUpdateInfo}>Cập nhật</UserUpdateButton>
                        </UserUpdateRight>
                    </UserUpdateForm>
                </UserUpdate>
            </UserContainer>
            <Footer />
        </Container>
    )
}

export default MyInfo;
