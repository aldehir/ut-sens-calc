<script>
  import { Debouncer, validValues } from '$lib/util.ts';

  const yawIncrement = 0.07027132539528;

  export let dpi;
  export let cm360;

  let fov = 90;
  let speed = 2.0;
  let sensitivity = 1.0;

  let debouncer = new Debouncer();

  function calcSens(dpi, fov, speed, sens) {
    return (360.0 * 2.54) / (yawIncrement * (speed/2.0) * dpi * 0.01111 * fov * sens);
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

  $: computeSensitivity(dpi, fov, speed, cm360);
  $: computeCm360(sensitivity);
</script>

<h2>UT2k4</h2>

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
