import "./widgetLg.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { format } from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order/?new=true");
        setOrders(res.data);
      } catch { }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Đơn hàng mới nhất</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Thời gian</th>
          <th className="widgetLgTh">Tổng tiền</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img
                src={
                  order.userId.img || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                }
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{order.userId.username}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">{order.amount.toLocaleString('en')} VND</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
