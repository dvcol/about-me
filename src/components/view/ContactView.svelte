<script>
  import { Header, Section } from '~/components';
</script>

<Section>
  <svelte:fragment slot="header">
    <Header title="contact.title" />
  </svelte:fragment>

  <svelte:fragment slot="main">
    <div>
      This is the Contact main

      <slot />
    </div>
  </svelte:fragment>
</Section>
