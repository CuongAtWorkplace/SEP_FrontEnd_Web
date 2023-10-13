import Single from "../../../components/admin/single/Single"
import { singleUser } from "../../../data"
import { useState, useEffect } from "react";
import { Component } from "react";
import "./user.scss"

const UserDetail = ({ userId }) => {

  // return (
    // <div className="user">
    //   <Single {...singleUser}/>
    // </div>
  // )
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết người dùng dựa trên userId
    fetch(`https://localhost:7169/api/Admin/GetUserById/${userId}`) // Thay đổi URL thành đường dẫn API thực tế
      .then((response) => response.json())
      .then((data) => {
        // Cập nhật state với thông tin chi tiết người dùng từ phản hồi API
        setUserDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi gọi API:', error);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user">
    <Single {...userDetails}/>
      {/* <h1>Chi tiết người dùng</h1>
      <p>ID: {userDetails.userId}</p>
      <p>Tên: {userDetails.fullName}</p>
      <p>Email: {userDetails.email}</p>
      <p>Phone: {userDetails.phone}</p>
      <p>Image: {userDetails.image}</p>
      <p>Descripton: {userDetails.description}</p>
      <p>address: {userDetails.address}</p>
      <p>createDate: {userDetails.createDate}</p>
      <p>isBan: {userDetails.isBan}</p>
      <p>balance: {userDetails.balance}</p>
      <p>role: {userDetails.role}</p>
      Hiển thị thông tin chi tiết người dùng tại đây, thay đổi thuộc tính tương ứng từ API */}
    </div>
  );
}
export default UserDetail