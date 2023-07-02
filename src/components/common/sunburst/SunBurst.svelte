<script lang="ts">
    import * as d3 from "d3";

    import {createEventDispatcher, onMount} from "svelte";

    import {drawSunburst, normalizeData} from "./draw-sunburst";

    import type {SunburstApi, SunburstData} from "./draw-sunburst";

    export let data: SunburstData | (() => Promise<SunburstData>);

    let element: HTMLDivElement;

    const dispatch = createEventDispatcher();
    const onInit = (_data:SunburstData) => dispatch('init', _data)
    const onClick = (_data:SunburstData) => dispatch('click', _data)
    const onHover = (_data:SunburstData) => dispatch('hover', _data)

    export let select: SunburstApi['select']
    export let back: SunburstApi['back']

    onMount(async () => {
        if (!data) return

        const _data = typeof data == 'function' ? (await data()) : data

        const chart = drawSunburst(normalizeData(_data), { onInit, onClick, onHover});
        
        select = chart.select
        back = chart.back

        d3.select(element).append(() => chart.svg);
    })
</script>

<div bind:this={element}></div>