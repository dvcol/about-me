<script lang="ts">
  import * as d3 from 'd3';
  import { createEventDispatcher, onMount } from 'svelte';

  import { drawSunburst, normalizeData } from './draw-sunburst';

  import type { SunburstApi } from './draw-sunburst';
  import type { SunburstData } from '~/models';

  import { colors$, nodes$ } from '~/stores';

  type DataProp = SunburstData | (() => Promise<SunburstData>);
  export let data: DataProp;

  let element: HTMLDivElement;

  const dispatch = createEventDispatcher();
  const onClick = (_data: SunburstData) => dispatch('click', _data);
  const onHover = (_data: SunburstData) => dispatch('hover', _data);

  const parseNodes = (_data: SunburstData, map?: Map<string, SunburstData>) => {
    const _map: Map<string, SunburstData> = map ?? new Map();
    if (_data) _map.set(_data.id, _data);
    _data?.children?.forEach(c => parseNodes(c, _map));
    return _map;
  };

  const onInit = (_data: SunburstData) => {
    nodes$.set(parseNodes(_data));
    dispatch('init', _data);
  };

  export let height: string = '100%';
  export let width: string = '100%';

  export let select: SunburstApi['select'];
  export let hover: SunburstApi['hover'];
  export let leave: SunburstApi['leave'];
  export let back: SunburstApi['back'];

  export let visible = false;

  const drawChart = async () => {
    if (!data) return;

    const { data: normalized, colorMap } = normalizeData(typeof data == 'function' ? await data() : data);
    colors$.set(colorMap);
    const chart = drawSunburst(normalized, { height, width, onInit, onClick, onHover });

    select = chart.select;
    hover = chart.hover;
    leave = chart.leave;
    back = chart.back;

    d3.select(element).append(() => chart.svg);
  };

  onMount(drawChart);
</script>

<div class="sunburst-container" class:sunburst-container--visible={visible} bind:this={element}>
  <!--  sunburst injected here -->
</div>

<style lang="scss">
  .sunburst-container {
    width: 100%;
    height: 100%;
    text-align: center;
    opacity: 0;
    transition: opacity 1s ease-in, scale 1s;
    will-change: opacity, scale;
    scale: 0.25;

    &--visible {
      opacity: 1;
      scale: 1;
    }

    :global(svg) {
      overflow: unset;
    }
  }
</style>
