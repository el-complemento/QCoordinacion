// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  carrito: icon('ic_cart'),
  Album: icon('ic_album'),
  ClipboardList: icon('ic_clipboard-list'),
  Activity: icon('ic_activity'),
  calendar: icon('ic_calendar-days'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Menú',
    items: [
      {
        title: 'Ordenes',
        path: PATH_DASHBOARD.ordenes.root,
        icon: ICONS.ClipboardList,
        children: [
          { title: 'Ver ordenes', path: PATH_DASHBOARD.ordenes.verOrdenes },
          { title: '', path: PATH_DASHBOARD.ordenes.verOrdenes },
          { title: 'Crear orden', path: PATH_DASHBOARD.ordenes.crearOrden },
        ],
      },
      { title: 'Coordinar', path: PATH_DASHBOARD.recomendaciones, icon: ICONS.Activity },
      { title: 'Calendario', path: PATH_DASHBOARD.calendario, icon: ICONS.calendar },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administración',
    items: [
      {
        title: 'Usuario',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;
