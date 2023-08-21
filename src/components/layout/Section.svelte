<script lang="ts">
  export let fullscreen = false;
</script>

<section class="section" class:fullscreen>
  <div class="section_header">
    <slot name="header" />
  </div>
  <div class="section_main">
    <slot name="main" />
  </div>
</section>

<style lang="scss">
  .section {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding-bottom: 3rem;

    &.fullscreen {
      min-height: 100dvh;
    }

    &_header {
      display: flex;
      flex-direction: column;
    }

    &_main {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
