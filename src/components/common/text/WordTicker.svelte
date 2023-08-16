<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  type Word = string | { value: string; color?: string };

  let className: string;
  export { className as class };

  export let words: Array<Word> = [];
  export let tick = 5000;
  export let step: number = null;

  const getPrev = (_index: number) => {
    if (_index === 0) return words.length - 1;
    return _index - 1;
  };

  const getNext = (_index: number) => {
    if (_index === words.length - 1) return 0;
    return _index + 1;
  };

  const getValue = (word: Word): string => (typeof word === 'string' ? word : word.value);
  const isEqual = (a: Word, b: Word): boolean => getValue(a) === getValue(b);

  const index$ = writable(0);
  const active$ = derived(index$, _index => words[_index]);
  const behind$ = derived(index$, _index => words[getNext(_index)]);
  const out$ = derived(index$, _index => words[getPrev(_index)]);

  let interval: number;
  onMount(() => {
    interval = setInterval(() => index$.update(getNext), tick);
  });
  onDestroy(() => clearInterval(interval));

  let minWidth = 0;
  $: minWidth = words?.map(getValue).reduce((a, b) => (a.length > b.length ? a : b)).length;
</script>

<p
  class={['word-ticker', className].filter(Boolean).join(' ')}
  style={[step ? `--step: ${step}` : undefined, `min-width: ${minWidth}ch`].filter(Boolean).join('; \n')}
>
  {#each words as word}
    <span
      class="word"
      style={`color: ${word?.color ?? 'inherit'}`}
      class:behind={isEqual($behind$, word)}
      class:active={isEqual($active$, word)}
      class:out={isEqual($out$, word)}
    >
      {#each getValue(word).split('') as letter, index}
        <span class="letter" style={`--index: ${index}`}>{letter}</span>
      {/each}
    </span>
  {/each}
</p>

<style lang="scss">
  .word-ticker {
    display: inline-flex;
    margin: 0;
    font-weight: bold;
    font-family: 'Courier New', sans-serif;
    vertical-align: top;

    --step: 80ms;

    .word {
      position: absolute;
      display: flex;

      .letter {
        transform-origin: center center 25px;
        opacity: 0;
        transition: transform 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
        transition-delay: calc(var(--index) * var(--step));
        will-change: transform;
      }

      &.out {
        .letter {
          transform: rotateX(90deg);
          opacity: 1;
        }
      }

      &.active {
        .letter {
          transform: rotateX(0);
          opacity: 1;
          transition: transform 0.38s ease;
          transition-delay: calc(2 * var(--step) + var(--index) * var(--step));
        }
      }

      &.behind {
        .letter {
          transform: rotateX(-90deg);
        }
      }
    }
  }
</style>
