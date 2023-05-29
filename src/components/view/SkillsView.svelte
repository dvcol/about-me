<script lang="ts">
    import {_} from 'svelte-i18n'

    import type {SunburstData} from "~/components/common";

    import {Section} from "~/components";
    import {SunBurst} from "~/components/common";



    const skills: SunburstData = {
        name: "skills",
        children: [
            {name: "frontend", value: 2,
             children: [
                 { name: 'angular', value:1},
                 { name: 'vue', value:1},
                 { name: 'svelte', value:1},
                 { name: 'react', value:1},
                 { name: 'solid', value:1}

             ]},
            {name: "backend", value: 1},
            {name: "devops", value: 1}
        ]
    }
</script>

<Section>
    <div slot="header">
        { $_('skills.title')}
    </div>
    <div slot="main">
        <SunBurst data={skills}/>
    </div>
</Section>