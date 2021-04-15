
import actionTypes from '../actionTypes'

const initialState = {
  user: {
    username: '',
    location: '',
    size: '',
    brand: '',
    photo: null
  },
  signedIn: false,
};

const signedInReducer = (state, action) => {
  return Object.assign({}, state, {
    signedIn: true
  });
};
const updateUserReducer = (state, action) => {
  return Object.assign({}, state, {
    user: action.payload,
    signedIn: true
  });
};

const logoutReducer = (state, action) => {
  return Object.assign({}, initialState)
};



const rootReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case actionTypes.SignedIn:
      return signedInReducer(state, action);
    case actionTypes.Logout:
      return logoutReducer(state, action);
    case actionTypes.Update_User:
      return updateUserReducer(state, action);


    default:
      return state;
  }
};

export default rootReducer;



