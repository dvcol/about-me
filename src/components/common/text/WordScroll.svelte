<script lang="ts">
  import { derived, writable } from 'svelte/store';

  import { inView } from '~/actions';
  import { useApp } from '~/stores';

  export let text: string;

  export let min = 0.1;
  export let max = 1;
  export let offset = { top: window.innerHeight / 6, bottom: 100 };
  export let tail = 6;

  export let progress: 'page' | 'content' = 'page';

  let ref: HTMLParagraphElement;

  const { container$ } = useApp();
  const inView$ = writable(false);

  const textProgress$ = writable(0);
  const pageProgress$ = writable(0);

  const progress$ = derived([pageProgress$, textProgress$], ([_page, _text]) => (progress === 'page' ? _page : _text));

  const round = (value: number, precision = 100) => (value ? Math.round(value * 100 * precision) / precision : 0);

  const onScroll = () => {
    const rec = ref?.getBoundingClientRect();
    if (!rec?.top) return;
    const pageHeight = window.innerHeight - offset.top - offset.bottom;
    $textProgress$ = round((pageHeight - rec.top) / (rec.height - offset.top));
    $pageProgress$ = round(1 - (rec.top - offset.top) / pageHeight);
  };

  let words: string;
  $: words = text.split(/(\s+)/);

  $: {
    if ($inView$) {
      $container$.addEventListener('scroll', onScroll);
    } else {
      $container$.removeEventListener('scroll', onScroll);
    }
  }

  const fade = (_position: number, _progress = $progress$, _tail = tail) => {
    if (!_progress) return 0;
    if (_progress + tail <= _position) return 0;
    return round(1 - (_position - _progress) / tail) / 100;
  };
</script>

<p
  bind:this={ref}
  use:inView={{ inView$ }}
  on:enter={() => {
    $inView$ = true;
  }}
  class="word-scroll"
  class:visible={$inView$}
  style={`--min: ${min}; --max: ${max};`}
>
  {#each words as word, index}
    {@const position = round((index + 1) / words.length)}
    {@const visible = $progress$ > position}
    {@const near = !visible && $progress$ && $progress$ + tail > position}
    {@const nearProgress = fade(position)}
    <span class="word-scroll-word" class:visible class:near style={near ? `--near: ${nearProgress}` : undefined}>
      {word}
    </span>
  {/each}
</p>

<style lang="scss">
  .word-scroll {
    --progress: 1;
    --min: 0.1;
    --max: 1;

    &-word {
      opacity: var(--min);
      transition: opacity 200ms;
      will-change: opacity;

      &.visible {
        opacity: clamp(var(--min), var(--progress), var(--max));
      }

      &.near:not(.visible) {
        opacity: clamp(var(--min), var(--near), var(--max));
      }
    }
  }
</style>
