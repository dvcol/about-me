<script>
  import { _ } from 'svelte-i18n';

  import { Section } from '~/components';
</script>

<Section>
  <div slot="header">
    {$_('contact.title')}
  </div>
  <div slot="main">This is the Contact main</div>
</Section>
