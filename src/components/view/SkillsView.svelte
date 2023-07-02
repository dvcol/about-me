<script lang="ts">
    import {_} from 'svelte-i18n'

    import type {SunburstData} from "~/components/common";

    import {Section} from "~/components";
    import {SunBurst} from "~/components/common";



    import {normalizeData} from "~/components/common/sunburst/draw-sunburst";

    const skills: SunburstData = {
        name: "skills",
        value: 0,
        children: [
            {
                name: "frontend",
                children: [
                    {
                        name: 'angular',
                        children: [
                            { name: 'NgRx'},
                            { name: 'NgXs'},
                            { name: 'Angular animation'},
                            { name: 'Angular service worker'},
                        ]
                    },
                    {
                        name: 'vue',
                        children: [
                            { name: 'Vue 2'},
                            // { name: 'Vue 3'},
                            { name: 'Composition API'},
                            { name: 'Vuex'},
                            // { name: 'Pinia'},
                            // { name: 'Vuetify'},
                            { name: 'Vue i18n'},
                        ]
                    },
                    {
                        name: 'svelte',
                        children: [
                            { name: 'Svelte navigator'},
                            { name: 'Svelte shell'},
                            { name: 'Svelte i18n'},
                        ]
                    },
                    {
                        name: 'react',
                        children: [
                            { name: 'React Material UI (5+)'},
                            { name: 'dnd-kit'},
                            { name: 'react-redux'},
                            { name: 'react-router'},
                            { name: 'react-transition-group'},
                        ]
                    },
                    {name: 'solid'},
                    {name: 'stencil'},
                    {
                        name: 'Web extension',
                        children: [
                            { name: 'Manifest V3'},
                            { name: 'Content script'},
                            { name: 'Background script'},
                            { name: 'Multi script communication'},
                            { name: 'Chrome synch storage'}
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
                    {name: 'sass'},
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
                name: "devops",
                children : [
                    { name: 'Jhipster'},
                    { name: 'Jenkins'},
                    { name: 'GitLab'},
                    { name: 'Github Action'},
                    { name: 'Openshift'},
                    { name: 'Docker'}
                ]
            },
            {
                name: "backend",
                children: [
                    {name: 'Microservice'},
                    {name: 'SQL'},
                    {
                        name: "spring",
                        children: [
                            {name: 'Spring Boot'},
                            {name: 'Spring Data JPA'},
                            {name: 'Spring Web MVC'},
                            {name: 'Spring Batch'}
                        ]
                    },
                    {name: 'hibernate'},
                    {name: 'Liquidbase'},
                    {name: 'nestJs'},
                ]
            },
        ]
    }

    const data = normalizeData(skills)
</script>

<Section>
    <div slot="header">
        { $_('skills.title')}
    </div>
    <div slot="main">
        <SunBurst {data} />
    </div>
</Section>