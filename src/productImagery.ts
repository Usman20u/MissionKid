import type { MissionCategory } from './catalog';
import introHero960 from './assets/imagery/intro-hero-960.webp';
import introHero1536 from './assets/imagery/intro-hero-1536.webp';
import categoryMovement320 from './assets/imagery/category-movement-320.webp';
import categoryMovement640 from './assets/imagery/category-movement-640.webp';
import categoryCreativity320 from './assets/imagery/category-creativity-320.webp';
import categoryCreativity640 from './assets/imagery/category-creativity-640.webp';
import categoryHelping320 from './assets/imagery/category-helping-at-home-320.webp';
import categoryHelping640 from './assets/imagery/category-helping-at-home-640.webp';
import categoryLearning320 from './assets/imagery/category-learning-320.webp';
import categoryLearning640 from './assets/imagery/category-learning-640.webp';
import categoryCalm320 from './assets/imagery/category-calm-320.webp';
import categoryCalm640 from './assets/imagery/category-calm-640.webp';
import stepChoose480 from './assets/imagery/step-choose-480.webp';
import stepChoose960 from './assets/imagery/step-choose-960.webp';
import stepDo480 from './assets/imagery/step-do-480.webp';
import stepDo960 from './assets/imagery/step-do-960.webp';
import stepRecognize480 from './assets/imagery/step-recognize-480.webp';
import stepRecognize960 from './assets/imagery/step-recognize-960.webp';

// The bounded product imagery the Visual & Ergonomic Specification authorizes:
// one image for each Mission Category, one for each step of the introduction's
// account of the flow, and the introduction's one hero image, and nothing
// else. Presentation only — no Mission content, no persisted value — and every
// image is decorative: the category label and the step's words carry all of
// the meaning, and the hero stands for no Mission.
//
// Each image is a reviewed static file derived from the originals kept beside
// it, bundled by the ordinary build in two widths so a phone is not sent a
// desktop's file. Nothing is fetched from another origin and nothing is
// generated at runtime.
export type ProductImage = Readonly<{
  src: string;
  srcSet: string;
  sizes: string;
  // The larger file's size, so the box is reserved at the image's own ratio
  // before it loads.
  width: number;
  height: number;
}>;

// Shown once, on the introduction, never on a session surface.
export const INTRODUCTION_HERO_IMAGE: ProductImage = {
  src: introHero960,
  srcSet: `${introHero960} 960w, ${introHero1536} 1536w`,
  sizes: '(min-width: 64rem) 50vw, 100vw',
  width: 1536,
  height: 1024,
};

function categoryImage(small: string, large: string): ProductImage {
  return {
    src: small,
    srcSet: `${small} 320w, ${large} 640w`,
    sizes: '(min-width: 64rem) 20vw, 30vw',
    width: 640,
    height: 640,
  };
}

// The five share one treatment — size, framing, light and material — so no
// category looks richer, easier or more valuable than another.
export const CATEGORY_IMAGES: Readonly<Record<MissionCategory, ProductImage>> = {
  Movement: categoryImage(categoryMovement320, categoryMovement640),
  Creativity: categoryImage(categoryCreativity320, categoryCreativity640),
  'Helping at Home': categoryImage(categoryHelping320, categoryHelping640),
  Learning: categoryImage(categoryLearning320, categoryLearning640),
  Calm: categoryImage(categoryCalm320, categoryCalm640),
};

function stepImage(small: string, large: string): ProductImage {
  return {
    src: small,
    srcSet: `${small} 480w, ${large} 960w`,
    sizes: '(min-width: 64rem) 32vw, 8rem',
    width: 960,
    height: 640,
  };
}

// In the order of the three steps the introduction describes.
export const FLOW_STEP_IMAGES: readonly ProductImage[] = [
  stepImage(stepChoose480, stepChoose960),
  stepImage(stepDo480, stepDo960),
  stepImage(stepRecognize480, stepRecognize960),
];
