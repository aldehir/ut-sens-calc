<script lang="ts">
  import { Debouncer } from '$lib/util';

  export let dpi: number = 800;
  export let cm360: number = 37;

  let fov: number = 90;
  let speed: number = 6.0;
  let sensitivity: number = 1.0;
  let zoomSens: number = 0.8;
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

<h2>UT99</h2>

<p>
  You can find your mouse speed by opening your <tt>User.ini</tt> and searching for the
  <tt>MouseX=</tt> option. Here is an example:
</p>

<pre>
MouseX=Axis aMouseX Speed=6
</pre>

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
  <input type="number" id="speed" step="0.5" bind:value={speed} />
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
