// eslint-disable-next-line import/no-mutable-exports
let application;
if (import.meta.env.VITE_WEB) {
  application = import('./main-web')
} else {
  application = import('./main-wc')
}

export default application;
