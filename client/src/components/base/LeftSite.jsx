import React from 'react';
import {connect} from "react-redux";
import Form from "../common/form";
import {getZip} from "../../actions";
import {updateZipConfirm} from "../../actions";
import {cookies} from "../../loader";
import {zipSchema} from "../common/schemas";
import ZipCard from './ZipCard';


export class LeftSite extends Form {

  constructor(props) {

    super(props);

    this.state = {
      data: {zip: ""},
      errors: {}
    };

    this.schema = zipSchema();
  }

  componentDidMount() {

    const zip = cookies.get('zip');

    if (zip) this.setState({data: {zip}, errors: this.state.errors});
  }

  doSubmit = () => this.props.onGetZip(
    `${this.props.config.urls.zips}/${this.state.data.zip}`);

  handleUpdateZipConfirm = () => this.props.onUpdateZipConfirm({zip: true});


  render() {

    const {zip, confirms, config} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="modal-header h3 text-muted flex-center">Zip code</h1>
        {this.renderInput("zip", "Zip", "text", true)}
        {this.renderButton("submit")}
        {zip && !confirms.zip &&
        <ZipCard id="zip-card"
          zip={zip}
          zipConfirm={this.handleUpdateZipConfirm}
          renderLink={this.renderLink}
          zipMsg={config.messages.zipMsg}/>
        }
      </form>
    );
  }
}

export default connect(
  state => ({
    confirms: state.confirms,
    zip: state.zip,
    config: state.config
  }),
  dispatch => ({
    onGetZip: url => dispatch(getZip(url)),
    onUpdateZipConfirm: confirms => dispatch(updateZipConfirm(confirms))
  })
)(LeftSite);