<script lang="ts">
  import { LeadingIcon, Set, Text } from '@smui/chips';

  import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component';

  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
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

  const direction$ = writable<'in' | 'out'>('in');
  const updateVisible = (_parsed: SunburstData[], _visible = $visible$) => {
    if (_parsed.some(p => !_visible.includes(p)) || _visible.some(v => !_parsed.includes(v))) {
      $visible$ = _parsed;
    }
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
        on:init={({ detail }) => {
          $parent$ = detail;
          updateVisible(parseData(detail));

          setTimeout(onScroll, Animation.Speed);
        }}
        on:click={({ detail }) => {
          if (detail?.id) {
            $direction$ = $parent$?.children?.some(c => c.id === detail?.id) ? 'in' : 'out';
          }
          if (hasChildren(detail?.node)) {
            $parent$ = detail;
            updateVisible(parseData(detail));
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
          <Tag
            class={`translate-${$direction$ === 'in' ? 'left' : 'right'}`}
            style={`animation-delay: ${($visible$?.findIndex(c => c === chip) ?? 0) * 10}ms`}
            tag={chip}
            hover={!$hover$.length || $hover$.includes(chip.id)}
            selected={$selected$?.id === chip.id}
            on:select={() => {
              if (chip.id === $parent$?.id) {
                $direction$ = 'out';
                back();
              } else {
                $direction$ = 'in';
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
    flex: 0 1 50%;
  }

  .chips {
    flex: 0 1 50%;
    opacity: 0;
    translate: 100%;
    transition: translate 1s;
    will-change: translate;

    :global {
      @keyframes translate-right {
        0% {
          translate: -200%;
          filter: opacity(0);
        }

        100% {
          translate: 0;
          filter: opacity(1);
        }
      }

      @keyframes translate-left {
        0% {
          translate: 200%;
          filter: opacity(0);
        }

        100% {
          translate: 0;
          filter: opacity(1);
        }
      }

      %animation {
        transition: opacity 0.75s;
        animation-duration: 0.5s;
        animation-fill-mode: backwards;
        will-change: scale;
      }

      .chip {
        .translate-right {
          @extend %animation;

          animation-name: translate-right;
        }

        .translate-left {
          @extend %animation;

          animation-name: translate-left;
        }
      }
    }

    &--visible {
      opacity: 1;
      translate: 0;
    }
  }

  @media screen and (max-width: breakpoint.$hd + px) {
    .column {
      padding: 1rem;
    }

    .sunburst {
      padding: 1rem 3rem;
    }
  }

  @media screen and (max-width: breakpoint.$tablet + px) {
    .row {
      flex-direction: column;
    }

    .chips {
      z-index: 1;
      max-height: 30vh;
    }
  }
</style>
