import type { AgeBand } from './ageBands';
import type { MissionCategory } from './catalog';
import { resolveMissionImage } from './missionImages';

// Where a Mission's picture is shown. Only the introduction shows one example on
// its own; a Discovery card is one of three peers; the session views show the
// session's own Mission.
export type MissionPictureSurface = 'discovery' | 'introduction' | 'ready' | 'active' | 'result';

// How wide each surface draws its window, measured on the served build at every
// viewport width from 320 to 1920 px, so the browser fetches the illustration
// width that covers the window at the screen's density: the 768 file wherever
// that suffices, the 1536 file on a dense phone and for Ready's widest window,
// 704 px, at twice the density. Each value is at or above the window's width,
// and each breakpoint sits just after the layout's own, so where a classic
// scrollbar moves the layout the estimate errs toward the larger file.
const PICTURE_SIZES: Readonly<Record<MissionPictureSurface, string>> = {
  discovery: '(min-width: 61rem) 28vw, (min-width: 43rem) 36vw, 83vw',
  introduction: '(min-width: 43rem) min(41vw, 33.5rem), 83vw',
  ready: '(min-width: 47rem) min(42.5vw, 44rem), 88vw',
  active: '15rem',
  result: '(min-width: 66rem) min(42.5vw, 33.5rem), min(30rem, 78vw)',
};

type MissionPictureProps = Readonly<{
  missionId: string;
  ageBand: AgeBand;
  category: MissionCategory;
  className: string;
  surface: MissionPictureSurface;
}>;

// One Mission's own illustration, wherever a Mission is shown, for the age band
// in effect on this surface. Decorative — every word the Mission means is in
// the text beside it — and carried by its intrinsic size, so the space is
// reserved before the file arrives. A Mission without an illustration shows no
// picture: the release gate requires one for every approved pair, and nothing
// stands in for it.
//
// Session views pass the age band their session recorded when the Mission was
// chosen, which is the one its card was shown for, so Ready, the running
// Mission and its Reward Card show the very picture the family chose from.
export function MissionPicture({
  missionId,
  ageBand,
  category,
  className,
  surface,
}: MissionPictureProps) {
  const image = resolveMissionImage(missionId, ageBand);

  if (!image) return null;

  return (
    <div className={className} data-category={category}>
      <img
        alt=""
        aria-hidden="true"
        className="mission-picture__photo"
        decoding="async"
        height={image.height}
        sizes={PICTURE_SIZES[surface]}
        src={image.src}
        srcSet={image.srcSet}
        width={image.width}
      />
    </div>
  );
}
