<script lang="ts">
  import svelteLogo from '~/assets/svelte.svg'
  import {Counter} from '~/components/common'
</script>

<main id="app">
  <div>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style lang="scss">
  :root {
    color: rgb(255 255 255 / 87%);
    font-weight: 400;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    background-color: #242424;
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  a {
    color: #646cff;
    font-weight: 500;
    text-decoration: inherit;

    &:hover,
    &:focus {
      color: #535bf2;
    }
  }


  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  .card {
    padding: 2em;
  }

  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  button {
    padding: 0.6em 1.2em;
    font-weight: 500;
    font-size: 1em;
    font-family: inherit;
    background-color: #1a1a1a;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover {
      border-color: #646cff;
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #fff;
    }

    a:hover,
    a:focus {
      color: #747bff;
    }

    button {
      background-color: #f9f9f9;
    }
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
