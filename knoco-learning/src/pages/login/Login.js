import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./css/main.css";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            NewsHome: [],
            redirectPath: null,
        }
    }
    validateForm = () => {
        const { email, password } = this.state;
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ');
            return false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        if (!passwordRegex.test(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái và một số');
            return false;
        }
        return true; 
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };
    refreshList() {
        fetch('https://localhost:7169/api/User/GetAllUser')
            .then(response => response.json())
            .then(data => {
                this.setState({ NewsHome: data });
            });
    }
    componentDidMount() {

        this.refreshList();

    }

    handleLogin = async () => {
        if (this.validateForm()) {
            const { email, password, redirectPath } = this.state;
            try {
                const response = await fetch('https://localhost:7169/api/Login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {

                    console.log('Đăng nhập thanh cong');
                    const data = await response.json();
                    const token = data.token;
                    localStorage.setItem('token', token);

                    const decodedToken = jwtDecode(token);

                    localStorage.setItem('id', decodedToken.id);
                    localStorage.setItem('roleid', decodedToken.roleid);


                    if (decodedToken.roleid == 2) {
                        window.location.href = "/video";
                    }
                    else if (decodedToken.roleid == 3) {
                        window.location.href = "/manager/course";
                    } else if (decodedToken.roleid == 4) {
                        window.location.href = "/dashboard";
                    } else if (decodedToken.roleid == 1) {
                        window.location.href = "/viewclass"
                    }
                } else {
                    console.log('Đăng nhập thất bại');
                    this.setState({ checkLogin: false });
                }
            } catch (error) {
                console.log('Lỗi gọi API', error);
            }
        }
    };
    // handleSignUp = async () => {
    //     this.checkEmailExist();

    //     if (this.state.checkEmail == false) {
    //         const { email, password, fullname, address, phone } = this.state;
    //         try {
    //             const response = await fetch(`https://localhost:7248/api/User/InsertUser`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ email, password, fullname, address, phone }),
    //             });

    //             if (response.ok) {

    //                 this.setState({ showModalSignUp: false });
    //                 this.setState({ showModal: true });
    //                 this.setState({ noti: true });

    //             }
    //         } catch (error) {
    //             // Xử lý lỗi gọi API
    //             console.log('Lỗi gọi API', error);
    //             // this.handleSignUp2();
    //         }
    //     } else {
    //         this.setState({ showModalSignUp: true });

    //     }
    // };
    render() {
        const { email, password } = this.state;

        return (
            <div>
                <div class="limiter">
                    <div class="container-login100">
                        <div class="wrap-login100">
                            <div class="login100-pic js-tilt" data-tilt>
                                <img src="~/images/img-01.png" alt="IMG" />
                            </div>

                            <form className="login100-form validate-form" >
                                <span className="login100-form-title">
                                    Member Login
                                </span>

                                <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <input class="input100" type="text" name="email" onChange={this.handleEmailChange} value={email} placeholder="Email" required />
                                    <span class="focus-input100"></span>
                                    <span class="symbol-input100">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div class="wrap-input100 validate-input" data-validate="Password is required">
                                    <input class="input100" type="password" name="pass" onChange={this.handlePasswordChange} value={password} placeholder="Password" required />
                                    <span class="focus-input100"></span>
                                    <span class="symbol-input100">
                                        <i class="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" type="button" onClick={this.handleLogin}>
                                        Login
                                    </button>
                                </div>

                                <div className="text-center p-t-12">
                                    <span className="txt1">
                                        Forgot
                                    </span>
                                    <a className="txt2" href="#">
                                        Username / Password?
                                    </a>
                                </div>

                                <div className="text-center p-t-136">
                                    <a className="txt2" href="#">
                                        Create your Account
                                        <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Login;