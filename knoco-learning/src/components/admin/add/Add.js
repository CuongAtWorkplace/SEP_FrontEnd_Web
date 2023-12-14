import "./add.scss";
import React, { Component } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { API_BASE_URL } from "../../../paths";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      roleName: 'None',
      address: '',
      validationErrors: {
        email: '',
        password: '',
        phone: '',
        roleName: '',
      }
    };
  }

  toggle = () => {
    this.props.toggleModal();
  };

  handleOnChangeInput = (event, id) => {
    this.setState(prevState => ({
      ...prevState,
      validationErrors: {
        ...prevState.validationErrors,
        [id]: '', // Clear validation error when the user starts typing
      },
      [id]: event.target.value,
    }));
  };

  checkValidInput = () => {
    return Object.values(this.state).every(value => Boolean(value));
  };

  validateFormAdd = () => {
    const { email, password, phone, roleName, fullName } = this.state;

    // const fullNameValidate = /^[a-zA-Z]{2,30}$/;
    // if (!fullNameValidate.test(fullName)) {
    //   this.setValidationError('fullName', 'Full name must be letters and have at least 2 characters.');
    //   return false;
    // }

    const emailValaidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValaidate.test(email)) {
      this.setValidationError('email', 'Email is not valid.');
      return false;
    }

    const passwordValidate = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordValidate.test(password)) {
      this.setValidationError('password', 'Password must be at least 8 characters, at least one letter and one number.');
      return false;
    }

    const phoneValidate = /^\d{10}$/;
    if (!phoneValidate.test(phone)) {
      this.setValidationError('phone', 'Phone is not valid. Phone number must have 10 digits.');
      return false;
    }

    if (roleName === 'None') {
      this.setValidationError('roleName', 'Please select a role.');
      return false;
    }

    return true;
  };

  setValidationError = (field, message) => {
    this.setState(prevState => ({
      validationErrors: {
        ...prevState.validationErrors,
        [field]: message,
      },
    }));
  };

  async checkEmailExistence(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Admin/checkemail?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        return data.exists; // Giả sử API trả về một đối tượng có thuộc tính 'exists'
      } else {
        console.error('Error checking email existence:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
      return false;
    }
  }

  handleAddNewUser = async () => {

    this.setState({ validationErrors: {} }); // Clear all validation errors

    if (this.checkValidInput() && this.validateFormAdd()) {
      const emailExists = await this.checkEmailExistence(this.state.email);
      if (emailExists) {
        this.setValidationError('email', 'Email already exists.');
      } else {
        this.props.createNewUser(this.state);
      }
    } else {
      this.setState({ validationError: 'Please fill in all required fields.' });
    }

    // this.setState({ validationErrors: {} }); // Clear all validation errors

    // if (this.checkValidInput() && this.validateForm()) {
    //   this.props.createNewUser(this.state);
    // } else {
    //   this.setState({ validationError: 'Please fill in all required fields.' });
    // }
  };

  render() {

    return (
      <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user'} size="lg" aria-labelledby="modal-title">
        <ModalHeader id="modal-title" style={{ color: 'white', backgroundColor: 'blueviolet' }} toggle={() => { this.toggle() }} >Add new</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label className="textInput">Full Name: <span className="errmsg">*</span></label>
                <TextField type="text" className="form-control" required
                  onChange={(event) => { this.handleOnChangeInput(event, "fullName") }} value={this.state.fullName} />
                {this.state.validationErrors.fullName && <div className="errmsg">{this.state.validationErrors.fullName}</div>}
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Email: <span className="errmsg">*</span></label>
                <TextField type="email" className="form-control" required placeholder="user@example.com"
                  onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
                {this.state.validationErrors.email && <div className="errmsg">{this.state.validationErrors.email}</div>}
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Password: <span className="errmsg">*</span></label>
                <TextField type="password" className="form-control" required
                  onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} />
                {this.state.validationErrors.password && <div className="errmsg">{this.state.validationErrors.password}</div>}
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Phone: <span className="errmsg">*</span></label>
                <TextField type="text" className="form-control" required maxLength={10}
                  onChange={(event) => { this.handleOnChangeInput(event, "phone") }} value={this.state.phone} />
                {this.state.validationErrors.phone && <div className="errmsg">{this.state.validationErrors.phone}</div>}
              </div>
              <div className="col-6 form-group">
                <label className="textInput">Role: <span className="errmsg">*</span></label>
                <Select className="form-control" required onChange={(event) => { this.handleOnChangeInput(event, "roleName") }} value={this.state.roleName}>
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                {this.state.validationErrors.roleName && <div className="errmsg">{this.state.validationErrors.roleName}</div>}
              </div>
              <div className="col-12 form-group">
                <label className="textInput">Address: <span className="errmsg">*</span></label>
                <textarea type="text" className="form-control"
                  onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
              </div>
            </div>
            {this.state.validationError && <div className="errmsg">{this.state.validationError}</div>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={() => { this.handleAddNewUser() }}>Add</Button>{' '}
          <Button variant="contained" color="error" onClick={() => { this.toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
};

export default Add;
