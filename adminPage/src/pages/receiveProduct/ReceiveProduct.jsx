import {
    CalendarToday,
    ColorLens,
    FormatSize,
    LocationSearching,
    MailOutline,
    MonetizationOn,
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
import "./receiveProduct.css";
import { updateProduct, updateProductOfReceive, updateStateOfProductInReceive, updateUser } from "../../redux/apiCall";

export default function ReceiveProduct() {
    const location = useLocation();
    const receiveId = location.pathname.split('/')[2];
    const id = location.pathname.split('/')[3];
    const receive = useSelector(state => state.receive.receives.find(receive => receive._id === receiveId));
    const product = receive.products.find(product => product._id === id);
    const productInStore = useSelector(state => state.product.products.find(item => item.title === product.name));
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [provider, setProvider] = useState(receive.provider);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [status, setStatus] = useState();
    //const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    let newQuantity = productInStore?.quantity + product.quantity;
    const handleSize = (e) => {
        setSize(e.target.value.split(','));
    }

    const handleColor = (e) => {
        setColor(e.target.value.split(','));
    }
    console.log(product);
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
                    const newAmount = receive.amount - (product.price * product.quantity) + (price * quantity);
                    const productUpdate = { provider, status, amount: newAmount, product: { name, price, quantity, size, color, img: downloadURL } };
                    updateProductOfReceive(receiveId, id, productUpdate, receive.products, dispatch);
                });
            }
        );
    }

    const handleUpdateQuantity = () => {
        const inStore = true;
        // const receiveProduct = {
        //     ...product,
        //     inStore
        // }
        //console.log(productQuantity);
        // const product = {
        //     ...productInStore,
        //     quantity: newQuantity
        // };
        //console.log(product);
        updateProduct(productInStore._id, {quantity: newQuantity}, dispatch);
        updateStateOfProductInReceive(receiveId, id, inStore, receive.products, dispatch)
    }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Thông tin sản phẩm</h1>
                {
                    receive.status === 'Hàng đang về' || product.inStore === true
                        ?
                        ''
                        :
                        productInStore 
                            ? 
                            <button className="userAddButton" onClick={handleUpdateQuantity}>
                                Nhập kho
                            </button> 
                            : 
                            <Link to={"/" + receiveId + "/addReceiveToProduct/" + id}>
                                <button className="userAddButton">Nhập kho</button>
                            </Link>
                    // <Link to={"/" + receiveId + "/addReceiveToProduct/" + id}>
                    //     <button className="userAddButton">Nhập kho</button>
                    // </Link>
                    // productInStore || receive.status =='Hàng đang về'
                    //     ?
                    //     ''
                    //     :
                    //     <Link to={"/" + receiveId + "/addReceiveToProduct/" + id}>
                    //         <button className="userAddButton">Nhập kho</button>
                    //     </Link>
                }
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={product.img ? product.img : 'https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg'}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                {product.name}
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Chi tiết</span>
                        <div className="userShowInfo">
                            <ColorLens className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {product.color.join(', ')}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <FormatSize className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {product.size.join(', ')}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MonetizationOn className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {product.price}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {product.quantity}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">thông tin</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Nhà cung cấp</label>
                                <input
                                    type="text"
                                    name="provider"
                                    placeholder={receive.provider}
                                    className="userUpdateInput"
                                    onChange={e => setProvider(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Tên sản phẩm</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={product.name}
                                    className="userUpdateInput"
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Màu sắc</label>
                                <input
                                    type="text"
                                    name="color"
                                    placeholder={product.color.join(', ')}
                                    className="userUpdateInput"
                                    onChange={handleColor}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Kích thước</label>
                                <input
                                    type="text"
                                    name="size"
                                    placeholder={product.size.join(', ')}
                                    className="userUpdateInput"
                                    onChange={handleSize}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Giá</label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder={product.price}
                                    className="userUpdateInput"
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Số lượng</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    placeholder={product.quantity}
                                    className="userUpdateInput"
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Tình trạng</label>
                                <select className="workTime" name="shift" id="active" onChange={e => setStatus(e.target.value)}>
                                    <option value="Hàng đang về">Hàng đang về</option>
                                    <option value="Hàng đã về">Hàng đã về</option>
                                </select>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={product.img ? product.img : 'https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg'}
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
