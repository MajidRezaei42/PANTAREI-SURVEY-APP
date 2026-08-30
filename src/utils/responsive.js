// src/utils/responsive.js
// Adaptive typography.
//
// Every style in this app was written against a ~375dp-wide phone. React Native
// does NOT scale text for larger screens, so on a 10" tablet those same values
// render at the same physical-ish size while the layout around them doubles —
// which is why the text read as tiny in the field.
//
// fs() converts a design-time font size into one scaled for the current device.
// Wrap fontSize AND lineHeight with it; scaling one without the other clips
// descenders on multi-line text.

import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// The app is locked to portrait, but read the shorter edge anyway so the value
// is stable if that ever changes or the app runs in split-screen.
const shortest = Math.min(width, height);

// Design baseline the existing styles assume.
const BASE_WIDTH = 375;

// Tablets are wider and held a little further away, so text should not grow
// perfectly linearly with the screen. But it should grow nearly that much:
// this app is a kiosk-style survey read at arm's length while standing, and
// the earlier conservative value left a 10" tablet with half its screen empty.
const DAMPING = 0.82;

// Nothing smaller than this, at any device size. The survey is run outdoors by
// participants of all ages; 10-11pt was below comfortable reading size even on
// a phone. Set to 0 to disable if a layout overflows.
const MIN_FONT_SIZE = 12;

const raw = shortest / BASE_WIDTH;
const damped = raw <= 1 ? raw : 1 + (raw - 1) * DAMPING;

// Clamp: never shrink much on small phones; the upper bound only bites on
// screens larger than a 10" tablet, where type would otherwise become silly.
export const SCALE = Math.min(Math.max(damped, 0.95), 2.0);

// Android's smallest-width buckets treat >=600dp as a tablet.
export const isTablet = shortest >= 600;

/**
 * Scale a design-time font size (or lineHeight) for this device.
 * @param {number} size value as written for a 375dp-wide phone
 * @returns {number} device-appropriate size, snapped to the pixel grid
 */
export function fs(size) {
  const scaled = size * SCALE;
  const floored = Math.max(scaled, Math.min(MIN_FONT_SIZE, size * 1.5));
  return Math.round(PixelRatio.roundToNearestPixel(floored));
}

/**
 * Scale spacing (padding, margin, gap). Deliberately gentler than fs() so
 * larger text gets room to breathe without the layout stretching oddly.
 */
export function sp(size) {
  return Math.round(PixelRatio.roundToNearestPixel(size * (1 + (SCALE - 1) * 0.6)));
}

/**
 * Scale a fixed UI dimension — icon sizes, thumbnails, control heights.
 * Tracks fs() closely: these elements sit beside text and look wrong if the
 * type grows while they stay phone-sized.
 */
export function dp(size) {
  return Math.round(PixelRatio.roundToNearestPixel(size * SCALE));
}
