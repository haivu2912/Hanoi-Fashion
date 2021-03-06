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
      <h1 className="addProductTitle">S???n ph???m m???i</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>H??nh ???nh</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>T??n</label>
          <input name="title" type="text" placeholder="T??n s???n ph???m..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>M?? t???</label>
          <input name="desc" type="text" placeholder="M?? t???..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Gi??</label>
          <input name="price" type="number" placeholder="Gi??..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>S??? l?????ng</label>
          <input name="price" type="number" placeholder="S??? l?????ng..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Danh m???c</label>
          <input type="text" placeholder="Danh m???c..." onChange={handleCategory} />
        </div>
        <div className="addProductItem">
          <label>Tr???ng th??i</label>
          <select name="inStock" onChange={handleChange}>
            <option value='true'>C??n h??ng</option>
            <option value='no'>H???t h??ng</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreate}>X??c nh???n</button>
      </form>
    </div>
  );
}
