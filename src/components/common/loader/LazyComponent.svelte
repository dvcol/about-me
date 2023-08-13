<script lang="ts">
  export let component: Promise<any>;

  export let props: Record<string, any> = {};
</script>

{#await component}
  <slot loading={component} />
{:then { default: Component }}
  <Component {...props}>
    <slot />
  </Component>
{:catch error}
  {#if $$slots.error}
    <slot name="error" {error} />
  {:else}
    <p style="color: red">{error.message}</p>
  {/if}
{/await}
