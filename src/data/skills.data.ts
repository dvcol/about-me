import type { Skill } from '~/models';

export const ngRgx: Skill = { name: 'NgRx' };
export const ngXs: Skill = { name: 'NgXs' };
export const angularMaterial: Skill = { name: 'Angular Material' };
export const angularAnimation: Skill = { name: 'Angular animation' };
export const angularServiceWorker: Skill = { name: 'Angular Service worker' };

export const angular: Skill = {
  name: 'Angular',
  children: [ngRgx, ngXs, angularMaterial, angularAnimation, angularServiceWorker],
};

export const vue2: Skill = { name: 'Vue 2' };
// export const vue3: Skill = { name: 'Vue 3'},
export const compositionApi: Skill = { name: 'Composition API' };
export const vuex: Skill = { name: 'Vuex' };
// export const pinia: Skill = { name: 'Pinia'},
// export const vuetify: Skill ={ name: 'Vuetify'},
export const vueI18n: Skill = { name: 'Vue i18n' };

export const vue: Skill = {
  name: 'Vue',
  children: [vue2, compositionApi, vuex, vueI18n],
};

export const svelteNavigator: Skill = { name: 'Svelte navigator' };
export const svelteI18n: Skill = { name: 'Svelte i18n' };
export const svelteMui: Skill = { name: 'Svelte Material UI' };

export const svelte: Skill = {
  name: 'Svelte',
  children: [svelteNavigator, svelteI18n, svelteMui],
};

export const reactMui: Skill = { name: 'React Material UI (5+)' };
export const dndKit: Skill = { name: 'dnd-kit' };
export const reactRedux: Skill = { name: 'React-redux' };
export const reactRouter: Skill = { name: 'React-router' };
export const reactTransitionGroup: Skill = { name: 'React-transition-group' };

export const react: Skill = {
  name: 'React',
  children: [reactMui, dndKit, reactRedux, reactRouter, reactTransitionGroup],
};

export const solid: Skill = { name: 'Solid' };
export const stencil: Skill = { name: 'Stencil' };

export const mv3: Skill = { name: 'Manifest V3' };
export const contentScript: Skill = { name: 'Content script' };
export const backgroundScript: Skill = { name: 'Background script' };
export const webexMessaging: Skill = { name: 'WebEx script messaging' };
export const syncStorage: Skill = { name: 'WebEx synch storage' };

export const webEx: Skill = {
  name: 'Web extension',
  children: [mv3, contentScript, backgroundScript, webexMessaging, syncStorage],
};

export const moduleFederation: Skill = { name: 'Module federation' };
export const webComponent: Skill = { name: 'Web components' };
export const remoteEntry: Skill = { name: 'Remote entry' };
export const shell: Skill = { name: 'Shell Architecture' };
export const iframeIsolation: Skill = { name: 'Iframe isolation' };
export const multipleRuntime: Skill = { name: 'Multi framework runtime' };
export const multiFramework: Skill = { name: 'Multi framework routing' };

export const microFrontend: Skill = {
  name: 'Micro Frontend',
  children: [moduleFederation, webComponent, remoteEntry, shell, iframeIsolation, multipleRuntime, multiFramework],
};

export const motion: Skill = { name: 'Motion one' };
export const d3: Skill = { name: 'd3 library' };

export const animation = {
  name: 'Animation',
  children: [motion, d3, dndKit, angularAnimation, reactTransitionGroup],
};

export const bem: Skill = { name: 'Block-Element-Modifier (BEM)' };
export const atomicCss: Skill = { name: 'Atomic Css' };
export const componentLibrary: Skill = { name: 'Custom Component Library' };
export const boostrap: Skill = { name: 'Boostrap CSS' };

export const sass: Skill = { name: 'Sass' };
export const css: Skill = {
  name: 'css',
  children: [sass, bem, atomicCss, componentLibrary, boostrap, angularMaterial, reactMui, svelteMui],
};

export const webpack: Skill = { name: 'Webpack' };
export const rollup: Skill = { name: 'Rollup' };
export const vite: Skill = { name: 'Vite' };

export const bundler: Skill = {
  name: 'Bundler',
  children: [webpack, rollup, vite],
};

export const rxjs = { name: 'Rxjs' };
export const redux = { name: 'Redux' };
export const context = { name: 'Context' };

export const state: Skill = {
  name: 'State Management',
  children: [rxjs, redux, context],
};

export const jest = { name: 'Jest' };
export const typescript = { name: 'Typescript' };
export const eslint = { name: 'Eslint' };
export const stylelint = { name: 'Stylelint' };
export const sonarlint = { name: 'Sonarlint' };

export const quality: Skill = {
  name: 'Quality',
  children: [jest, typescript, eslint, stylelint, sonarlint],
};

export const frontend: Skill = {
  name: 'Frontend',
  children: [angular, vue, svelte, react, solid, stencil, webEx, microFrontend, animation, css, bundler, state, quality],
};

export const jhipster: Skill = { name: 'Jhipster' };
export const jenkins: Skill = { name: 'Jenkins' };
export const gitLab: Skill = { name: 'GitLab' };
export const githubAction: Skill = { name: 'Github Action' };
export const openShift: Skill = { name: 'Openshift' };
export const docker: Skill = { name: 'Docker' };
export const kube: Skill = { name: 'Kubernetes' };
export const sonarqube: Skill = { name: 'Sonarqube' };

export const devops: Skill = {
  name: 'Devops',
  children: [jhipster, jenkins, gitLab, githubAction, openShift, docker, kube, sonarqube],
};

export const microService = { name: 'Microservice' };
export const sql = { name: 'SQL' };
export const rest = { name: 'REST' };
export const soap = { name: 'Soap' };

export const springBoot: Skill = { name: 'Spring Boot' };
export const springData: Skill = { name: 'Spring Data JPA' };
export const springMVC: Skill = { name: 'Spring Web MVC' };
export const springBatch: Skill = { name: 'Spring Batch' };

export const spring: Skill = {
  name: 'Spring',
  children: [springBoot, springData, springMVC, springBatch],
};

export const hibernate: Skill = { name: 'Hibernate' };
export const liquibase: Skill = { name: 'Liquibase' };
export const nestJs: Skill = { name: 'NestJs' };
export const backend: Skill = {
  name: 'Backend',
  children: [microService, sql, rest, soap, spring, hibernate, liquibase, nestJs],
};

export const skills: Skill = {
  name: 'Skills',
  children: [frontend, devops, backend],
};
