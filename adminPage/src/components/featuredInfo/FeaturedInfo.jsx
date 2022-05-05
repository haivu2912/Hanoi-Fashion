import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from '../../requestMethod';

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [pay, setPay] = useState([]);
  const [products, setProducts] = useState([]);
  const [perc, setPerc] = useState(0);
  const [percPay, setPercPay] = useState(0);
  const [percTotal, setPercTotal] = useState(0);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const productList = await userRequest("/product");
        setProducts(productList.data);
        const res = await userRequest('order/income');
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        setIncome(list);
        setPerc((list[1].total * 100) / list[0].total - 100);

        const res2 = await userRequest('receive/income');
        const listPay = res2.data.sort((a, b) => {
          return a._id - b._id
        })
        setPay(listPay);
        setPercPay((listPay[1].total * 100) / listPay[0].total - 100);

        setPercTotal((list[1]?.total - listPay[1]?.total) * 100 / (list[0]?.total - listPay[0]?.total) - 100);
      } catch {

      }
    }
    getIncome();
  }, []);
  
  let totalInStore = products.reduce((total, product) => total + (product.price * product.quantity), 0);
  console.log(totalInStore);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tiền bán hàng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[1]?.total.toLocaleString('en')} VND</span>
          <span className="featuredMoneyRate">
            {Math.round(perc * 100) / 100}%{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tiền nhập hàng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{pay[1]?.total.toLocaleString('en')} VND</span>
          <span className="featuredMoneyRate">
            {Math.round(percPay * 100) / 100}%{" "}
            {percPay < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Lãi</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {
              (income[1]?.total + totalInStore - pay[1]?.total).toLocaleString('en')
            }
          </span>
          <span className="featuredMoneyRate">
            {Math.round(percTotal * 100) / 100}%{" "}
            {percTotal < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
    </div>
  );
}