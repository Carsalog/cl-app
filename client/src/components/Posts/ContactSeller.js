import React from 'react';
import Form from "../common/form";
import {chatSchema} from "../common/schemas";


class ContactSeller extends Form {

  state = {
    show: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    },
    errors: {}
  };

  schema = chatSchema();

  doSubmit = () => {
    console.log(this.state.data);
  };

  getMessage = () => {
    const {post} = this.props;
    const title = `${post.year} ${post.car.make} ${post.car.model}`;
    return `I'd like to know if the ${title} you have listed on carsalog.com for ${post.price} is still available.`;
  };

  componentDidMount() {
    const {user} = this.props;
    const state = {...this.state};

    if (user) {
      state.data.firstName = user.firstName;
      state.data.lastName = user.lastName;
      state.data.email = user.email;
      state.data.phone = user.phone;
    }

    state.data.message = this.getMessage();
    this.setState(state);
  }

  handleDisplayContact = () => this.setState({show: true});


  render() {

    const {show} = this.state;
    const {author, make, model, price} = this.props.post;
    const subject = `${make.name} ${model.name} for $${price} on carsalog.com`;

    return (
      <React.Fragment>
        <h1 className="h5">Check availability</h1>
        <hr/>
        {!show && <span onClick={this.handleDisplayContact} className="link-blue pointer">SHOW CONTACT</span>}
        {show && (
          <div>
            <div className="h6">{author.firstName} {author.lastName}</div>
            <div><b><i className="fa fa-phone" aria-hidden="true" /></b> +1 {author.phone}</div>
            <div>
              <a
                href={`mailto:${author.email}?subject=${subject}`}
                target="_blank"
                className="link-gray">
                <i className="fa fa-envelope-o h5" aria-hidden="true" />
                <span className="pl-2">{author.email}</span>
              </a>
            </div>
          </div>
        )}
        <hr/>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First name*")}
          {this.renderInput("lastName", "Last name*")}
          {this.renderInput("email", "Email*")}
          {this.renderInput("phone", "Phone*")}
          {this.renderTextarea("message", "Message*", false, "form-group")}
          <hr/>
          {this.renderButton("SEND")}
        </form>
      </React.Fragment>
    );
  }
}

export default ContactSeller;
