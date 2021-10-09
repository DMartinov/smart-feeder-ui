export const base64ToObject = (base64Payload) => decodeURIComponent(escape(atob(base64Payload)));

export const parseJwt = (token) => {
  const base64Payload = token.split('.')[1];

  return base64ToObject(base64Payload);
};

export const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'Invalid email';
};
