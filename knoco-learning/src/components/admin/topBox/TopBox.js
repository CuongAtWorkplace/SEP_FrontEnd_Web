import "./topBox.scss"
import React, { useState, useEffect } from 'react';

const TopBox = () => {

  const [topDealUsers, setTopDealUsers] = useState([]);

  useEffect(() => {
    // Gọi API ở đây
    fetch(`https://localhost:7169/api/Admin/GetListUser`)
      .then((response) => response.json())
      .then((data) => {
        setTopDealUsers(data); // Cập nhật danh sách người dùng
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []); // Sử dụng mảng rỗng để đảm bảo hiệu suất chỉ gọi API một lần khi tải komponent
  
  return (
    <div className="topBox">
      <h1>Top Users</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.userId}>
            <div className="user">
              <img src={user.image} alt="" />
              <div className="userTexts">
                <span className="username">{user.fullName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">${user.balance}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox