import { isValidEmail } from '../common/utils';

export default () => ({
  emailRules: [
    (val) => (val != null && isValidEmail(val)) || 'Invalid email',
  ],
  passwordRules: [(val) => (val != null && val.length > 8) || 'Please use minimum 8 characters'],
  nameRules: [
    (val) => val?.length >= 3 || 'Name must be more than 3 characters',
    (val) => val?.length < 30 || 'Name must be less than 30 characters',
  ],
});
