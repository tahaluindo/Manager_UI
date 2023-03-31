// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
  {
    id: 'Roster',
    title: 'Roster',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'Attendant Roster',
        title: 'Attendant Roster',
        icon: <Circle size={12} />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'Supervisor Roster',
        title: 'Supervisor Roster',
        icon: <Circle size={12} />,
        navLink: '/dashboard/ecommerce'
      }
    ]
  }
]
