<script lang="ts">
  import Button, { Icon, Label } from '@smui/button';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  let className: string = '';
  export { className as class };

  export let url: string = null;
  export let mobile = true;

  const open = () => {
    if (url) window.location.href = url;
  };

  const hover$ = writable(mobile ? false : matchMedia(`only screen and (hover: none)`).matches);
</script>

<Button
  class={['animated-button', className].filter(Boolean).join(' ')}
  variant="text"
  on:click={open}
  on:mouseenter={() => {
    $hover$ = true;
  }}
  on:mouseleave={() => {
    $hover$ = false;
  }}
>
  <Label><slot /></Label>
  {#if $$slots.icon && $hover$}
    <div class="animated-button-icon" out:fade={{ duration: 300 }}>
      <Icon><slot name="icon" /></Icon>
    </div>
  {/if}
</Button>

<style lang="scss">
  :global(.animated-button) {
    display: flex !important;

    .animated-button-icon {
      margin: 0 6px 6px 3px;
    }
  }
</style>
