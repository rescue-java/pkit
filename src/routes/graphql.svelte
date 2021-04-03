<script lang="ts">
  import { GraphQLClient } from "graphql-request";
  import { onMount } from "svelte";
  import { amp, browser, dev } from "$app/env";

  const endpoint = "https://graphql.fauna.com/graphql";

  const api_key = dev
    ? import.meta.env.VITE_FAUNADB_SERVER_SECRET
    : process.env.FAUNADB_SERVER_SECRET;
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: "Bearer " + api_key,
    },
  });

  const query = `
    {
      allWarehouses {
        data {
          _id
          name
          address {
            street
            city
            state
            zipCode
          }
        }
      }
    }
  `;
  let todos;

  onMount(async () => {
    todos = await graphQLClient.request(query);
    console.log(todos);
  });
</script>

<main>
  {#if !todos || todos.fetching}
    Loading...
  {:else if todos.error}
    Oh no! {todos.error.message}
  {:else}
    {#each todos.allWarehouses.data as todo (todo._id)}
      {todo._id} - {todo.name} - {todo.address.street}<br /><br />
    {/each}
  {/if}
</main>

<style>
</style>
