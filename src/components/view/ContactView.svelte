<script lang="ts">
  import Fab, { Icon, Label } from '@smui/fab';
  import LinkedInSvg from 'line-md/svg/linkedin.svg?component';
  import ResumeSvg from 'line-md/svg/text-box.svg?component';

  import { onDestroy } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import { inView } from '~/actions';
  import GithubSvg from '~/assets/github.svelte';

  import { Header, Section } from '~/components';
  import { ExternalLink, HeaderLink } from '~/data';

  const visible$ = writable(false);

  let timeout: number;
  const delay$ = derived(visible$, _visible => {
    clearTimeout(timeout);
    return new Promise(r => {
      setTimeout(() => r(_visible), 500);
    });
  });

  onDestroy(() => clearTimeout(timeout));
</script>

<Section>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.Contact} title="contact.title" />
  </svelte:fragment>

  <svelte:fragment slot="main">
    <div
      class="contact-links"
      use:inView={{ margin: { bottom: 100 } }}
      on:enter={() => {
        $visible$ = true;
      }}
    >
      <Fab class={`contact-links-fab github ${$visible$ ? 'visible' : ''}`} title="Github" href={ExternalLink.github} extended touch>
        <Icon>
          {#await $delay$ then _}
            <GithubSvg />
          {/await}
        </Icon>
        <Label>Github</Label>
      </Fab>
      <Fab class={`contact-links-fab linkedin ${$visible$ ? 'visible' : ''}`} title="LinkedIn" href={ExternalLink.linkedIn} extended touch>
        <Icon>
          {#await $delay$ then _}
            <LinkedInSvg style="margin-bottom: 6px" />
          {/await}
        </Icon>
        <Label>LinkedIn</Label>
      </Fab>
      <Fab class={`contact-links-fab resume ${$visible$ ? 'visible' : ''}`} title="Resume" href={ExternalLink.Resume} target="_blank" extended touch>
        <Icon>
          {#await $delay$ then _}
            <ResumeSvg />
          {/await}
        </Icon>
        <Label>Resume</Label>
      </Fab>
    </div>

    <slot />
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/colors';

  .contact-links {
    display: flex;
    gap: 0.5rem;
    margin: 2rem 0;

    :global(.contact-links-fab) {
      opacity: 0;
      transition: opacity 1s, scale 1s, transform 1s;
      will-change: opacity, scale, transform;
      scale: 0;
    }

    :global(.visible) {
      opacity: 1;
      scale: 1;
    }

    :global(.visible:hover) {
      transform: scale(1.1);
    }

    :global(.visible:focus) {
      transform: scale(1.1);
    }

    :global(.github) {
      background-color: black;
    }

    :global(.linkedin) {
      background-color: #0b66c2;
      transition: opacity 1s, scale 1s 0.2s, transform 1s;
    }

    :global(.resume) {
      background-color: colors.$primary;
      transition: opacity 1s, scale 1s 0.4s, transform 1s;
    }
  }
</style>
