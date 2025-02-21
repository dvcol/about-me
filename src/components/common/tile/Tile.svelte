<script lang="ts">
  import Card, { ActionIcons, Actions, Content, Media, MediaContent } from '@smui/card';
  import IconButton from '@smui/icon-button';
  import DomPurify from 'dompurify';
  import SmallRightArrowSvg from 'line-md/svg/arrow-small-right.svg?component';

  import DownloadingSvg from 'line-md/svg/downloading-loop.svg?component';
  import ExternalLinkSvg from 'line-md/svg/external-link-rounded.svg?component';

  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  import { fade } from 'svelte/transition';

  import { _ } from 'svelte-i18n';

  import TileTags from './TileTags.svelte';

  import type { Address, ProjectDuration, ProjectLinks, ProjectMedia, ProjectTags } from '~/models';

  import GithubSvg from '~/assets/github.svelte';
  import AnimatedButton from '~/components/common/button/AnimatedButton.svelte';

  let className: string = '';
  export { className as class };

  let styles: string = '';
  export { styles as style };

  export let dataId: string = null;

  export let title: string = null;
  export let subtitle: string = null;
  export let description: string = null;
  export let media: ProjectMedia = null;
  export let links: ProjectLinks = null;
  export let tags: ProjectTags = null;

  export let duration: ProjectDuration = null;
  export let address: Address = null;
  export let meta: string = null;

  const dispatch = createEventDispatcher();

  const hover$ = writable(false);
</script>

<div
  data-id={dataId}
  class={['tile', className].filter(Boolean).join(' ')}
  style={styles}
  role="article"
  on:mouseenter={event => {
    $hover$ = true;
    dispatch('mouseenter', event);
  }}
  on:mouseleave={event => {
    $hover$ = false;
    dispatch('mouseleave', event);
  }}
>
  <Card class="tile-card">
    {#if media?.url}
      <Media
        class={`tile-card-media ${media.controls ? 'tile-card-media--controls' : ''}`}
        aspectRatio={media.aspectRatio}
        style={media.type?.startsWith('image') ? `background-image: url(${media.url?.startsWith('http') ? '' : './'}${media.url})` : undefined}
      >
        {#if media.title || media.subtitle}
          <MediaContent>
            {#if media.type?.startsWith('video')}
              <video
                class="tile-card-media-video"
                style={[media.background ? `background: ${media.background};` : undefined, media.style].filter(Boolean).join(' ')}
                autoplay
                muted
                loop
                playsinline
                controls={media.controls}
              >
                <source src={`${media.url?.startsWith('http') ? '' : './'}${media.url}`} type={media.type} />
              </video>
            {/if}
            <div class="tile-card-media-content">
              {#if media.title}
                <h2 class="tile-card-media-title mdc-typography--headline6p" style:color={media.color}>
                  {$_(media.title)}
                </h2>
              {/if}
              {#if media.subtitle}
                <h3 class="tile-card-media-subtitle mdc-typography--subtitle2" style:color={media.color}>{$_(media.subtitle)}</h3>
              {/if}
              {#if media.link}
                <AnimatedButton class="tile-card-media-link" url={media.link.url}>
                  {$_(media.link?.label)}
                  <SmallRightArrowSvg slot="icon" />
                </AnimatedButton>
              {/if}
            </div>
          </MediaContent>
        {:else}
          <div class="tile-card-media-spacer">
            <!-- spacer -->
          </div>
        {/if}
      </Media>
    {/if}
    {#if title || subtitle || description}
      <Content class="tile-card-content mdc-typography--body2">
        {#if title}
          <h2 class="mdc-typography--headline6">{$_(title)}</h2>
        {/if}
        {#if address || duration || meta}
          <p class="tile-card-content-meta">
            {#if meta}
              <span class="tile-card-content-meta-title">{$_(meta)}</span>
            {/if}
            {#if address || duration}
              <span class="tile-card-content-meta-description"
                >{[meta ? ' ' : undefined, address?.short, duration?.range].filter(Boolean).join(' | ')}</span
              >
            {/if}
          </p>
        {/if}
        {#if subtitle}
          <h3 class="mdc-typography--subtitle2">{$_(subtitle)}</h3>
        {/if}
        {#if description}
          <p class="tile-card-content-description">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -- html is sanitized -->
            {@html DomPurify.sanitize($_(description), { USE_PROFILES: { html: true } })}
          </p>
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
  @use 'src/theme/breakpoint';
  @use 'src/theme/colors';

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
        transition: scale 0.5s ease-out, box-shadow 0.5s ease-out;
        scale: 0.975;

        &-media {
          display: flex;
          flex: 1 1 auto;
          overflow: hidden;

          &-spacer {
            min-height: 20rem;
          }

          &-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
          }

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

          &--controls {
            .tile-card-media-content {
              padding-bottom: 4rem;
              pointer-events: none;
            }

            .tile-card-media-link {
              pointer-events: all;
            }
          }
        }

        &-content {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          padding: 0.5rem 2rem;

          h2 {
            @include line-clamp(3);

            color: colors.$primary;
          }

          h3 {
            @include line-clamp(4);

            margin: 0 0 0.25rem;
          }

          &-meta {
            @include line-clamp(1);

            margin-top: -0.5rem;
            color: colors.$tertiary;
            font-weight: bold;

            &-title {
              font-size: 1.1em;
            }
          }

          &-description {
            white-space: pre-line;
          }

          ul {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 0;
          }
        }

        &-actions {
          padding: 0 1rem 1rem;

          &-links {
            min-width: 48px;
            min-height: 40px;
          }

          &-button {
            margin: 0 0.25rem;

            --mdc-ripple-fg-size: 24px !important;
            --mdc-ripple-fg-scale: 1.7 !important;
            --mdc-ripple-left: 8px !important;
            --mdc-ripple-top: 8px !important;

            color: colors.$secondary;
            transition: scale 1s, color 1.5s;
            will-change: scale, color;

            &:hover,
            &:focus {
              scale: 1.1;
              color: colors.$primary;
            }
          }
        }

        &:hover,
        &:focus {
          scale: 1;
          box-shadow: 0 1px 2px -2px rgba(0 0 0 / 24%), 0 3px 6px 0 rgba(0 0 0 / 18%), 0 5px 12px 4px rgba(0 0 0 / 12%);

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
        /* stylelint-disable-next-line -- library class */
        :global(.mdc-card__actions) {
          flex-flow: column wrap;
        }

        :global(.tile-card-actions-links) {
          justify-content: center;
          margin: 0.25rem 0 0;
        }

        :global .tile-card-content {
          h2 {
            @include line-clamp(5);
          }

          h3 {
            @include line-clamp(5);
          }

          -meta {
            @include line-clamp(3);
          }
        }
      }
    }
  }
</style>
