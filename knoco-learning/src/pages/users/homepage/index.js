import { memo } from "react";

const HomePage = () => {
    return (
        <>
            <h3 className="i-name">
                New Course
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

            <div className="values">
                
            </div>
        </>
    )
};

export default memo(HomePage);