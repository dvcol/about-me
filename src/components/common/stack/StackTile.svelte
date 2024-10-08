<script lang="ts">
  import { onDestroy } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import type { Project, StackTileProps } from '~/models';

  import { inView } from '~/actions';
  import { Tile } from '~/components/common';
  import { StackTilePrimary } from '~/models';
  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let index: number;
  export let left: Project;
  export let right: Project;
  export let primary: StackTileProps['primary'] = StackTilePrimary.Left;

  const open$ = writable(false);
  const inFlight$ = writable(false);

  let timeout: ReturnType<typeof setTimeout>;
  onDestroy(() => clearTimeout(timeout));

  const spreadTile = ({ title, subtitle, description, media, links, tags }: Project = {}) => ({
    title,
    subtitle,
    description,
    media,
    links,
    tags,
  });

  const reverse$ = matchesBreakPoint(BreakPoints.hd);
  const tiles = derived(reverse$, _reverse => {
    if (_reverse && primary === StackTilePrimary.Right) return { left: right, right: left };
    return { left, right };
  });
</script>

<div
  class="stack-tiles"
  class:stack-tiles--open={$open$}
  data-id={`stack-tiles-${index}`}
  use:inView={{ margin: { bottom: $reverse$ ? 700 : 400 } }}
  on:enter={() => {
    $inFlight$ = true;
    $open$ = true;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $inFlight$ = false;
    }, 1000);
  }}
>
  {#key tiles}
    <Tile
      dataId={`stack-tiles-left-${index}-left`}
      class={[
        'stack-tile',
        'stack-tile-left',
        $open$ ? 'stack-tile--open' : undefined,
        $inFlight$ ? 'stack-tile--in-flight' : undefined,
        $reverse$ ? 'stack-tile--reverse' : undefined,
        $reverse$ || primary === StackTilePrimary.Left ? 'stack-tile--primary' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      {...spreadTile($tiles.left)}
    />
    <Tile
      dataId={`stack-tiles-${index}-right`}
      class={[
        'stack-tile',
        'stack-tile-right',
        $open$ ? ' stack-tile--open' : undefined,
        $inFlight$ ? 'stack-tile--in-flight' : undefined,
        $reverse$ ? 'stack-tile--reverse' : undefined,
        !$reverse$ && primary === StackTilePrimary.Right ? 'stack-tile--primary' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      {...spreadTile($tiles.right)}
    />
  {/key}
</div>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/z-index';

  .stack-tiles {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 2rem 0;
    overflow: unset;
    transition: margin 1s cubic-bezier(0.28, 0.06, 0.34, 0.91);

    @media (width >= breakpoint.$hd + px) {
      &--open {
        &:nth-child(odd) {
          margin-right: 4svw;
        }

        &:nth-child(even) {
          margin-left: 4svw;
        }
      }
    }

    :global {
      .stack-tile {
        z-index: z-index.$default;
        display: flex;
        flex: 1 1 50%;
        flex-direction: column;
        align-self: stretch;
        max-width: min(50vw, 46rem);
        min-height: 30rem;
        transition: translate 1s cubic-bezier(0.28, 0.06, 0.34, 0.91);
        will-change: translate;

        &:hover,
        &:focus {
          z-index: z-index.$in-foreground;
        }

        /* stylelint-disable-next-line -- BEM modifier */
        &--in-flight:not(.stack-tile--primary) {
          pointer-events: none;
        }

        &--primary {
          z-index: z-index.$in-front;
        }

        &-left {
          translate: 40%;

          /* stylelint-disable-next-line -- BEM modifier */
          &.stack-tile--reverse {
            translate: 0;
          }

          .tile-card {
            transform-origin: right;
          }
        }

        &-right {
          translate: -40%;

          .tile-card {
            transform-origin: left;
          }
        }

        &--open {
          translate: 0 !important;
        }

        @media screen and (max-width: breakpoint.$hd + px) {
          flex: 1 1 100%;
          max-width: min(52rem, 100svh);
          min-height: 40vh;

          &-left {
            translate: 0 10%;

            .tile-card {
              transform-origin: bottom;
            }
          }

          &-right {
            translate: 0 -66%;

            .tile-card {
              transform-origin: top;
            }

            @media all and (max-height: breakpoint.$hd + px) {
              translate: 0 -40%;
            }

            @media all and (max-height: breakpoint.$tablet + px) {
              translate: 0 -16%;
            }
          }
        }

        @media screen and (max-width: breakpoint.$fhd + px) {
          min-height: 40vh;
        }
      }
    }
  }
</style>
