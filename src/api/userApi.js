import url from '../common/urls';
import { parseJwt } from '../common/utils';
import { post } from '../common/apiClient';

export default {
  async logIn(email, password) {
    const response = await post(url.user.logIn, { email, password });
    const userData = parseJwt(response);

    return { accessToken: response, user: userData };
  },
};
