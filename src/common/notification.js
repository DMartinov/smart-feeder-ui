import { Notify } from 'quasar';

export const notifyError = (message) => {
  Notify.create({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message,
  });
};

export const notifySuccess = (message) => {
  Notify.create({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message,
  });
};

export const notifyInfo = (message) => {
  Notify.create({
    type: 'info',
    message,
  });
};
