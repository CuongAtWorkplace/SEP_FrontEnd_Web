import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Single from "../../../components/admin/single/Single";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import "./user.scss";
import {useParams} from 'react-router-dom';

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const {userId} = useParams();
  // console.log(I);
  useEffect(() => {
    fetch(`https://localhost:7169/api/Admin/GetUserById/${userId}`)
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
      FullName: userDetails.fullName,
      Email: userDetails.email,
      Phone: userDetails.phone,
      Balance: userDetails.balance,
      Status: userDetails.status,
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
              <Single {...singleUser} />
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
