import { memo } from "react";
import Header from "../../../pages/users/theme/header";
import Footer from "../../../pages/users/theme/footer";
import ManagerMenu from "../managerMenu/managerMenu";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const ManagerLayout = ({ children, ...props }) => {
    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <ManagerMenu />
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header />
                </header>

                <div>
                    {children}
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(ManagerLayout);