<script lang="ts">
  import { LeadingIcon, Set, Text } from '@smui/chips';

  import SmallLeftArrowSvg from 'line-md/svg/arrow-small-left.svg?component';

  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import type { SunburstApi } from '~/components/common';

  import type { SunburstData } from '~/models';

  import { inView } from '~/actions';
  import { hasChildren, Header, ScrollShadow, spliceNode, SunBurst, Tag } from '~/components/common';

  import { Paragraph, Section } from '~/components/layout';
  import { HeaderLink, skills } from '~/data';
  import { useSkillsStore } from '~/stores';
  import { BreakPoints, useMediaQuery } from '~/utils';

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
    if (chip === $selected$) return;
    $selected$ = chip;
    dispatch('selected', chip);
  };

  const parent$ = writable<SunburstData>();

  let back: SunburstApi['back'];

  enum Direction {
    In = 'in',
    Out = 'out',
  }

  const direction$ = writable<Direction>(Direction.In);
  const updateVisible = (_parsed: SunburstData[], _visible = $visible$) => {
    if (_parsed.some(p => !_visible.includes(p)) || _visible.some(v => !_parsed.includes(v))) {
      $visible$ = _parsed;
    }
  };

  const updateDirection = (_direction: Direction) => {
    if ($direction$ !== _direction) $direction$ = _direction;
  };

  const onInit = ({ detail }: CustomEvent<SunburstData>) => {
    $parent$ = detail;
    updateVisible(parseData(detail));
  };

  const onClick = ({ detail }: CustomEvent<SunburstData>) => {
    if (detail?.id) updateDirection($parent$?.children?.some(c => c.id === detail?.id) ? Direction.In : Direction.Out);
    if (hasChildren(detail?.node)) {
      $parent$ = detail;
      updateVisible(parseData(detail));
    }
    selected(detail);
  };

  const onHover = ({ detail }: CustomEvent<SunburstData>) => {
    if (detail?.id === $parent$?.id) {
      $hover$ = [];
    } else {
      const parsed = detail ? parseData(detail) : [];
      $hover$ = parsed.map(s => s.id);
    }
  };

  const onSelect = (chip: SunburstData) => {
    if (chip?.id === $parent$?.id) {
      if (chip?.id !== $selected$?.id) updateDirection(Direction.Out);
      back();
    } else {
      if (chip?.id !== $selected$?.id) updateDirection(Direction.In);
      $onSelect$(chip.node);
    }
  };

  const inView$ = writable(false);

  const isFullScreen$ = useMediaQuery(`(max-width: ${BreakPoints.qhd}px)`);
  const isMobile$ = useMediaQuery(`(max-width: ${BreakPoints.mobile}px) and (min-height: ${BreakPoints.mobile}px)`);
</script>

<Section fullscreen={$isFullScreen$}>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.Skills} title="skills.title" />
    <Paragraph text={'skills.introduction'} />
  </svelte:fragment>

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
        height={$isMobile$ ? '40dvh' : '50dvh'}
        visible={$inView$}
        bind:select={$onSelect$}
        bind:hover={$onHover$}
        bind:leave={$onLeave$}
        bind:back
        on:init={onInit}
        on:click={onClick}
        on:hover={onHover}
      />
    </div>

    <div class="column chips" class:chips--visible={$inView$}>
      <ScrollShadow>
        <Set chips={$visible$} let:chip>
          <Tag
            class={`translate-${$direction$ === Direction.In ? 'left' : 'right'}`}
            style={`animation-delay: ${($visible$?.findIndex(c => c === chip) ?? 0) * 10}ms`}
            tag={chip}
            on:select={() => onSelect(chip)}
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

    <slot />
  </div>
</Section>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/z-index';

  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
  }

  .column {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
  }

  .sunburst {
    flex: 1 1 50%;
    max-height: 50dvh;
    padding: 4rem;
  }

  .chips {
    flex: 0 1 50%;
    justify-content: center;
    max-height: 70dvh;
    opacity: 0;
    transition: translate 1s;
    will-change: translate;
    translate: 100%;

    :global {
      @keyframes translate-right {
        0% {
          filter: opacity(0);
          translate: -200%;
        }

        100% {
          filter: opacity(1);
          translate: 0;
        }
      }

      @keyframes translate-left {
        0% {
          filter: opacity(0);
          translate: 200%;
        }

        100% {
          filter: opacity(1);
          translate: 0;
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

  @media screen and (max-width: breakpoint.$laptop + px) and (min-height: breakpoint.$mobile + px) {
    .row {
      flex-direction: column;
      height: 100%;
    }

    .sunburst {
      padding: 3rem;
    }

    .chips {
      z-index: z-index.$in-front;
      max-height: calc(50dvh - 200px);
      padding: 1rem;
    }
  }

  @media screen and (max-width: breakpoint.$mobile + px) and (min-height: breakpoint.$mobile + px) {
    .sunburst {
      padding: 0 1rem 1rem;
    }

    .chips {
      max-height: calc(50dvh - 140px);
      padding: 0;
    }
  }
</style>
