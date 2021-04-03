<script lang="ts">
  import { GraphQLClient, gql, request } from "graphql-request";
  import { onMount } from "svelte";

  const endpoint = "https://graphql.fauna.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: "Bearer " + import.meta.env.VITE_FAUNADB_SERVER_SECRET,
    },
  });

  const query = gql`
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
