import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import BarChartBox from "../../../components/admin/barChartBox/BarChartBox";
import BigChartBox from "../../../components/admin/bigChartBox/BigChartBox";
import ChartBox from "../../../components/admin/chartBox/ChartBox";
import TopBox from "../../../components/admin/topBox/TopBox";
import {
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../../data";
import "./home.scss";

const Home = () => {
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
                  <ChartBox {...chartBoxUser} />
                </div>
                <div className="box box3">
                  <ChartBox {...chartBoxProduct} />
                </div>
                {/* <div className="box box4">
        <PieChartBox />
      </div> */}
                <div className="box box5">
                  <ChartBox {...chartBoxConversion} />
                </div>
                <div className="box box6">
                  <ChartBox {...chartBoxRevenue} />
                </div>
                <div className="box box7">
                  <BigChartBox />
                </div>
                <div className="box box8">
                  <BarChartBox {...barChartBoxVisit} />
                </div>
                {/* <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
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
};

export default Home;