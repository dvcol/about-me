<script lang="ts">
  import * as d3 from 'd3';
  import { createEventDispatcher, onMount } from 'svelte';

  import { drawSunburst, normalizeData } from './draw-sunburst';

  import type { SunburstApi } from './draw-sunburst';
  import type { SunburstData } from '~/models';

  import { inView } from '~/actions';

  export let data: SunburstData | (() => Promise<SunburstData>);

  let element: HTMLDivElement;

  const dispatch = createEventDispatcher();
  const onInit = (_data: SunburstData) => dispatch('init', _data);
  const onClick = (_data: SunburstData) => dispatch('click', _data);
  const onHover = (_data: SunburstData) => dispatch('hover', _data);

  export let height: string = null;
  export let width: string = null;

  export let select: SunburstApi['select'];
  export let hover: SunburstApi['hover'];
  export let leave: SunburstApi['leave'];
  export let back: SunburstApi['back'];

  export let visible = false;

  onMount(async () => {
    if (!data) return;

    const _data = typeof data == 'function' ? await data() : data;

    const chart = drawSunburst(normalizeData(_data), { height, width, onInit, onClick, onHover });

    select = chart.select;
    hover = chart.hover;
    leave = chart.leave;
    back = chart.back;

    d3.select(element).append(() => chart.svg);
  });
</script>

<div
  class="sunburst-container"
  class:sunburst-container--visible={visible}
  bind:this={element}
  use:inView
  on:enter={e => {
    if (e.detail.count > 0) visible = true;
  }}
>
  <!--  sunburst injected here -->
</div>

<style lang="scss">
  .sunburst-container {
    opacity: 0;
    transition: opacity 1s, scale 1s;
    scale: 0.25;

    &--visible {
      opacity: 1;
      scale: 1;
    }
  }
</style>
