/**
 * Deterministic PRNG (mulberry32). Used for procedural scene layout so that
 * regenerating a layer (hot reload, resize, parent re-render) always produces
 * the exact same positions instead of a new random arrangement (flicker).
 */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
