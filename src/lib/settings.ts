import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const DPI = 'dpi';
export const CM360 = 'cm360';
export const UT4_FOV = 'ut4:fov';
export const UT2K4_FOV = 'ut2k4:fov';
export const UT2K4_SPEED = 'ut2k4:speed';
export const UT99_FOV = 'ut99:fov';
export const UT99_SPEED = 'ut99:speed';
export const UT99_ZOOM_SENSITIVITY = 'ut99:zoom_sensitivity';

export function load(key: string, def: number): number {
  if (!browser) return def;

  const value = localStorage.getItem(key);
  if (!value) return def;

  const numeric = Number.parseFloat(value);
  if (numeric === null || Number.isNaN(numeric)) {
    return def;
  }

  return numeric;
}

export function save(key: string, value: number) {
  if (!browser) return;
  localStorage.setItem(key, String(value));
}

export function persist(key: string, def: number) {
  const store = writable(def);
  store.subscribe((value: number) => save(key, value));
  return store;
}
