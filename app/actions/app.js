import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['response'],
  loginFailure: null,
});

export const AppTypes = Types;
export default Creators;