<script lang="ts">
  import type { PageData } from './$types';

  import UT4Widget from '$lib/UT4Widget.svelte';
  import UT2k4Widget from '$lib/UT2k4Widget.svelte';
  import UT99Widget from '$lib/UT99Widget.svelte';

  import * as Settings from '$lib/settings';

  export let data: PageData;

  let dpi = Settings.persist(Settings.DPI, data.dpi);
  let cm360 = Settings.persist(Settings.CM360, data.cm360);
  let ut4Fov = Settings.persist(Settings.UT4_FOV, data.ut4.fov);
  let ut2k4Fov = Settings.persist(Settings.UT2K4_FOV, data.ut2k4.fov);
  let ut2k4Speed = Settings.persist(Settings.UT2K4_SPEED, data.ut2k4.speed);
  let ut99Fov = Settings.persist(Settings.UT99_FOV, data.ut99.fov);
  let ut99Speed = Settings.persist(Settings.UT99_SPEED, data.ut99.speed);
  let ut99ZoomSens = Settings.persist(Settings.UT99_ZOOM_SENSITIVITY, data.ut99.zoomSensitivity);
</script>

<h1>UT Sensitivity Calculator</h1>

<UT4Widget bind:dpi={$dpi} bind:cm360={$cm360} bind:fov={$ut4Fov} />
<UT2k4Widget bind:dpi={$dpi} bind:cm360={$cm360} bind:fov={$ut2k4Fov} bind:speed={$ut2k4Speed} />
<UT99Widget
  bind:dpi={$dpi}
  bind:cm360={$cm360}
  bind:fov={$ut99Fov}
  bind:speed={$ut99Speed}
  bind:zoomSens={$ut99ZoomSens}
/>
