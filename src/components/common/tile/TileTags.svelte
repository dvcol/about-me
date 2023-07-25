<script lang="ts">
  import { ActionButtons } from '@smui/card';
  import { Text } from '@smui/chips';

  import { onMount } from 'svelte';

  import type { Skill } from '~/models';

  import { ScrollShadow, Tag } from '~/components';
  import { useSkillsStore } from '~/stores';

  export let skills: Skill[];
  export let other: Tag[];

  const { colors$, nodes$, onHover$, onLeave$, onSelect$ } = useSkillsStore();

  let onScroll: (scrollContainer: HTMLDivElement) => void;

  onMount(() => setTimeout(onScroll));
</script>

<div class="tile-tags">
  <ScrollShadow horizontal bind:onScroll>
    <ActionButtons>
      {#key $colors$}
        {#if skills}
          {#each skills as tag}
            <Tag {tag} on:select={$onSelect$($nodes$.get(tag.id)?.node, true)} on:enter={$onHover$($nodes$.get(tag.id)?.node)} on:leave={$onLeave$()}>
              <Text>
                {tag.name}
              </Text>
            </Tag>
          {/each}
        {/if}
        {#if other}
          {#each other as tag}
            <Tag {tag} selected={false}>
              <Text>
                {tag.name}
              </Text>
            </Tag>
          {/each}
        {/if}
      {/key}
    </ActionButtons>
  </ScrollShadow>
</div>

<style lang="scss">
  .tile-tags {
    overflow: hidden;

    :global(.scroll-container) {
      margin: 0 1rem;
      padding: 1rem 0;
      overflow: hidden;
    }

    :global(.shadow-top) {
      margin-left: 1rem;
    }

    :global(.shadow-bottom) {
      margin-right: 1rem;
    }

    :global(.chip) {
      margin-right: 0.5rem;
    }
  }
</style>
