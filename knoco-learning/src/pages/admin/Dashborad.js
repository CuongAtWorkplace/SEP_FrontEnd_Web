import { memo } from "react";

const DashboardPage = () => {
    return (
        <>
            <h3 class="i-name">
                Dashboard
            </h3>

            <div class="values">
                <div class="val-box">
                    <i class="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>Total Users</span>
                    </div>
                </div>
                <div class="val-box">
                    <i class="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>Topic</span>
                    </div>
                </div>
                <div class="val-box">
                    <i class="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>Topic</span>
                    </div>
                </div>
                <div class="val-box">
                    <i class="fa-solid fa-users"></i>
                    <div>
                        <h3>8,267</h3>
                        <span>Topic</span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default memo(DashboardPage);