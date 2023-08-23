<script lang="ts">
  import UT4Widget from '$lib/UT4Widget.svelte';
  import UT2k4Widget from '$lib/UT2k4Widget.svelte';
  import UT99Widget from '$lib/UT99Widget.svelte';

  let dpi: number = 800;
  let cm360: number = 37;
</script>

<h1>UT Sensitivity Calculator</h1>

<UT4Widget bind:dpi={dpi} bind:cm360={cm360} />
<UT2k4Widget bind:dpi={dpi} bind:cm360={cm360} />
<UT99Widget bind:dpi={dpi} bind:cm360={cm360} />
