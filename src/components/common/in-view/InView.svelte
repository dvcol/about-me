<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import type { MarginOptions } from '~/actions';

  import { setObserver } from '~/actions';

  export let margin: MarginOptions = {};
  export let options: IntersectionObserverInit = {};

  const dispatch = createEventDispatcher();

  let inView = false;
  let observer: IntersectionObserver;
  let element: Element;

  onMount(() => setObserver(element, observer, { options, margin }));
  onDestroy(() => observer.disconnect());
</script>

<div
  bind:this={element}
  on:enter={({ detail }) => {
    inView = true;
    dispatch('enter', detail);
  }}
  on:leave={({ detail }) => {
    inView = false;
    dispatch('leave', detail);
  }}
>
  <slot {inView} />
</div>
