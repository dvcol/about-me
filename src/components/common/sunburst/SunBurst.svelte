<script lang="ts">
    import * as d3 from "d3";

    import {onMount} from "svelte";

    import {drawSunburst} from "./draw-sunburst";

    import type {SunburstData} from "./draw-sunburst";

    export let data: SunburstData | (() => Promise<SunburstData>);
    export let width = 1200
    let element: HTMLDivElement;

    onMount(async () => {
        if (!data) return

        const _data = typeof data == 'function' ? (await data()) : data

        const chart = drawSunburst(_data, width);

        d3.select(element).append(() => chart);
    })
</script>

<div bind:this={element}></div>