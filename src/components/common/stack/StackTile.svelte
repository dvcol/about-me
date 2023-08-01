<script lang="ts">
  import { derived, writable } from 'svelte/store';

  import type { Project, StackTileProps } from '~/models';

  import { inView } from '~/actions';
  import { Tile } from '~/components/common';
  import { StackTilePrimary } from '~/models';
  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let left: Project;
  export let right: Project;
  export let primary: StackTileProps['primary'] = StackTilePrimary.Left;

  const open$ = writable(false);

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
  use:inView={{ margin: { top: 200, bottom: 200 } }}
  on:enter={() => {
    $open$ = true;
  }}
>
  {#key tiles}
    <Tile
      class={`stack-tile stack-tile-left${$open$ ? ' stack-tile--open' : ''}${
        $reverse$ || primary === StackTilePrimary.Left ? ' stack-tile--primary' : ''
      }`}
      {...spreadTile($tiles.left)}
    />
    <Tile
      class={`stack-tile stack-tile-right${$open$ ? ' stack-tile--open' : ''}${
        !$reverse$ && primary === StackTilePrimary.Right ? ' stack-tile--primary' : ''
      }`}
      {...spreadTile($tiles.right)}
    />
  {/key}
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .stack-tiles {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    overflow: hidden;

    :global {
      .stack-tile {
        z-index: 0;
        display: flex;
        flex: 1 1 50%;
        flex-direction: column;
        align-self: stretch;
        max-width: 50vw;
        transition: translate 1s cubic-bezier(0.28, 0.06, 0.34, 0.91);
        will-change: translate;

        &:hover,
        &:focus {
          z-index: 2;
        }

        &--primary {
          z-index: 1;
        }

        &-left {
          translate: 40%;

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
          max-width: 100vw;
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
