<script>
    import { _ } from 'svelte-i18n'

    import { Section } from "~/components";
</script>

<Section>
    <div slot="header">
        { $_('projects.title')}
    </div>
    <div slot="main">
        This is the Projects main
    </div>
</Section>