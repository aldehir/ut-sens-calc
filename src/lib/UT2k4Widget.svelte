<script lang="ts">
  import '$lib/styles/panel.scss';

  import { Debouncer } from '$lib/util';
  import NumericInput from '$lib/NumericInput.svelte';

  const yawIncrement = 0.07027132539528;

  export let dpi = 800;
  export let cm360 = 37;
  export let fov = 90;
  export let speed = 2.0;

  let sensitivity = 1.0;

  let debouncer = new Debouncer();

  function calcSens(dpi: number, fov: number, speed: number, sens: number) {
    return (360.0 * 2.54) / (yawIncrement * (speed / 2.0) * dpi * 0.01111 * fov * sens);
  }

  function computeSensitivity() {
    debouncer.debounce(() => {
      sensitivity = calcSens(dpi, fov, speed, cm360);
    });
  }

  function computeCm360() {
    debouncer.debounce(() => {
      cm360 = calcSens(dpi, fov, speed, sensitivity);
    });
  }

  $: dpi, fov, speed, cm360, computeSensitivity();
  $: sensitivity, computeCm360();
</script>

<div class="panel">
  <h2>UT2k4</h2>

  <div class="fields">
    <div class="column">
      <NumericInput label="DPI" bind:value={dpi} step={100} />
      <NumericInput label="FOV" bind:value={fov} />
      <NumericInput label="SPEED" bind:value={speed} step={0.5} />
    </div>

    <div class="column">
      <NumericInput label="SENS" bind:value={sensitivity} step={0.1} precision={3} />
      <NumericInput label="CM/360" bind:value={cm360} step={0.1} precision={3} />
    </div>
  </div>
</div>
