// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  signOut: path(ROOTS_AUTH, '/signout'),
  error: path(ROOTS_AUTH, '/error'),
  verifyRequest: path(ROOTS_AUTH, '/verify-request'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  calendario: path(ROOTS_DASHBOARD, '/calendario'),
  recomendaciones: path(ROOTS_DASHBOARD, '/recomendaciones'),
  ordenes: path(ROOTS_DASHBOARD, '/ordenes'),
  coordinar: path(ROOTS_DASHBOARD, '/coordinar'),
  crearOrden: path(ROOTS_DASHBOARD, '/crear-orden'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};
