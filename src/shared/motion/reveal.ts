// The artifact's rule for every entrance effect: only what starts below the first screen of where
// the page lands may be hidden and animated in. `landing` is the deep-link target's top (or 0).
export function startsBelowFold(input: { top: number; landing: number; innerHeight: number }) {
  return input.top - input.landing > input.innerHeight;
}
