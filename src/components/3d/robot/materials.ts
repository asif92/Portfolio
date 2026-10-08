import * as THREE from 'three';

/**
 * Shared PBR Materials for the Robot Character
 * Reused across all subcomponents to optimize WebGL draw calls and maintain
 * consistent automotive-grade ceramic, dark metallic, and cyan emissive styling.
 */

// ── 1. Ceramic White Chassis ──────────────────────────────────────────
export const ceramicWhiteMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#F3F6FA'),
  roughness: 0.18,
  metalness: 0.05,
  clearcoat: 0.85,
  clearcoatRoughness: 0.12,
  reflectivity: 0.9,
  envMapIntensity: 1.4,
});

// ── 2. Dark Carbon / Titanium Inner Mechanics ─────────────────────────
export const darkMechanicalMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#151922'),
  roughness: 0.32,
  metalness: 0.72,
  envMapIntensity: 0.85,
});

// ── 3. Glossy Visor Screen ────────────────────────────────────────────
export const visorGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#060911'),
  roughness: 0.08,
  metalness: 0.85,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
  reflectivity: 1.0,
  envMapIntensity: 1.6,
});

// ── 4. Electric Cyan Emissive (Core, Rings, Accents) ──────────────────
export const cyanEmissiveMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#00E5FF'),
  emissive: new THREE.Color('#00F0FF'),
  emissiveIntensity: 2.8,
  roughness: 0.1,
  metalness: 0.1,
  toneMapped: false,
});

// ── 5. Bright Eye Emissive ────────────────────────────────────────────
export const cyanEyeMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color('#00F0FF'),
  toneMapped: false,
});

// ── 6. Eye Pupil Accent (Soft White Highlight) ────────────────────────
export const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color('#FFFFFF'),
  toneMapped: false,
});

// ── 7. Dark Accent Trim (Joint Rings, Edges) ──────────────────────────
export const darkTrimMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0C0E14'),
  roughness: 0.5,
  metalness: 0.3,
});
