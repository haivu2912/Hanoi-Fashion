import { useState } from "react";
import "./newReceiveProduct.css";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import { addProduct, addProductOfReceive } from '../../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

export default function NewProduct() {
    const location = useLocation();
    const receiveId = location.pathname.split('/')[1];
    const receive = useSelector(state => state.receive.receives.find(receive => receive._id === receiveId));
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSize = (e) => {
        setSize(e.target.value.split(','));
    }

    const handleColor = (e) => {
        setColor(e.target.value.split(','));
    }

    const handleCreate = (e) => {
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
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, color, size, img: downloadURL };
                    const newAmount = receive.amount + (inputs.price * inputs.quantity);
                    addProductOfReceive(receiveId, product, receive.products, newAmount, dispatch);
                });
            }
        );
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Th??m m???i s???n ph???m trong ????n nh???p h??ng</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>H??nh ???nh</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className="addProductItem">
                    <label>T??n</label>
                    <input name="name" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>S??? l?????ng</label>
                    <input name="quantity" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>M??u s???c</label>
                    <input name="color" type="text" placeholder="Apple Airpods" onChange={handleColor} />
                </div>
                <div className="addProductItem">
                    <label>K??ch th?????c</label>
                    <input name="size" type="text" placeholder="Apple Airpods" onChange={handleSize} />
                </div>
                <div className="addProductItem">
                    <label>Gi??</label>
                    <input name="price" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <button className="addProductButton" onClick={handleCreate}>Th??m</button>
            </form>
        </div>
    );
}
