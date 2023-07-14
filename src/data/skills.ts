import type { Skill } from '~/models';

export const frontend: Skill = {
  name: 'Frontend',
  children: [
    {
      name: 'Angular',
      children: [{ name: 'NgRx' }, { name: 'NgXs' }, { name: 'Angular animation' }, { name: 'Angular service worker' }],
    },
    {
      name: 'Vue',
      children: [
        { name: 'Vue 2' },
        // { name: 'Vue 3'},
        { name: 'Composition API' },
        { name: 'Vuex' },
        // { name: 'Pinia'},
        // { name: 'Vuetify'},
        { name: 'Vue i18n' },
      ],
    },
    {
      name: 'Svelte',
      children: [{ name: 'Svelte navigator' }, { name: 'Svelte shell' }, { name: 'Svelte i18n' }],
    },
    {
      name: 'React',
      children: [
        { name: 'React Material UI (5+)' },
        { name: 'dnd-kit' },
        { name: 'React-redux' },
        { name: 'React-router' },
        { name: 'React-transition-group' },
      ],
    },
    { name: 'Solid' },
    { name: 'Stencil' },
    {
      name: 'Web extension',
      children: [
        { name: 'Manifest V3' },
        { name: 'Content script' },
        { name: 'Background script' },
        { name: 'Multi script communication' },
        { name: 'Chrome synch storage' },
      ],
    },
    {
      name: 'Micro Frontend',
      children: [
        { name: 'Module federation' },
        { name: 'Web components' },
        { name: 'Remote entry' },
        { name: 'Shell architecture' },
        { name: 'Iframe isolation' },
        { name: 'Multi framework runtime' },
        { name: 'Multi framework routing' },
      ],
    },
    { name: 'd3' },
    { name: 'Sass' },
    { name: 'Rxjs' },
    { name: 'Redux' },
    { name: 'Typescript' },
    { name: 'Eslint' },
    { name: 'Stylelint' },
    { name: 'Webpack' },
    { name: 'Vite' },
  ],
};

export const devops: Skill = {
  name: 'Devops',
  children: [{ name: 'Jhipster' }, { name: 'Jenkins' }, { name: 'GitLab' }, { name: 'Github Action' }, { name: 'Openshift' }, { name: 'Docker' }],
};

export const backend: Skill = {
  name: 'Backend',
  children: [
    { name: 'Microservice' },
    { name: 'SQL' },
    {
      name: 'Spring',
      children: [{ name: 'Spring Boot' }, { name: 'Spring Data JPA' }, { name: 'Spring Web MVC' }, { name: 'Spring Batch' }],
    },
    { name: 'Hibernate' },
    { name: 'Liquidbase' },
    { name: 'NestJs' },
  ],
};

export const skills: Skill = {
  name: 'Skills',
  children: [frontend, devops, backend],
};
