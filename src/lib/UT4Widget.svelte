<script lang="ts">
  import '$lib/styles/panel.scss';

  import { Debouncer } from '$lib/util';
  import NumericInput from '$lib/NumericInput.svelte';

  export let dpi = 800;
  export let cm360 = 37;
  export let fov = 100;

  let sensitivity = 1.0;

  let debouncer = new Debouncer();

  function calcSens(dpi: number, fov: number, sens: number) {
    return (360.0 * 2.54) / (0.01 * 0.02222 * dpi * fov * sens);
  }

  function computeSensitivity() {
    debouncer.debounce(() => {
      sensitivity = calcSens(dpi, fov, cm360);
    });
  }

  function computeCm360() {
    debouncer.debounce(() => {
      cm360 = calcSens(dpi, fov, sensitivity);
    });
  }

  $: dpi, fov, cm360, computeSensitivity();
  $: sensitivity, computeCm360();
</script>

<div class="panel">
  <h2>UT4</h2>

  <div class="fields">
    <div class="column">
      <NumericInput label="DPI" bind:value={dpi} step={100} />
      <NumericInput label="FOV" bind:value={fov} />
    </div>

    <div class="column">
      <NumericInput label="SENS" bind:value={sensitivity} precision={3} step={0.1} />
      <NumericInput label="CM/360" bind:value={cm360} precision={3} step={0.1} />
    </div>
  </div>
</div>
