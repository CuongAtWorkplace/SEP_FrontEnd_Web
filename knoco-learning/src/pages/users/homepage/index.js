import { memo } from "react";
import { Link } from "react-router-dom";    
//import logo from './featured.png';
import "./style.css";
const HomePagesss = () => {
    const courseContainer = () => {
        document.getElementById('courseContainer');
    }
    const scrollLeft = () => {
        courseContainer.scrollBy({
            left: -10,
            behavior: 'smooth'
        });
    }

    const scrollRight = () => {
        courseContainer.scrollBy({
            left: 10,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <h3 className="i-name">
                New Course
                <button onClick={scrollLeft}>←</button>
                <button onClick={scrollRight}>→</button>
            </h3>

            <div className="home-course" id="courseContainer">
                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="i-name-2">
                Hot Course
            </h3>

            <div className="home-course">
                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-course">
                    <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                    <div class="bg-secondary p-4">
                        <div class="d-flex">
                            <small class="m-0"><i class="text-primary"></i>25 Students</small>
                            <small class="m-0"><i class="text-primary"></i>01h 30m</small>
                        </div>
                        <Link class="a-link h5" href="">Web design & development courses for beginner</Link>
                        <div class="border-top">
                            <div class="d-flex">
                                <h6 class="m-0"><i class="text-primary"></i>4.5 <small>(250)</small></h6>
                                <h5 class="m-0">$99</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default memo(HomePagesss);