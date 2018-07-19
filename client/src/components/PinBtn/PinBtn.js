import React from "react";
import {
  Button,
  Fa,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "mdbreact";
import axios from "axios";
import "./PinBtn.css";

class PinBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      locName: "",
      locComment: "",
      locCategory: "",
      locPhoto: { file: "", imagePreviewUrl: "" },
      imgCheck: false,
      locImgur: "",
      errorMessage: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    if (this.state.imgCheck) {
      console.log("handle uploading-");
      let tempImgUrl = this.state.imagePreviewUrl.split(",");
      let image = tempImgUrl[1];
      let form = new FormData();
      form.append("image", image);
      console.log(image);

      const myClientID = "bee8ee0ba7a0d8c";

      const config = {
        baseURL: "https://api.imgur.com",
        headers: {
          Authorization: "Client-ID " + myClientID
        }
      };
      axios
        .post("/3/image", form, config)
        .then(result => {
          console.log("image post success");
          console.log(result);
          this.setState({
            locImgur: result.data.data.link
          });
          this.props.newPin({
            name: this.state.locName,
            location: {
              lat: this.props.userLoc.lat,
              long: this.props.userLoc.lng
            },
            user: this.props.user,
            comments: this.state.locComment,
            category: this.state.locCategory,
            image: this.state.locImgur
          });
          this.setState({
            modal: false
          });
        })
        .catch(error => {
          console.log("image post error");
          console.log(error);
        });
    } else {
      this.setState({
        errorMessage: "Please add a photo"
      });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        errorMessage: "",
        imgCheck: true
      });
    };

    reader.readAsDataURL(file);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img id="img-loader" src={imagePreviewUrl} alt=" " />;
    }
    // else {
    //   $imagePreview = (
    //     <div className="preview-text">Add a photo</div>
    //   );
    //}
    return (
      <div className="container">
        <div id="button-holder">
          <Button className="btn-large save-location-btn" onClick={this.toggle}>
            +
          </Button>
        </div>
        <div className="modal-container">
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            size="fluid"
            position="bottom"
          >
            <ModalHeader className="header">Add New Location</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label> Category:</label>
                <select
                  className="form-control"
                  onChange={this.handleInputChange}
                  name="locCategory"
                >
                  <option>Brewery</option>
                  <option>Restaurants</option>
                  <option>Local Flavor</option>
                  <option>Concert Venue</option>
                  <option>Parks</option>
                </select>
              </div>
              <label>Location Name</label>
              <input
                type="text"
                className="form-control"
                label="Loaction Name"
                id="location-name"
                name="locName"
                onChange={this.handleInputChange}
              />
              <label>Comments</label>
              <textarea
                type="textarea"
                className="form-control form-control-lg"
                label="Add Comments"
                id="location-comment"
                name="locComment"
                onChange={this.handleInputChange}
              />
              <form>
                <input
                  className="input-file"
                  type="file"
                  id="photo-upload"
                  onChange={e => this.handleImageChange(e)}
                />
                <label htmlFor="photo-upload" className="btn-large-modal">
                  <i class="material-icons md-24" id="photo-icon">
                    photo_camera
                  </i>
                </label>
                <div className="img-preview">{$imagePreview}</div>
              </form>
              <span className=".error-message">{this.state.errorMessage}</span>
            </ModalBody>
            <ModalFooter className="footer">
              <Button className="btn-large-modal" onClick={this.toggle}>
                <i class="material-icons md-24">cancel</i>
              </Button>{" "}
              <Button
                className="btn-large-modal"
                onClick={e => this.handleSubmit(e)}
              >
                <i class="material-icons md-24">save</i>
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PinBtn;
