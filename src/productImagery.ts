import type { MissionCategory } from './catalog';
import categoryMovement from './assets/imagery/category-movement.jpg';
import categoryCreativity from './assets/imagery/category-creativity.jpg';
import categoryHelping from './assets/imagery/category-helping-at-home.jpg';
import categoryLearning from './assets/imagery/category-learning.jpg';
import categoryCalm from './assets/imagery/category-calm.jpg';
import stepChoose from './assets/imagery/step-choose.jpg';
import stepAway from './assets/imagery/step-away.jpg';
import stepDone from './assets/imagery/step-done.jpg';

// The bounded product imagery the Visual & Ergonomic Specification authorizes:
// one image for each Mission Category and one for each step of the
// introduction's account of the flow, and nothing else. Presentation only —
// no Mission content, no persisted value — and every image is decorative: the
// category label and the step's words carry all of the meaning.
//
// Each file is a reviewed static render bundled by the ordinary build. Nothing
// is fetched from another origin and nothing is generated at runtime.
export type ProductImage = Readonly<{
  src: string;
  width: number;
  height: number;
}>;

// The five share one treatment — size, framing, light and material — so no
// category looks richer, easier or more valuable than another.
export const CATEGORY_IMAGES: Readonly<Record<MissionCategory, ProductImage>> = {
  Movement: { src: categoryMovement, width: 800, height: 600 },
  Creativity: { src: categoryCreativity, width: 800, height: 600 },
  'Helping at Home': { src: categoryHelping, width: 800, height: 600 },
  Learning: { src: categoryLearning, width: 800, height: 600 },
  Calm: { src: categoryCalm, width: 800, height: 600 },
};

// In the order of the three steps the introduction describes.
export const FLOW_STEP_IMAGES: readonly ProductImage[] = [
  { src: stepChoose, width: 480, height: 480 },
  { src: stepAway, width: 480, height: 480 },
  { src: stepDone, width: 480, height: 480 },
];
