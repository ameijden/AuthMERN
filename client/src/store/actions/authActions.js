
import actionTypes from '../actionTypes';


export function SignedInAction() {
  return { type:actionTypes.SignedIn}
};

export function LogoutAction() {
  return { type:actionTypes.Logout }
};

export function UpdateUserAction(payload) {
  return { type:actionTypes.Update_User, payload }
};

