<script lang="ts">
  import { writable } from 'svelte/store';

  import type { Project } from '~/models';

  import { inView } from '~/actions';
  import { Tile } from '~/components/common';

  export let left: Project;
  export let right: Project;

  const open$ = writable(false);

  const spreadTile = ({ title, subtitle, description, media, links, tags }: Project = {}) => ({
    title,
    subtitle,
    description,
    media,
    links,
    tags,
  });
</script>

<div
  class="stack-tiles"
  use:inView={{ margin: { top: 200, bottom: 200 } }}
  on:enter={e => {
    // if (!e?.detail?.count) return;
    $open$ = true;
    console.info('enter', e.detail, $open$);
  }}
>
  <Tile class={`stack-tile stack-tile-left${$open$ ? ' stack-tile--open' : ''}`} {...spreadTile(left)} />
  <Tile class={`stack-tile stack-tile-right${$open$ ? ' stack-tile--open' : ''}`} {...spreadTile(right)} />
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .stack-tiles {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
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

        &-left {
          z-index: 1;
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

            @media all and (max-height: breakpoint.$lg + px) {
              translate: 0 -40%;
            }

            @media all and (max-height: breakpoint.$md + px) {
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
