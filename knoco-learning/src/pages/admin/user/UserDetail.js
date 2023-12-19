import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Single from "../../../components/admin/single/Single";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import "./user.scss";
import { useParams } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";
import CardAddClass from "../../../components/add/CardAddClass";
import CardAddCourse from "../../../components/add/CardAddCourse";
import CardAddMoney from "../../../components/add/CardAddMoney";
const UserDetail = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [roleid, setRoleid] = useState('');
  const [imageSource, setImageSource] = useState("");
  const [isAddClassPopupVisible, setAddClassPopupVisible] = useState(false);
  const [randomString, setRandomString] = useState('');
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

  const openAddClassPopup = () => {
    setAddClassPopupVisible(true);
  }

  const closeAddClassPopup = () => {
    setAddClassPopupVisible(false);
  }
  const generateRandomString = async (userid) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    let result = '';

    const getRandomChar = (charSet) => {
      return charSet.charAt(Math.floor(Math.random() * charSet.length));
    };


    result += getRandomChar(letters);


    result += getRandomChar(numbers);


    for (let i = 0; i < 6; i++) {
      const randomSet = Math.floor(Math.random() * 2) === 0 ? letters : numbers;
      result += getRandomChar(randomSet);
    }


    const shuffledResult = result.split('').sort(() => Math.random() - 0.5).join('');
    setRandomString(shuffledResult);
    const resetpassword = {
      userId: userid,
      password: shuffledResult
    };


    try {
      const response = await fetch(`${API_BASE_URL}/api/User/ChangePasswordAdmin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetpassword)
      });
      if (response.ok) {
        console.log('Dữ liệu lớp học đã được cập nhật thành công');
      } else {
        console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
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
                          <button className="btn-add" onClick={openAddClassPopup}><FontAwesomeIcon icon={faSquarePlus} /> Add Money</button>
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
                        <button type="button" class="btn btn-dark" onClick={() => generateRandomString(userDetails.userId)}>Reset Password</button>

                        <p>New Password : {randomString}</p>
                        {
                          isAddClassPopupVisible && (
                            <div className="popup">
                              <CardAddMoney closePopup={closeAddClassPopup} />
                            </div>
                          )
                        }
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
