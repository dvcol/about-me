<script lang="ts">
    import {writable} from "svelte/store";
    import {_} from 'svelte-i18n'

    import type {SunburstData} from "~/components/common";

    import {Section} from "~/components";
    import {SunBurst} from "~/components/common";



    import {normalizeData} from "~/components/common/sunburst/draw-sunburst";

    const skills: SunburstData = {
        name: "Skills",
        value: 0,
        children: [
            {
                name: "Frontend",
                children: [
                    {
                        name: 'Angular',
                        children: [
                            {name: 'NgRx'},
                            {name: 'NgXs'},
                            {name: 'Angular animation'},
                            {name: 'Angular service worker'},
                        ]
                    },
                    {
                        name: 'Vue',
                        children: [
                            {name: 'Vue 2'},
                            // { name: 'Vue 3'},
                            {name: 'Composition API'},
                            {name: 'Vuex'},
                            // { name: 'Pinia'},
                            // { name: 'Vuetify'},
                            {name: 'Vue i18n'},
                        ]
                    },
                    {
                        name: 'Svelte',
                        children: [
                            {name: 'Svelte navigator'},
                            {name: 'Svelte shell'},
                            {name: 'Svelte i18n'},
                        ]
                    },
                    {
                        name: 'React',
                        children: [
                            {name: 'React Material UI (5+)'},
                            {name: 'dnd-kit'},
                            {name: 'React-redux'},
                            {name: 'React-router'},
                            {name: 'React-transition-group'},
                        ]
                    },
                    {name: 'Solid'},
                    {name: 'Stencil'},
                    {
                        name: 'Web extension',
                        children: [
                            {name: 'Manifest V3'},
                            {name: 'Content script'},
                            {name: 'Background script'},
                            {name: 'Multi script communication'},
                            {name: 'Chrome synch storage'}
                        ]
                    },
                    {
                        name: 'Micro Frontend',
                        children: [
                            {name: 'Module federation'},
                            {name: 'Web components'},
                            {name: 'Remote entry'},
                            {name: 'Shell architecture'},
                            {name: 'Iframe isolation'},
                            {name: 'Multi framework runtime'},
                            {name: 'Multi framework routing'}
                        ]
                    },
                    {name: 'd3'},
                    {name: 'Sass'},
                    {name: 'Rxjs'},
                    {name: 'Redux'},
                    {name: 'Typescript'},
                    {name: 'Eslint'},
                    {name: 'Stylelint'},
                    {name: 'Webpack'},
                    {name: 'Vite'},
                ]
            },
            {
                name: "Devops",
                children: [
                    {name: 'Jhipster'},
                    {name: 'Jenkins'},
                    {name: 'GitLab'},
                    {name: 'Github Action'},
                    {name: 'Openshift'},
                    {name: 'Docker'}
                ]
            },
            {
                name: "Backend",
                children: [
                    {name: 'Microservice'},
                    {name: 'SQL'},
                    {
                        name: "Spring",
                        children: [
                            {name: 'Spring Boot'},
                            {name: 'Spring Data JPA'},
                            {name: 'Spring Web MVC'},
                            {name: 'Spring Batch'}
                        ]
                    },
                    {name: 'Hibernate'},
                    {name: 'Liquidbase'},
                    {name: 'NestJs'},
                ]
            },
        ]
    }

    const data = normalizeData(skills)

    const parse = (_skills: SunburstData) => [_skills.depth ? _skills : undefined, _skills?.children?.map(parse)?.flat()].filter(Boolean).flat()

    const selected$ = writable([])
    const hover$ = writable([])

</script>

<Section>
    <div slot="header">
        { $_('skills.title')}
    </div>
    <div slot="main" class="row">
        <div class="column sunburst">
            <SunBurst {data}
                      on:init={e => {
                          const parsed = parse(e.detail)
                          $selected$ = parsed;
                          $hover$ = parsed.map(s=>s.name);
                      }}
                      on:click={e => {$selected$ = parse(e.detail)}}
                      on:hover={e => {
                          const parsed = e.detail ? parse(e.detail) : $selected$;
                          $hover$ = parsed.map(s=>s.name)
                      }}
                      class="column"
            />
        </div>

        <ul class="column">
            {#each $selected$ as skill}
                <li class:hover={!$hover$.includes(skill.name)} style={`color: ${skill.color}`}>{skill.name}</li>
            {/each}
        </ul>
    </div>
</Section>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .sunburst {
    flex: 1 1 auto;
  }

  .hover {
    opacity: 0.5;
  }
</style>