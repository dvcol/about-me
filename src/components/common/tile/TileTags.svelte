<script lang="ts">
  import { ActionButtons } from '@smui/card';
  import { Text } from '@smui/chips';

  import type { ProjectTags } from '~/models';

  import { Tag } from '~/components';
  import { useSkillsStore } from '~/stores';

  export let tags: ProjectTags = null;

  const { hover$, selected$, colors$, nodes$, onHover$, onLeave$, onSelect$ } = useSkillsStore();
</script>

<div class="tile-tags">
  <ActionButtons>
    {#key $colors$}
      {#if tags}
        {#each tags.skills as tag}
          <Tag
            class="tile-tags-tag"
            {tag}
            hover={!$hover$.length || $hover$.includes(tag.id)}
            selected={$selected$?.id === tag.id}
            on:select={$onSelect$($nodes$.get(tag.id)?.node, true)}
            on:enter={$onHover$($nodes$.get(tag.id)?.node)}
            on:leave={$onLeave$()}
          >
            <Text>
              {tag.name}
            </Text>
          </Tag>
        {/each}
        {#each tags.other as tag}
          <Tag {tag} hover={!$hover$.length} selected={false}>
            <Text>
              {tag.name}
            </Text>
          </Tag>
        {/each}
      {/if}
    {/key}
  </ActionButtons>
</div>

<style lang="scss">
  .tile-tags {
    :global {
      .tile-tags-tag {
        margin-right: 0.5rem;
      }
    }
  }
</style>
