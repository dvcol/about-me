<script lang="ts">
  import { writable } from 'svelte/store';

  import { inView } from '~/actions';
  import { randomNumber } from '~/utils';

  let className: string = '';
  export { className as class };

  export let value: string;
  export let step: number = 100;

  const visible$ = writable(false);

  let values: { letter: string; delay: number }[];
  $: {
    if (value) {
      let randomDelay = 0;
      values = [...value.split(''), '.'].map((letter, index) => {
        if (index === randomNumber(3, value.length)) randomDelay += randomNumber(100, 500);
        return { letter, delay: index * step + randomDelay };
      });
    }
  }
</script>

<span
  class={['type-writer', className].filter(Boolean).join(' ')}
  style={`--step: ${step}ms`}
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={() => {
    $visible$ = true;
  }}
>
  {#each values as { letter, delay }, index}
    <span class:visible={$visible$} class="type-writer-letter" class:type-writer-dot={index === value.length} style={`--delay: ${delay}ms;`}
      >{letter}</span
    >
  {/each}
</span>

<style lang="scss">
  @use 'src/theme/colors';
  @use 'src/theme/breakpoint';

  .type-writer {
    display: inline-flex;

    --step: 100ms;

    &-letter {
      display: inline-block;
      max-width: 0;
      white-space: pre;
      opacity: 0;
      transition: max-width var(--step), opacity 0s;
      transition-delay: var(--delay);
      will-change: max-width, opacity;

      &.visible {
        max-width: 5ch;
        opacity: 1;
      }
    }

    &-dot {
      color: colors.$secondary;
    }

    &::after {
      display: inline-block;
      align-self: center;
      width: 4px;
      height: 3.5rem;
      margin-left: 0.25rem;
      background: colors.$primary;
      opacity: 0;
      animation: cursor 1s infinite;
      content: '';
    }
  }

  @keyframes cursor {
    0% {
      opacity: 0;
    }

    40% {
      opacity: 0;
    }

    50% {
      opacity: 0.8;
    }

    90% {
      opacity: 0.8;
    }

    100% {
      opacity: 0;
    }
  }
</style>
