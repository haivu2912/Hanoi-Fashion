import { useState } from "react";
import "./receiveToProduct.css";
import { addProduct, addProductOfReceive, updateStateOfProductInReceive } from '../../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

export default function ReceiveToProduct() {
    const location = useLocation();
    const receiveId = location.pathname.split('/')[1];
    const id = location.pathname.split('/')[3]
    const receive = useSelector(state => state.receive.receives.find(receive => receive._id === receiveId));
    const product = receive.products.find(product => product._id === id);
    const inStore = true;
    const dispatch = useDispatch();
    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState([]);
    //console.log(product);
    const handleCategory = (e) => {
        setCat(e.target.value.split(','));
    }
   
    const handleAdd = (e) => {
        e.preventDefault();
        const productToAdd = {
            title: product.name,
            desc: desc,
            img: product.img ? product.img : 'https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg',
            categories: cat,
            size: product.size,
            color: product.color,
            price: product.price,
            inStock: true,
            quantity: product.quantity
        }
        addProduct(productToAdd, dispatch);
        updateStateOfProductInReceive(receiveId, id, inStore, receive.products, dispatch)
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Thêm vào kho hàng</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Mô tả</label>
                    <input name="desc" type="text" placeholder="Mô tả..." onChange={e => setDesc(e.target.value)} />
                </div>
                <div className="addProductItem">
                    <label>Danh mục</label>
                    <input name="categories" type="text" placeholder="Danh mục" onChange={handleCategory} />
                </div>
                <button className="addProductButton" onClick={handleAdd}>Thêm</button>
            </form>
        </div>
    );
}
