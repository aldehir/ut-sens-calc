<script>
  import { onMount } from 'svelte';
  import { Debouncer, validValues } from '$lib/util.ts';

  export let dpi;
  export let cm360;

  let fov = 90;
  let speed = 6.0;
  let sensitivity = 1.0;
  let zoomSens = 0.8;
  let zoomCm360;

  let debouncer = new Debouncer();
  let zoomDebouncer = new Debouncer();

  function calcSens(dpi, fov, speed, sens, zoom) {
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
      zoomSens = calcSens(dpi, fov, speed, sensitivity, 1.0) / zoomCm360;
    });
  }

  function computeZoomCm360() {
    zoomDebouncer.debounce(() => {
      zoomCm360 = calcSens(dpi, fov, speed, sensitivity, zoomSens);
    });
  }

  $: computeSensitivity(dpi, fov, speed, cm360);
  $: computeCm360(sensitivity);

  $: computeZoomCm360(zoomSens);
  $: computeZoom(zoomCm360);
</script>

<h2>UT99</h2>

<div>
  <label for="dpi">DPI</label>
  <input type="number" id="dpi" bind:value={dpi} />
</div>

<div>
  <label for="fov">FOV</label>
  <input type="number" id="fov" bind:value={fov} />
</div>

<div>
  <label for="speed">Speed</label>
  <input type="number" id="speed" bind:value={speed} />
</div>

<div>
  <label for="sensitivity">Sensitivity</label>
  <input type="number" id="sensitivity" bind:value={sensitivity} />
</div>

<div>
  <label for="cm360">cm/360</label>
  <input type="number" id="cm360" bind:value={cm360} />
</div>

<div>
  <label for="zoom">Zoom</label>
  <input type="number" id="zoom" bind:value={zoomSens} />
</div>

<div>
  <label for="zoomcm360">Zoom cm/360</label>
  <input type="number" id="zoomcm360" bind:value={zoomCm360} />
</div>
