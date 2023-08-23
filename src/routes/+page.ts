import type { PageLoad } from './$types';

import * as Settings from '$lib/settings';

export const load: PageLoad = function () {
  return {
    dpi: Settings.load(Settings.DPI, 800),
    cm360: Settings.load(Settings.CM360, 37),
    ut4: {
      fov: Settings.load(Settings.UT4_FOV, 100)
    },
    ut2k4: {
      fov: Settings.load(Settings.UT2K4_FOV, 90),
      speed: Settings.load(Settings.UT2K4_SPEED, 2.0)
    },
    ut99: {
      fov: Settings.load(Settings.UT99_FOV, 90),
      speed: Settings.load(Settings.UT99_SPEED, 6.0),
      zoomSensitivity: Settings.load(Settings.UT99_ZOOM_SENSITIVITY, 0.8)
    }
  };
};
