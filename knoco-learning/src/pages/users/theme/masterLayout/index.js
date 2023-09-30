import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const MasterLayout = ({ children, ...props }) => {
    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <Menu />
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header />
                </header>

                <div className="div-content">
                    {children}
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(MasterLayout);