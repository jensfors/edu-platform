<script>
  // your script goes here
  const avatars = [
    {
      name: 'avatar1',
      url: 'https://picsum.photos/160/160?random=1',
    },
    {
      name: 'avatar2',
      url: 'https://picsum.photos/160/160?random=2',
    },
    {
      name: 'avatar3',
      url: 'https://picsum.photos/160/160?random=3',
    },
    {
      name: 'avatar4',
      url: 'https://picsum.photos/160/160?random=4',
    },
    {
      name: 'avatar5',
      url: 'https://picsum.photos/160/160?random=5',
    },
  ]
</script>

<h1 class="text-2xl">This is our front page homie dog</h1>

<div class="card lg:card-side flex-wrap bg-base-100 shadow-xl">
  <div class="flex w-full bg-primary">
    <h1 class="text-2xl pl-8 py-4 text-white">Personas</h1>
  </div>
  <div class="flex p-8">
    {#each avatars as avatar}
      <figure class="flex flex-col pr-8">
        <img class="rounded-2xl" src={avatar.url} alt={avatar.name} />
        <p>{avatar.name}</p>
      </figure>
    {/each}
  </div>
</div>

<style>
  /* your styles go here */
</style>
