<script lang="ts">
  import { ActionButtons } from '@smui/card';
  import { Text } from '@smui/chips';

  import { _ } from 'svelte-i18n';

  import type { Skill } from '~/models';

  import { ScrollShadow, Tag } from '~/components';
  import { useSkillsStore } from '~/stores';
  import { useTagsStore } from '~/stores/tags.store';

  export let skills: Skill[];
  export let other: Tag[];

  const { colors$, nodes$, onHover$, onLeave$, onSelect$ } = useSkillsStore();
  const { onSelect, onEnter, onLeave } = useTagsStore();
</script>

<div class="tile-tags">
  <ScrollShadow>
    <ActionButtons>
      {#key $colors$}
        {#if skills}
          {#each skills as tag}
            <Tag
              {tag}
              on:select={$onSelect$($nodes$.get(tag.id)?.node, true)}
              on:enter={$onHover$($nodes$.get(tag.id)?.node)}
              on:leave={$onLeave$($nodes$.get(tag.id)?.node)}
            >
              <Text>
                {$_(tag.name)}
              </Text>
            </Tag>
          {/each}
        {/if}
        {#if other}
          {#each other as tag}
            <Tag {tag} on:select={() => onSelect(tag)} on:enter={() => onEnter(tag)} on:leave={() => onLeave(tag)}>
              <Text title="test">
                {$_(tag.name)}
              </Text>
            </Tag>
          {/each}
        {/if}
      {/key}
    </ActionButtons>
  </ScrollShadow>
</div>

<style lang="scss">
  @use 'src/theme/breakpoint';

  .tile-tags {
    display: flex;
    flex: 1 1 auto;
    max-height: 12rem;
    overflow: hidden;

    @media screen and (max-width: breakpoint.$mobile + px) {
      justify-content: center;
    }

    /* stylelint-disable-next-line -- library class */
    :global(.mdc-card__action-buttons) {
      flex-wrap: wrap;
      gap: 0.5rem 0;

      @media screen and (max-width: breakpoint.$mobile + px) {
        justify-content: center;
      }
    }

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
