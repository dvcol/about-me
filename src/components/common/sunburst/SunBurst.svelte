<script lang="ts">
    import * as d3 from "d3";

    import {createEventDispatcher, onMount} from "svelte";

    import {drawSunburst} from "./draw-sunburst";

    import type {SunburstData} from "./draw-sunburst";

    export let data: SunburstData | (() => Promise<SunburstData>);
    export let width = 1800
    export let depth = 3
    let element: HTMLDivElement;

    const dispatch = createEventDispatcher();
    const onClick = (_data:SunburstData) => dispatch('click', _data)
    const onHover = (_data:SunburstData) => dispatch('hover', _data)

    onMount(async () => {
        if (!data) return

        const _data = typeof data == 'function' ? (await data()) : data

        const chart = drawSunburst(_data, {width, depth, onClick, onHover});

        d3.select(element).append(() => chart);
    })
</script>

<div bind:this={element}></div>