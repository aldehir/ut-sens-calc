<script>
  import UT4Widget from '$lib/UT4Widget.svelte';
  import UT2k4Widget from '$lib/UT2k4Widget.svelte';
  import UT99Widget from '$lib/UT99Widget.svelte';

  let dpi = 800;
  let cm360 = 37;
</script>

<svelte:head>
  <title>UT Sensitivity Calculator</title>
</svelte:head>

<h1>UT Sensitivity Calculator</h1>

<UT4Widget bind:dpi={dpi} bind:cm360={cm360} />
<UT2k4Widget bind:dpi={dpi} bind:cm360={cm360} />
<UT99Widget bind:dpi={dpi} bind:cm360={cm360} />
