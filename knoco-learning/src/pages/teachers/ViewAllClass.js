import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import TableListClassTeacher from "../../components/Table/TableListClassTeacher";

const ViewAllClass = ({ children, ...props }) => {
    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <SideBar/>
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header/>
                </header>

                <div>
                    <TableListClassTeacher/>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(ViewAllClass);