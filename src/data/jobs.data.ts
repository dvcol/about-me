import { ContentSquare, DGA, Hospinomics, Ippon, MEA, SEA, SopraSteria } from '~/data/companies.data';
import {
  angular,
  angularAnimation,
  angularServiceWorker,
  awsS3,
  compositionApi,
  d3,
  docker,
  eslint,
  githubAction,
  gitLab,
  hibernate,
  iframeIsolation,
  java,
  jenkins,
  jest,
  jhipster,
  junit,
  liquibase,
  microFrontend,
  microService,
  moduleFederation,
  monoRepo,
  multiFramework,
  multipleRuntime,
  openShift,
  redux,
  remoteEntry,
  rxjs,
  safe,
  shell,
  sonarlint,
  sonarqube,
  springBatch,
  springBoot,
  springData,
  sql,
  stencil,
  stylelint,
  svelte,
  svelteNavigator,
  turboRepo,
  typescript,
  vue,
  vue2,
  vueI18n,
  vuex,
  webComponent,
  webpack,
} from '~/data/skills.data';
import { privateSector, publicSector, saas, scaleUp } from '~/data/tags.data';
import { Job, Mission } from '~/models';

const sopra2017 = new Job({
  employer: SopraSteria,
  missions: [
    new Mission({
      employer: SopraSteria,
      client: MEA,
      duration: {
        start: new Date('2020-01'),
        end: new Date('2021-08'),
      },
      address: SopraSteria.address,
      title: 'Fullstack Developer - Angular / Java',
      subtitle: 'Agile team member developing frontend and backend micro services.',
      description: `For the creation a new unified information system for the ministry of armed forces, I helped in the design and development of a new micro service backend and a frontend portal.
      The mission included:
      
      * The development of spring based micro services (using the jhipster stack)
      * The development of frontend UI modules
      * The creation of a custom no-code form generator
      * The implementation of a secure intra-net/inter-net micro service bridge
      `,
      tags: {
        hidden: [hibernate, sql, liquibase, eslint, junit, rxjs, webpack, angularAnimation, angularServiceWorker],
        skills: [java, angular, microService, openShift, gitLab, safe, docker, typescript],
        other: [publicSector],
      },
    }),
    new Mission({
      employer: SopraSteria,
      client: SEA,
      duration: {
        start: new Date('2019-01'),
        end: new Date('2020-01'),
      },
      address: SopraSteria.address,
      title: 'Fullstack Developer - Java / Angular',
      subtitle: 'Lead developer in charge of the frontend portal.',
      description: `In the context of the creation of a new digital platform for the SEA (Système Centralisé d'Appui à la Logistique Pétrolière), I contributed to the creation of a new frontend portal for ordering and following product delivery.
      The mission involved:
      
      * Analysing operational needs and requirements
      * Redaction of technical conceptions and specification
      * Developing backend services to bridge Soap endpoints with REST micro services
      * Developing frontend UI modules
      `,
      tags: {
        hidden: [hibernate, sql, junit, rxjs, webpack],
        skills: [java, angular, liquibase, jhipster, jenkins, typescript],
        other: [publicSector],
      },
    }),
    new Mission({
      employer: SopraSteria,
      client: DGA,
      duration: {
        start: new Date('2017-09'),
        end: new Date('2019-01'),
      },
      address: SopraSteria.address,
      title: 'Backend Developer - Java',
      subtitle: 'Interchange services developer in charge of batch Processing flat file transfers.',
      description: `Within the interchange team, I contributed to the development of a centralized batch processing application tasked with computing the compensation for the four armed forces military personnels.
      The mission involved:
      
      * Development of Spring Batch processing nodes to ingest and standardized flat file pay slips
      * Optimisation of the parallel processing of multiple asynchronous data steams
      * Software delivery and installation support
      `,
      tags: {
        hidden: [junit, sonarqube, sonarlint, sql],
        skills: [java, springBoot, springData, springBatch, hibernate],
        other: [publicSector],
      },
    }),
  ],
});

const contentSquare2023 = new Job({
  employer: Ippon,
  missions: [
    new Mission({
      employer: Ippon,
      client: ContentSquare,
      duration: {
        start: new Date('2021-09'),
      },
      address: ContentSquare.address,
      title: 'Fullstack Frontend Developer - Application Research & Development',
      subtitle: 'Core application team member with focus on frontend and ci-cd topics.',
      description: `Inside the core application team I've contributed to:
      
        * The migration from a angularJs monolith to a micro-frontend, multi-framework (vue, svelte, stencil, angular) shell architecture
        * The creation of a svelte based, web-component based, and module federated shell application
        * The modernisation of the mono-repo ci-cd chain with code quality and test coverage automation
        * The migration from a linear jenkins ci pipeline to a multi-threaded github action workflow
        `,
      tags: {
        hidden: [
          angular,
          vue2,
          compositionApi,
          vuex,
          vueI18n,
          svelteNavigator,
          remoteEntry,
          iframeIsolation,
          multipleRuntime,
          multiFramework,
          d3,
          eslint,
          stylelint,
          monoRepo,
        ],
        skills: [
          vue,
          svelte,
          stencil,
          microFrontend,
          shell,
          moduleFederation,
          webComponent,
          webpack,
          redux,
          jest,
          typescript,
          jenkins,
          githubAction,
          turboRepo,
          awsS3,
        ],
        other: [scaleUp, saas, privateSector],
      },
    }),
  ],
});

export const hospinomics2015 = new Job({
  employer: Hospinomics,
  missions: [
    new Mission({
      employer: Hospinomics,
      client: Hospinomics,
      duration: {
        start: new Date('2015-10'),
        end: new Date('2016-11'),
      },
      address: Hospinomics.address,
      title: 'Research assistant',
      subtitle: 'Research assistant for a work study in Health Economics',
      tags: {
        other: [publicSector],
      },
    }),
  ],
});

export const jobs: Job[] = [contentSquare2023, sopra2017, hospinomics2015];
