<script lang="ts">
  import Counter from "$lib/Counter.svelte";
  console.log(import.meta.env.VITE_FAUNADB_SERVER_SECRET);
</script>

<main>
  <h1>Hello world!</h1>

  <Counter />
</main>

<style style lang="postcss">
</style>
