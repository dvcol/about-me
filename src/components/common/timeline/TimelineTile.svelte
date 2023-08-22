<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  import type { Address, ProjectDuration, TimelineTileProps } from '~/models';

  import { inView } from '~/actions';

  import { Tile } from '~/components/index.js';

  export let secondary = false;
  export let marker = false;
  export let sticky = false;
  export let first = false;
  export let last = false;
  export let flip = false;

  export let id: string = 'timeline-tile';
  export let index: number;

  export let tile: TimelineTileProps = null;
  export let duration: ProjectDuration = null;
  export let address: Address = null;

  const dispatch = createEventDispatcher();
  const onEnter = (event: MouseEvent) => dispatch('mouseenter', { event: event.detail, tile, index });
  const onLeave = (event: MouseEvent) => dispatch('mouseleave', { event: event.detail, tile, index });

  const open$ = writable(false);
</script>

<div
  data-timeline-id={`${id}-${index}`}
  class="timeline-tile column"
  class:secondary
  class:sticky
  class:first
  class:last
  class:flip
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={() => {
    $open$ = true;
  }}
>
  <div class="row">
    {#if tile}
      {@const { logo, ..._tile } = tile}
      <div class="timeline-tile-line">
        {#if logo}
          <div
            class="timeline-tile-line-marker timeline-tile-line-logo"
            class:timeline-tile-line-marker--open={$open$}
            style={logo.background ? `background-colo: ${logo.background}` : undefined}
          >
            <img src={logo.url} alt={`${logo.title ?? 'timeline-tile'}-${index}-logo`} />
          </div>
        {:else if marker}
          <span class="timeline-tile-line-marker" class:timeline-tile-line-marker--open={$open$}>
            <!-- empty marker -->
          </span>
        {/if}
      </div>
      <div class="timeline-tile-card-container">
        <Tile class={`timeline-tile-card ${$open$ ? 'timeline-tile-card--open' : ''}`} on:mouseenter={onEnter} on:mouseleave={onLeave} {..._tile} />
      </div>
    {:else if address || duration}
      <div class="timeline-tile-meta-container">
        <div class="timeline-tile-meta" class:timeline-tile-meta--open={$open$}>
          {#if duration}
            <h3>{duration.range}</h3>
          {/if}
          {#if address}
            <h4>{address.short}</h4>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/colors';
  @use 'src/theme/z-index';

  %flex-column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 100%;

    .flip & {
      @media screen and (min-width: breakpoint.$laptop-min + px) {
        flex-direction: row-reverse;
      }
    }
  }

  .column {
    @extend %flex-column;
  }

  .timeline-tile {
    width: 50%;

    :global(.tile) {
      @extend %flex-column;
    }

    &.sticky {
      position: sticky;
      top: 0;
      z-index: z-index.$in-foreground;
      overflow: unset;
    }

    @media screen and (max-width: breakpoint.$laptop + px) {
      width: 100%;

      &.sticky {
        position: relative;
      }
    }

    &-meta {
      @extend %flex-column;

      margin: 3rem;
      opacity: 0;
      transition: opacity 1s, translate 1s;
      transition-delay: 0.25s;
      will-change: opacity, translate;
      translate: -100%;

      &--open {
        opacity: 1;
        translate: 0 !important;
      }

      &-container {
        overflow: hidden;
      }

      h3 {
        color: colors.$primary;
      }

      h4 {
        font-weight: normal;
      }

      h3,
      h4 {
        margin: 0.25rem 0;
      }

      @media screen and (max-width: breakpoint.$laptop + px) {
        display: none;
      }
    }

    &.secondary {
      :global(h2),
      .timeline-tile-meta h3 {
        color: colors.$secondary;
      }
    }

    &-line {
      position: relative;
      display: flex;
      flex: 0 1 auto;
      flex-direction: column;
      margin: 0 2rem 0 0;

      @media screen and (max-width: breakpoint.$laptop + px) {
        margin: 0 2rem;
      }

      &-marker {
        position: absolute;
        top: calc(4rem + 4.5px);
        left: -9px;
        z-index: z-index.$in-front;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        background-color: colors.$primary;
        border-radius: 50%;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 2px 1px -1px rgb(0 0 0 / 12%);
        transition: scale 0.5s;
        will-change: scale;
        scale: 0;

        @media screen and (max-width: breakpoint.$laptop + px) {
          top: calc(3rem + 4.5px);
        }

        &--open {
          scale: 1;
        }
      }

      &-logo {
        top: calc(2rem + 21px);
        left: -21px;
        width: 42px;
        height: 42px;
        overflow: hidden;
        background-color: white;

        img {
          width: 30px;
          height: 30px;
        }

        @media screen and (max-width: breakpoint.$laptop + px) {
          top: calc(1rem + 21px);
        }
      }

      &::after {
        display: flex;
        flex: 1 1 auto;
        width: 4px;
        background-color: colors.$primary;
        content: '';

        @media screen and (min-width: breakpoint.$laptop-min + px) {
          margin-left: -2px;
        }

        @media screen and (max-width: breakpoint.$laptop + px) {
          align-self: center;
        }
      }
    }

    &-card-container {
      @extend %flex-column;

      max-width: 100dvw;
      overflow-x: hidden;
    }

    :global .timeline-tile-card {
      margin: 2rem 0;
      opacity: 0;
      transition: opacity 1s, translate 1s;
      transition-delay: 0.25s;
      will-change: opacity, translate;
      translate: 25%;

      @media screen and (max-width: breakpoint.$laptop + px) {
        margin: 1rem 0;
      }

      @media screen and (min-width: breakpoint.$laptop-min + px) {
        .tile-card-content-meta-description {
          display: none;
        }
      }

      &--open {
        opacity: 1;
        translate: 0 !important;
      }
    }

    &.last :global .timeline-tile {
      &-card {
        margin-bottom: 4rem;
      }

      &-line::after {
        background: linear-gradient(180deg, colors.$primary 30%, transparent);
      }
    }

    &.first :global .timeline-tile {
      &-card {
        margin-top: 6rem;
      }

      &-meta {
        margin-top: 7rem;
      }

      &-line {
        &-marker {
          top: calc(7rem + 4.5px);
        }

        &::after {
          background: linear-gradient(180deg, transparent, colors.$primary 30%);
        }
      }
    }

    &.flip {
      @media screen and (min-width: breakpoint.$laptop-min + px) {
        .timeline-tile {
          &-meta {
            text-align: end;
            translate: 100%;
          }

          &-line {
            margin: 0 0 0 2rem;

            &-marker {
              right: 9px;
              left: unset;
            }

            &-logo {
              right: -21px;
              left: unset;
            }

            &::after {
              align-self: flex-end;
              margin-right: -2px;
              margin-left: unset;
            }
          }
        }

        :global .timeline-tile-card {
          translate: -25%;
        }
      }
    }
  }
</style>
