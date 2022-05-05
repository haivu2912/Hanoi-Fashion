import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from '../../requestMethod';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('user/find/?new=true');
        setUsers(res.data);
      } catch {

      }
    }
    getUsers();
  }, [])
  console.log(users);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Người dùng mới nhất</span>
      <ul className="widgetSmList">
        {users.map(user => (
          user.isAdmin ||
          <li className="widgetSmListItem" key={user._id}>
            <div className="widgetSmUser">
              <img
                src={
                  user.img || 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                }
                alt=""
                className="widgetSmImg"
              />
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}