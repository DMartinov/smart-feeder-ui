import url from 'src/common/urls';

export const navMenuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    separator: true,
    link: '/',
  },
  {
    icon: 'history',
    label: 'Feed history',
    separator: false,
    link: url.history.index,
  },
  {
    icon: 'view_list',
    label: 'Device log',
    separator: false,
    link: url.deviceLog.index,
  },
  {
    icon: 'date_range',
    label: 'Schedule',
    separator: true,
    link: url.schedule.index,
  },
  {
    icon: 'people',
    label: 'Users',
    separator: false,
    link: url.users.index,
  },
];
