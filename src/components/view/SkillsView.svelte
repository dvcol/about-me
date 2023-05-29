<script>
    import { _ } from 'svelte-i18n'

    import { Section } from "~/components";
</script>

<Section>
    <div slot="header">
        { $_('skills.title')}
    </div>
    <div slot="main">
        This is the Skills main
    </div>
</Section>