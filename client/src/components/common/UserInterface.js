import Form from "./form";
import {pwSchema, userSchema} from "./schemas";
import http from "../../services/http";
import {store} from "../../loader";

class UserInterface extends Form {

  pw = pwSchema();

  schema = userSchema(this);

  msg = store.getState().config.messages;

  onServerResponse = (res, name) => {
    if (res && res.data) {
      const errors = {...this.state.errors};
      errors[name] = this.msg.emailTakenError;
      this.setState({errors});
    }
  };

  handleEmail = ({currentTarget: input}) => {
    if (input.value.length) {
      const url = `${(store.getState()).config.urls.users}/${input.value}`;
      http.get(url).then(res => this.onServerResponse(res, input.name));
    }
  };
}

export default UserInterface;