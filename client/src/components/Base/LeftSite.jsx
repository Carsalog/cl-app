import React from 'react';
import {connect} from "react-redux";
import Form from "../common/form";
import {getZip, setZip} from "../../actions";
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

    if (zip) this.setState({
        data: {zip},
        errors: this.state.errors
      });
  }

  reset = () => {
    // Reset zip confirmation
    this.props.onUpdateZipConfirm({zip: false});

    // Reset zip, state, and city
    this.props.onSetZip(null);
  };

  doSubmit = () => {

    this.reset();

    const url = `${this.props.urls.zips}/${this.state.data.zip}`;
    return this.props.onGetZip(url);
  };

  handleUpdateZipConfirm = () => this.props.onUpdateZipConfirm({zip: true});

  handleResetZip = () => this.props.onSetZip(null);

  render() {

    const {zip, confirms, config} = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h1 className="base__header">Zip code</h1>
        {this.renderInput("zip", "Zip", "text", true)}
        {!(zip && !confirms.zip) && (
          <div className="form__btn-container">
            {this.renderButton("submit")}
          </div>
        )}
        {zip && !confirms.zip &&
        <ZipCard id="zip-card"
          zip={zip}
          zipConfirm={this.handleUpdateZipConfirm}
          renderLink={this.renderLink}
          resetZip={this.handleResetZip}
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
    config: state.config,
    urls: state.config.urls
  }),
  dispatch => ({
    onGetZip: url => dispatch(getZip(url)),
    onSetZip: zip => dispatch(setZip(zip)),
    onUpdateZipConfirm: confirms => dispatch(updateZipConfirm(confirms))
  })
)(LeftSite);