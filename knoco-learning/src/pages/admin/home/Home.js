import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import TopBox from "../../../components/admin/topBox/TopBox";
import "./home.scss";
import TotalUser from "../../../components/admin/chartBox/TotalUserChart";
import TotalCourse from "../../../components/admin/chartBox/TotalCourseChart";
import TotalPost from "../../../components/admin/chartBox/TotalPostChart";
import TotalReport from "../../../components/admin/chartBox/TotalReportChart";

class Home extends Component {

  render() {
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
              <div className="users">
                <div className="info">
                  <h1>Dashboard</h1>
                </div>
                <div className="home">
                  <div className="box box1">
                    <TopBox />
                  </div>
                  <div className="box box2">
                    <TotalUser />
                  </div>
                  <div className="box box3">
                    <TotalCourse />
                  </div>
                  <div className="box box5">
                    <TotalPost />
                  </div>
                  <div className="box box6">
                    <TotalReport />
                  </div>
                </div>
              </div>
            </div>

            <footer>
              <Footer />
            </footer>
          </section>
        </div>
      </div>
    );
  }
};

export default Home;