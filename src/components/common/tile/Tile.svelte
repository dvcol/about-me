<script lang="ts">
  import Card, { ActionIcons, Actions, Content, Media, MediaContent } from '@smui/card';
  import IconButton from '@smui/icon-button';
  import SmallRightArrowSvg from 'line-md/svg/arrow-small-right.svg?component';

  import DownloadingSvg from 'line-md/svg/downloading-loop.svg?component';
  import ExternalLinkSvg from 'line-md/svg/external-link-rounded.svg?component';

  import { writable } from 'svelte/store';

  import { fade } from 'svelte/transition';

  import TileTags from './TileTags.svelte';

  import type { ProjectLinks, ProjectMedia, ProjectTags } from '~/models';

  import GithubSvg from '~/assets/github.svelte';
  import AnimatedButton from '~/components/common/button/AnimatedButton.svelte';

  let className: string = '';
  export { className as class };

  let styles: string = '';
  export { styles as style };

  export let title: string = null;
  export let subtitle: string = null;
  export let description: string = null;
  export let media: ProjectMedia = null;
  export let links: ProjectLinks = null;
  export let tags: ProjectTags = null;

  const hover$ = writable(false);
</script>

<div
  class={['tile', className].filter(Boolean).join(' ')}
  style={styles}
  on:mouseenter={() => {
    $hover$ = true;
  }}
  on:mouseleave={() => {
    $hover$ = false;
  }}
>
  <Card class="tile-card">
    {#if media?.url}
      <Media class="tile-card-media" aspectRatio={media.aspectRatio} style={`background-image: url(${media.url})`}>
        {#if media.title || media.subtitle}
          <MediaContent>
            <div class="tile-card-media-content">
              {#if media.title}
                <h2 class="tile-card-media-title mdc-typography--headline6p">
                  {media.title}
                </h2>
              {/if}
              {#if media.subtitle}
                <h3 class="tile-card-media-subtitle mdc-typography--subtitle2">{media.subtitle}</h3>
              {/if}
              {#if media.link}
                <AnimatedButton class="tile-card-media-link" url={media.link.url}>
                  {media.link?.label}
                  <SmallRightArrowSvg slot="icon" />
                </AnimatedButton>
              {/if}
            </div>
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
          <TileTags skills={tags.skills} other={tags.other} />
        {/if}
        {#if links}
          <ActionIcons class="tile-card-actions-links">
            {#if $hover$}
              <div class="tile-card-actions-links-buttons" out:fade={{ duration: 300 }}>
                {#if links?.github}
                  <IconButton class="tile-card-actions-button" title="Github" size="mini" href={links.github}><GithubSvg /></IconButton>
                {/if}
                {#if links?.store}
                  <IconButton class="tile-card-actions-button" title="Store" size="mini" href={links.store}><DownloadingSvg /></IconButton>
                {/if}
                {#if links?.website}
                  <IconButton class="tile-card-actions-button" title="Websites" size="mini" href={links.website}><ExternalLinkSvg /></IconButton>
                {/if}
              </div>
            {/if}
          </ActionIcons>
        {/if}
      </Actions>
    {/if}
  </Card>
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

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
        border-radius: 8px;
        transition: scale 0.5s;
        scale: 0.975;

        &-media {
          display: flex;
          flex: 1 1 auto;
          overflow: hidden;

          &-content {
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 0;
            padding: 1rem 1.5rem;
            transition: translate 1s, opacity 0.75s;
            will-change: translate;
            translate: 0 calc(100% - 5rem);
          }

          &-title,
          &-subtitle {
            color: #fff;

            @include line-clamp(2);
          }

          &-subtitle,
          &-link {
            opacity: 0;
            transition: opacity 1s;
            will-change: opacity;

            @include line-clamp(3);
          }

          &-subtitle {
            margin: 0.5rem 0;
          }

          &-link {
            margin-left: -0.5rem;
            font-weight: bold;
            font-size: medium;
            text-transform: none;
          }
        }

        &-content {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          padding: 0.5rem 2rem;

          h2 {
            @include line-clamp(2);
          }

          h3 {
            @include line-clamp(3);

            margin: 0 0 0.5rem;
          }
        }

        &-actions {
          padding: 0 1rem 1rem;

          &-links {
            min-height: 40px;
          }

          &-button {
            margin: 0 0.25rem;

            --mdc-ripple-fg-size: 24px !important;
            --mdc-ripple-fg-scale: 1.7 !important;
            --mdc-ripple-left: 8px !important;
            --mdc-ripple-top: 8px !important;
          }
        }

        &:hover,
        &:focus {
          scale: 1;

          .tile-card-media-content {
            translate: 0;
          }

          .tile-card-media-subtitle,
          .tile-card-media-link {
            opacity: 1;
          }
        }
      }

      @media screen and (max-width: breakpoint.$mobile + px) {
        :global(.mdc-card__actions) {
          flex-wrap: wrap;
        }

        :global(.tile-card-actions-links) {
          justify-content: center;
          margin: 0.25rem 0 0;
        }
      }
    }
  }
</style>
