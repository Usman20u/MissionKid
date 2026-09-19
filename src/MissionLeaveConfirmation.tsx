import { useEffect, useRef } from 'react';

import {
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';

type MissionLeaveConfirmationProps = Readonly<{
  language: SupportedLanguage;
  onKeepGoing: () => void;
  onLeave: () => void;
  // The safe choice's wording. It defaults to continuing the Mission, which is
  // what the family is choosing between almost everywhere this appears. A
  // Mission that cannot be shown is the exception: there staying means staying
  // on the recovery surface, and promising to keep going would not be true.
  stayKey?: Extract<
    MessageKey,
    'session.action.keepGoing' | 'session.action.stayHere'
  >;
  // The level this heading sits at. It follows whatever heading precedes it in
  // its own context, so the outline never skips a level: a Mission or a
  // suggestion set names itself at level 2 above this, but a Mission that
  // cannot be shown names nothing, and then this is the level-2 heading.
  headingLevel?: 2 | 3;
}>;

// The one confirmation that leaving an active Mission requires, wherever the
// family asks for it: on the running Mission itself, and on the conflict that
// asks them to resolve it before choosing another.
//
// It states the consequence, makes staying the easy choice and puts it first,
// and keeps leaving explicit and visually separated. Nothing here is durable:
// opening, dismissing and re-opening it change no stored fact, and the Mission
// keeps running throughout.
export function MissionLeaveConfirmation({
  language,
  onKeepGoing,
  onLeave,
  stayKey = 'session.action.keepGoing',
  headingLevel = 3,
}: MissionLeaveConfirmationProps) {
  const t = (key: MessageKey) => translateMessage(language, key);
  const heading = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  // The family asked for this, so focus follows them into it once, on the
  // render it appears. Returning focus to the control they opened belongs to
  // that control's owner, which is the only side that still has it.
  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <section
      aria-describedby="mission-leave-consequence"
      aria-labelledby="mission-leave-heading"
      className="mission-session__confirm"
      // Focus is inside the panel from the moment it opens, so dismissing it
      // from the keyboard needs no global listener. Escape is the same safe
      // choice as **Keep going** and changes nothing durable.
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onKeepGoing();
        }
      }}
    >
      <Heading
        className="mission-session__confirm-title"
        id="mission-leave-heading"
        ref={heading}
        tabIndex={-1}
      >
        {t('session.leave.title')}
      </Heading>
      <p id="mission-leave-consequence">{t('session.leave.consequence')}</p>
      <div className="mission-session__confirm-actions">
        {/* Staying is the easy choice and comes first. */}
        <button
          className="button button--primary"
          onClick={onKeepGoing}
          type="button"
        >
          {t(stayKey)}
        </button>
        <button
          className="button button--destructive"
          onClick={onLeave}
          type="button"
        >
          {t('session.action.leave')}
        </button>
      </div>
    </section>
  );
}
