import type { MissionCategory } from './catalog';
import introHero768 from './assets/imagery/intro-hero-768.webp';
import introHero1536 from './assets/imagery/intro-hero-1536.webp';
import categoryMovement512 from './assets/imagery/category-movement-512.webp';
import categoryMovement1024 from './assets/imagery/category-movement-1024.webp';
import categoryCreativity512 from './assets/imagery/category-creativity-512.webp';
import categoryCreativity1024 from './assets/imagery/category-creativity-1024.webp';
import categoryHelping512 from './assets/imagery/category-helping-at-home-512.webp';
import categoryHelping1024 from './assets/imagery/category-helping-at-home-1024.webp';
import categoryLearning512 from './assets/imagery/category-learning-512.webp';
import categoryLearning1024 from './assets/imagery/category-learning-1024.webp';
import categoryCalm512 from './assets/imagery/category-calm-512.webp';
import categoryCalm1024 from './assets/imagery/category-calm-1024.webp';
import stepChoose768 from './assets/imagery/step-choose-768.webp';
import stepChoose1536 from './assets/imagery/step-choose-1536.webp';
import stepDo768 from './assets/imagery/step-do-768.webp';
import stepDo1536 from './assets/imagery/step-do-1536.webp';
import stepRecognize768 from './assets/imagery/step-recognize-768.webp';
import stepRecognize1536 from './assets/imagery/step-recognize-1536.webp';

// The bounded product imagery the Visual & Ergonomic Specification authorizes:
// one image for each Mission Category, one for each step of the introduction's
// account of the flow, and the introduction's one hero image, and nothing
// else. Presentation only — no Mission content, no persisted value — and every
// image is decorative: the category label and the step's words carry all of
// the meaning, and the hero stands for no Mission.
//
// Each image is a reviewed static file, bundled by the ordinary build in two
// widths so a phone is not sent a desktop's file. Nothing is fetched from
// another origin and nothing is generated at runtime.
//
// `sizes` follows the layout, measured on the served build at the browser's
// ordinary and enlarged text size: each value is at or above the width the
// image is drawn at — for the cover-framed hero, the width its image is scaled
// to — and its conditions are in `em`, as the layout's are, so they follow the
// browser's text size.
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
  src: introHero768,
  srcSet: `${introHero768} 768w, ${introHero1536} 1536w`,
  sizes: '(min-width: 100em) 48vw, (min-width: 66em) 58vw, 103vw',
  width: 1536,
  height: 1024,
};

function categoryImage(small: string, large: string): ProductImage {
  return {
    src: small,
    srcSet: `${small} 512w, ${large} 1024w`,
    sizes: '(max-width: 20em) 60vw, (max-width: 37em) 24vw, (max-width: 59em) 13vw, 17vw',
    width: 1024,
    height: 1024,
  };
}

// The five share one treatment — size, framing, light and material — so no
// category looks richer, easier or more valuable than another. They are the
// same for every age group.
export const CATEGORY_IMAGES: Readonly<Record<MissionCategory, ProductImage>> = {
  Movement: categoryImage(categoryMovement512, categoryMovement1024),
  Creativity: categoryImage(categoryCreativity512, categoryCreativity1024),
  'Helping at Home': categoryImage(categoryHelping512, categoryHelping1024),
  Learning: categoryImage(categoryLearning512, categoryLearning1024),
  Calm: categoryImage(categoryCalm512, categoryCalm1024),
};

function stepImage(small: string, large: string): ProductImage {
  return {
    src: small,
    srcSet: `${small} 768w, ${large} 1536w`,
    sizes: '(max-width: 20em) 92vw, 29vw',
    width: 1536,
    height: 1024,
  };
}

// In the order of the three steps the introduction describes.
export const FLOW_STEP_IMAGES: readonly ProductImage[] = [
  stepImage(stepChoose768, stepChoose1536),
  stepImage(stepDo768, stepDo1536),
  stepImage(stepRecognize768, stepRecognize1536),
];
