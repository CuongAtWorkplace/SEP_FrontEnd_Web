import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Single from "../../../components/admin/single/Single";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import "./user.scss";
import { useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";
const UserDetail = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [roleid, setRoleid] = useState('');
  const [imageSource, setImageSource] = useState("");
  // console.log(I);
  const navigate = useNavigate();
  const fetchImage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/User/GetUserImage/GetImage/${userId}`);
      if (response.ok) {
        const imageData = await response.blob();
        setImageSource(URL.createObjectURL(imageData));
      }
    } catch (error) {
      console.error('Lỗi khi lấy ảnh:', error);
    }
  };

  useEffect(() => {

    fetchImage();

    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setRoleid(decodedToken.roleid);
      if (Number(decodedToken.roleid) === 2 || localStorage.getItem("token") === '') {
        navigate(`/`);
      }
    } else {
      navigate(`/`);
    }
    fetch(`${API_BASE_URL}/api/Admin/GetUserById/${userId}`)
      .then((response) => response.json())
      .then((data) => {
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


  const singleUser = {
    id: userDetails.userId,
    title: userDetails.fullName,
    img: userDetails.image, // Assuming 'image' is a property in userDetails
    info: {
      fullname: userDetails.fullName,
      email: userDetails.email,
      phone: userDetails.phone,
      status: userDetails.isBan,
    },
  };

  return (
    <div>
      <div className="body_page">
        <section id="menu">
          <div className="logo">
            <FontAwesomeIcon className="logo-icon" icon={faBook} />
            <h1>Knoco</h1>
          </div>

          <nav>
            <SideBar />
          </nav>
        </section>

        <section id="interface">
          <header>
            <Header />
          </header>
          <div className="TableLayout">
            <div className="user">
              <div className="single">
                <div className="top">
                  <div className="left">
                    {/* <div className="editButton">Edit</div> */}
                    <h1 className="title">User Information</h1>
                    <div className="item">
                      <div className="">
                        <img src={imageSource}

                          // src={userDetails.image}
                          // alt=""
                          className="itemImg"
                        />
                      </div>

                      <div className="details">
                        <h2 className="itemTitle">{userDetails.fullName}</h2>
                        <div className="detailItem">
                          <span className="itemKey">Email:</span>
                          <span className="itemValue">{userDetails.email}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Phone:</span>
                          <span className="itemValue">{userDetails.phone}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Address:</span>
                          <span className="itemValue">{userDetails.address}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Balance:</span>
                          <span className="itemValue">{userDetails.balance}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Role       :</span>
                          <span className="itemValue">{userDetails.roleName}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Create Date:</span>
                          <span className="itemValue">{userDetails.createDate}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Status:</span>
                          <span className="itemValue">{userDetails.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="right">
                  <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                </div> */}
                </div>
              </div>
              {/* <Single {...singleUser} /> */}
            </div>
          </div>

          <footer>
            <Footer />
          </footer>
        </section>
      </div>
    </div>
  );
};

export default UserDetail;
