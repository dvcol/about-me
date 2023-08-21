<script lang="ts">
  import { _ } from 'svelte-i18n';

  import { WordScroll } from '~/components';

  export let text: string;
</script>

<div class="text">
  <WordScroll text={$_(text)} />
</div>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/colors';

  .text {
    margin: 0 0 2rem;
    padding: 0 8dvw;
    color: colors.$tertiary;
    font-size: 1.5em;

    @media screen and (max-width: breakpoint.$fhd + px) {
      margin: 5rem 0;
    }

    @media screen and (max-width: breakpoint.$mobile + px) {
      margin-top: 3rem;
      padding: 0 6dvw;
      font-size: 1.25em;
    }
  }
</style>
