import { store } from "../loader";

export default () => {
  const {make, model, state, city, config} = store.getState();
  
  let url = `${config.urls.posts}?`;
  if (state) url += `&state=${state.name}`;
  if (city) url += `&city=${city.name}`;
  if (make) url += `&make=${make.name}`;
  if (model) url += `&model=${model.name}`;
  if (state && city) return url;
}