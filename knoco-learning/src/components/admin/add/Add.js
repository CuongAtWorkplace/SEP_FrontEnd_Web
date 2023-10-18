import "./add.scss";
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // formData: {
        fullName: '',
        email: '',
        phone: '',
        status: false,
        address: ''
      // }
    };
  }

  // addNewUser = async (data) => {
  //   await fetch(`https://localhost:7169/api/Admin/AddNewUser`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  // }

  componentDidMount() {

  }

  toggle = () => {
    this.props.toggleModal();
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState
    });
  }

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ['fullName', 'email', 'phone', 'status', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('Missing parameter:' + arrInput[i]);
        break;
      }
    }
    return isValid;
  }

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      //call api add user
      this.props.createNewUser(this.state);
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user'} size="lg" >
        <ModalHeader style={{ color: 'white', backgroundColor: 'blueviolet' }} toggle={() => { this.toggle() }} >Add new</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" placeholder="Enter fullname"
                  onChange={(event) => { this.handleOnChangeInput(event, "fullName") }} value={this.state.fullName} />
              </div>
              <div className="col-6 form-group">
                <label>Email</label>
                <input type="text" className="form-control" placeholder="Enter email"
                  onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
              </div>
              <div className="col-6 form-group">
                <label>Phone</label>
                <input type="text" className="form-control" placeholder="Enter phone"
                  onChange={(event) => { this.handleOnChangeInput(event, "phone") }} value={this.state.phone} />
              </div>
              <div className="col-6 form-group">
                <label>Status</label>
                <input type="text" className="form-control" placeholder="Enter status"
                  onChange={(event) => { this.handleOnChangeInput(event, "status") }} value={this.state.status} />
              </div>
              <div className="col-12 form-group">
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Enter address"
                  onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { this.handleAddNewUser() }}>Add</Button>{' '}
          <Button color="secondary" onClick={() => { this.toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
};

export default Add;
