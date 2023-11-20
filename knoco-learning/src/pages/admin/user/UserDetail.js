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
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        {
          name: "Sun",
          visits: 4000,
          clicks: 2400,
        },
        {
          name: "Mon",
          visits: 3000,
          clicks: 1398,
        },
        {
          name: "Tue",
          visits: 2000,
          clicks: 3800,
        },
        {
          name: "Wed",
          visits: 2780,
          clicks: 3908,
        },
        {
          name: "Thu",
          visits: 1890,
          clicks: 4800,
        },
        {
          name: "Fri",
          visits: 2390,
          clicks: 3800,
        },
        {
          name: "Sat",
          visits: 3490,
          clicks: 4300,
        },
      ],
    },
    activities: [
      {
        text: "John Doe purchased Playstation 5 Digital Edition",
        time: "3 day ago",
      },
      {
        text: "John Doe added 3 items into their wishlist",
        time: "1 week ago",
      },
      {
        text: "John Doe purchased Sony Bravia KD-32w800",
        time: "2 weeks ago",
      },
      {
        text: "John Doe reviewed a product",
        time: "1 month ago",
      },
      {
        text: "John Doe added 1 items into their wishlist",
        time: "1 month ago",
      },
      {
        text: "John Doe reviewed a product",
        time: "2 months ago",
      },
    ],
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
