import { link } from 'src/common/urls';

export const navMenuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    separator: true,
    link: '/dashboard',
  },
  {
    icon: 'history',
    label: 'Feed history',
    separator: false,
    link: link.history.index,
  },
  {
    icon: 'view_list',
    label: 'Device log',
    separator: false,
    link: link.deviceLog.index,
  },
  {
    icon: 'date_range',
    label: 'Schedule',
    separator: true,
    link: link.schedule.index,
  },
  {
    icon: 'people',
    label: 'Users',
    separator: false,
    link: link.users.index,
  },
  {
    icon: 'device_hub',
    label: 'Devices',
    separator: false,
    link: link.device.index,
  },
];
