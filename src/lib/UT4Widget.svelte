<script>
  import { Debouncer, validValues } from '$lib/util.ts';

  export let dpi;
  export let cm360;

  let fov = 90;
  let sensitivity = 1.0;

  let debouncer = new Debouncer();

  function calcSens(dpi, fov, sens) {
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

  $: computeSensitivity(dpi, fov, cm360);
  $: computeCm360(sensitivity);
</script>

<h2>UT4</h2>

<div>
  <label for="dpi">DPI</label>
  <input type="number" id="dpi" bind:value={dpi} />
</div>

<div>
  <label for="fov">FOV</label>
  <input type="number" id="fov" bind:value={fov} />
</div>

<div>
  <label for="sensitivity">Sensitivity</label>
  <input type="number" id="sensitivity" bind:value={sensitivity} />
</div>

<div>
  <label for="cm360">cm/360</label>
  <input type="number" id="cm360" bind:value={cm360} />
</div>
