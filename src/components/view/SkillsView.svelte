<script lang="ts">
  import { LeadingIcon, Set, Text } from '@smui/chips';

  import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component';

  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';

  import type { SunburstApi } from '~/components/common';

  import type { SunburstData } from '~/models';

  import { Animation, hasChildren, ScrollShadow, spliceNode, SunBurst, Tag } from '~/components/common';

  import { Section } from '~/components/layout';
  import { skills } from '~/data';

  const data: SunburstData = { ...skills, value: 0 };

  /**
   * Extracts visible nodes from selected path
   * @param _skills the selected root node
   * @param options optional filters
   */
  const parse = (
    _skills: SunburstData,
    options: {
      current?: number;
      min?: number;
      max?: number;
      ancestors?: boolean;
    } = {},
  ): SunburstData[] => {
    const current = options.current ?? _skills.depth ?? 0;
    const min = options.min ?? 0;
    const max = options.max ?? 2;

    const parsed = [];
    const { depth } = _skills;

    if (depth < current + min) return parsed;
    if (depth > current + max) return parsed;

    if (depth) parsed.push(_skills);
    if (_skills?.children) parsed.push(..._skills.children.map(c => parse(c, { current, min, max })).flat());
    if (options.ancestors && _skills?.node) parsed.push(...(_skills.node.ancestors()?.map(spliceNode) ?? []));

    return parsed.flat();
  };

  const selected$ = writable();
  const dispatch = createEventDispatcher();
  const selected = (chip: SunburstData) => {
    $selected$ = chip;
    dispatch('selected', chip);
  };

  const chips$ = writable<SunburstData[]>([]);
  const hover$ = writable<string[]>([]);

  const parent$ = writable<SunburstData>();

  let select: SunburstApi['select'];
  let hover: SunburstApi['hover'];
  let leave: SunburstApi['hover'];
  let back: SunburstApi['back'];

  let scrollContainer: HTMLDivElement;
  let onScroll: (scrollContainer: HTMLDivElement) => void;

  let direction: 'in' | 'out' = 'in';
  const animations = {
    in: {
      get x() {
        return (direction === 'in' ? 1 : -1) * 200;
      },
      y: 0,
      duration: Animation.HalfSpeed,
      delay: Animation.HalfSpeed + 100,
    },
    out: {
      get x() {
        return (direction === 'in' ? -1 : 1) * 200;
      },
    },
  };
</script>

<Section>
  <div slot="header">
    {$_('skills.title')}
  </div>
  <div slot="main" class="row">
    <div class="column sunburst">
      <SunBurst
        {data}
        height="50vh"
        width="60vw"
        bind:select
        bind:hover
        bind:leave
        bind:back
        on:init={e => {
          $parent$ = e.detail;
          const parsed = parse(e.detail);
          $chips$ = parsed;
          $hover$ = parsed.map(s => s.id);

          setTimeout(() => onScroll(scrollContainer), Animation.Speed);
        }}
        on:click={({ detail }) => {
          if (detail?.id) {
            direction = $parent$?.children?.some(c => c.id === detail?.id) ? 'in' : 'out';
          }
          if (hasChildren(detail?.node)) {
            $parent$ = detail;
            $chips$ = parse(detail);
          }

          selected(detail);
          setTimeout(() => onScroll(scrollContainer), Animation.Speed);
        }}
        on:hover={e => {
          const parsed = e.detail ? parse(e.detail, { ancestors: true }) : $chips$;
          $hover$ = parsed.map(s => s.id);
        }}
      />
    </div>

    <ScrollShadow bind:onScroll>
      <div class="column chips" bind:this={scrollContainer} on:scroll={() => onScroll(scrollContainer)}>
        <Set chips={$chips$} let:chip>
          <div in:fly|global={animations.in} out:fly|global={animations.out}>
            <Tag
              skill={chip}
              hover={$hover$.includes(chip.id)}
              selected={$selected$?.id === chip.id}
              on:select={() => {
                if (chip.id === $parent$.id) {
                  direction = 'out';
                  back();
                } else {
                  direction = 'in';
                  select(chip.node);
                }
              }}
              on:enter={() => {
                hover(chip.node);
              }}
              on:leave={() => {
                leave(chip.node);
              }}
            >
              {#if chip.id === $parent$.id}
                <LeadingIcon style={`color: ${chip.color}; display: flex; align-items: center;`}>
                  <SmallLeftArrowSvg />
                </LeadingIcon>
              {/if}
              <Text>
                {chip.id === $parent$.id ? $_('common.button.back') : chip.name}
              </Text>
            </Tag>
          </div>
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
