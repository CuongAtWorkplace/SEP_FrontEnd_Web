import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
import "./style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const MasterLayout = ({ children, ...props }) => {
    return (
        <div className="body_page" {...props}>

            <div className="logo">
                <FontAwesomeIcon className="logo-icon" icon={faBook} />
                <h1>Knoco</h1>
            </div>

            <header>
                <Header />
            </header>

            <nav>
                <Menu />
            </nav>

            <content>
                {children}
            </content>

            <footer>
                <Footer />
            </footer>
        </ div>
    );
};

export default memo(MasterLayout);