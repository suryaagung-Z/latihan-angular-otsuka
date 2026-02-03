import { MST_PROFILE_CODE } from 'src/constants';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // {
  //   id: 131,
  //   label: 'MENUITEMS.DASHBOARD.TEXT',
  //   icon: 'ri-dashboard-line',
  //   link: '/',
  //   role: ['All']
  // },

  {
    id:132,
    label:'Master',
    icon:'ri-folder-line',
    subItems: [
      {
        id:1,
        label:'Master Role',
        icon:'ri-shield-line',
        link:'/pages-aja/master/role'
      },
      {
        id: 2,
        label: 'Master Department',
        icon: 'ri-building-2-line',
        link: '/pages-aja/master/department'
      }
    ]
  },
  {
    id:133,
    label:'Todos',
    icon:'ri-todo-line',
    subItems: [
      {
        id:1,
        label:'Todo List',
        icon:'ri-shield-line',
        link:'/pages-aja/todo/list'
      }
    ]
  }

  // {
  //   id: 131,
  //   label: 'MENUITEMS.INBOX.TEXT',
  //   icon: 'ri-inbox-line',
  //   link: '/widgets'
  // },
];
