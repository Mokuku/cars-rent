import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
      imageURL: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    this.setState({ imageURL: 'update' });
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:3000/${body.file}` });
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      imageURL:this.state.imageURL
    };

    console.log(expData);

    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state)
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }


  render() {
    const { errors } = this.state;
    const imgexist=this.state.imageURL;
    console.log(imgexist.length)
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add an Annoucement</h1>
              <p className="lead text-center">Add any Car Annoucement</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Car"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Price/Day"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  placeholder="About Car"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                
                 
                  <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                  </div>
                  <div>
                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                  </div>
                  <br />
                  <div>
                  <button onClick={this.handleUploadImage}>Upload</button>
                  </div>

                     {imgexist.length>0 ?             
                     <img src={this.state.imageURL} alt="img" />
                      :
                      <span></span>}
             

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
