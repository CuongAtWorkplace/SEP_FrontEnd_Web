
import React, { Component } from "react";
// import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import "./css/main.css";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../../paths";
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            adress:'',
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };
    handleLogin = async () => {
        const { email, password, } = this.state;
        try {
            const response = await fetch(`'${API_BASE_URL}/api/Login`, {
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

                // this.setState({ nameUser: decodedToken.fullname });
                // this.setState({ showModal: false, IsLogin: true })
                // this.setState({ checkLogin: true });

                // if (decodedToken.roleid == 2) {
                //     window.location.href = "/";
                // }
                // if (decodedToken.roleid == 1 || decodedToken.roleid == 3 || decodedToken.roleid == 4 || decodedToken.roleid == 5) {
                //     window.location.href = "/manager";
                // }
            } else {
                console.log('Đăng nhập thất bại');
                this.setState({ checkLogin: false });
            }
        } catch (error) {
            console.log('Lỗi gọi API', error);
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
                                <img src="./KnocoLogo.ico" alt="IMG"/>
                            </div>

                            <form class="login100-form validate-form">
                                <span class="login100-form-title">
                                    Member Login
                                </span>
                                <div class="wrap-input100 validate-input" >
                                    <input class="input100" type="text" name="fullname" onChange={this.handlePasswordChange} value={password} placeholder="Full Name"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                </div>
                                <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <input class="input100" type="text" name="email"  onChange={this.handleEmailChange} value={email} placeholder="Email"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                </div>

                                <div class="wrap-input100 validate-input" data-validate="Password is required">
                                    <input class="input100" type="password" name="pass" onChange={this.handlePasswordChange} value={password} placeholder="Password"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input class="input100" type="text" name="adress" onChange={this.handlePasswordChange} value={password} placeholder="Address"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                </div>
                                <div class="wrap-input100 validate-input" >
                                    <input class="input100" type="text" name="phonenumber" onChange={this.handlePasswordChange} value={password} placeholder="phonenumber"/>
                                        <span class="focus-input100"></span>
                                        <span class="symbol-input100">
                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                </div>
                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn"  onClick={this.handleLogin}>
                                        Login
                                    </button>
                                </div>

                                <div class="text-center p-t-12">
                                    <span class="txt1">
                                        Forgot
                                    </span>
                                    <a class="txt2" href="#">
                                        Username / Password?
                                    </a>
                                </div>

                                <div class="text-center p-t-136">
                                    <a class="txt2" href="#">
                                        Create your Account
                                        <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
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
export default Register;