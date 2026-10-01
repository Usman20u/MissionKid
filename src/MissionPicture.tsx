import type { MissionCategory } from './catalog';
import { MissionScene, MissionSceneDefs } from './MissionScene';
import { resolveMissionImage, type MissionImageSurface } from './missionImages';

type MissionPictureProps = Readonly<{
  missionId: string;
  category: MissionCategory;
  className: string;
  surface?: MissionImageSurface;
  // Views that show a lone Mission carry the scene filters themselves.
  // Discovery and the introduction render them once for all their cards, and
  // a second copy would repeat the filter identifiers in the document.
  withSceneDefs?: boolean;
}>;

// One Mission's own image, wherever a Mission is shown: a reviewed still where
// one exists for this surface, its authored scene otherwise. Decorative either
// way — every word the Mission means is in the text beside it — and carried by
// its intrinsic size, so the space is reserved before the file arrives.
//
// Session views resolve the Discovery image, so Ready, the running Mission and
// its Reward Card show the very picture the family chose from.
export function MissionPicture({
  missionId,
  category,
  className,
  surface = 'discovery',
  withSceneDefs = false,
}: MissionPictureProps) {
  const image = resolveMissionImage(missionId, surface);

  return (
    <div className={className} data-category={category}>
      {image ? (
        <img
          alt=""
          aria-hidden="true"
          className="mission-picture__photo"
          decoding="async"
          height={image.height}
          src={image.src}
          width={image.width}
        />
      ) : (
        <>
          {withSceneDefs ? <MissionSceneDefs /> : null}
          <MissionScene category={category} missionId={missionId} />
        </>
      )}
    </div>
  );
}
