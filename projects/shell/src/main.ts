import { initFederation } from '@angular-architects/module-federation';

initFederation('http://localhost:3000/bootstrap-remotes')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
