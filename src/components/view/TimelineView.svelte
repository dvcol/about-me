<script>
    import { _ } from 'svelte-i18n'

    import { Section } from "~/components";
</script>

<Section>
    <div slot="header">
        { $_('timeline.title')}
    </div>
    <div slot="main">
        This is the Timeline main
    </div>
</Section>