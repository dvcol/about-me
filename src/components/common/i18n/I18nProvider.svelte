<script>
  import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
  import { locales } from 'virtual:vite-plugin-i18n';

  addMessages('en', locales?.en);
  addMessages('fr', locales?.fr);

  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });

  if (import.meta.hot) {
    import.meta.hot.on('virtual:vite-plugin-i18n', ({ data }) => {
      if (data) Object.keys(data).forEach(lang => addMessages(lang, data[lang]));
    });
  }
</script>
