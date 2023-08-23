<script lang="ts">
  import '$lib/styles/panel.scss';

  import { Debouncer } from '$lib/util';
  import NumericInput from '$lib/NumericInput.svelte';

  export let dpi = 800;
  export let cm360 = 37;
  export let fov = 90;
  export let speed = 6.0;
  export let zoomSens = 0.8;

  let sensitivity = 1.0;
  let zoomCm360: number;

  let debouncer = new Debouncer();
  let zoomDebouncer = new Debouncer();

  function calcSens(dpi: number, fov: number, speed: number, sens: number, zoom: number) {
    return (65536 * 2.54) / (32 * 0.2 * 0.24 * 0.01111 * fov * dpi * sens * speed * zoom);
  }

  function computeSensitivity() {
    debouncer.debounce(() => {
      sensitivity = calcSens(dpi, fov, speed, cm360, 1.0);
    });
  }

  function computeCm360() {
    debouncer.debounce(() => {
      cm360 = calcSens(dpi, fov, speed, sensitivity, 1.0);
    });
  }

  function computeZoom() {
    zoomDebouncer.debounce(() => {
      zoomSens = cm360 / zoomCm360;
    });
  }

  function computeZoomCm360() {
    zoomDebouncer.debounce(() => {
      zoomCm360 = cm360 / zoomSens;
    });
  }

  $: dpi, fov, speed, cm360, computeSensitivity();
  $: sensitivity, computeCm360();

  $: cm360, zoomSens, computeZoomCm360();
  $: cm360, zoomCm360, computeZoom();
</script>

<div class="panel">
  <h2>UT99</h2>

  <div class="fields">
    <div class="column">
      <NumericInput label="DPI" bind:value={dpi} step={100} />
      <NumericInput label="FOV" bind:value={fov} />
      <NumericInput label="SPEED" bind:value={speed} step={0.5} />
    </div>

    <div class="column">
      <NumericInput label="SENS" bind:value={sensitivity} precision={3} step={0.1} />
      <NumericInput label="CM/360" bind:value={cm360} precision={3} step={0.1} />

      <h3>zoom</h3>

      <NumericInput label="SENS" bind:value={zoomSens} precision={3} step={0.1} />
      <NumericInput label="CM/360" bind:value={zoomCm360} precision={3} step={0.1} />
    </div>
  </div>
</div>
