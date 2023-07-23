<script lang="ts">
  import { LeadingIcon, Set, Text } from '@smui/chips';

  import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component';

  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import { _ } from 'svelte-i18n';

  import type { SunburstApi } from '~/components/common';

  import type { SunburstData } from '~/models';

  import { inView } from '~/actions';
  import { Animation, hasChildren, ScrollShadow, spliceNode, SunBurst, Tag } from '~/components/common';

  import { Section } from '~/components/layout';
  import { skills } from '~/data';
  import { useSkillsStore } from '~/stores';

  const data: SunburstData = { ...skills, value: 0 };

  /**
   * Extracts visible nodes from selected path
   * @param _skills the selected root node
   * @param options optional filters
   */
  const parseData = (
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
    if (_skills?.children) parsed.push(..._skills.children.map(c => parseData(c, { current, min, max })).flat());
    if (options.ancestors && _skills?.node) parsed.push(...(_skills.node.ancestors()?.map(spliceNode) ?? []));

    return parsed.flat().filter((item, index, array) => array.findIndex(e => e.id === item.id) === index);
  };

  const { selected$, visible$, hover$, onSelect$, onHover$, onLeave$ } = useSkillsStore();

  const dispatch = createEventDispatcher();
  const selected = (chip: SunburstData) => {
    $selected$ = chip;
    dispatch('selected', chip);
  };

  const parent$ = writable<SunburstData>();

  let back: SunburstApi['back'];

  let onScroll: (scrollContainer: HTMLDivElement) => void;
  let hide: () => void;

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

  const inView$ = writable(false);
</script>

<Section>
  <div slot="header">
    {$_('skills.title')}
  </div>
  <div
    slot="main"
    class="row"
    use:inView
    on:enter={() => {
      $inView$ = true;
    }}
  >
    <div class="column sunburst">
      <SunBurst
        {data}
        visible={$inView$}
        height="50vh"
        bind:select={$onSelect$}
        bind:hover={$onHover$}
        bind:leave={$onLeave$}
        bind:back
        on:init={e => {
          $parent$ = e.detail;
          $visible$ = parseData(e.detail);

          setTimeout(onScroll, Animation.Speed);
        }}
        on:click={({ detail }) => {
          if (detail?.id) {
            direction = $parent$?.children?.some(c => c.id === detail?.id) ? 'in' : 'out';
          }
          if (hasChildren(detail?.node)) {
            $parent$ = detail;
            $visible$ = parseData(detail);
          }
          hide();
          selected(detail);
          setTimeout(onScroll, Animation.Speed);
        }}
        on:hover={e => {
          const parsed = e.detail ? parseData(e.detail) : [];
          $hover$ = parsed.map(s => s.id);
        }}
      />
    </div>

    <div class="column chips" class:chips--visible={$inView$}>
      <ScrollShadow bind:onScroll bind:hide>
        <Set chips={$visible$} let:chip>
          <div in:fly|global={animations.in} out:fly|global={animations.out}>
            <Tag
              tag={chip}
              hover={!$hover$.length || $hover$.includes(chip.id)}
              selected={$selected$?.id === chip.id}
              on:select={() => {
                if (chip.id === $parent$?.id) {
                  direction = 'out';
                  back();
                } else {
                  direction = 'in';
                  $onSelect$(chip.node);
                }
              }}
              on:enter={() => $onHover$(chip.node)}
              on:leave={() => $onLeave$(chip.node)}
            >
              {#if chip.id === $parent$?.id}
                <LeadingIcon style={`color: ${chip.color}; display: flex; align-items: center;`}>
                  <SmallLeftArrowSvg />
                </LeadingIcon>
              {/if}
              <Text>
                {chip.id === $parent$?.id ? $_('common.button.back') : chip.name}
              </Text>
            </Tag>
          </div>
        </Set>
      </ScrollShadow>
    </div>
  </div>
</Section>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .column {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    padding: 2rem;
  }

  .sunburst {
    flex: 0 1 60%;
  }

  .chips {
    flex: 0 1 40%;
    opacity: 0;
    translate: 100%;
    transition: translate 1s;
    will-change: translate;

    &--visible {
      opacity: 1;
      translate: 0;
    }
  }

  @media screen and (max-width: breakpoint.$hd + px) {
    .column {
      padding: 1rem;
    }
  }

  @media screen and (max-width: breakpoint.$mobile + px) {
    .row {
      flex-direction: column;
    }

    .sunburst {
      flex: 0 1 50%;
    }

    .chips {
      flex: 0 1 30%;
      max-height: 30vh;
    }
  }
</style>
