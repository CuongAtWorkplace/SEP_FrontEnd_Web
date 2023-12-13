import "./add.scss";
import React, { Component } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

  validateForm = () => {
    const { email, password, phone, roleName, fullName } = this.state;

    const fullNameRegex = /^[a-zA-Z]+$/;
    if (!fullNameRegex.test(fullName)) {
      this.setValidationError('fullName', 'Full name is not valid.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setValidationError('email', 'Email is not valid.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      this.setValidationError('password', 'Password must be at least 8 characters, at least one letter and one number.');
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      this.setValidationError('phone', 'Phone is not valid. Phone number must have 10 digits.');
      return false;
    }

    if (roleName === 'None') {
      this.setValidationError('roleName', 'Please select a role.');
      return false;
    }

    return true;
  };

  // validateRole = () => {
  //   const { roleName } = this.state;
  //   if (roleName === 'None') {
  //     this.setValidationError('role', 'Please select a role.');
  //     return false;
  //   }
  //   return true;
  // };

  setValidationError = (field, message) => {
    this.setState(prevState => ({
      validationErrors: {
        ...prevState.validationErrors,
        [field]: message,
      },
    }));
  };


  handleAddNewUser = () => {
    this.setState({ validationErrors: {} }); // Clear all validation errors

    if (this.checkValidInput() && this.validateForm()) {
      this.props.createNewUser(this.state);
    } else {
      this.setState({ validationError: 'Please fill in all required fields.' });
    }
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
                  {/* <option></option>
                  <option value="Teacher">Teacher</option>
                  <option value="Manager">Manager</option> */}
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {/* <MenuItem value="None">None</MenuItem> */}
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
          {/* {this.state.validationError && <div className="validation-error">{this.state.validationError}</div>} */}

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
