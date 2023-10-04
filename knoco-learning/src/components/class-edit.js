import { memo } from "react";
//import { Link } from "react-router-dom";
//import logo from './featured.png';
import "./comp.css";

const ClassEdit = () => {
    return (
        <>
            <h3 className="i-name">
                dashboard
            </h3>

            <div className="values">
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
                <div className="val-box">
                    <i className="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>New Users</span>
                    </div>
                </div>
            </div>

            <h3 className="i-name-2">
                Edit Class
            </h3>
            <div class="col-lg-3 col-md-6 mb-5">
                <h3 class="text-primary mb-4">Newsletter</h3>
                <form action="">
                    <div class="form-group">
                        <input type="text" class="form-control border-0 py-4" placeholder="Your Name" required="required" />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control border-0 py-4" placeholder="Your Email"
                            required="required" />
                    </div>
                    <div>
                        <button class="btn btn-primary btn-block border-0 py-3" type="submit">Submit Now</button>
                    </div>
                </form>
            </div>




        </>
    );
};


export default memo(ClassEdit);