const base = {
  zip: false
};

const confirms = (state = base, action) => {
  switch (action.type) {
    case 'UPDATE_CONFIRMS':
      return action.payload;
    default:
      return state
  }
};

export default confirms;