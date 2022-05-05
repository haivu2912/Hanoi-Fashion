import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import {addProduct} from '../../redux/apiCall';
import {useDispatch} from 'react-redux';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCategory = (e) => {
    setCat(e.target.value.split(','));
  }

  const handleCreate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Sản phẩm mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Hình ảnh</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Tên</label>
          <input name="title" type="text" placeholder="Tên sản phẩm..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input name="desc" type="text" placeholder="Mô tả..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Giá</label>
          <input name="price" type="number" placeholder="Giá..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Số lượng</label>
          <input name="price" type="number" placeholder="Số lượng..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Danh mục</label>
          <input type="text" placeholder="Danh mục..." onChange={handleCategory} />
        </div>
        <div className="addProductItem">
          <label>Trạng thái</label>
          <select name="inStock" onChange={handleChange}>
            <option value='true'>Còn hàng</option>
            <option value='no'>Hết hàng</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreate}>Xác nhận</button>
      </form>
    </div>
  );
}
