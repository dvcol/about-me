<script>
    import { _ } from 'svelte-i18n'

    import { Section } from "~/components";
</script>

<Section>
    <div slot="header">
        { $_('hero.title')}
    </div>
    <div slot="main">
        This is the Hero main
    </div>
</Section>