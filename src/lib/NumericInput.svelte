<script context="module">
  let counter = 0;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { Debouncer } from '$lib/util';

  let inputId = 'input_' + counter++;

  export let label = 'Number';
  export let precision = 0;
  export let step = 1;
  export let value = 1.0;

  let error = false;
  let updating = 0;

  let element: HTMLInputElement;
  let debouncer = new Debouncer();

  onMount(() => {
    element.value = value.toFixed(precision);
  });

  function onInput() {
    debouncer.debounce(() => {
      // Only update value if the field is valid
      let parsed = Number.parseFloat(element.value);
      if (parsed === null || Number.isNaN(parsed)) {
        error = true;
        return;
      }

      error = false;
      value = parsed;
    });
  }

  function onValueUpdate(value: number) {
    if (element) {
      debouncer.debounce(() => {
        element.value = value.toFixed(precision);
        error = false;  // Reset error flag

        updating++;
        setTimeout(() => {
          updating--;
        }, 250);
      });
    }
  }

  $: onValueUpdate(value);
</script>

<div class="numeric-input" class:error class:updating>
  <label for={inputId}>{label}</label>
  <input bind:this={element} id={inputId} {step} type="number" on:input={onInput} />
</div>

<style lang="scss">
  div {
    width: 100%;

    display: flex;
    box-sizing: border-box;

    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1em;

    background: var(--color-primary-650);
    border: 1px solid var(--color-primary-600);

    transition: background 500ms ease-out, border 500ms ease-out;
  }

  div.error {
    background: var(--color-error-700);
    border: 1px solid var(--color-error-600);
  }

  div.updating {
    background: var(--color-update-650);
    border: 1px solid var(--color-update-600);

    transition: none;
  }

  label {
    font: 0.8rem var(--font-primary);
    color: var(--color-primary-300);
    text-align: right;

    width: 5em;
    padding: 0.5rem 0rem 0.5rem 0.5rem;
  }

  input[type='number'] {
    font: 1.2rem var(--font-primary);
    color: var(--color-primary-100);

    width: 0;
    padding: 0.5rem 0.5rem 0.5rem 0;
    text-align: right;

    flex-grow: 1;

    border: none;
    background: none;

    -moz-appearance: textfield;
    appearance: textfield;

    &:focus {
      outline: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    --webkit-appearance: none;
    margin: 0;
  }
</style>
