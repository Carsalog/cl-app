import Form from "./form";
import {pwSchema, userSchema} from "./schemas";
import {checkEmail} from "../../actions";
import {store} from "../../loader";

class UserInterface extends Form {

  pw = pwSchema();

  schema = userSchema(this);

  msg = store.getState().config.messages;

  handleEmail = async ({currentTarget: input}) => {
    if (input.value.length) {

      const res = await checkEmail(input.value);

      if (res && res.data) {
        const errors = {...this.state.errors};
        errors[input.name] = this.msg.emailTakenError;
        await this.setState({errors});
      }
    }
  };
}

export default UserInterface;