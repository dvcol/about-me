import { Skill, Tag } from '~/models';

export const ngRgx = new Skill({ name: 'NgRx' });
export const ngXs = new Skill({ name: 'NgXs' });
export const angularMaterial = new Skill({ name: 'Angular Material' });
export const angularAnimation = new Skill({ name: 'Angular animation' });
export const angularServiceWorker = new Skill({ name: 'Angular Service worker' });

export const angular = new Skill({
  name: 'Angular',
  children: [ngRgx, ngXs, angularMaterial, angularAnimation, angularServiceWorker],
});

export const naiveUi = new Skill({ name: 'Naive UI' });
export const vue2 = new Skill({ name: 'Vue 2' });
// export const vue3 = new Skill({ name: 'Vue 3'},
export const compositionApi = new Skill({ name: 'Composition API' });
export const vuex = new Skill({ name: 'Vuex' });
// export const pinia = new Skill({ name: 'Pinia'},
// export const vuetify: Skill ={ name: 'Vuetify'},
export const vueI18n = new Skill({ name: 'Vue i18n' });

export const vue = new Skill({
  name: 'Vue',
  children: [vue2, compositionApi, vuex, vueI18n, naiveUi],
});

export const svelteNavigator = new Skill({ name: 'Svelte navigator' });
export const svelteI18n = new Skill({ name: 'Svelte i18n' });
export const svelteMui = new Skill({ name: 'Svelte Material UI' });

export const svelte = new Skill({
  name: 'Svelte',
  children: [svelteNavigator, svelteI18n, svelteMui],
});

export const reactMui = new Skill({ name: 'React Material UI (5+)' });
export const dndKit = new Skill({ name: 'dnd-kit' });
export const reactRedux = new Skill({ name: 'React-redux' });
export const reactRouter = new Skill({ name: 'React-router' });
export const reactTransitionGroup = new Skill({ name: 'React-transition-group' });

export const react = new Skill({
  name: 'React',
  children: [reactMui, dndKit, reactRedux, reactRouter, reactTransitionGroup],
});

export const solid = new Skill({ name: 'Solid' });
export const stencil = new Skill({ name: 'Stencil' });

export const mv3 = new Skill({ name: 'Manifest V3' });
export const contentScript = new Skill({ name: 'Content script' });
export const backgroundScript = new Skill({ name: 'Background script' });
export const webexMessaging = new Skill({ name: 'WebEx script messaging' });
export const syncStorage = new Skill({ name: 'WebEx synch storage' });

export const webEx = new Skill({
  name: 'Web extension',
  children: [mv3, contentScript, backgroundScript, webexMessaging, syncStorage],
});

export const moduleFederation = new Skill({ name: 'Module federation' });
export const webComponent = new Skill({ name: 'Web components' });
export const remoteEntry = new Skill({ name: 'Remote entry' });
export const shell = new Skill({ name: 'Shell Architecture' });
export const iframeIsolation = new Skill({ name: 'Iframe isolation' });
export const multipleRuntime = new Skill({ name: 'Multi framework runtime' });
export const multiFramework = new Skill({ name: 'Multi framework routing' });
export const importMap = new Skill({ name: 'Import map' });

export const microFrontend = new Skill({
  name: 'Micro Frontend',
  children: [moduleFederation, webComponent, remoteEntry, shell, iframeIsolation, multipleRuntime, multiFramework, importMap],
});

export const motion = new Skill({ name: 'Motion one' });
export const d3 = new Skill({ name: 'd3 library' });

export const animation = new Skill({
  name: 'Animation',
  children: [motion, d3, dndKit, angularAnimation, reactTransitionGroup],
});

export const bem = new Skill({ name: 'Block-Element-Modifier (BEM)' });
export const atomicCss = new Skill({ name: 'Atomic Css' });
export const componentLibrary = new Skill({ name: 'Custom Component Library' });
export const boostrap = new Skill({ name: 'Boostrap CSS' });

export const sass = new Skill({ name: 'Sass' });
export const css = new Skill({
  name: 'css',
  children: [sass, bem, atomicCss, componentLibrary, boostrap, angularMaterial, reactMui, svelteMui],
});

export const webpack = new Skill({ name: 'Webpack' });
export const rollup = new Skill({ name: 'Rollup' });
export const vite = new Skill({ name: 'Vite' });

export const bundler = new Skill({
  name: 'Bundler',
  children: [webpack, rollup, vite],
});

export const rxjs = new Skill({ name: 'Rxjs' });
export const redux = new Skill({ name: 'Redux' });
export const context = new Skill({ name: 'Context' });

export const state = new Skill({
  name: 'State Management',
  children: [rxjs, redux, context],
});

export const workbox = new Skill({ name: 'Workbox' });
export const vitePwa = new Skill({ name: 'Vite Pwa' });
export const preCaching = new Skill({ name: 'Pre Caching' });
export const backgroundSync = new Skill({ name: 'Background Sync' });
export const pushNotification = new Skill({ name: 'Push Notification' });
export const indexDb = new Skill({ name: 'Index Db' });
export const mobileWebApp = new Skill({ name: 'Installable Web App' });

export const pwa = new Skill({
  name: 'Progressive Web App',
  children: [workbox, vitePwa, preCaching, backgroundSync, pushNotification, indexDb, mobileWebApp],
});

export const jest = new Skill({ name: 'Jest' });
export const vitest = new Skill({ name: 'Vitest' });
export const junit = new Skill({ name: 'JUnit' });
export const typescript = new Skill({ name: 'Typescript' });
export const eslint = new Skill({ name: 'Eslint' });
export const stylelint = new Skill({ name: 'Stylelint' });
export const sonarlint = new Skill({ name: 'Sonarlint' });

export const quality = new Skill({
  name: 'Quality',
  children: [vitest, jest, typescript, eslint, stylelint, sonarlint, junit],
});

export const frontend = new Skill({
  name: 'Frontend',
  children: [angular, vue, svelte, react, solid, stencil, webEx, pwa, microFrontend, animation, css, bundler, state, quality],
});

export const jhipster = new Skill({ name: 'Jhipster' });
export const jenkins = new Skill({ name: 'Jenkins' });
export const gitLab = new Skill({ name: 'GitLab' });
export const githubAction = new Skill({ name: 'Github Action' });
export const turboRepo = new Skill({ name: 'Turbo Repo' });
export const monoRepo = new Skill({ name: 'Mono Repo' });
export const awsS3 = new Skill({ name: 'Aws S3' });
export const openShift = new Skill({ name: 'Openshift' });
export const docker = new Skill({ name: 'Docker' });
export const kube = new Skill({ name: 'Kubernetes' });
export const sonarqube = new Skill({ name: 'Sonarqube' });

export const devops = new Skill({
  name: 'Devops',
  children: [jhipster, jenkins, gitLab, githubAction, turboRepo, monoRepo, awsS3, openShift, docker, kube, sonarqube],
});

export const microService = new Skill({ name: 'Microservice' });
export const sql = new Skill({ name: 'SQL' });
export const rest = new Skill({ name: 'REST' });
export const soap = new Skill({ name: 'Soap' });

export const springBoot = new Skill({ name: 'Spring Boot' });
export const springData = new Skill({ name: 'Spring Data JPA' });
export const springMVC = new Skill({ name: 'Spring Web MVC' });
export const springBatch = new Skill({ name: 'Spring Batch' });

export const spring = new Skill({
  name: 'Spring',
  children: [springBoot, springData, springMVC, springBatch],
});

export const java = new Skill({ name: 'Java' });
export const hibernate = new Skill({ name: 'Hibernate' });
export const liquibase = new Skill({ name: 'Liquibase' });
export const nestJs = new Skill({ name: 'NestJs' });
export const backend = new Skill({
  name: 'Backend',
  children: [microService, sql, rest, soap, spring, hibernate, liquibase, nestJs, java],
});

export const scrum = new Skill({ name: 'Scrum' });
export const safe = new Skill({ name: 'SAFe' });
export const kanban = new Skill({ name: 'SAFe' });
export const agile = new Skill({ name: 'Agile', children: [scrum, safe, kanban] });

export const TDD = new Skill({ name: 'TDD', label: 'Test Driven Development' });
export const BDD = new Skill({ name: 'BDD', label: 'Behavior Driven Development' });
export const DDD = new Skill({ name: 'DDD', label: 'Domain Driven Design' });
export const solidPrinciples = new Skill({ name: 'SOLID' });
export const hexagonal = new Skill({ name: 'Hexagonal Architecture' });

export const method = new Skill({
  name: 'Method',
  children: [agile, TDD, BDD, DDD, solidPrinciples, hexagonal],
});

export const r = new Tag({ name: 'R', color: 'rgb(247 251 69)' });
export const stata = new Tag({ name: 'Stata', color: 'rgb(247 251 69)' });
export const sas = new Tag({ name: 'SAS', color: 'rgb(247 251 69)' });
export const python = new Tag({ name: 'SAS', color: 'rgb(247 251 69)' });
export const dataScience = new Skill({
  name: 'Data Science',
  children: [r, stata, sas, python, java],
  color: 'rgb(255 211 0)',
});

export const skills = new Skill({
  name: 'Skills',
  children: [frontend, devops, backend, method],
});
