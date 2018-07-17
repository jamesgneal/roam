import React from 'react';
import { Button, Fa, Modal, ModalBody, ModalFooter, ModalHeader } from 'mdbreact';
import './PinBtn.css';

class PinBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            locName: "",
            locComment: "",
            locCategory: "",
            locPhoto: { file: '', imagePreviewUrl: '' }
        };

        this.toggle = this.toggle.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
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
            $imagePreview = (<img src={imagePreviewUrl} alt=" "/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (

            <div className="save-location-btn modal-container">
                <Button className="btn-large" onClick={this.toggle}
                >+</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size="fluid" position="bottom">
                    <ModalHeader toggle={this.toggle} className="header"></ModalHeader>
                    <ModalBody>

                        <div className="form-group">
                            <label> Category:</label>
                            <select className="form-control" onChange={this.handleInputChange} name="locCategory">
                                <option>Brewery</option>
                                <option>Restaurants</option>
                                <option>Local Flavor</option>
                                <option>Concert Venue</option>
                                <option>Parks</option>
                            </select>
                        </div>

                        <br></br>
                        <label>Location Name</label>
                        <input type="text" className="form-control form-control-lg" label="Loaction Name" id="location-name" name="locName" onChange={this.handleInputChange} />
                        <label>Comments</label>
                        <input type="textarea" className="form-control form-control-lg" label="Add Comments" id="location-comment" name="locComment" onChange={this.handleInputChange} />
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input className="fileInput"
                                type="file"
                                onChange={(e) => this.handleImageChange(e)} />
                            <Button className="btn-large-modal btn-large-left" onClick={(e) => this.handleSubmit(e)}><Fa icon="camera-retro" size="2x" /></Button>{' '}
                        </form>
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                        <span className="add-photo"> Add Photo </span>
                    </ModalBody>


                <ModalFooter className="footer">

                    <Button className="btn-large-modal" onClick={this.toggle}><Fa icon="times" size="2x" /></Button>{' '}
                    <Button className="btn-large-modal"
                        onClick={() => {
                            this.props.newPin({
                                name: this.state.locName,
                                location: {
                                    lat: this.props.userLoc.lat,
                                    long: this.props.userLoc.lng
                                },
                                user: this.props.user,
                                comments: this.state.locComment,
                                category: this.state.locCategory,
                                //locPhoto: this.state.locPhoto
                            });
                            // console.log({
                            //     name: this.state.locName,
                            //     location: {
                            //       lat: this.props.latlng.lat,
                            //       long: this.props.latlng.lng
                            //     },
                            //     user: this.props.user,
                            //     comments: this.state.LocComment,
                            //     category: this.state.locCategory

                            //   });
                            this.setState({
                                modal: false
                            });
                        }}
                    ><Fa icon="save" size="2x" /></Button>
                </ModalFooter>
                </Modal>


            </div >

        );
    }

}

export default PinBtn;

