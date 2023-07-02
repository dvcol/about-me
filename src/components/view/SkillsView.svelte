<script lang="ts">
    import Chip, {LeadingIcon, Set, Text} from '@smui/chips';
    import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component'
    import {writable} from "svelte/store";
    import {_} from 'svelte-i18n'

    import type {SunburstApi, SunburstData} from "~/components/common";

    import {Section} from "~/components";
    import {SunBurst} from "~/components/common";



    import {skill} from "~/components/view/skills";

    const data: SunburstData = skill

    const parse = (_skills: SunburstData, {min, max} = {min: 0, max: 2}) => [
        _skills.depth > min ? _skills : undefined,
        (_skills.depth ?? 0) <= max ? _skills?.children?.map(c=> parse(c, {min, max}))?.flat() : undefined
    ].filter(Boolean).flat()

    const selected$ = writable([])
    const hover$ = writable([])

    const parent$ = writable()

    let select: SunburstApi['select']
    let back: SunburstApi['back']

</script>

<Section>
    <div slot="header">
        { $_('skills.title')}
    </div>
    <div slot="main" class="row">
        <div class="column sunburst">
            <SunBurst {data}
                      height="50vh"
                      width="60vw"
                      bind:select={select}
                      bind:back={back}
                      on:init={e => {
                          $parent$ = e.detail;
                          const parsed = parse(e.detail)
                          $selected$ = parsed;
                          $hover$ = parsed.map(s=>s.name);
                      }}
                      on:click={e => {
                          $parent$ = e.detail;
                          $selected$ = parse(e.detail)
                      }}
                      on:hover={e => {
                          const parsed = e.detail ? parse(e.detail) : $selected$;
                          $hover$ = parsed.map(s=>s.name)
                      }}
            />
        </div>

        <div class="column chips">
            <Set chips={$selected$} let:chip choice>
                <Chip style={`color: ${chip.color}; ${!$hover$.includes(chip.name) ? 'opacity: 0.6' : ''}`}
                      chip={chip}
                      on:SMUIChip:interaction={(e) => {
                          const _selected = e.detail.chipId
                          if(_selected === $parent$) return back()
                          select(_selected.node);
                      }}
                >
                    {#if chip.id === $parent$.id}
                        <LeadingIcon style={`color: ${chip.color}; display: flex; align-items: center;`}>
                            <SmallLeftArrowSvg/>
                        </LeadingIcon>
                    {/if}
                    <Text>{chip.id === $parent$.id ? 'Back' : chip.name}</Text>
                </Chip>
            </Set>
        </div>
    </div>
</Section>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
  }

  .sunburst {
    flex: 0 1 60%;
  }

  .chips {
    flex: 0 1 40%;
    overflow: auto;
  }
</style>