<script lang="ts">
  import Card, { ActionIcons, Actions, Content, Media, MediaContent } from '@smui/card';

  import IconButton from '@smui/icon-button';

  import DownloadingSvg from 'line-md/svg/downloading-loop.svg?component';
  import ExternalLinkSvg from 'line-md/svg/external-link-rounded.svg?component';

  import TileTags from './TileTags.svelte';

  import type { ProjectLinks, ProjectMedia, ProjectTags } from '~/models';

  import GithubSvg from '~/assets/github.svelte';

  let className: string = '';
  export { className as class };

  export let title: string = null;
  export let subtitle: string = null;
  export let description: string = null;
  export let media: ProjectMedia = null;
  export let links: ProjectLinks = null;
  export let tags: ProjectTags = null;
</script>

<div class={['tile', className].filter(Boolean).join(' ')}>
  <Card class="tile-card">
    {#if media?.url}
      <Media class="tile-card-media" aspectRatio={media.aspectRatio} style={`background-image: url(${media.url})`}>
        {#if media?.title}
          <MediaContent>
            <h2 class="tile-card-media-title mdc-typography--headline6p">
              {media.title}
            </h2>
          </MediaContent>
        {/if}
      </Media>
    {/if}
    {#if title || subtitle || description}
      <Content class="tile-card-content mdc-typography--body2">
        {#if title}
          <h2 class="mdc-typography--headline6">{title}</h2>
        {/if}
        {#if subtitle}
          <h3 class="mdc-typography--subtitle2">{subtitle}</h3>
        {/if}
        {#if description}
          {@html description}
        {/if}
      </Content>
    {/if}
    {#if tags || links}
      <Actions class="tile-card-actions">
        {#if tags}
          <TileTags {...tags} />
        {/if}
        <ActionIcons>
          {#if links?.github}
            <IconButton class="tile-card-actions-button" title="Github" size="mini" href={links.github}><GithubSvg /></IconButton>
          {/if}
          {#if links?.store}
            <IconButton class="tile-card-actions-button" title="Store" size="mini" href={links.store}><DownloadingSvg /></IconButton>
          {/if}
          {#if links?.website}
            <IconButton class="tile-card-actions-button" title="Websites" size="mini" href={links.website}><ExternalLinkSvg /></IconButton>
          {/if}
        </ActionIcons>
      </Actions>
    {/if}
  </Card>
</div>

<style lang="scss">
  @mixin line-clamp($max-line: 2) {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: $max-line;
    -webkit-box-orient: vertical;
  }

  .tile {
    :global {
      .tile-card {
        display: flex;
        flex: 1 1 auto;
        transition: scale 0.5s;
        scale: 0.975;

        &:hover,
        &:focus {
          scale: 1;
        }

        &-media {
          display: flex;
          flex: 1 1 auto;

          &-title {
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 0;
            padding: 1rem 1.5rem;
            color: #fff;
          }
        }

        &-content {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          padding: 0.5rem 2rem;

          h3 {
            @include line-clamp(3);
          }

          p {
            @include line-clamp(20);
          }
        }

        &-actions {
          padding: 0 1rem 1rem;

          &-button {
            margin: 0 0.25rem;

            --mdc-ripple-fg-size: 24px !important;
            --mdc-ripple-fg-scale: 1.7 !important;
            --mdc-ripple-left: 8px !important;
            --mdc-ripple-top: 8px !important;
          }
        }
      }
    }
  }
</style>
