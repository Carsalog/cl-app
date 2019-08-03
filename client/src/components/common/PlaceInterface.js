import Form from "./form";
import {store} from "../../loader";
import {getCities, setCities, setState, setCity, setCar} from "../../actions";


class PlaceInterface extends Form {

  findState = stateId => this.props.states.find(s => s._id === stateId);

  findCity = cityId => this.props.cities.find(c => c._id === cityId);

  findModel = modelId => this.props.make.models.filter(model => model._id === modelId)[0];

  onSetState = state => store.dispatch(setState(state));

  onSetCities = cities => store.dispatch(setCities(cities));

  onSetCity = city => store.dispatch(setCity(city));

  onSetCar = car => store.dispatch(setCar(car));

  cleanCity = () => {

    // Reset city property in the store
    this.onSetCity({});

    // Reset state > data > city
    const data = {...this.state.data};
    data.city = "";
    this.setState({data});
  };

  uploadCitiesByState = input => {
    const {urls} = store.getState().config;
    store.dispatch(this.onSetState(this.findState(input.value)));
    store.dispatch(getCities(`${urls.cities}/by/state/${input.value}`));
  };

  onSelectState = ({currentTarget: input}) => {

    // Reset cities
    this.onSetCities([]);

    this.handleChange({currentTarget: input});

    if (Object.keys(this.props.city).length > 0) this.cleanCity();

    if (!this.state.errors.state) this.uploadCitiesByState(input);
  };

  onSelectCity = ({currentTarget: input}) => {

    this.handleChange({currentTarget: input});

    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    if (input.value) this.onSetCity(this.findCity(input.value));
  };

  handleSelectTransmission = ({currentTarget: input}) => {

    this.handleChange({currentTarget: input});

    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
  };

  handleSelectModel = ({currentTarget: input}) => {

    this.handleChange({currentTarget: input});

    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.props.onSetModel(this.findModel(input.value));
  };

  handleCancel = () => {
    const car = store.getState().car;
    if (car) this.onSetCar(null);
    this.props.history.replace("/profile")
  };

  renderStates = () => {
    const {states} = this.props;
    return states.length > 0 && this.renderSelect("state", "States", states, this.onSelectState);
  };

  renderCities = () => {
    const {cities} = this.props;
    return cities.length > 0 && this.renderSelect("city", "City", cities, this.onSelectCity)
  };

  renderModels = models => {
    return models.length > 0 && this.renderSelect("model", "Model", models, this.handleSelectModel)
  }
}

export default PlaceInterface;
