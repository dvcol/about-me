<section class="section">
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
    flex-direction: column;
    flex: 1 1 auto;

    &_header {
      display: flex;
      flex-direction: column;
    }

    &_main {
      display: flex;
      flex-direction: column;
    }
  }
</style>
