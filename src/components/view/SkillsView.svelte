<script lang="ts">
    import Chip, {LeadingIcon, Set, Text} from '@smui/chips';
    import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component'
    import {createEventDispatcher} from "svelte";
    import {writable} from "svelte/store";
    import {_} from 'svelte-i18n'

    import type {SunburstApi, SunburstData} from "~/components/common";

    import {hasChildren, Opacity, ScrollShadow, spliceNode, SunBurst} from "~/components/common"
    import {Section,} from "~/components/layout";
    import {skill} from "~/components/view/skills";

    const data: SunburstData = skill

    /**
     * Extracts visible nodes from selected path
     * @param _skills the selected root node
     * @param options optional filters
     */
    const parse = (_skills: SunburstData, options: {
        current?: number,
        min?: number,
        max?: number,
        ancestors?: boolean
    } = {}): SunburstData[] => {

        const current = options.current ?? _skills.depth ?? 0
        const min = options.min ?? 0
        const max = options.max ?? 2

        const parsed = []
        const {depth} = _skills;

        if (depth < current + min) return parsed
        if (depth > current + max) return parsed

        if (depth) parsed.push(_skills)
        if (_skills?.children) parsed.push(..._skills.children.map(c => parse(c, {current, min, max})).flat())
        if(options.ancestors && _skills?.node) parsed.push(...(_skills.node.ancestors()?.map(spliceNode) ?? []))

        return parsed.flat()
    }

    const selected$ = writable()
    const dispatch = createEventDispatcher();
    const selected = (chip: SunburstData) => {
        $selected$ = chip;
        dispatch('selected', chip)
    }

    const chips$ = writable<SunburstData[]>([])
    const hover$ = writable<string[]>([])

    const parent$ = writable<SunburstData>()

    let select: SunburstApi['select']
    let hover: SunburstApi['hover']
    let leave: SunburstApi['hover']
    let back: SunburstApi['back']

    let scrollContainer: HTMLDivElement;
    let onScroll: (scrollContainer: HTMLDivElement) => void;
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
                      bind:hover={hover}
                      bind:leave={leave}
                      bind:back={back}
                      on:init={e => {
                          $parent$ = e.detail;
                          const parsed = parse(e.detail)
                          $chips$ = parsed;
                          $hover$ = parsed.map(s=>s.id);

                          setTimeout(() => onScroll(scrollContainer))
                      }}
                      on:click={e => {
                          if(hasChildren(e.detail?.node)) {
                              $parent$ = e.detail;
                              $chips$ = parse(e.detail)
                          }
                          selected(e.detail)
                          setTimeout(() => onScroll(scrollContainer))
                      }}
                      on:hover={e => {
                          const parsed = e.detail ? parse(e.detail, {ancestors:true}) : $chips$;
                          $hover$ = parsed.map(s=>s.id)
                      }}
            />
        </div>

        <ScrollShadow bind:onScroll={onScroll}>
            <div class="column chips" bind:this={scrollContainer} on:scroll={() => onScroll(scrollContainer)}>
                <Set chips={$chips$} let:chip>
                    <Chip ripple={false}
                          chip={chip}
                          style={`
                                    transition: opacity 0.5s;
                                    color: ${chip.color};
                                    ${!$hover$.includes(chip.id) ? `opacity: ${$selected$?.id === chip.id ? Opacity.Full : Opacity.Child}` : ''};
                                    ${$selected$?.id === chip.id ? `border: solid 1px ${chip.color.replace(')',', 0.3)')}` : ''};
                                    ${$selected$?.id === chip.id ? `background-color: ${chip.color.replace(')',', 0.15)')};` : ''}
                                `}
                          on:SMUIChip:interaction={() => {
                              if(chip.id === $parent$.id) return back()
                              select(chip.node);
                          }}
                          on:mouseenter={() => {
                              hover(chip.node);
                          }}
                          on:mouseleave={() => {
                              leave(chip.node);
                          }}
                    >
                        {#if chip.id === $parent$.id}
                            <LeadingIcon style={`color: ${chip.color}; display: flex; align-items: center;`}>
                                <SmallLeftArrowSvg/>
                            </LeadingIcon>
                        {/if}
                        <Text>
                            {chip.id === $parent$.id ? $_('common.button.back') : chip.name}
                        </Text>
                    </Chip>
                </Set>
            </div>
        </ScrollShadow>
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