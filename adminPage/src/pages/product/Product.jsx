import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethod";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import { updateProduct } from "../../redux/apiCall";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const product = useSelector(state => state.product.products.find(product => product._id === productId));
    const [pStats, setPStats] = useState([]);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState([]);
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
    const handleCategories = (e) => {
        setCat(e.target.value.split(','));
    }

    const handleSize = (e) => {
        setColor(e.target.value.split(','));
    }

    const handleColor = (e) => {
        setSize(e.target.value.split(','));
    }
    
    console.log(cat, color, size);
    const handleUpdate = (e) => {
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
                    const productUpdate = { ...inputs, img: downloadURL, categories: cat, size: size, color: color};
                    updateProduct(productId, productUpdate, dispatch);
                });
            }
        );
    }
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("order/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">S???n ph???m</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">T???o m???i</button>
                </Link>
            </div>
            <div className="productTop">
                {/* <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div> */}
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">M??:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">???? b??n:</span>
                            <span className="productInfoValue">{product.sold}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Tr???ng th??i:</span>
                            <span className="productInfoValue">{product.quantity > 0 ? 'c??n h??ng' : 'h???t h??ng'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>T??n s???n ph???m</label>
                        <input type="text" name="title" placeholder={product.title} onChange={handleChange} />
                        <label>M?? t???</label>
                        <input type="text" name="desc" placeholder={product.desc} onChange={handleChange} />
                        <label>Gi??</label>
                        <input type="text" name="price" placeholder={product.price} onChange={handleChange} />
                        <label>Danh m???c</label>
                        <input type="text" name="cat" placeholder={product.categories} onChange={handleCategories} />
                        <label>K??ch th?????c</label>
                        <input type="text" name="size" placeholder={product.size} onChange={handleSize} />
                        <label>M??u s???c</label>
                        <input type="text" name="color" placeholder={product.color} onChange={handleColor} />
                        <label>S??? l?????ng</label>
                        <input type="text" name="quantity" placeholder={product.quantity} onChange={handleChange} />
                        <label>Tr???ng th??i</label>
                        <select name="inStock" id="idStock" onChange={handleChange}>
                            <option value="true">C??n h??ng</option>
                            <option value="false">H???t h??ng</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <button className="productButton" onClick={handleUpdate}>C???p nh???t</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
