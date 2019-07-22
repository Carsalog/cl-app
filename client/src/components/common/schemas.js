import Joi from "joi-browser";


export const postSchema = () => ({
  description: Joi.string().min(5).max(3000).required().label("Description"),
  tag: Joi.string().min(2).allow('').max(20).label("Tag"),
  tags: Joi.array(),
  images: Joi.array(),
  state: Joi.string().required().label("State"),
  city: Joi.string().required().label("City"),
  model: Joi.string().required().label("Model"),
  transmission: Joi.string().required().label("Transmission"),
  mileage: Joi.number().integer().required().label("Mileage"),
  price: Joi.number().integer().required().label("Price")
});

export const loginSchema = () => ({
  email: Joi.string().email({minDomainAtoms: 2}).required().label("Email"),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
    .required()
    .label("Password")
});

export const userSchema = self => ({
  email: Joi.string().email({minDomainAtoms: 2}).required().label("Email"),
  password: self.pw.label("Password"),
  passwordConf: self.pw.label("Confirm password"),
  firstName: Joi.string().regex(/^[A-Z][a-z]{1,50}$/).required(),
  lastName: Joi.string().regex(/^[A-Z][a-z]{1,50}$/).required(),
  phone: Joi.string().regex(/^\d{6,20}$/).required()
});

export const pwSchema = () => Joi.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
  .required();

export const vinSchema = () => ({
  vin: Joi.string().required().length(17).label("VIN")
});

export const finalSchema = () => ({
  tag: Joi.string().min(2).allow('').max(20),
  images: Joi.array().required()
});

export const zipSchema = () => ({
  zip: Joi.number().integer().min(1001).max(99999).required()
});

export const placeSchema = () => ({
  state: Joi.string().required(),
  city: Joi.string().required()
});


export const chatSchema = () => ({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
  message: Joi.string().required()
});
