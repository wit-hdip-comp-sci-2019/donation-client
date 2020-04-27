import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'donate'],
        name: 'Donate',
        moduleId: PLATFORM.moduleName('views/donate'),
        nav: true,
        title: 'Donate'
      },
      {
        route: 'candidates',
        name: 'candidates',
        moduleId: PLATFORM.moduleName('views/candidates'),
        nav: true,
        title: 'Candidate'
      }
    ]);
    this.router = router;
  }
}
