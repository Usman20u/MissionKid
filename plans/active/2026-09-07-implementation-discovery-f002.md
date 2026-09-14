# MissionKid Implementation Plan 02 — Mission Discovery and Selection (F002)

**Date:** 2026-09-07
**Status:** Approved — Plan 02 scope; affected implementation paused by a material specification change (see Change control)

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md). That completed foundation plan records:

- User Story / Traceability Validation: `PASSED — 10/10`;
- Full Specification Audit: `PASSED — 10/10`;
- Specification blockers: `NONE`;
- Blocking implementation guessing required: `NO`;
- Actual Mission entries: `NOT a SPEC COMPLETE blocker`, remaining controlled later content-production work required before relevant discovery; and
- the exact declaration `SPEC COMPLETE`.

The approved application foundation and `F001` are delivered by the completed [`plans/completed/2026-09-03-implementation-foundation-f001.md`](../completed/2026-09-03-implementation-foundation-f001.md). No owning specification changed during that work, so the `SPEC COMPLETE` basis remains valid and the material-change revalidation rule in `AGENTS.md` is not triggered.

Once this approved plan is committed and remains the sole active plan, it authorizes product code only within the exact Plan 02 scope below. It does not authorize any `F003` or `F004` behavior.

## Change control — material specification change (2026-09-09)

A human product review found that the reviewed Mission catalog is safe, complete, and correctly localized, but that part of its content quality does not meet the intended MissionKid experience. The owning content and presentation specifications were updated on 2026-09-09:

- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) adds **Mission Experience Principles**, which govern Mission purpose, concrete action, final beat, meaningful outcome, single hero object or focal action, observable completion, title framing, per-category experience quality, and age-band voice.
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) authorizes the bounded **Controlled Mission Mini-World scene system**, resolves the previous illustration-library non-goal conflict, and keeps approved text authoritative.
- [`docs/specs/functions/002-mission-discovery-and-selection.md`](../../docs/specs/functions/002-mission-discovery-and-selection.md) records the minimal alignment for Mission card presentation without changing `F002` behavior.

This is a material change to approved specifications affecting Mission content quality and Mission card presentation, so the `AGENTS.md` revalidation rule applies.

### Historical record

Tasks 1 to 4 were completed against the specifications valid at that time and remain truthfully complete. This change does not retract them.

The Task 2 catalog committed in `5e65b37` remains valid, reviewed, safe, correctly localized data that satisfies every eligibility and coverage rule in force when it was published. Its content quality is now additionally subject to the new Mission Experience Principles, which is a republication and refinement review rather than a defect in the committed work.

### Paused work

- Task 5 implementation is paused. The current uncommitted Task 5 working-tree refinement must not be committed until the revalidation below is recorded.
- Task 6 must not begin before the gate is cleared, because bounded replacement operates over the same catalog and suggestion presentation.
- Tasks 7 to 15 remain unstarted and unaffected in scope, but they follow Task 6.
- No Mission identifier, Mission prose, catalog content version, or catalog schema changes as part of this pause.

### Required revalidation before affected implementation resumes

1. Revalidate the affected specification stages for the changed content and presentation authority.
2. Re-run User Story / traceability validation for the affected `F002` stories.
3. Re-run the Full Specification Audit.
4. Record renewed authorization for the affected work in this plan.

### Mission content republication gate

Replacement or refined Mission content may ship only after all of the following, in order:

1. select and refine candidate Missions;
2. review each candidate against the Mission Experience Principles;
3. confirm exact age-band suitability per candidate rather than assuming a shared wording;
4. write the approved English content;
5. produce meaning-equivalent German and Russian content;
6. complete the safety and adult-involvement review;
7. record provenance and review metadata;
8. bump the catalog content version;
9. pass Task 1 record validation;
10. pass whole-catalog publication validation;
11. confirm coverage for all 15 age band x Mission Category cells across the three language contexts;
12. complete the manual content review; and
13. only then update Mission scenes for the final approved Mission identifiers and content.

No step of this gate is authorized by this change-control note alone; each remains ordinary Plan 02 Task 2 and Task 3 work under renewed authorization.

### Renewed authorization (2026-09-09)

The material specification change committed as `a21ef33` has been revalidated against the specification chain at that commit.

- Affected `F002` user-story traceability passes. `P3`, `P4`, and `C1` remain accurate: the principles change which Missions are worth publishing and the scene authority changes how a Mission card presents one, but neither changes discovery behavior or the meaning of any acceptance criterion. No user-story text required amendment.
- The Full Specification Audit passes. No contradiction exists between the Mission Experience Principles, the Controlled Mission Mini-World scene system, and the existing safety, privacy, accessibility, anti-manipulation, and architecture rules.
- No `MissionRecord` field, persisted value, snapshot field, Task 1 record-validation change, or Task 3 publication and coverage-validation change is required. Structural validation stays as published; the principles are a human content-review standard.
- The reviewed catalog `mvp-catalog-2026-09` enters controlled republication under the Mission Experience Principles. It remains historically valid published content.

On that basis the Mission content republication gate above is authorized and may begin.

Task 5 implementation remains paused until republication completes and its Mission identifiers and content are final. Task 6 remains blocked behind the same gate. Task 7 and the later tasks remain unstarted and unauthorized.

### Frozen MVP publication candidate set (2026-09-10)

The Mission candidate phase is complete and the MVP publication candidate direction is frozen at **54 Missions**. Candidate generation is closed. Reopening is allowed only for a demonstrated Step 4 or later content, safety or reliability defect that cannot be resolved inside the frozen concept.

`54`, the category composition below, and the six-per-context coverage result are an **MVP publication and release-quality decision**, not a catalog invariant. The structural publication minimum of three eligible Missions per context and the Task 1 and Task 3 validators are unchanged. No product behavior, schema, persistence or localization mechanism changes.

Category composition: Movement 12, Creativity 12, Helping at Home 9, Learning 11, Calm 10.

References below are editorial candidate identifiers used to carry this decision into Step 4. They are not Mission identifiers and never become production content. `AN` marks `Adult nearby required` and `AP` marks `Adult participation required`; every other entry is `No special adult assistance required`. Origin records which current production record a Mission continues: `KEEP` ships unchanged, `REFINE` reworks that record, `REPLACEMENT` retires it, and `NEW` has no predecessor.

#### Movement — 12

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| MOV-C01 | Bear, Crab, Bird | 4–6, 7–8 | — | REFINE `movement-02` |
| MOV-C02 | Giant Steps and Mouse Steps | 4–6, 7–8 | — | NEW |
| MOV-C03 | Sleeping Giant | 4–6, 7–8 | — | REFINE `movement-06` |
| MOV-C04 | Ten Tall Jumps | 4–6, 7–8 | — | REPLACEMENT `movement-01` |
| MOV-C05 | The Cushion Course | 4–6, 7–8 | — | NEW |
| MOV-C08 | Statue Shapes | 4–6, 7–8 | — | REFINE `movement-05` |
| MOV-C10 | The Book Balance | 7–8, 9–10 | — | NEW |
| MOV-C11 | The Exact Steps | 9–10 | — | NEW |
| MOV-C14 | The Balance Sequence | 9–10 | — | NEW |
| MOV-C16 | The Low Line | 9–10 | — | NEW |
| MOV-N1 | Two Hands, Two Jobs | 9–10 | — | NEW |
| MOV-N2 | The Slow Descent | 9–10 | — | NEW |

#### Creativity — 12

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| CRE-C01 | The Tiny World | 4–6, 7–8 | — | REFINE `creativity-04` |
| CRE-C02 | Sock Friend | 4–6, 7–8 | — | REFINE `creativity-05` |
| CRE-C03 | Blanket Den | 4–6, 7–8 | **AN** | REFINE `creativity-06` |
| CRE-C04 | Tallest Tower | 4–6, 7–8 | — | REFINE `creativity-02` |
| CRE-C06 | Invent a Sound | 4–6, 7–8 | — | NEW |
| CRE-C07 | The Kind Monster | 4–6, 7–8 | — | NEW |
| CRE-C10 | Four-Panel Comic | 9–10 | — | KEEP `creativity-08` |
| CRE-C11 | The Sound Map | 7–8, 9–10 | — | REFINE `creativity-01` |
| CRE-C12 | The Paper Bridge | 9–10 | — | NEW |
| CRE-C13 | The Skill Guide | 9–10 | — | NEW |
| CRE-C14 | The Ordinary Object Museum | 7–8, 9–10 | — | NEW |
| CRE-N1 | The Code Maker | 9–10 | — | NEW |

#### Helping at Home — 9

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| HELP-C01 | The Shoe Line | 4–6, 7–8 | — | REPLACEMENT `helping-06` |
| HELP-C02 | Table Captain | 4–6, 7–8, 9–10 | **AP** | REFINE `helping-03` |
| HELP-C05 | Napkin Fold Five | 4–6, 7–8 | — | NEW |
| HELP-C09 | Ready for Tomorrow | 7–8, 9–10 | — | REFINE `helping-07` |
| HELP-C11 | The Table Surprise | 4–6, 7–8, 9–10 | — | NEW |
| HELP-C13 | The One-Look Sign | 7–8, 9–10 | — | NEW |
| HELP-C15 | The Water Round | 4–6, 7–8, 9–10 | **AP** | NEW |
| HELP-C17 | The Ready Corner | 7–8, 9–10 | — | NEW |
| HELP-N2 | The Lost-and-Found Box | 4–6, 7–8 | — | NEW |

#### Learning — 11

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| LEARN-C01 | The Upside-Down Room | 4–6, 7–8 | — | KEEP `learning-05` |
| LEARN-C02 | Roll It Down | 4–6, 7–8, 9–10 | — | REFINE `learning-04` |
| LEARN-C03 | Which One Floats? | 4–6, 7–8 | **AP** | NEW |
| LEARN-C04 | The Sound Through the Table | 4–6, 7–8 | — | NEW |
| LEARN-C07 | What's Missing? | 4–6, 7–8 | **AP** | REPLACEMENT `learning-01` |
| LEARN-C08 | How Many Steps? | 4–6, 7–8 | — | REFINE `learning-08` |
| LEARN-C09 | Near and Far | 7–8, 9–10 | — | REFINE `learning-02` |
| LEARN-C10 | Which Lands First? | 7–8, 9–10 | — | KEEP `learning-07` |
| LEARN-C11 | The Jumping Thumb | 7–8, 9–10 | — | NEW |
| LEARN-N1 | The Balance Point | 9–10 | — | NEW |
| LEARN-N2 | The Water Line | 9–10 | **AP** | NEW |

#### Calm — 10

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| CALM-C01 | Still Water | 4–6, 7–8, 9–10 | **AN** | KEEP `calm-02` |
| CALM-C07 | Slow-Motion Walk | 4–6, 7–8, 9–10 | — | REFINE `calm-08` |
| CALM-C09 | Watch It Change | 7–8, 9–10 | — | KEEP `calm-07` |
| CALM-C11 | The Heavy Blanket | 4–6, 7–8 | — | NEW |
| CALM-C13 | Soft Landing | 4–6, 7–8 | — | NEW |
| CALM-C15 | The Domino Line | 7–8, 9–10 | — | NEW |
| CALM-C16 | The Quiet Unstack | 7–8, 9–10 | — | NEW |
| CALM-C19 | The Pencil Spin | 4–6, 7–8 | — | NEW |
| CALM-N1 | The Sock Snake | 4–6, 7–8 | — | NEW |
| CALM-N2 | The Tight Roll | 9–10 | — | NEW |

Origin totals: KEEP 5, REFINE 14, REPLACEMENT 3, NEW 32.

#### Adult involvement in the frozen set

Seven Missions require adult involvement: two `Adult nearby required` (CRE-C03, CALM-C01) and five `Adult participation required` (HELP-C02, HELP-C15, LEARN-C03, LEARN-C07, LEARN-N2). The remaining forty-seven require no special adult assistance.

#### Coverage result

| Mission Category | 4–6 | 7–8 | 9–10 |
| --- | --- | --- | --- |
| Movement | 6 | 7 | 6 |
| Creativity | 6 | 8 | 6 |
| Helping at Home | 6 | 9 | 6 |
| Learning | 6 | 9 | 6 |
| Calm | 6 | 9 | 6 |

Every age-band and Mission Category context holds at least six eligible Missions, so initial exactly-three discovery succeeds everywhere and at least three unseen eligible Missions remain, making one complete fresh `Another set` available in all fifteen contexts. Age eligibility was not broadened to reach this result; where a Mission genuinely suited only one or two bands it was narrowed instead.

This supports the `Another set` behavior `F002` already defines. It does not alter Task 6 implementation and does not authorize Task 6, which remains blocked until its normal sequencing gate.

#### Frozen Mission concept contracts

These contracts record the approved concept identity of each frozen Mission so Step 4 can draft it without depending on any authority outside this plan. They are deliberately minimal: they carry core action, observable completion and final beat only. Membership, working title, age bands, adult involvement and origin remain owned by the tables above, and drafting or safety constraints remain owned by the register below; nothing is repeated between them. These are not child-facing copy.

| Ref | Core action | Observable completion | Final beat |
| --- | --- | --- | --- |
| MOV-C01 | Cross the room three times — as a bear on hands and feet, as a crab on their back, then on tiptoe like a bird — then cross once more using whichever way they liked best, faster. | Three crossings plus one repeat of the chosen favourite. | The chosen fourth crossing, done faster. |
| MOV-C02 | Cross the room in the fewest possible giant stretching strides, counting them, then cross back in the smallest possible mouse steps, counting those too. | Both crossings made and both counts known. | Comparing the two numbers. |
| MOV-C03 | A giant is asleep on the far side of the room; cross without waking it, freezing completely still each time it stirs. | Three crossings made. | Reaching the far side without waking it. |
| MOV-C04 | Standing on clear floor, jump in place ten times, stretching tall with both arms on every jump — the same stretch each time, not a higher jump each time. | Ten jumps. | Lying down afterwards and feeling their own heart beating fast. |
| MOV-C05 | Lay exactly three cushions or pillows flat on the floor as a course — one to crawl over, one to go around, and the last one to sit on — then travel the course three times, a different way each time. All three stay flat: nothing is stacked, stood on, run on or jumped on. | Course laid out and travelled three times, each time differently. | The third run, finishing seated on the last cushion or pillow. |
| MOV-C08 | Move freely while counting to five, then freeze in the funniest shape they can and hold it to a count of three; three rounds, a different shape each time. | Three different held shapes. | The funniest of the three shapes. |
| MOV-C10 | Balance a book flat on their head and walk across the room and back, then add a second book and walk across and back again, putting back any book that slides off and carrying on. | Across and back once with one book, then once with two. | Arriving back from the two-book round with both books still on their head. |
| MOV-C11 | Choose two points, guess how many of their own steps lie between them, then walk it and arrive on exactly that number by lengthening or shortening their stride. Three different routes. | Three routes walked, each landing on the guessed number. | Arriving exactly on the number. |
| MOV-C14 | Standing on one foot without putting the other down, do three things in order — touch the floor with one hand, reach both arms up, turn a quarter-turn — then repeat the whole sequence on the other foot. | The sequence completed on both feet. | Finishing the second foot without touching down. |
| MOV-C16 | Cross the room keeping their head below their own waist height the whole way — crouching, crawling, duck-walking, whatever they invent — never rising; three crossings, a different way of staying low each time. | Three crossings, three different methods. | The third crossing, having invented three ways. |
| MOV-N1 | Holding a small soft object in each hand and standing still, move one hand in slow circles while the other moves straight up and down for a count of twenty; stop and swap which hand does which; then keep both moving and trade the jobs mid-motion without either hand pausing. | Three rounds — first, swapped, and swapped without stopping. | The clean mid-motion hand-over. |
| MOV-N2 | From standing, go all the way down to lying flat on the floor and all the way back up without any part dropping or thumping; twice, the second slower than the first. | Two complete descents and returns. | The second descent, slower and quieter than the first. |
| CRE-C01 | Build a home on the floor for one small toy that has a door, a bed and a path to the door; the toy then moves in and the world stays up. | All three named features built and the toy moved in. | The toy taking up residence in the world they built. |
| CRE-C02 | Put a clean sock on one hand as a puppet, give it a name and a voice, then let the puppet say one kind thing out loud — to someone at home if they are nearby, otherwise to the child. | Puppet named, given a voice, and one kind thing said aloud. | Hearing the puppet say the kind thing in its own voice. |
| CRE-C03 | Spread one light blanket over a low chair to make a small den with one side left open, bring three things inside that make it theirs, and stay in it for one whole song or story. | Den built, three things inside, the song or story finished. | Being inside their own place for the whole of it. |
| CRE-C04 | On the floor, build a tower from light unbreakable things only as tall as they can reach without climbing; once it stands on its own, measure its height by placing one hand above the other and counting hands. | Tower standing on its own and its height measured in hands. | Standing back to admire the finished tower at its measured height. |
| CRE-C06 | Use two safe ordinary objects to invent a sound of their own, and practise until it comes out the same three times in a row. | The same invented sound produced three times in a row. | Their own invented sound coming out just the same for the third time in a row. |
| CRE-C07 | Draw a monster that is not scary at all and give it one silly job it does around the house. | Drawing finished and the job named. | Looking at the finished monster and saying its silly job out loud. |
| CRE-C10 | Draw a four-panel comic in which a character solves one small everyday problem, one speech bubble per panel. | Four panels, each with a drawing and a speech bubble. | Reading the comic out loud. |
| CRE-C11 | Sit in one spot and listen, then draw a map with themselves in the middle and each sound they heard placed where it came from, near or far, with a small picture for each. | Map drawn with every heard sound placed and pictured. | Seeing every sound they heard laid out around themselves on the finished map. |
| CRE-C12 | Set two books a hand's width apart and, using one sheet of paper and nothing to stick it with, build a bridge between them and test it with a small light object; if it bends, change the shape of the paper and test again, until three different shapes have been designed and tested. | Three different paper shapes designed and tested. | Comparing how all three shapes behaved in the test. |
| CRE-C13 | Choose one small skill they know well and design a one-page guide to it, with every step numbered in order and shown as a drawing or a few words. | The whole chosen skill set out step by step, in order, on the one-page guide. | Looking at the finished guide that sets out, step by step, something they know how to do. |
| CRE-C14 | Choose five ordinary household things, arrange them in a line as a museum display, and give each a small written or drawn label with an interesting name and one invented fact. | Five exhibits arranged and labelled. | Walking along the finished display as the museum's first visitor, reading each label. |
| CRE-N1 | Invent a way of writing — a symbol for each letter, or a rule that changes them — write one short, friendly message in it, and make a key on a second sheet that explains how the writing works; set the message and the key side by side. | Message and key both finished and set together. | The two sheets side by side: their own way of writing, with the key needed to read it. |
| HELP-C01 | At one existing place in the home where shoes are already kept, work only with the shoes already there: match every complete pair that is available, set each pair side by side, and turn all complete pairs so their toes point the same way. A shoe with no visible partner may stay at the end of the line. | Every complete pair available at that shoe place matched, side by side and pointing the same way; an unmatched single shoe does not block completion. | Stepping back and seeing the line of complete pairs ready to step into. |
| HELP-C02 | An adult hands over the items that are safe to carry; the child sets every place at the table, then announces to the household that the table is ready. | Every place set and the announcement made. | Announcing the table ready to everyone. |
| HELP-C05 | Fold five napkins or cloths corner to corner into triangles and build them into one neat stack. | Five folded and stacked. | Showing the finished stack. |
| HELP-C09 | Gather the things needed tomorrow — bag, jacket, water bottle — into one place near the door. | Everything gathered in one place. | The complete pile standing ready by the door. |
| HELP-C11 | Choose one person, fold a napkin or piece of paper into a simple shape and set it at that person's place, then set their spoon and cup beside it. | One person's place fully set with the folded shape. | Their place looking as though someone did something just for them. |
| HELP-C13 | Choose exactly one shared shelf, box or drawer and design one clear visual sign showing what belongs there — drawn, written or both — then put the sign where it is easily seen, leaving the contents where they are. | One visible sign at the chosen shared place, communicating what belongs there. | The shared place now understood at once from the sign itself. |
| HELP-C15 | With an adult choosing unbreakable cups, controlling the amount of cool water and preparing one steady safe place for each cup, carry one cup at a time with both hands and set it down at one prepared place. | Every prepared place holding one cup; no person needs to drink, respond, ask for water or accept a cup. | All the prepared places holding their cups, and the round complete. |
| HELP-C17 | Think of one thing the family does often — drawing, reading, a game, building — and gather everything that thing needs into one place so anyone can start straight away without hunting. | Everything the chosen activity needs gathered in one place. | Standing back and looking at the corner they made ready. |
| HELP-N2 | Find a box or basket, put it somewhere everyone walks past, and draw a picture on paper showing what it is for; set the picture with the box, then walk one room to see whether anything is waiting to be posted. | The box placed and marked with its picture. | The box standing open with its own sign, ready for the household. |
| LEARN-C01 | Lie on their back on the floor and look up at the room from there, finding three things that look strange or different seen that way. | Three strange-looking things found. | Sitting up slowly and saying which looked strangest. |
| LEARN-C02 | Lean a book against something low to make a ramp, choose three different round things, say which will travel furthest before rolling any of them, then roll all three. | Prediction made and all three rolled. | Finding out whether the prediction held. |
| LEARN-C03 | With an adult providing three safe non-breakable objects and a small amount of water in a stable container, guess float or sink before each one goes in, then put it in. | Three guesses made and tested. | The surprise of a guess turning out wrong or right. |
| LEARN-C04 | Rest one ear gently on a clean stable tabletop, make a gentle fingertip tap on the same surface within reach, then lift their head away and make the same tap again. | The same tap heard both with the ear on the table and off it. | Noticing what changes when the ear touches the table. |
| LEARN-C07 | Five things are set on a table; the child closes their eyes while an adult takes one away, then works out which is gone. Three rounds. | Three rounds played. | Spotting the missing thing. |
| LEARN-C08 | Guess how many of their own steps cross the room, walk it counting out loud, then guess again for a shorter route and walk that too. | Both routes guessed and counted. | Setting each guess beside its count and seeing how close each came, whether or not the second came closer. |
| LEARN-C09 | Sit still and listen until three different sounds have been heard, then decide which is closest and which is furthest away. | Three sounds heard and placed near or far. | Judging which sound is furthest. |
| LEARN-C10 | Tear one sheet of paper in half, leave one half flat and crumple the other into a tight ball, hold both at the same height and let go together; three times. | Three drops made. | Saying why the same thing happens each time. |
| LEARN-C11 | Hold a thumb up at arm's length, close one eye then the other and watch the thumb jump sideways, then bring it closer and watch the jump get bigger. | The jump seen at arm's length and close up. | Finding how close the thumb has to be to jump the most. |
| LEARN-N1 | Balance a pencil across one flat finger and find the exact spot where it stays level, then do the same with a wooden spoon and one more long light object weighted at one end, and compare where each balanced. | Three objects balanced and their points compared. | Discovering the balancing spot is not always the middle. |
| LEARN-N2 | With an adult supplying a tall, narrow clear container and three unbreakable objects that sink on their own, mark the starting water level, predict which object will raise the line most, lower one fully in without holding it, watch the rise, take it out and have the adult restore the water to the starting mark, then repeat for each. | All three predicted, lowered and observed from the same restored starting level. | Finding out which one actually moved the line most. |
| CALM-C01 | With an adult putting a little cool water in a cup, carry the cup slowly across the room keeping the surface completely still. | The room crossed and the cup set down. | Watching the water become flat again. |
| CALM-C07 | Cross the room more slowly than they have ever walked — so slowly that anyone watching would get bored. | The crossing finished. | Noticing how different it felt from walking normally. |
| CALM-C09 | Find something in the home that changes very slowly — a clock hand, a shadow, a curtain moving — and watch only that until the change can be seen. | The change seen. | Saying what changed, then getting up slowly. |
| CALM-C11 | Lie on the floor and draw one folded blanket over themselves from feet to chest, never over the head, and stay still. | Staying until they can feel where the blanket presses heaviest. | Finding the heaviest place. |
| CALM-C13 | Put two socks on the floor a hand's width apart to make a gate, sit or kneel a few steps back, and gently roll a third rolled-up sock along the floor toward the gate; three rolls, moving closer before the next roll if it stops short, further back if it rolls past, and keeping the same starting place if it stops inside the gate. | Exactly three rolls made, the starting distance changed only after a roll that stopped short or rolled past; no landing inside the gate is required. | After the third roll, observing where the sock came to rest — inside the gate, short of it or past it — with all three equally valid. |
| CALM-C15 | Stand light safe objects that already stand steadily on their own in a line, each close enough that one falling would touch the next, placing them one at a time gently enough that none topples early; stand any that fall back up and carry on, then tip the first. | The line finished and tipped. | The chain running all the way to the end. |
| CALM-C16 | Choose three light books they are allowed to move and make a short stack on the floor, then take it off one book at a time, lifting so slowly and evenly that the books underneath stay still; if anything slides, put it back and start that lift again. | The three-book stack fully taken down. | Lifting the last book off and seeing the empty place where the stack was. |
| CALM-C19 | Spin a pencil flat on a table with one finger and watch it without looking away until it stops completely; three spins, each aiming for a longer, smoother spin. | Three spins watched all the way to stillness. | The longest spin, followed to its stop. |
| CALM-N1 | Lay socks end to end across the floor so each just touches the last without moving it; straighten any that shift before adding the next. | The snake finished and its reach seen. | Standing back to see how far the snake reached. |
| CALM-N2 | Roll a towel or long cloth from one end to the other, keeping it tight and even so the finished roll is the same thickness along its length and stays rolled when let go; then unroll it and roll it again, tighter. | Two rolls made, the second tighter than the first. | Letting go and watching the second roll hold itself. |

#### Step 4 drafting constraints

Final English drafting must satisfy these constraints. Each was established by content review during the candidate phase.

| Ref | Constraint |
| --- | --- |
| HELP-C01 | Shoes stay at their existing shoe place; pair and orient only; nothing collected from elsewhere in the home; no misplaced objects put away; an unmatched single shoe does not block completion; the result is readiness, not tidying; no external reaction |
| HELP-C02 | Adult supplies items safe for the child to carry |
| HELP-C11 | Scene must differ visibly from Table Captain |
| HELP-C15 | Completion is cups placed at safe prepared places, not people served; adult controls water amount, safe cups and safe stable placement surfaces |
| HELP-N2 | Completion is founding, not filling |
| CRE-C02 | Completion must not require a listener |
| CRE-C03 | Adult nearby; low, stable, open structure |
| CRE-C04 | Light unbreakable items only |
| CRE-C12 | Design, test, adjust; bending is data, not failure |
| CRE-C13 | Completion must not require another person to perform the card |
| CRE-N1 | Sharing, not secrecy |
| LEARN-C02 | Prediction before test; do not promise which object wins — the child predicts and observes |
| LEARN-C03 | Adult participation; adult-provided and approved safe objects |
| LEARN-C04 | One stable clean table; gentle fingertip tap; no door, floor or moving furniture; no second person; compare contact against air without promising a specific loudness result |
| LEARN-N1 | Long, straight, light objects balanced across a flat finger |
| LEARN-N2 | Adult supplies three safe non-breakable objects that sink on their own; narrow container; same start level each time; nothing held under; no promised result — ask which actually moved the line most. Keep the household setup simple: if final English requires specialized container or object conditions, stop and reopen the Mission rather than hiding complexity in copy |
| MOV-C04 | Jump in place; no furniture or high-object target |
| MOV-N1 | No eyes-closed movement |
| MOV-N2 | Distinguish slowness from CALM-C07 |
| CALM-C01 | Existing water safety model; adult nearby |
| CALM-C11 | Never over the head |
| CALM-C13 | Rolling only, never throwing; exactly three rolls; no accurate landing required and no success or failure attached to where the sock comes to rest; no competition |
| CALM-C15 | Use only light safe objects that stand stably before the line is built |
| CALM-C16 | Exactly three light books the child is allowed to move, stacked on the floor by the child; one book at a time; no climbing and no heavy books; sound never affects completion and silence is not a success condition; the setup stack only guarantees availability and does not make the Mission a building task |
| CALM-N1 | Contact placement without disturbing the previous sock; no toppling mechanic; keep distinct from the Domino Line |
| CALM-N2 | Cloth or towel only; the test is whether the roll holds itself; second roll tighter than the first; no sound or special-geometry dependency; keep distinct from HELP-C05 folding |

#### Locked Movement English content

Human review approved and locked the English content below for all 12 frozen Movement Missions on 2026-09-11. This is the approved Step 4 English content for Movement: each title, instruction and safety note is final English copy and carries into the later republication steps exactly as written. At the time of this Movement lock, Creativity, Helping at Home, Learning and Calm English drafting had not started, and no German or Russian content existed.

- Movement English content: locked, 12 / 12.
- Safety note text: locked as English copy, 12 / 12. The record-level `safetyNoteRequired` value is not finalized for any Movement Mission and remains with the later safety and adult-involvement review; this lock does not decide whether a safety note appears in the product.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, and this lock publishes no production content. The locked English is documentation authority for the later controlled republication steps.

| Ref | Title | Instruction | Safety note |
| --- | --- | --- | --- |
| MOV-C01 | Bear, Crab, Bird | Cross the room as a bear, on your hands and feet. Cross back as a crab, with your tummy facing up. Cross again as a bird, on tiptoe. Then choose your favourite of the three and cross one last time that way, a little faster. | Use a clear floor that is not slippery, and slow down before you reach the other side. |
| MOV-C02 | Giant Steps and Mouse Steps | Cross the room like a giant, taking the biggest steps you can and counting them out loud. Then come back like a mouse, in tiny steps, heel to toe, counting again. Now say both numbers. Which one is bigger? | Use a clear floor that is not slippery, and only take giant steps you can balance on. |
| MOV-C03 | Sleeping Giant | A giant is asleep on the far side of the room. Creep over so quietly that it does not wake up. Every few steps, pretend the giant stirs: freeze completely still, then creep on. Go over, back and over again. If the giant is still asleep when you arrive the last time, you made it! | Creep slowly on a clear floor and look where you are going. |
| MOV-C04 | Ten Tall Jumps | Stand in a clear space. Jump ten times on the same spot, stretching up tall with both arms each time. After the tenth jump, lie down on your back. Put a hand on your chest and feel how fast your heart is beating. | Jump away from furniture, on a floor that is not slippery, with nothing hanging low above you. Land softly. |
| MOV-C05 | The Cushion Course | Lay three cushions or pillows flat on the floor to make a little course. One is for crawling over, one is for going around, and the last one is for sitting on. Go through your course three times, a different way each time, like a cat or a snail. The third time, finish by sitting on the last one. | Use cushions or pillows you are allowed to use, and keep all three flat on the floor. Do not stand, run or jump on them, because they can slide. |
| MOV-C08 | Statue Shapes | Wiggle, dance or walk around the room while you count to five. On five, freeze in a funny shape and hold it still while you count to three. Do this three times with a new shape each time, and save your funniest shape for the last freeze. | Move on a clear floor with space around you, and choose shapes you can hold without falling over. |
| MOV-C10 | The Book Balance | Balance a book flat on your head and walk across the room and back. Then add a second book on top and walk across and back once more. If a book slides off, put it back and carry on from that spot. Finish back where you started with both books still on your head. | Use light, thin books and walk slowly on a clear floor. |
| MOV-C11 | The Exact Steps | Pick two spots in your home, such as a door and a table, and guess how many steps it takes to get between them. Then make your guess come true: walk the route, making your steps longer or shorter so that your last step lands exactly on your number. Do this for three different routes. | Walk on a clear floor. Make your steps longer or shorter, but do not jump or leap. |
| MOV-C14 | The Balance Sequence | Balance on one foot and do three moves in order: touch the floor with one hand, reach both arms up, then turn slowly to face the next wall. Then do all three on your other foot. If your lifted foot comes down, steady yourself and try that side again. Finish the second side with your foot still in the air. | Use a clear space away from furniture, on a floor that is not slippery. You can put your foot down at any moment. |
| MOV-C16 | The Low Line | Stand up straight and imagine an invisible line across the room at your waist. Then get low and cross without your head going above the line. Do three crossings, a different low way each time: crouching, crawling, or a way you invent. After the third, you have found three ways to stay under the line. | Choose a clear, open route across the room before you start, and move slowly. |
| MOV-N1 | Two Hands, Two Jobs | Stand still with a soft object, like a rolled-up sock, in each hand. Move one hand in slow circles while the other goes straight up and down, and count to twenty. Stop, swap jobs, and count to twenty again. For the last round, count to twenty once more and switch jobs at ten without either hand stopping. | Stand with space around you so your arms do not bump into anything. |
| MOV-N2 | The Slow Descent | Gravity wants you to drop — do not let it. From standing, lower yourself all the way to lying flat on the floor, then rise all the way back up. No knee, hand or elbow should thump down on the way. Then do it again, even slower and quieter than the first time. | Use a clear spot with room to lie down, and stop whenever you want. |

#### Locked Creativity English content

Human review approved and locked the English content below for all 12 frozen Creativity Missions on 2026-09-11. This is the approved Step 4 English content for Creativity: each title, instruction, safety note and adult involvement note is final English copy and carries into the later republication steps exactly as written. Movement English remains locked, 12 / 12. As of this lock, Helping at Home, Learning and Calm English drafting has not started, and no German or Russian content exists.

- Creativity English content: locked, 12 / 12.
- Safety note text: locked as English copy, 12 / 12. The record-level `safetyNoteRequired` value is not finalized for any Creativity Mission and remains with the later safety and adult-involvement review; this lock does not decide whether a safety note appears in the product.
- Adult involvement: CRE-C03 is frozen as `Adult nearby required`, and its adult involvement note is part of the locked English. The other 11 Missions require no special adult assistance and have no adult involvement note, shown as `—` in the table.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. The locked English is documentation authority for the later controlled republication steps.

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| CRE-C01 | The Tiny World | Choose one small toy and build it a tiny home on the floor. The home needs a door, a bed and a path that leads to the door. When all three are ready, walk your toy along the path, through the door and into its bed. Leave the home standing: your toy lives there now. | Build with light, unbreakable things you are allowed to use, and keep your toy's home on the floor. | — |
| CRE-C02 | Sock Friend | Put a clean sock on your hand and turn it into a sock friend. Give your friend a name and a voice all of its own. Then let your sock friend say one kind thing to you, out loud, in its own voice. | Use a clean sock you are allowed to use, and keep it away from your face and mouth. | — |
| CRE-C03 | Blanket Den | Spread one light blanket over a low chair to make a small den, and leave one side open. Bring three things inside that make it your own place. Then stay inside for one whole song you sing or one whole story you tell yourself. | Use one light blanket over a low chair that stands firmly on the floor. Keep one side open so you can get out easily, and do not climb on the chair. | An adult stays nearby while you build your den and sit inside it, and is there if you need them. |
| CRE-C04 | Tallest Tower | Build a tower as tall as you can reach, using light, unbreakable things like plastic cups, blocks or small boxes. When it stands on its own, measure it by placing one hand above the other and counting your hands. Then stand back and admire it: your tower is that many hands tall. | Use only light, unbreakable things you are allowed to use. Build on the floor, and stack only as high as you can reach without climbing. | — |
| CRE-C06 | Invent a Sound | Pick two safe things, like a spoon and a plastic cup, and use them to invent your own sound. Practise until the same sound comes out three times in a row. When the third one sounds just like the first two, that sound is yours! | Use two unbreakable things you are allowed to use, and do not make your sound right next to your ears. | — |
| CRE-C07 | The Kind Monster | Draw a monster that is not scary at all — maybe fluffy, maybe with a big smile. Give your monster one silly job it does around your home, like tickling socks or counting spoons. When your drawing is finished, look at your monster and say its silly job out loud. | You need a sheet of paper and a pencil or crayons that you are allowed to use. | — |
| CRE-C10 | Four-Panel Comic | Draw a comic with four panels in which a character solves one small everyday problem. Put one speech bubble in each panel. When all four panels have a drawing and a speech bubble, read your comic out loud. | You need a sheet of paper and a pencil that you are allowed to use. | — |
| CRE-C11 | The Sound Map | Sit in one spot and listen carefully for one minute. Then draw yourself in the middle of a sheet of paper. Around you, draw a small picture for every sound you heard: close sounds nearby, far sounds further out. When every sound has its picture, look at your map: everything you heard, all around you. | You need a sheet of paper and a pencil that you are allowed to use. | — |
| CRE-C12 | The Paper Bridge | Set two books a hand's width apart. With one sheet of paper and no tape or glue, make a bridge between them and test it with a small light object, like an eraser. If the paper bends, use what you saw to change its shape and test again. Design and test three different shapes, then compare how all three behaved in the test. | You need two books, one sheet of paper and a small light object that you are allowed to use. | — |
| CRE-C13 | The Skill Guide | Pick one small skill you know well, like folding a paper plane or drawing a cat in five lines. Design a one-page guide to it: every step in order, numbered, with a drawing or a few words for each. When the last step is in place, look at your finished guide: something you know how to do, set out step by step. | You need a sheet of paper and a pencil that you are allowed to use. | — |
| CRE-C14 | The Ordinary Object Museum | Turn five ordinary things from your home into a museum. Arrange them in a line, and give each one a small written or drawn label with an interesting name and one invented fact. For example: Ancient Spoon, once used by a giant for breakfast. Then walk along your museum as its very first visitor, reading every label. | Use things you are allowed to move that are not sharp, heavy or breakable. | — |
| CRE-N1 | The Code Maker | Invent your own way of writing: a new symbol for every letter, or a rule that changes each letter. Write one short, friendly message in your new writing. On a second sheet, make a key that shows how your writing works. Then put the message and the key side by side: your own way of writing, with the key to read it. | You need two sheets of paper and a pencil that you are allowed to use. | — |

#### Locked Helping at Home English content

Human review approved and locked the English content below for all 9 frozen Helping at Home Missions on 2026-09-13. This is the approved Step 4 English content for Helping at Home: each title, instruction, safety note and adult involvement note is final English copy and carries into the later republication steps exactly as written. Movement and Creativity English remain locked, 12 / 12 each. As of this lock, Learning and Calm English drafting has not started, and no German or Russian content exists.

- Helping at Home English content: locked, 9 / 9.
- Safety note text: locked as English copy, 9 / 9. The record-level `safetyNoteRequired` value is not finalized for any Helping at Home Mission and remains with the later safety and adult-involvement review; this lock does not decide whether a safety note appears in the product.
- Adult involvement: HELP-C02 and HELP-C15 are frozen as `Adult participation required`, and their adult involvement notes are part of the locked English. The other 7 Missions require no special adult assistance and have no adult involvement note, shown as `—` in the table.
- Concept authority reconciled by this lock: HELP-C01 replaces the withdrawn `Special Delivery` delivery concept with `The Shoe Line` and becomes `REPLACEMENT helping-06`, because the withdrawn concept required three belongings to be misplaced before the child could begin and its action stayed too close to putting things away; HELP-C13 is titled `The One-Look Sign` and its contract states one clear visual sign rather than only a small picture-label; HELP-C15 completion rests on safe prepared places rather than each person's usual seat. The membership table, origin totals, frozen concept contracts and Step 4 drafting constraints above carry these changes.
- Reopening: after this lock, Helping at Home English may be reopened only for a demonstrated safety defect, reliability defect, concept contradiction, translation-blocking defect, or implementation-blocking authority conflict. Candidate generation remains closed.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. The locked English is documentation authority for the later controlled republication steps.

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| HELP-C01 | The Shoe Line | Go to one place where shoes are kept. Match the shoes into complete pairs, put each pair side by side, and turn all the toes the same way. If one shoe has no partner, leave it at the end of the line. When every complete pair points the same way, step back and look at the shoe line you made ready. | Move only shoes you are allowed to touch. Keep them inside the usual shoe area and keep the walking path clear. | — |
| HELP-C02 | Table Captain | You are the Table Captain. An adult gives you only the things that are safe for you to carry. Set one complete place first, then make every other place match it. When every place is ready, stand back, check the whole table and announce that it is ready. | Carry only light, unbreakable items the adult gives you. Keep both feet on the floor, and leave anything hot, sharp or heavy to the adult. | An adult chooses and hands you the safe items you may carry. |
| HELP-C05 | Napkin Fold Five | Fold five square napkins or cloths into matching triangles. Fold each one corner to corner, then stack it with the point facing the same way as the others. When the fifth triangle is on top, line up the edges and look at your finished stack: five matching folds, ready to use. | Use five clean napkins or cloths you are allowed to use, and fold them on a table or the floor. | — |
| HELP-C09 | Ready for Tomorrow | Gather the things you will need tomorrow in one place near the door, such as your bag, jacket and water bottle. When everything you need is together, look at your ready pile: tomorrow's things, all waiting in one place. | Move only your own light things, and keep the doorway and walking space clear. | — |
| HELP-C11 | The Table Surprise | Choose one person at home and make a special place for them at the table. Fold a napkin or piece of paper into a simple shape and put it at their place. Set their spoon and an empty, unbreakable cup beside the shape. Look at the place you made just for them. | Use items you are allowed to move and can carry easily. Choose a place you can reach with both feet on the floor. | — |
| HELP-C13 | The One-Look Sign | Choose one shared shelf, box or drawer. Design one sign that shows at a glance what belongs there: draw it, write it, or use both. Leave everything inside exactly where it is, and put your sign where it can be seen easily. Now anyone can see what belongs there right away. | Choose a place you can reach with both feet on the floor. Use paper and drawing or writing tools you are allowed to use. | — |
| HELP-C15 | The Water Round | This is your Water Round. An adult chooses unbreakable cups, adds a small amount of cool water, and prepares one steady place for each cup. Carry one cup at a time with both hands and set it on a ready place. When every ready place has a cup, your round is complete. | Walk slowly on a clear, dry route. Do not run. If water spills, stop and tell an adult so the floor can be made safe. | An adult chooses unbreakable cups, controls the water amount and prepares the stable places before the round starts. |
| HELP-C17 | The Ready Corner | Make a place where your family can start an activity straight away. Choose one activity your family often does, such as drawing, reading, a game or building. Gather everything that activity needs in one place. Stand back and look at the place you made ready: anyone can begin without looking for anything. | Use only light, safe things you are allowed to move. Choose a place you can reach without climbing, and keep walking routes clear. | — |
| HELP-N2 | The Lost-and-Found Box | Make a lost-and-found box for your home. Put an empty box or basket beside a place everyone walks past. Draw a sock or toy on paper and put the picture beside the box as its sign. Walk through one room to see if anything belongs in the box. Then look at your open box and sign: ready to use, even with nothing inside. | Use a light box or basket, paper and crayons you are allowed to use. Keep the box out of the walking space, and leave anything sharp, heavy, breakable or unfamiliar where it is. | — |

#### Locked Learning English content

Human review approved and locked the English content below for all 11 frozen Learning Missions on 2026-09-13. This is the approved Step 4 English content for Learning: each title, instruction, safety note and adult involvement note is final English copy and carries into the later republication steps exactly as written. Movement, Creativity and Helping at Home English remain locked. As of this lock, Calm English drafting has not started, and no German or Russian content exists.

- Learning English content: locked, 11 / 11.
- Safety note text: locked as English copy, 11 / 11. The record-level `safetyNoteRequired` value is not finalized for any Learning Mission and remains with the later safety and adult-involvement review; this lock does not decide whether a safety note appears in the product.
- Adult involvement: LEARN-C03, LEARN-C07 and LEARN-N2 are frozen as `Adult participation required`, and their adult involvement notes are part of the locked English. In each the adult supplies, sets up, removes or restores and never confirms, corrects or scores the child's observation. The other 8 Missions require no special adult assistance and have no adult involvement note, shown as `—` in the table.
- `KEEP` origin: LEARN-C01 and LEARN-C10 retain the existing production English of `learning-05` and `learning-07` exactly, following the origin convention that `KEEP` ships unchanged. Their locked copy below is byte-identical to `src/catalogContent.ts`.
- Concept authority reconciled by this lock: LEARN-C11 is titled `The Jumping Thumb`, because the approved concept produces an apparent sideways jump rather than a disappearance; its frozen concept contract already described that jump and needed no change. The LEARN-N2 contract now states that the adult restores the water to the starting mark between trials, because a removed wet object carries water out and the level does not necessarily return by itself; the controlled baseline the contract already required is unchanged.
- Result integrity: no Learning Mission promises a physical outcome that ordinary household variation may change, and no Mission treats a wrong prediction as failure. Where a frozen final beat implies a repeatable result, the locked copy closes on the child's own observation or question.
- Reopening: after this lock, Learning English may be reopened only for a demonstrated safety defect, reliability defect, concept contradiction, translation-blocking defect, or implementation-blocking authority conflict. Candidate generation remains closed.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. The locked English is documentation authority for the later controlled republication steps.

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| LEARN-C01 | The Upside-Down Room | Lie on your back on the floor and look up at the room from there. Find three things that look strange or different when you see them this way. When you have found all three, sit up slowly and say which one looked strangest. | Lie down on a clear floor with space around you, and sit up slowly when you finish. | — |
| LEARN-C02 | Roll It Down | Lean a book against something low to make a small ramp on the floor. Find three different round things that roll, and make three small paper markers. Before you roll anything, say which one you think will travel furthest. Choose one starting place on the ramp. Roll the first thing from there, put one marker where it stops, then move it aside. Repeat from the same starting place with the other two. Look at the three markers: did the one you picked travel furthest? | Build the ramp low and on the floor. Use only light, unbreakable things and paper you are allowed to use, and do not stand or lean on the ramp. | — |
| LEARN-C03 | Which One Floats? | An adult puts a little cool water in a bowl and gives you three safe, unbreakable things that can get wet. Before each test, hold one thing and say what you think: float or sink? Place it gently on the water and let go. Watch what happens, then take it out before the next test. Test all three, then say which guesses matched what you saw and whether anything surprised you. | Use only the things the adult gives you. Keep the bowl on a low, steady surface, and tell an adult if water spills so that nobody slips. | An adult chooses three safe, unbreakable things that can get wet, puts a little cool water in a steady bowl, and stays with you while you test. |
| LEARN-C04 | The Sound Through the Table | Rest one ear flat on a clean, steady table and keep it there. Tap the table once, gently, with one fingertip. Listen carefully. Now lift your head, sit up, and make exactly the same gentle tap again. Listen to that one too. Was the tap the same both times, or did something change when your ear was touching the table? | Use one clean, steady table that does not move. Rest your ear down gently and tap softly with one fingertip — never bang, and do not try it anywhere else. | — |
| LEARN-C07 | What's Missing? | Put five things you are allowed to use in a row on a table, and look at them carefully. Close your eyes while an adult quietly takes one away. Open your eyes and say which one you think is gone. Then the adult puts it back. Play three rounds. After the third round, the game is finished, whether you spot every one or not. | Use five light, unbreakable things you are allowed to move, and keep them on a steady table. | An adult takes part: while your eyes are closed they take one thing away, and when you have said your answer they put it back so you can both see. |
| LEARN-C08 | How Many Steps? | Guess how many of your own steps it takes to cross the room. Say your guess, then walk across and count every step out loud. Choose a shorter clear route and guess again before you walk it, then count those steps out loud too. When both walks are done, compare each guess with the number you counted. Were they close, far apart, or different from what you expected? | Walk at a normal pace on a clear floor, and choose routes with nothing in the way. | — |
| LEARN-C09 | Near and Far | Sit somewhere comfortable and stay still. Listen until you have picked out three different sounds, from inside the room or outside it. Now work them out by ear alone: which of the three is closest to you, and which one is furthest away? | Stay sitting where you are, in the rooms you are allowed to be in. | — |
| LEARN-C10 | Which Lands First? | Take one sheet of paper you are allowed to use and tear it in half. Leave one half flat and crumple the other into a tight ball. Hold both at the same height, let go at the same moment, and watch which one lands first. Do it three times. When you have finished the third drop, say why you think it happens. | Use paper you are allowed to use, and let go at your own hand height while standing on the floor. Do not climb on anything to drop from higher. | — |
| LEARN-C11 | The Jumping Thumb | Hold one thumb up at arm's length and look past it at something across the room. Close one eye, then the other, and switch back and forth. Notice how your thumb seems to jump sideways even though your hand stays still. Move your thumb slowly closer while you keep switching eyes. Watch how the jump changes and find where it looks biggest. | Do this sitting or standing still. Keep your thumb in front of you and do not bring it close enough to touch your eyes. | — |
| LEARN-N1 | The Balance Point | Lay a pencil across one flat finger and move it until it balances level. Notice where your finger is. Now do the same with a wooden spoon, and then with one more long, light object that is heavier at one end. Each time, find the exact spot where it sits level and remember it. When all three have balanced, compare the three spots: was the balance point in the middle every time? | Use only long, light, unbreakable objects — a pencil, a wooden spoon, a ruler. Balance them low over a table, and leave anything sharp, heavy or breakable alone. | — |
| LEARN-N2 | The Water Line | An adult part-fills a tall, narrow clear container with water and marks the starting level with a rubber band or removable tape. They give you three unbreakable things that sink on their own. Before anything goes in, say which one you think will move the line up most. Lower the first one all the way into the water and let go. Watch the line. Take it out, then let the adult bring the water back to the starting mark before the next turn. After all three have had their turn, compare what you saw: which one actually moved the line most? | Use only the container and the things the adult gives you. Keep the container on a low, steady surface away from the edge, and tell an adult if water spills. | An adult chooses a tall, narrow clear container and three unbreakable things that sink on their own, part-fills it with water, marks the starting level, and restores the water to that mark between turns. |

#### Locked Calm English content

Human review approved and locked the English content below for all 10 frozen Calm Missions on 2026-09-14. This is the approved Step 4 English content for Calm: each title, instruction, safety note and adult involvement note is final English copy and carries into the later republication steps exactly as written. Movement, Creativity, Helping at Home and Learning English remain locked. With this lock, English content is locked for all 54 frozen Missions and Step 4 is complete. No German or Russian content exists.

- Calm English content: locked, 10 / 10.
- Safety note text: locked as English copy for 9 of the 10 Missions. CALM-C09 has no safety note, because the production English it keeps has none; this is shown as `—` in the table. The record-level `safetyNoteRequired` value is not finalized for any Calm Mission and remains with the later safety and adult-involvement review; this lock does not decide whether a safety note appears in the product.
- Adult involvement: CALM-C01 is frozen as `Adult nearby required`, and its adult involvement note is part of the locked English. The adult fills the cup and stays nearby in case water spills, and plays no part in completion. The other 9 Missions require no special adult assistance and have no adult involvement note, shown as `—` in the table.
- `KEEP` origin: CALM-C01 and CALM-C09 retain the existing production English of `calm-02` and `calm-07` exactly, following the origin convention that `KEEP` ships unchanged. Their locked copy below is byte-identical to `src/catalogContent.ts`.
- Concept authority reconciled by this lock: the CALM-C13 final beat no longer requires a roll to come to rest inside the gate, because three rolls do not guarantee that result. After the third roll the child observes where the sock came to rest, and inside the gate, short of it and past it are equally valid. Its adjustment rule is unchanged: move closer after a roll that stops short, further back after one that rolls past, and keep the same starting place after one that stops inside. The CALM-C16 contract no longer depends on an existing stack of books, which an ordinary home may not have ready: the child first makes a short floor stack of three light books they are allowed to move, then performs the unchanged controlled unstacking, finishing on the empty place where the stack was. The setup stack only guarantees availability and does not make the Mission a building task. The frozen concept contracts and Step 4 drafting constraints above carry these changes; membership, titles, age bands, adult involvement and origins are unchanged.
- Result integrity: no Calm Mission promises a physical outcome that ordinary household variation may change, and none makes accuracy or silence a success condition. Completion rests on an observable action, never on the child's emotional state or on anyone else's reaction, and no copy makes a therapeutic claim.
- Reopening: after this lock, Calm English may be reopened only for a demonstrated safety defect, reliability defect, concept contradiction, translation-blocking defect, or implementation-blocking authority conflict, and not for style preference or novelty. Candidate generation remains closed.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. The locked English is documentation authority for the later controlled republication steps; the 54 frozen Missions are not yet production content.

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| CALM-C01 | Still Water | Ask an adult to put a little cool water in a cup for you. Carry the cup slowly across the room and try to keep the surface of the water completely still. When you have crossed the room, put the cup down and watch the water become flat again. | Use only cool water and fill the cup less than half. Walk slowly, and tell an adult straight away if you spill something so that nobody slips. | An adult stays nearby: they fill the cup for you and are there if any water spills. |
| CALM-C07 | Slow-Motion Walk | Walk across the room more slowly than you have ever walked before — so slowly that anyone watching would get bored waiting for you to arrive. Keep going, one slow step after another, until you reach the other side. When you get there, think back over the walk: what felt different from walking the ordinary way? | Walk on a clear floor with nothing in the way, and put a hand on a wall if you need to steady yourself. | — |
| CALM-C09 | Watch It Change | Find something in your home that changes very slowly: the hand of a clock, a shadow on the floor, or a curtain moving in the air. Watch only that one thing and stay still until you can see that it has changed. When you have seen the change, say what changed and get up slowly. | — | — |
| CALM-C11 | The Heavy Blanket | Fold one blanket in half and lie down on your back on the floor. Draw the blanket up over yourself from your feet to your chest — never over your head. Lie still and feel where it presses on you the most. Is it your feet, your knees, or somewhere else? Stay until you have found the heaviest place. | Use one blanket you are allowed to use, and keep it no higher than your chest — never over your face or head. Push it off whenever you want to get up. | — |
| CALM-C13 | Soft Landing | Put two socks on the floor a hand's width apart to make a little gate. Sit or kneel a few steps back with a third sock rolled into a ball. Roll it gently along the floor toward the gate — always rolling, never throwing. After each roll, notice where it stopped. If it stopped short, move a little closer before the next one; if it rolled past, move a little farther back. Take three rolls in all. After the third, look where the sock came to rest: inside the gate, short of it, or past it. | Use clean socks and a clear stretch of floor. Roll the sock along the floor — never throw it, and never roll it at a person or a pet. | — |
| CALM-C15 | The Domino Line | Find light, safe things that stand up steadily on their own — building blocks, small boxes, or plastic cups turned upside down. Stand them in a line, one at a time, each close enough that if one fell it would touch the next. Place each one gently, and if any topple while you are building, stand them back up and carry on. When the line is finished, tip the first one over and watch how far the falling runs. | Use only light, unbreakable things that already stand up on their own. Build on the floor or a low table, and leave anything glass, heavy or breakable where it is. | — |
| CALM-C16 | The Quiet Unstack | Choose three light books you are allowed to move and make a short stack on the floor. Now take it down one book at a time. Lift the top book slowly and evenly so the books underneath stay still. If they slide, put that book back and try the lift again. Keep going until all three books are beside the empty spot where the stack was. | Use only light books you can lift easily. Build and unstack on the floor, and move one book at a time. | — |
| CALM-C19 | The Pencil Spin | Lay a pencil flat on a table and spin it with one finger. Watch it without looking away, all the way until it stops completely. Do this three times, each time trying for a spin that lasts a little longer and turns a little more smoothly. Stay with your longest spin right to its last slow turn. | Spin the pencil flat on the table, well away from your face, and keep your other hand out of its way. Use a pencil you are allowed to use. | — |
| CALM-N1 | The Sock Snake | Collect the socks you are allowed to use and lay them end to end across the floor to make a long snake. Each sock must just touch the one before it without moving it at all. If one shifts, straighten it before you add the next. When you have used your last sock, stand back and see how far your snake reached. | Use clean socks you are allowed to use, and build your snake on a clear floor where nobody will walk. | — |
| CALM-N2 | The Tight Roll | Take a towel or a long cloth and roll it up from one end to the other. Keep it tight and even as you go, so the finished roll is the same thickness all along. Now let go: does it stay rolled by itself, or does it start to loosen? Unroll it and roll it again, tighter this time. Then let go and watch whether this one holds itself. | Use one towel or long cloth you are allowed to use, and roll it on the floor or a table. Do not wrap it around yourself or anyone else. | — |

#### Step 5 localization standard

German and Russian Mission content is a semantic localization of the locked English, not a word-for-word translation. This standard was established by human review of the Movement localization and governs the German and Russian localization of every Mission Category.

- Priority: locked English meaning, then core action, counts and order, observable completion, final beat, safety meaning, natural target-language child voice, age dignity and read-aloud quality.
- Target-language grammar and idiom may differ from English. A title may be semantically adapted where literal wording would be unnatural or misleading.
- No localization may add or remove a requirement, change a count, the action order or completion, soften safety, strengthen a success condition, or add adult involvement. Localization never repairs or rewrites the locked English.
- German: natural Standard German with informal `du`, child-respectful. `Raum` is the general room term, and `Kissen` covers cushions and pillows.
- Russian: natural neutral modern Russian with informal singular address, avoiding unnecessary gendered wording. `подушки` covers cushions and pillows.

#### Locked Movement German and Russian content

Human review approved and locked the German and Russian content below for all 12 frozen Movement Missions on 2026-09-14. Each title, instruction and safety note is final German or Russian copy, meaning-equivalent to the locked Movement English above, and carries into the later republication steps exactly as written.

- Movement German content: locked, 12 / 12. Movement Russian content: locked, 12 / 12. Movement English remains locked, 12 / 12, and is unchanged.
- Adult involvement: every Movement Mission requires no special adult assistance, so no Movement Mission has an adult involvement note in any language.
- Fidelity: every localization preserves the counts, action order, observable completion, final beat and safety meaning of its locked English. No Movement Mission has `KEEP` origin, so each is localized from its locked English rather than from existing production translations.
- Title adaptation: where literal wording would mislead or sound unnatural, the title is semantically adapted; for example, `Zehn Strecksprünge` and `Десять прыжков — тянись вверх` do not imply a higher jump each time.
- Reopening: after this lock, Movement German and Russian may be reopened only for a demonstrated semantic fidelity defect, safety translation defect, translation-blocking defect, or implementation or data defect, and not for style preference.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. German and Russian localization of Creativity, Helping at Home, Learning and Calm has not started.

German:

| Ref | Title | Instruction | Safety note |
| --- | --- | --- | --- |
| MOV-C01 | Bär, Krabbe, Vogel | Geh als Bär auf Händen und Füßen durch den Raum. Geh als Krabbe mit dem Bauch nach oben zurück. Geh dann als Vogel auf Zehenspitzen noch einmal hinüber. Such dir jetzt von den dreien dein Lieblingstier aus und geh ein letztes Mal so hinüber – ein bisschen schneller. | Beweg dich auf freiem Boden, der nicht rutschig ist, und werde langsamer, bevor du auf der anderen Seite ankommst. |
| MOV-C02 | Riesenschritte und Mäuseschritte | Geh wie ein Riese durch den Raum: Mach die größten Schritte, die du kannst, und zähl dabei laut mit. Dann komm wie eine Maus zurück – mit winzigen Schritten, Ferse an Fußspitze – und zähl wieder mit. Sag jetzt beide Zahlen. Welche Zahl ist größer? | Beweg dich auf freiem Boden, der nicht rutschig ist, und mach Riesenschritte nur so groß, dass du dabei das Gleichgewicht halten kannst. |
| MOV-C03 | Der schlafende Riese | Auf der anderen Seite des Raums schläft ein Riese. Schleich so leise hinüber, dass er nicht aufwacht. Tu alle paar Schritte so, als würde sich der Riese im Schlaf bewegen: Erstarre völlig und schleich dann weiter. Geh hinüber, zurück und noch einmal hinüber. Schläft der Riese noch, wenn du zum letzten Mal ankommst, hast du es geschafft! | Schleich langsam über freien Boden und schau, wohin du gehst. |
| MOV-C04 | Zehn Strecksprünge | Stell dich auf eine freie Fläche. Spring zehnmal auf der Stelle und streck dich dabei jedes Mal mit beiden Armen lang nach oben. Leg dich nach dem zehnten Sprung auf den Rücken. Leg eine Hand auf die Brust und spür, wie schnell dein Herz schlägt. | Spring mit Abstand zu Möbeln auf einem Boden, der nicht rutschig ist. Über dir darf nichts tief hängen. Lande weich. |
| MOV-C05 | Der Kissen-Parcours | Leg drei Kissen flach auf den Boden – das wird dein kleiner Parcours. Über eines krabbelst du, um eines gehst du herum, und auf das letzte setzt du dich. Geh dreimal durch deinen Parcours, jedes Mal auf eine andere Art, zum Beispiel wie eine Katze oder wie eine Schnecke. Beim dritten Mal setzt du dich zum Schluss auf das letzte Kissen. | Nimm Kissen, die du benutzen darfst, und lass alle drei flach auf dem Boden liegen. Stell dich nicht darauf, renn nicht darüber und spring nicht darauf, denn sie können wegrutschen. |
| MOV-C08 | Statuen-Posen | Wackle, tanz oder geh durch den Raum und zähl dabei bis fünf. Bei fünf erstarrst du in einer lustigen Pose und hältst sie still, während du bis drei zählst. Mach das dreimal, jedes Mal mit einer neuen Pose, und heb dir deine lustigste Pose fürs letzte Mal auf. | Beweg dich auf freiem Boden mit Platz um dich herum und such dir Posen aus, die du halten kannst, ohne umzufallen. |
| MOV-C10 | Bücher auf dem Kopf | Balancier ein Buch flach auf dem Kopf und geh damit durch den Raum und wieder zurück. Leg dann ein zweites Buch obendrauf und geh noch einmal hin und zurück. Wenn ein Buch herunterrutscht, leg es zurück auf den Kopf und mach an dieser Stelle weiter. Komm zum Schluss dort an, wo du losgegangen bist – mit beiden Büchern noch auf dem Kopf. | Nimm leichte, dünne Bücher und geh langsam über freien Boden. |
| MOV-C11 | Auf den Schritt genau | Such dir zu Hause zwei Stellen aus, zum Beispiel eine Tür und einen Tisch, und schätze, wie viele Schritte du von der einen zur anderen brauchst. Jetzt versuch, genau auf deine Zahl zu kommen: Geh denselben Weg und mach deine Schritte länger oder kürzer, sodass du mit genau so vielen Schritten am Ziel ankommst, wie du geschätzt hast. Mach das auf drei verschiedenen Wegen. | Geh auf freiem Boden. Mach deine Schritte länger oder kürzer, aber spring nicht und hüpf nicht. |
| MOV-C14 | Drei Bewegungen auf einem Bein | Stell dich auf ein Bein und mach drei Bewegungen in dieser Reihenfolge: Berühr mit einer Hand den Boden, streck beide Arme nach oben und dreh dich dann langsam zur nächsten Wand. Mach danach alle drei Bewegungen auf dem anderen Bein. Wenn dein angehobener Fuß den Boden berührt, finde wieder dein Gleichgewicht und fang diese Seite noch einmal an. Beende die zweite Seite mit dem Fuß noch in der Luft. | Mach das auf einer freien Fläche mit Abstand zu Möbeln und auf einem Boden, der nicht rutschig ist. Du kannst deinen Fuß jederzeit abstellen. |
| MOV-C16 | Unter der Linie | Steh gerade und stell dir eine unsichtbare Linie vor, die auf Höhe deiner Taille quer durch den Raum geht. Mach dich dann klein und durchquere den Raum, ohne dass dein Kopf über die Linie kommt. Mach das dreimal, jedes Mal tief unten auf eine andere Art: in der Hocke, krabbelnd oder so, wie du es dir selbst ausdenkst. Nach dem dritten Mal hast du drei Möglichkeiten gefunden, unter der Linie zu bleiben. | Such dir vor dem Start einen freien, offenen Weg durch den Raum aus und beweg dich langsam. |
| MOV-N1 | Zwei Hände, zwei Aufgaben | Steh still und halte in jeder Hand etwas Weiches, zum Beispiel eine zusammengerollte Socke. Beweg eine Hand in langsamen Kreisen, während die andere gerade auf und ab geht, und zähl bis zwanzig. Halte an, tausch die Aufgaben und zähl noch einmal bis zwanzig. Zähl in der letzten Runde wieder bis zwanzig und tausch bei zehn die Aufgaben, ohne dass eine der beiden Hände anhält. | Stell dich so hin, dass du Platz um dich herum hast und deine Arme nirgends anstoßen. |
| MOV-N2 | Der langsame Weg nach unten | Die Schwerkraft will, dass du fällst – lass das nicht zu. Komm aus dem Stand ganz nach unten, bis du flach auf dem Boden liegst, und steh dann wieder ganz auf. Dabei soll kein Knie, keine Hand und kein Ellbogen auf den Boden knallen. Mach es dann ein zweites Mal – noch langsamer und leiser als beim ersten Mal. | Such dir eine freie Stelle, an der du Platz zum Hinlegen hast, und hör auf, wann immer du möchtest. |

Russian:

| Ref | Title | Instruction | Safety note |
| --- | --- | --- | --- |
| MOV-C01 | Медведь, краб, птица | Пройди через комнату как медведь — на руках и ногах. Вернись как краб — животом вверх. Потом снова пройди через комнату как птица — на цыпочках. А теперь выбери, кем из трёх тебе понравилось быть больше всего, и пройди так в последний раз — немного быстрее. | Двигайся по свободному нескользкому полу и замедляйся перед тем, как дойдёшь до другой стороны. |
| MOV-C02 | Шаги великана и шаги мышки | Пройди через комнату как великан: делай самые большие шаги, какие только можешь, и считай их вслух. Потом вернись как мышка — крошечными шажками, пятка к носку — и снова считай. Теперь назови оба числа. Какое из них больше? | Двигайся по свободному нескользкому полу. Шаги великана делай такими, чтобы не терять равновесие. |
| MOV-C03 | Спящий великан | На другом конце комнаты спит великан. Прокрадись туда так тихо, чтобы он не проснулся. Каждые несколько шагов представляй, что великан шевелится во сне: замри и не шевелись, а потом крадись дальше. Пройди туда, обратно и ещё раз туда. Если великан всё ещё спит, когда ты в последний раз дойдёшь до другой стороны, — у тебя получилось! | Крадись медленно по свободному полу и смотри, куда идёшь. |
| MOV-C04 | Десять прыжков — тянись вверх | Встань там, где вокруг свободно. Сделай десять прыжков на одном месте и в каждом вытягивайся в струнку, подняв обе руки вверх. После десятого прыжка ляг на спину. Положи руку на грудь и почувствуй, как быстро бьётся сердце. | Прыгай подальше от мебели, на нескользком полу и там, где над головой ничего низко не висит. Приземляйся мягко. |
| MOV-C05 | Полоса препятствий из подушек | Положи на пол три подушки плашмя — получится маленькая полоса препятствий. Через одну ты переползаешь, другую обходишь, а на последнюю садишься. Пройди эту полосу три раза, каждый раз по-другому — например, как кошка или как улитка. В третий раз в конце сядь на последнюю подушку. | Бери подушки, которые тебе разрешили взять, и следи, чтобы все три лежали на полу плашмя. Не вставай на них, не бегай по ним и не прыгай на них, потому что они могут скользить. |
| MOV-C08 | Позы статуй | Вертись, танцуй или ходи по комнате и считай до пяти. На счёт «пять» замри в смешной позе и не шевелись, пока считаешь до трёх. Сделай так три раза, каждый раз в новой позе, а самую смешную прибереги для последнего раза. | Двигайся по свободному полу, где вокруг есть место, и выбирай позы, в которых сможешь удержаться и не упасть. |
| MOV-C10 | Книги на голове | Положи книгу плашмя на голову и, удерживая равновесие, пройди через комнату и обратно. Потом добавь сверху вторую книгу и ещё раз пройди туда и обратно. Если книга соскользнёт, положи её обратно на голову и продолжай с того же места. Закончи на месте старта так, чтобы обе книги всё ещё лежали у тебя на голове. | Бери лёгкие тонкие книги и иди медленно по свободному полу. |
| MOV-C11 | Ровно столько шагов | Выбери дома два места, например дверь и стол, и угадай, сколько шагов нужно, чтобы пройти от одного до другого. Теперь постарайся попасть точно в своё число: пройди тот же маршрут, делая шаги длиннее или короче, чтобы в конце получилось ровно твоё число шагов. Сделай так на трёх разных маршрутах. | Иди по свободному полу. Делай шаги длиннее или короче, но не прыгай и не скачи. |
| MOV-C14 | Три движения на одной ноге | Встань на одну ногу и сделай три движения по порядку: коснись пола одной рукой, потянись обеими руками вверх, а потом медленно повернись лицом к следующей стене. Затем сделай все три движения, стоя на другой ноге. Если поднятая нога коснётся пола, восстанови равновесие и сделай всё на этой ноге заново. На второй ноге доведи всё до конца, не опуская поднятую ногу. | Выбери свободное место подальше от мебели, с нескользким полом. Ногу можно опустить в любой момент. |
| MOV-C16 | Под линией | Встань прямо и представь невидимую линию поперёк комнаты на уровне своего пояса. Потом опустись пониже и переберись на другую сторону комнаты так, чтобы голова не поднималась выше линии. Сделай так три раза, каждый раз по-другому, но всегда низко: на корточках, ползком или так, как придумаешь. После третьего раза у тебя уже три способа остаться под линией. | Прежде чем начать, выбери свободный путь через комнату, где ничего не мешает, и двигайся медленно. |
| MOV-N1 | Две руки — два дела | Возьми в каждую руку что-нибудь мягкое, например свёрнутый носок, и стой на месте. Одной рукой делай медленные круги, а другую двигай прямо вверх и вниз, считая до двадцати. Остановись, поменяй движения между руками и снова досчитай до двадцати. В последнем раунде снова считай до двадцати и на счёт «десять» поменяй движения между руками, не останавливая ни одну руку. | Встань так, чтобы вокруг было место и руки ни обо что не ударялись. |
| MOV-N2 | Медленный спуск | Сила тяжести хочет тебя уронить — не поддавайся. Начни стоя: опускайся, пока не ляжешь на пол во весь рост, а потом поднимись и снова встань в полный рост. При этом ни колено, ни рука, ни локоть не должны стукнуться об пол. Потом повтори — на этот раз ещё медленнее и тише, чем в первый. | Выбери свободное место, где можно лечь, и остановись, когда захочешь. |

#### Locked Creativity German and Russian content

Human review approved and locked the German and Russian content below for all 12 frozen Creativity Missions on 2026-09-14. Each title, instruction, safety note and adult involvement note is final German or Russian copy, meaning-equivalent to the locked Creativity English above, and carries into the later republication steps exactly as written.

- Creativity German content: locked, 12 / 12. Creativity Russian content: locked, 12 / 12. Creativity English remains locked, 12 / 12, and is unchanged. Movement German and Russian remain locked.
- Adult involvement: CRE-C03 is frozen as `Adult nearby required`, and its German and Russian adult involvement notes are part of the locked content: the adult stays nearby and is available if needed, and never judges completion. The other 11 Missions require no special adult assistance and have no adult involvement note in any language, shown as `—` in the tables.
- `KEEP` origin: CRE-C10 retains the existing production German and Russian of `creativity-08` exactly, following the origin convention that `KEEP` ships unchanged. Its locked copy below is byte-identical to `src/catalogContent.ts`. The other 11 Missions are localized from their locked English rather than from existing production translations.
- Fidelity: every localization preserves the counts, action order, observable completion, final beat, safety meaning and adult involvement of its locked English. No completion requires a listener, tester or visitor other than the child. CRE-C12 compares all three shapes without naming a winner. CRE-N1 covers both the new-symbol-per-letter and the letter-changing-rule options and carries no secrecy meaning; `Schlüssel` and `ключ` name only the key that explains how the writing works.
- Title adaptation: CRE-C13 (`Die Schritt-für-Schritt-Anleitung`, `Шаг за шагом`) and CRE-N1 (`Deine eigene Schrift`, `Свой способ письма`) are semantically adapted. Each title was chosen for naturalness in its own language rather than aligned across languages for symmetry.
- Reopening: after this lock, Creativity German and Russian may be reopened only for a demonstrated semantic fidelity defect, safety translation defect, translation-blocking defect, or implementation or data defect, and not for style preference.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. German and Russian localization of Helping at Home, Learning and Calm has not started.

German:

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| CRE-C01 | Die winzige Welt | Such dir ein kleines Spielzeug aus und bau ihm auf dem Boden ein winziges Zuhause. Es braucht eine Tür, ein Bett und einen Weg, der zur Tür führt. Wenn alle drei fertig sind, lass dein Spielzeug den Weg entlanggehen, durch die Tür und bis in sein Bett. Lass das Zuhause stehen – dein Spielzeug wohnt jetzt dort. | Bau mit leichten, unzerbrechlichen Dingen, die du benutzen darfst, und lass das Zuhause deines Spielzeugs auf dem Boden stehen. | — |
| CRE-C02 | Sockenfreund | Zieh dir eine saubere Socke über die Hand und mach daraus einen Sockenfreund. Gib deinem Freund einen Namen und eine ganz eigene Stimme. Dann lass deinen Sockenfreund dir laut und mit seiner eigenen Stimme einen netten Satz sagen. | Nimm eine saubere Socke, die du benutzen darfst, und halte sie von Gesicht und Mund fern. | — |
| CRE-C03 | Die Deckenhöhle | Leg eine leichte Decke über einen niedrigen Stuhl, sodass eine kleine Höhle entsteht, und lass eine Seite offen. Bring drei Dinge hinein, die sie zu deinem eigenen Ort machen. Bleib dann drinnen, solange du ein ganzes Lied singst oder dir selbst eine ganze Geschichte erzählst. | Nimm eine leichte Decke und einen niedrigen Stuhl, der fest auf dem Boden steht. Lass eine Seite offen, damit du leicht herauskommst, und klettere nicht auf den Stuhl. | Ein Erwachsener bleibt in der Nähe, während du deine Höhle baust und darin sitzt, und ist da, wenn du ihn brauchst. |
| CRE-C04 | Der höchste Turm | Bau einen Turm, so hoch, wie du reichen kannst – aus leichten, unzerbrechlichen Dingen wie Plastikbechern, Bauklötzen oder kleinen Schachteln. Wenn er von allein steht, miss ihn: Leg immer eine Hand über die andere und zähl deine Hände. Tritt dann zurück und bewundere ihn: Dein Turm ist so viele Hände hoch. | Nimm nur leichte, unzerbrechliche Dinge, die du benutzen darfst. Bau auf dem Boden und staple nur so hoch, wie du ohne Klettern reichen kannst. | — |
| CRE-C06 | Erfinde ein Geräusch | Such dir zwei sichere Dinge aus, zum Beispiel einen Löffel und einen Plastikbecher, und erfinde damit dein eigenes Geräusch. Übe, bis dir dasselbe Geräusch dreimal hintereinander gelingt. Wenn das dritte genauso klingt wie die ersten beiden, ist das dein Geräusch! | Nimm zwei unzerbrechliche Dinge, die du benutzen darfst, und mach dein Geräusch nicht direkt neben deinen Ohren. | — |
| CRE-C07 | Das freundliche Monster | Male ein Monster, das überhaupt nicht gruselig ist – vielleicht flauschig, vielleicht mit einem breiten Lächeln. Gib deinem Monster eine lustige Aufgabe, die es bei dir zu Hause erledigt, zum Beispiel Socken kitzeln oder Löffel zählen. Wenn deine Zeichnung fertig ist, schau dein Monster an und sag laut, was seine lustige Aufgabe ist. | Du brauchst ein Blatt Papier und einen Stift oder Buntstifte, die du benutzen darfst. | — |
| CRE-C10 | Comic mit vier Feldern | Male einen Comic mit vier Feldern, in dem eine Figur ein kleines Alltagsproblem löst. Setze in jedes Feld eine Sprechblase. Wenn alle vier Felder eine Zeichnung und eine Sprechblase haben, lies deinen Comic laut vor. | Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst. | — |
| CRE-C11 | Die Geräuschkarte | Setz dich an einen Platz und hör eine Minute lang genau hin. Male dich dann in die Mitte eines Blatts Papier. Male um dich herum für jedes Geräusch, das du gehört hast, ein kleines Bild: nahe Geräusche dicht bei dir, ferne Geräusche weiter weg. Wenn jedes Geräusch sein Bild hat, schau dir deine Karte an: alles, was du gehört hast, rund um dich herum. | Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst. | — |
| CRE-C12 | Die Papierbrücke | Leg zwei Bücher eine Handbreit auseinander. Bau aus einem Blatt Papier, ohne Klebeband und ohne Kleber, eine Brücke dazwischen und teste sie mit einem kleinen, leichten Gegenstand, zum Beispiel einem Radiergummi. Wenn sich das Papier durchbiegt, ändere seine Form passend zu dem, was du beobachtet hast, und teste noch einmal. Entwirf und teste drei verschiedene Formen und vergleiche dann, wie sich alle drei im Test verhalten haben. | Du brauchst zwei Bücher, ein Blatt Papier und einen kleinen, leichten Gegenstand, die du benutzen darfst. | — |
| CRE-C13 | Die Schritt-für-Schritt-Anleitung | Such dir eine kleine Sache aus, die du gut kannst, zum Beispiel einen Papierflieger falten oder eine Katze mit fünf Strichen malen. Gestalte dazu eine Anleitung auf einer Seite: jeder Schritt der Reihe nach, nummeriert und mit einer Zeichnung oder ein paar Wörtern. Wenn auch der letzte Schritt auf dem Blatt ist, schau dir deine fertige Anleitung an: etwas, das du kannst, Schritt für Schritt erklärt. | Du brauchst ein Blatt Papier und einen Stift, den du benutzen darfst. | — |
| CRE-C14 | Das Museum der Alltagsdinge | Mach aus fünf gewöhnlichen Dingen von zu Hause ein Museum. Stell sie in einer Reihe auf und gib jedem Ding ein kleines Schild – geschrieben oder gemalt – mit einem spannenden Namen und einer erfundenen Tatsache. Zum Beispiel: Uralter Löffel, mit dem einst ein Riese gefrühstückt hat. Geh dann als allererster Gast an deinem Museum entlang und lies jedes Schild. | Nimm Dinge, die du bewegen darfst und die nicht scharf, schwer oder zerbrechlich sind. | — |
| CRE-N1 | Deine eigene Schrift | Erfinde deine eigene Schrift: ein neues Zeichen für jeden Buchstaben oder eine Regel, die jeden Buchstaben verändert. Schreib in deiner neuen Schrift eine kurze, freundliche Nachricht. Mach auf einem zweiten Blatt einen Schlüssel, der zeigt, wie deine Schrift funktioniert. Leg dann die Nachricht und den Schlüssel nebeneinander: deine eigene Schrift – mit dem Schlüssel, mit dem man sie lesen kann. | Du brauchst zwei Blätter Papier und einen Stift, den du benutzen darfst. | — |

Russian:

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| CRE-C01 | Крошечный мир | Выбери одну маленькую игрушку и построй для неё на полу крошечный домик. В домике должны быть дверь, кровать и дорожка, которая ведёт к двери. Когда все три будут готовы, проведи игрушку по дорожке, через дверь — и в кровать. Пусть домик так и стоит: теперь в нём живёт твоя игрушка. | Бери лёгкие небьющиеся вещи, которыми тебе разрешено пользоваться, и строй домик для игрушки на полу. | — |
| CRE-C02 | Друг из носка | Надень на руку чистый носок и сделай из него друга. Придумай другу имя и его собственный голос. Потом пусть твой друг из носка скажет тебе вслух своим голосом одну добрую фразу. | Бери чистый носок, которым тебе разрешено пользоваться, и держи его подальше от лица и рта. | — |
| CRE-C03 | Шалаш из одеяла | Накинь одно лёгкое одеяло на низкий стул — получится маленький шалаш. Одну сторону оставь открытой. Принеси внутрь три вещи, которые сделают шалаш твоим собственным местом. Потом оставайся внутри, пока не споёшь целую песню или не расскажешь себе целую историю. | Возьми одно лёгкое одеяло и низкий стул, который устойчиво стоит на полу. Оставь одну сторону открытой, чтобы легко выбраться, и не залезай на стул. | Взрослый остаётся рядом, пока ты строишь шалаш и сидишь в нём, и поможет, если понадобится. |
| CRE-C04 | Самая высокая башня | Построй башню высотой до того места, куда можешь дотянуться. Строй из лёгких небьющихся вещей: например, из пластиковых стаканчиков, кубиков или маленьких коробочек. Когда башня будет стоять сама, измерь её ладонями: прикладывай ладони одну над другой и считай их. А потом отойди и полюбуйся: теперь ты знаешь, сколько ладоней у твоей башни в высоту. | Бери только лёгкие небьющиеся вещи, которыми тебе разрешено пользоваться. Строй на полу и только до той высоты, куда можешь дотянуться, ни на что не залезая. | — |
| CRE-C06 | Придумай звук | Выбери две безопасные вещи, например ложку и пластиковый стаканчик, и придумай с их помощью свой собственный звук. Тренируйся, пока один и тот же звук не получится три раза подряд. Когда третий прозвучит точно так же, как первые два, — это твой звук! | Бери две небьющиеся вещи, которыми тебе разрешено пользоваться, и не делай свой звук прямо возле ушей. | — |
| CRE-C07 | Добрый монстр | Нарисуй совсем не страшного монстра — например, пушистого или с широкой улыбкой. Придумай своему монстру одну смешную работу у тебя дома: например, щекотать носки или считать ложки. Когда рисунок будет готов, посмотри на своего монстра и скажи вслух, какая у него смешная работа. | Тебе нужен лист бумаги и карандаш или восковые мелки, которыми тебе разрешено пользоваться. | — |
| CRE-C10 | Комикс из четырёх кадров | Нарисуй комикс из четырёх кадров, в котором герой решает одну небольшую бытовую задачу. В каждом кадре добавь по одному облачку с репликой. Когда во всех четырёх кадрах будут рисунок и реплика, прочитай свой комикс вслух. | Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться. | — |
| CRE-C11 | Карта звуков | Сядь в одном месте и одну минуту внимательно слушай. Потом нарисуй себя в середине листа бумаги. Вокруг себя нарисуй маленькую картинку для каждого услышанного звука: близкие звуки — рядом с собой, далёкие — подальше. Когда у каждого звука будет своя картинка, посмотри на свою карту: всё услышанное — вокруг тебя. | Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться. | — |
| CRE-C12 | Бумажный мост | Положи две книги на ширину ладони друг от друга. Сделай из одного листа бумаги, без скотча и клея, мост между ними и проверь его маленьким лёгким предметом, например ластиком. Если бумага прогнётся, измени её форму с учётом увиденного и проверь снова. Придумай и проверь три разные формы, а потом сравни, как повели себя все три при проверке. | Тебе нужны две книги, один лист бумаги и маленький лёгкий предмет, которыми тебе разрешено пользоваться. | — |
| CRE-C13 | Шаг за шагом | Выбери одно небольшое дело, которое у тебя хорошо получается: например, сложить бумажный самолётик или нарисовать кошку пятью линиями. Сделай к нему инструкцию на одном листе: все шаги по порядку, с номерами, и у каждого — рисунок или несколько слов. Когда на листе появится последний шаг, посмотри на готовую инструкцию: то, что ты умеешь, расписано шаг за шагом. | Тебе нужен лист бумаги и карандаш, которыми тебе разрешено пользоваться. | — |
| CRE-C14 | Музей обычных вещей | Преврати пять обычных вещей из дома в музей. Расставь их в ряд и сделай для каждой маленькую табличку — написанную или нарисованную — с интересным названием и одним выдуманным фактом. Например: «Древняя ложка. Когда-то ею завтракал великан». Потом пройди вдоль своего музея как самый первый посетитель и прочитай каждую табличку. | Бери вещи, которые тебе разрешено переставлять, — не острые, не тяжёлые и не бьющиеся. | — |
| CRE-N1 | Свой способ письма | Придумай свой способ письма: новый значок для каждой буквы или правило, которое меняет каждую букву. Напиши этим способом одну короткую дружелюбную записку. На втором листе сделай ключ, который показывает, как работает твой способ письма. Потом положи записку и ключ рядом: твой собственный способ письма — и ключ, по которому её можно прочитать. | Тебе нужны два листа бумаги и карандаш, которыми тебе разрешено пользоваться. | — |

#### Locked Helping at Home German and Russian content

Human review approved and locked the German and Russian content below for all 9 frozen Helping at Home Missions on 2026-09-14. Each title, instruction, safety note and adult involvement note is final German or Russian copy, meaning-equivalent to the locked Helping at Home English above, and carries into the later republication steps exactly as written.

- Helping at Home German content: locked, 9 / 9. Helping at Home Russian content: locked, 9 / 9. Helping at Home English remains locked, 9 / 9, and is unchanged. Movement and Creativity German and Russian remain locked.
- Adult involvement: HELP-C02 and HELP-C15 are frozen as `Adult participation required`, and their German and Russian adult involvement notes are part of the locked content. In HELP-C02 the adult chooses and hands over the safe items; in HELP-C15 the adult chooses the unbreakable cups, controls the water amount and prepares the stable places. Neither adult directs, inspects or judges completion. The other 7 Missions require no special adult assistance and have no adult involvement note in any language, shown as `—` in the tables.
- Origin: no Helping at Home Mission has `KEEP` origin, so all 9 are localized from their locked English rather than from existing production translations.
- Category tone: every localization keeps the child's role, the useful result and the child's ownership of it, without chore, obedience or service wording. HELP-C01 stays readiness at the existing shoe place, HELP-C15 completes on prepared places rather than people served, HELP-N2 is complete once the box and its sign exist even with nothing inside, and no completion depends on a reaction, thanks or praise. Russian HELP-C11 refers to the chosen person without gendered pronouns.
- Title adaptation: HELP-C02 keeps the captain role in both languages (`Tischkapitän`, `Капитан стола`). HELP-C05, HELP-C13 (`Auf einen Blick`, `Понятно с первого взгляда`), the Russian HELP-C15 title (`Маршрут с водой`) and HELP-C17 (`Die Startklar-Ecke`, `Уголок наготове`) are semantically adapted, each chosen for naturalness in its own language.
- Reopening: after this lock, Helping at Home German and Russian may be reopened only for a demonstrated semantic fidelity defect, safety translation defect, translation-blocking defect, or implementation or data defect, and not for style preference.
- Production catalog: unchanged. `src/catalogContent.ts` still holds 40 Missions at content version `mvp-catalog-2026-09`, this lock publishes no production content, and no new stable Mission identifiers are assigned. German and Russian localization of Learning and Calm has not started.

German:

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| HELP-C01 | Die Schuhreihe | Geh zu einer Stelle, an der bei euch Schuhe stehen. Mach aus den Schuhen vollständige Paare, stell jedes Paar nebeneinander und dreh alle Schuhspitzen in dieselbe Richtung. Wenn ein Schuh keinen Partner hat, lass ihn am Ende der Reihe stehen. Wenn jedes vollständige Paar in dieselbe Richtung zeigt, tritt zurück und schau dir deine Schuhreihe an, die jetzt bereitsteht. | Beweg nur Schuhe, die du anfassen darfst. Lass sie dort, wo die Schuhe sonst auch stehen, und halte den Durchgang frei. | — |
| HELP-C02 | Tischkapitän | Du bist Tischkapitän. Ein Erwachsener gibt dir nur die Sachen, die du sicher tragen kannst. Deck zuerst einen ganzen Platz und mach dann alle anderen Plätze genauso. Wenn jeder Platz bereit ist, tritt zurück, prüf den ganzen Tisch und verkünde, dass er bereit ist. | Trag nur leichte, unzerbrechliche Sachen, die dir der Erwachsene gibt. Bleib mit beiden Füßen auf dem Boden und überlass alles Heiße, Scharfe oder Schwere dem Erwachsenen. | Ein Erwachsener sucht die sicheren Sachen aus, die du tragen darfst, und gibt sie dir. |
| HELP-C05 | Fünf Servietten falten | Falte fünf quadratische Servietten oder Tücher zu gleichen Dreiecken. Falte jedes Stück von Ecke zu Ecke und leg es dann mit der Spitze in dieselbe Richtung wie die anderen auf den Stapel. Wenn das fünfte Dreieck oben liegt, richte die Kanten genau aus und schau dir deinen fertigen Stapel an: fünf gleiche Dreiecke, bereit zum Benutzen. | Nimm fünf saubere Servietten oder Tücher, die du benutzen darfst, und falte sie auf einem Tisch oder auf dem Boden. | — |
| HELP-C09 | Bereit für morgen | Leg die Sachen, die du morgen brauchst, an einem Platz in der Nähe der Tür zusammen, zum Beispiel deine Tasche, deine Jacke und deine Trinkflasche. Wenn alles zusammen ist, was du brauchst, schau dir an, was dort bereitliegt: deine Sachen für morgen, die alle an einem Platz auf dich warten. | Beweg nur deine eigenen leichten Sachen und halte den Eingang und den Durchgang frei. | — |
| HELP-C11 | Die Tischüberraschung | Such dir eine Person bei dir zu Hause aus und richte ihr einen besonderen Platz am Tisch her. Falte eine Serviette oder ein Stück Papier zu einer einfachen Form und leg sie an ihren Platz. Leg ihren Löffel und einen leeren, unzerbrechlichen Becher neben die Form. Schau dir den Platz an, den du nur für sie hergerichtet hast. | Nimm Sachen, die du bewegen darfst und gut tragen kannst. Such dir einen Platz aus, den du mit beiden Füßen auf dem Boden erreichst. | — |
| HELP-C13 | Auf einen Blick | Such dir ein Regal, eine Kiste oder eine Schublade aus, die ihr gemeinsam benutzt. Gestalte ein Schild, das auf einen Blick zeigt, was dorthin gehört: Mal es, schreib es oder mach beides. Lass alles, was darin ist, genau so, wie es ist, und bring dein Schild dort an, wo man es gut sehen kann. Jetzt sieht jeder sofort, was dorthin gehört. | Such dir einen Platz, den du mit beiden Füßen auf dem Boden erreichst. Nimm Papier und Stifte zum Malen oder Schreiben, die du benutzen darfst. | — |
| HELP-C15 | Die Wasserrunde | Das ist deine Wasserrunde. Ein Erwachsener sucht unzerbrechliche Becher aus, gießt ein wenig kühles Wasser hinein und bereitet für jeden Becher einen standfesten Platz vor. Trag immer nur einen Becher mit beiden Händen und stell ihn auf einen vorbereiteten Platz. Wenn auf jedem vorbereiteten Platz ein Becher steht, ist deine Runde komplett. | Geh langsam auf einem freien, trockenen Weg. Renn nicht. Wenn Wasser danebengeht, bleib stehen und sag einem Erwachsenen Bescheid, damit der Boden wieder sicher wird. | Ein Erwachsener sucht unzerbrechliche Becher aus, bestimmt, wie viel Wasser hineinkommt, und bereitet die standfesten Plätze vor, bevor die Runde beginnt. |
| HELP-C17 | Die Startklar-Ecke | Richte einen Platz ein, an dem deine Familie sofort mit etwas loslegen kann. Such dir eine Sache aus, die ihr oft macht, zum Beispiel malen, lesen, ein Spiel spielen oder bauen. Leg alles, was man dafür braucht, an einem Platz zusammen. Tritt dann zurück und schau dir den Platz an, den du startklar gemacht hast: Jeder kann anfangen, ohne etwas suchen zu müssen. | Nimm nur leichte, sichere Dinge, die du bewegen darfst. Such dir einen Platz, den du ohne Klettern erreichst, und halte die Laufwege frei. | — |
| HELP-N2 | Die Fundkiste | Mach eine Fundkiste für euer Zuhause. Stell eine leere Kiste oder einen Korb neben einen Ort, an dem alle vorbeigehen. Male eine Socke oder ein Spielzeug auf Papier und leg das Bild als Schild neben die Kiste. Geh durch einen Raum und schau, ob etwas in die Kiste gehört. Schau dir dann deine offene Kiste mit ihrem Schild an: bereit zum Benutzen, auch wenn noch nichts drin ist. | Nimm eine leichte Kiste oder einen leichten Korb, Papier und Buntstifte, die du benutzen darfst. Stell die Kiste so hin, dass sie nicht im Weg steht, und lass alles Scharfe, Schwere, Zerbrechliche oder Unbekannte liegen, wo es ist. | — |

Russian:

| Ref | Title | Instruction | Safety note | Adult involvement note |
| --- | --- | --- | --- | --- |
| HELP-C01 | Обувь в ряд | Выбери одно место, где у вас обычно стоит обувь, и подойди туда. Составь из обуви полные пары, поставь обувь каждой пары рядом и поверни все пары носами в одну сторону. Если у какого-то ботинка нет пары, оставь его в конце ряда. Когда все полные пары будут смотреть в одну сторону, отойди и посмотри на свой ряд обуви: теперь он готов. | Переставляй только ту обувь, которую тебе разрешено трогать. Оставляй её на обычном месте для обуви и следи, чтобы проход оставался свободным. | — |
| HELP-C02 | Капитан стола | Ты — капитан стола. Взрослый даёт тебе только те вещи, которые тебе безопасно нести. Сначала подготовь одно место целиком, а потом сделай все остальные места точно такими же. Когда все места будут готовы, отойди, проверь весь стол и объяви, что стол готов. | Неси только лёгкие небьющиеся вещи, которые даёт тебе взрослый. Стой обеими ногами на полу, а всё горячее, острое или тяжёлое оставь взрослому. | Взрослый выбирает безопасные вещи, которые тебе можно нести, и даёт их тебе. |
| HELP-C05 | Сложи пять салфеток | Сложи пять квадратных салфеток или кусочков ткани в одинаковые треугольники. Складывай их по одному уголок к уголку и клади в стопку так, чтобы острый конец смотрел туда же, куда и у остальных. Когда пятый треугольник окажется сверху, выровняй края и посмотри на готовую стопку: пять одинаковых треугольников, готовых к делу. | Бери пять чистых салфеток или кусочков ткани, которыми тебе разрешено пользоваться, и складывай их на столе или на полу. | — |
| HELP-C09 | Всё готово на завтра | Сложи в одно место у двери вещи, которые понадобятся тебе завтра, например сумку, куртку и бутылку для воды. Когда всё нужное будет вместе, посмотри, что получилось: всё на завтра уже ждёт тебя в одном месте. | Переноси только свои лёгкие вещи и следи, чтобы у двери и в проходе оставалось свободно. | — |
| HELP-C11 | Сюрприз за столом | Выбери кого-нибудь из домашних и подготовь для этого человека особое место за столом. Сложи салфетку или листок бумаги в простую фигурку и положи её на это место. Рядом положи ложку и поставь пустую небьющуюся кружку. Посмотри на особое место — оно готово специально для этого человека. | Бери вещи, которые тебе разрешено переставлять и которые легко нести. Выбери место, до которого достаёшь, стоя обеими ногами на полу. | — |
| HELP-C13 | Понятно с первого взгляда | Выбери одну полку, коробку или ящик, которыми пользуется вся семья. Придумай одну табличку, по которой с первого взгляда понятно, что там хранится: нарисуй, напиши или сделай и то и другое. Всё, что внутри, оставь как есть, а табличку размести там, где её хорошо видно. Теперь любой сразу видит, что там хранится. | Выбери место, до которого достаёшь, стоя обеими ногами на полу. Бери бумагу и карандаши или ручки, которыми тебе разрешено пользоваться. | — |
| HELP-C15 | Маршрут с водой | Это твой маршрут с водой. Взрослый выбирает небьющиеся кружки, наливает в них немного прохладной воды и готовит для каждой кружки устойчивое место. Неси по одной кружке двумя руками и ставь её на готовое место. Когда на каждом готовом месте будет стоять кружка, твой маршрут пройден. | Иди медленно по свободному сухому пути. Не бегай. Если вода прольётся, остановись и скажи взрослому, чтобы пол снова стал безопасным. | Взрослый выбирает небьющиеся кружки, решает, сколько налить воды, и готовит устойчивые места до начала маршрута. |
| HELP-C17 | Уголок наготове | Подготовь место, где твоя семья сможет сразу чем-нибудь заняться. Выбери одно дело, которое вы часто делаете: например, рисовать, читать, играть в игру или строить. Сложи в одном месте всё, что для этого нужно. Потом отойди и посмотри на подготовленное место: любой может сразу начать — и ничего не придётся искать. | Бери только лёгкие безопасные вещи, которые тебе разрешено переносить. Выбери место, до которого достаёшь, ни на что не залезая, и следи, чтобы проходы оставались свободными. | — |
| HELP-N2 | Коробка находок | Сделай коробку находок для вашего дома. Поставь пустую коробку или корзинку рядом с местом, мимо которого все проходят. Нарисуй на бумаге носок или игрушку и положи рисунок рядом с коробкой — это будет её табличка. Пройди по одной комнате и посмотри, не найдётся ли что-нибудь для коробки. Потом посмотри на свою открытую коробку с табличкой: она готова, даже если внутри пока ничего нет. | Бери лёгкую коробку или корзинку, бумагу и восковые мелки, которыми тебе разрешено пользоваться. Ставь коробку так, чтобы она не мешала проходу, а всё острое, тяжёлое, бьющееся или незнакомое оставляй на месте. | — |

#### Republication step status

| Step | Status |
| --- | --- |
| 1 — Candidate selection and refinement | Complete |
| 2 — Mission Experience Principles review | Complete |
| 3 — Age-band suitability, pruning and publication freeze | Complete |
| 4 — Approved English drafting | Complete |
| 5 — German and Russian content | In progress |
| 6 — Safety and adult-involvement review | Not started |
| 7–13 — Provenance, version bump, validation, coverage, manual review, scenes | Not started |

Step 4 progress by Mission Category:

| Mission Category | English content |
| --- | --- |
| Movement | Locked, 12 / 12 |
| Creativity | Locked, 12 / 12 |
| Helping at Home | Locked, 9 / 9 |
| Learning | Locked, 11 / 11 |
| Calm | Locked, 10 / 10 |

Step 5 progress by Mission Category:

| Mission Category | German content | Russian content |
| --- | --- | --- |
| Movement | Locked, 12 / 12 | Locked, 12 / 12 |
| Creativity | Locked, 12 / 12 | Locked, 12 / 12 |
| Helping at Home | Locked, 9 / 9 | Locked, 9 / 9 |
| Learning | Not started | Not started |
| Calm | Not started | Not started |

Approved English content is locked for all five Mission Categories, 54 of the 54 frozen Missions, and Step 4 is complete. Step 5 is in progress: German and Russian content is locked for Movement, Creativity and Helping at Home, 33 of the 54 frozen Missions in each language, and has not started for Learning or Calm. The production catalog is unchanged, and the 54 frozen Missions are not yet production content. Task 5 remains paused, Task 6 remains blocked, and Task 7 and the later tasks remain unstarted and unauthorized.


## Objective

Implement `F002 — Mission Discovery and Selection`: the five canonical Mission Categories, the reviewed production Mission catalog, deterministic eligibility and exactly-three suggestion derivation, bounded `Another set` progression, and the deliberate choice that creates exactly one Mission Session in `selected`.

Plan 02 stops at a persisted `selected` session and a typed handoff to the mission start experience. It implements no `ready`, `active`, timer, abandonment, or completion behavior.

## Owning specifications

- [`docs/specs/functions/002-mission-discovery-and-selection.md`](../../docs/specs/functions/002-mission-discovery-and-selection.md) — F002 behavior and acceptance criteria
- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) — Mission content, eligibility, age suitability, adult involvement, localization equivalence, catalog coverage
- [`docs/specs/technical/technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) — catalog validation, deterministic filtering and ordering, bounded replacement, selection persistence, module boundaries
- [`docs/specs/technical/data-and-state-model.md`](../../docs/specs/technical/data-and-state-model.md) — catalog values, snapshot sections, Mission Session fields, invariants, persisted/runtime/derived classification
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) — category peer group, exactly-three presentation, Mission card content, safety prominence, loading/unavailable states, accessibility and anti-manipulation rules
- [`docs/global-spec.md`](../../docs/global-spec.md) — product purpose and MVP boundaries
- [`docs/functional-map.md`](../../docs/functional-map.md) — capability ownership
- [`docs/user-stories.md`](../../docs/user-stories.md) — F002-relevant story traceability
- [`docs/business-context.md`](../../docs/business-context.md) — real problem and product ergonomics

`F003` and `F004` remain interface constraints only.

## In scope

- One controlled, bundled, versioned static Mission catalog with reviewed production entries.
- Catalog record validation and an age-band x Mission Category x language coverage guarantee that blocks release.
- Mission Category selection across exactly Movement, Creativity, Helping at Home, Learning, and Calm.
- Deterministic eligibility filtering by selected age band, exact Mission Category, and localized content completeness.
- Exactly-three distinct suggestion derivation with the approved deterministic ordering.
- Bounded `Another set` progression over unseen complete groups within one discovery cycle.
- Mission card presentation carrying localized title, localized short instruction, Mission Category, expected duration, and required localized safety or adult-involvement content.
- Deliberate selection that creates exactly one Mission Session in `selected` through the existing persistence adapter, with confirmed persistence before success is presented.
- F002 incomplete-setup gate, insufficient-content, exhausted-replacement, catalog-failure, and selection-failure states.
- EN/DE/RU localization and the accessibility, responsive, and ergonomic baseline for every implemented F002 view.
- Automated and manual verification for the implemented Plan 02 behavior.
- A truthful dated changelog update after implementation and verification.

## Explicitly out of scope

- `F003` `ready`, `active`, Mission Break, timer, timer recovery, cancellation, abandonment, or completion behavior
- `F004` Reward Card, Mission History, Monthly Goal, completion counting, or rewards
- Existing-active-session conflict resolution and abandonment choice, which `F003` owns
- Season Rewards, Family Quests, School/Classroom mode, and all roadmap v1.1 and v2+ items
- AI mission generation, runtime AI, or any uncontrolled content generation
- A router or non-root product URL
- Backend, server API, server database, serverless runtime, authentication, accounts, cloud sync, or remote persistence
- Analytics, tracking, advertising identifiers, CMS, moderation workflow, payment, social, ranking, chat, device-control, or native-app integration
- A second persistence system, a parallel catalog store, or copying catalog content into the browser snapshot
- A UI component framework, design-system package, or new runtime dependency
- Child full name, identifying name, exact birth date, email, contact data, address, precise location, school/class, credentials, photo, video, completion proof, or other sensitive or identifying child data
- Specification, `AGENTS.md`, roadmap, or completed-plan changes

## F002 boundary and later-state compatibility

- Discovery requires a valid supported age band and a supported UI language. Incomplete, degraded, or blocked-recovery setup must never enter discovery or infer an age band.
- A discovery cycle is one age band, one UI language, and one Mission Category. Changing any of the three, choosing a Mission, or leaving discovery ends the cycle.
- The shown-identifier set and the current suggestion set are runtime state for one cycle. They are never persisted into the browser snapshot.
- Selection creates exactly one Mission Session in `selected` and then exposes a typed, testable handoff indicating the start experience is available. Plan 02 must not render, simulate, or populate the `ready` screen, Mission Break, timer, or any completion effect.
- The data model permits at most one current non-completed Mission Session. If one already exists, Plan 02 must refuse to create a second and must not overwrite, mutate, or delete it; the family-facing conflict choice and abandonment belong to `F003`.
- Discovery must never add a Mission History entry, create a Reward Card, increment Monthly Goal progress, or write `startedAt`, `completedAt`, or `completionPeriodId`.
- `snapshotVersion` stays `1`. The snapshot's `currentSession` section is already declared to hold zero or one session in `selected`, `ready`, or `active`, so Plan 02 widens the accepted values within the existing shape and performs no migration. Snapshots written by the F001 build remain valid.
- Removing or withdrawing a Mission from future discovery must not substitute or rewrite the Mission attached to an existing Mission Session.

## Required technical boundaries

- Keep the controlled catalog bundled, static, versioned, and read-only at runtime. Never copy catalog records or localized Mission content into the browser snapshot.
- Persist only a Mission reference and the immutable selection facts defined by the Data and State Model: `sessionId`, `childProfileId`, `missionId`, `missionCategoryAtSelection`, `ageBandAtSelection`, `durationSecondsAtSelection`, `state`, and `selectedAt`.
- Continue using one namespaced storage key and the one existing persistence adapter. No feature module may call `localStorage` directly.
- Continue the established confirmed-write path: read, validate, replace the complete snapshot, read back, and validate the exact stored result before presenting selection as durably saved.
- Eligibility is exact. Never relax the age band, change the selected Mission Category, mix UI languages, or use unreviewed content to fill a set.
- Order eligible Missions by ascending `catalogOrder`, then by ascending stable Mission identifier using locale-independent Unicode code-point comparison as the exact tie-breaker. The first set is the first three records; `Another set` advances to the next complete unseen group in that same order.
- Never wrap around, recycle, auto-load, stream, or randomize suggestions. Never present one or two Missions as a set.
- Treat catalog records defensively at runtime. Exclude invalid records before discovery, never repair or substitute content, and show only the controlled unavailable or exhausted state to the family.
- Generate `sessionId` through an injectable factory and read the selection timestamp through an injectable clock so tests stay deterministic.
- Add no secret, runtime environment dependency, or new package.

## Minimal likely repository shape

Authorized implementation should add only the files proven necessary. The likely minimum is:

- one catalog domain module defining Mission record types, closed values, and record validation;
- one bundled catalog content module holding the reviewed production Mission entries;
- one discovery domain module owning eligibility, deterministic ordering, exactly-three derivation, and bounded replacement;
- one session domain module owning `selected` creation and its confirmed persistence;
- extension of the existing persistence validation to accept a `selected` current session;
- category-selection, suggestion-set, and F002 state view modules within the existing shallow shell;
- additions to the existing localization dictionaries and stylesheet; and
- focused tests colocated with the existing suite.

Do not introduce a component library, design-token catalog, content pipeline, CMS, or duplicated configuration layer.

## Sequential implementation tasks

### Task 1 — Define the controlled Mission catalog schema and record validation

#### Outcome

Add the catalog domain types and a pure record validator covering stable non-empty unique identifier, exactly one canonical Mission Category, at least one approved age band from the closed set, positive whole-second duration, complete EN/DE/RU title and instruction, complete required safety content in all three languages, internally consistent adult-involvement metadata, finite non-negative whole-number `catalogOrder`, catalog content version, and reviewed discovery eligibility. Duplicate identifiers invalidate every record sharing that identifier; duplicate `catalogOrder` values are permitted.

#### Specification trace

Data and State Model controlled Mission catalog values and closed MVP values; Technical Architecture catalog publication validation and defensive runtime exclusion; Mission Catalog and Safety conceptual Mission content and catalog eligibility.

#### Boundary

Expected areas: a new catalog domain module and its test. No content entries, no discovery logic, no UI, no persistence change. Localized strings are never identifiers.

#### Verification / test intent

Unit-test each invalid shape independently: missing or empty identifier, duplicate identifier, unknown category, empty or unknown age band, zero, negative, fractional or missing duration, any missing localization, missing required safety content in one language, inconsistent adult-involvement metadata, negative or fractional `catalogOrder`, and ineligible or unreviewed provenance. Confirm a valid record passes and that validation is pure and side-effect free.

### Task 2 — Author and review the production MVP Mission catalog content

#### Outcome

Author the reviewed bundled Mission entries required for MVP discovery. Every entry carries a stable identifier, exactly one Mission Category, its approved age bands, a positive realistic guidance duration, meaning-equivalent EN/DE/RU title and instruction with a clear real-world action and end condition, the correct adult-involvement level with matching localized visible content, any required localized safety note and material or environment condition, a valid `catalogOrder`, and content provenance. Content must be short, age-appropriate, globally neutral, screen-leaving, and free of dangerous actions, unsafe equipment, unsupervised travel, purchases, stranger contact, identifying-data requests, and engagement pressure.

#### Specification trace

Mission Catalog and Safety core content purpose, closed categories and age bands, titles, instructions and end conditions, guidance duration, child-safety exclusions, adult involvement and visible safety guidance, materials and environment, per-category safety scope, privacy in Mission content, reward and engagement safety, localization safety, and catalog eligibility; F002 content and safety rules.

#### Boundary

Expected areas: one bundled catalog content module. Author enough complete Missions to satisfy the Task 3 coverage requirement, plus further complete groups where bounded `Another set` should be useful. No total catalog size is mandated beyond that. No AI generation, no placeholder or filler entries, no unreviewed content, no CMS.

#### Verification / test intent

Every authored entry passes the Task 1 validator. Review each Mission against the safety exclusions, adult-involvement consistency, and localization meaning-equivalence rules, and record that the review occurred. Confirm no entry requests identifying child data or implies competition, streaks, or prizes.

### Task 3 — Implement catalog validation and coverage guarantees

#### Outcome

Wire record validation across the whole catalog and add a coverage validator proving that every supported age band x Mission Category x UI language context yields at least three eligible Missions. Because a Mission may be approved for several age bands, coverage is asserted per cell rather than by a total count. Validation failure blocks release. At runtime, invalid records are excluded defensively before discovery without repair, substitution, or duplication.

#### Specification trace

Technical Architecture catalog publication validation, the at-least-three coverage requirement, and defensive runtime exclusion; Mission Catalog and Safety catalog coverage; F002 controlled predefined mission catalog.

#### Boundary

Expected areas: catalog validation module and its test. All fifteen age-band x category cells must pass in all three languages. No eligibility relaxation is permitted to make a cell pass.

#### Verification / test intent

Test that the real production catalog passes whole-catalog validation and the coverage validator for all fifteen cells in EN, DE, and RU. Test that a fixture catalog with a deficient cell fails, that duplicate identifiers invalidate every sharing record, and that an invalid record is excluded at runtime while valid records remain available.

### Task 4 — Implement Mission Category selection and the discovery entry gate

#### Outcome

Implement selection among exactly the five canonical Mission Categories as one equal peer-choice group, reachable only from a valid completed F001 setup. Selecting a category starts a discovery cycle for the current age band and UI language. Changing category, age band, or language discards the displayed set and requests a new complete set for the new context. Incomplete, degraded, or blocked-recovery setup shows the approved gate that routes back to the parent-guided age step without inferring an age or showing Missions.

#### Specification trace

F002 preconditions and inputs, category selection behavior, and incomplete-setup state; Visual & Ergonomic Mission Category Selection row, incomplete-setup discovery gate row, and action hierarchy; Technical Architecture root-only state-driven views; F001 setup-complete handoff.

#### Boundary

Expected areas: shell view selection, a category view module, localization keys, stylesheet. No ranking, popularity, trending, premium treatment, recommendation, or color-only category meaning. No router or deep link.

#### Verification / test intent

Test that exactly five categories render with the canonical labels in EN/DE/RU, that no category is visually or structurally promoted, that each selection starts a cycle for the current context, that changing category, age band, or language discards and replaces the set, and that incomplete, degraded, and blocked-recovery states present the gate with no Missions and no inferred age.

### Task 5 — Implement eligibility, deterministic exactly-three derivation, and Mission card presentation

#### Outcome

Implement pure eligibility filtering by selected age band, exact Mission Category, and complete localized content, then deterministic ordering by ascending `catalogOrder` with ascending stable Mission identifier by locale-independent Unicode code-point comparison as the tie-breaker. The first set is the first three eligible records, always exactly three distinct Missions. When the eligible pool holds fewer than three valid Missions, return the controlled insufficient-content result instead of a partial set. Present the derived set as one bounded group of three equally weighted Mission cards, each showing the localized title, localized short instruction, Mission Category, expected duration, and any required localized safety or adult-involvement note before the family commits to a choice.

#### Specification trace

F002 suggestion set behavior, Mission card content, eligibility rules, and no-complete-eligible-set state; Technical Architecture deterministic filtering, ordering, and first-set rules; Data and State Model derived-state classification; Visual & Ergonomic exactly-three suggestions row and safety and adult-involvement prominence.

#### Boundary

Expected areas: discovery domain module and its test, a suggestion-set view module, localization keys, stylesheet. Derivation stays pure and free of React, storage, clocks, and randomness; the view renders it. All three cards carry equal visual weight with no rank, recommendation, popularity, or color-only meaning. Never relax eligibility, mix languages, duplicate a Mission, or emit one or two suggestions. No selection behavior yet.

#### Verification / test intent

Unit-test filtering by each age band and each category, exclusion of Missions missing content in the selected language, exactly-three output, distinctness, deterministic ordering including the identifier tie-breaker for equal `catalogOrder`, stability across repeated calls, and the insufficient-content result for pools of zero, one, and two eligible Missions. Integration-test that exactly three cards render with all required content in EN/DE/RU, that required adult-involvement and safety text is visible before choosing, and that no card is promoted over the others.

### Task 6 — Implement bounded `Another set` progression

#### Outcome

Implement the deliberate bounded replacement that advances to the next complete group of three unseen eligible Missions in the same deterministic order, tracking shown identifiers in runtime cycle state only. No Mission repeats while a full unseen group remains. When fewer than three unseen Missions remain, replacement is unavailable, the current three choices stay usable, and the state is presented as a bounded catalog outcome rather than a failure. A failed replacement retains the current set intact.

#### Specification trace

F002 requesting another set, no-further-complete-set state, and replacement-loading failure; Technical Architecture bounded replacement and shown-identifier cycle state; Visual & Ergonomic exactly-three suggestions row and anti-manipulation rules.

#### Boundary

Expected areas: discovery domain module and the Task 5 suggestion-set view, plus localization keys. Cycle state is runtime only and never persisted. No wraparound, auto-load, infinite feed, streaming, swipe behavior, randomness, or partial replacement.

#### Verification / test intent

Test that a successful request replaces the set with three unseen distinct Missions, that no previously shown Mission reappears in the cycle, that replacement becomes unavailable with fewer than three unseen records while the current set stays usable, that ending the cycle resets shown identifiers, that a failed replacement leaves the current set unchanged, and that no snapshot write occurs for any of it.

### Task 7 — Implement Mission selection into a persisted `selected` session

#### Outcome

Implement the deliberate choice that creates exactly one Mission Session in `selected` through the existing persistence adapter, persisting `sessionId`, `childProfileId`, `missionId`, `missionCategoryAtSelection`, `ageBandAtSelection`, `durationSecondsAtSelection`, `state`, and `selectedAt`, and confirming the write by exact read-back before presenting success. Widen snapshot validation to accept a `currentSession` in `selected` while keeping `snapshotVersion` at `1`. Emit only the typed handoff indicating the start experience is available. Repeated activation during the transition resolves the same session and never creates a duplicate. If a current non-completed session already exists, refuse to create a second and surface the typed conflict result without mutating the existing session.

#### Specification trace

F002 choosing a mission and transition and selection transition failure; Data and State Model Mission Session fields, snapshot sections, and invariants; Technical Architecture mission selection step and the five-step confirmed-write path; F003 lifecycle boundary.

#### Boundary

Expected areas: session domain module, persistence validation, app state, suggestion view. Inject the identifier factory and clock. Do not implement `ready`, `active`, timer, Mission Break, abandonment, completion, `startedAt`, `completedAt`, `completionPeriodId`, Reward Card, History, or Monthly Goal. Do not copy localized Mission content into the snapshot. Do not migrate the snapshot.

#### Verification / test intent

Test that a successful choice writes exactly one session with exactly the approved immutable fields and `state` `selected`, that success is presented only after confirmed read-back, that repeated activation produces one session, that write failure and read-back failure present no false success and create no session, that an existing current session blocks creation without mutation, that unrelated snapshot sections and storage keys are untouched, and that no timer, completion, History, Reward Card, or Monthly Goal effect occurs. Test that a snapshot holding a `selected` session hydrates and that F001-era snapshots with `currentSession` null remain valid.

### Task 8 — Implement F002 unavailable, error, and recovery states

#### Outcome

Implement the F002-owned states truthfully: insufficient eligible content, exhausted replacement, catalog load failure for the first set, replacement load failure, and selection transition failure. Each preserves the selected context, offers only the approved retry or return to Mission Category selection, and never shows a partial set, relaxes eligibility, substitutes content, or exposes raw technical detail.

#### Specification trace

F002 empty, unavailable, and error states; Visual & Ergonomic error and recovery presentation table and calm parent- and child-facing language; Technical Architecture defensive runtime exclusion and controlled unavailable state.

#### Boundary

Expected areas: discovery views, localization keys, stylesheet. No dead end without a truthful next action. No raw parser, storage, or exception text. No false success.

#### Verification / test intent

Test each state for the correct controlled message, the approved next action, absence of any partial or substituted suggestion, preservation of the current valid set where the specification requires it, and absence of raw technical detail in all three languages.

### Task 9 — Apply the F002 localization, accessibility, and responsive baseline

#### Outcome

Complete EN/DE/RU coverage for every F002 interface string, keep Mission content resolved from the catalog in the selected language, and apply the accessibility and responsive baseline to every implemented F002 view: semantic structure, label-led equal peer choices, logical reading and tab order, visible focus, deliberate focus movement on material context changes, comfortable touch targets, adequate contrast, reduced-motion respect, and wrapping and larger-text resilience. Required adult-involvement and safety content stays explicit, localized, and never conveyed by color or icon alone.

#### Specification trace

F002 mission card content and content and safety rules; Visual & Ergonomic mobile-first presentation, F002 category and suggestion presentation, safety and adult-involvement prominence, localization resilience, accessibility baseline, and anti-manipulation rules; Technical Architecture accessibility and responsive baseline and localization boundary.

#### Boundary

Expected areas: localization dictionaries, F002 views, stylesheet. Reuse the established F001 presentation patterns. No design system, branding pass, illustration set, or attention-capture animation.

#### Verification / test intent

Test interface-message completeness across all three languages, semantic roles and accessible names for the category group and suggestion group, association or announcement of unavailable and error states, keyboard operability, and focus placement after category change, replacement, and selection. Manually inspect narrow mobile and wider desktop layouts in EN/DE/RU with text expansion and larger text, confirming no horizontal scrolling, clipped critical copy, hover-only action, color-only state, or obscured focus.

### Task 10 — Complete automated F002 coverage

#### Outcome

Complete a focused automated suite over the implemented catalog, validation, coverage, category selection, eligibility, ordering, exactly-three derivation, bounded replacement, selection persistence, unavailable and error states, localization, and accessibility behavior. Keep clocks, identifiers, and storage adapters injectable where determinism requires it. Do not add an end-to-end framework without a demonstrated gap.

#### Specification trace

Technical Architecture unit and integration testing strategy; F002 acceptance criteria 1 to 15; Data and State Model invariants and trust decisions; Visual & Ergonomic accessibility and recovery acceptance criteria; Plan 02 scope boundary.

#### Boundary

Expected areas: test files colocated with the existing suite. Tests must protect contract boundaries rather than inflate count. No new dependency.

#### Verification / test intent

The suite must cover every F002 acceptance criterion: exactly three distinct Missions per successful discovery; category, age-band, and language correctness of every presented Mission; exactly five canonical categories; complete card content including duration and required safety or adult-involvement note; no generated or unreviewed content; successful bounded replacement with no repeats; exhausted replacement keeping the current set; the incomplete-setup gate; insufficient-content behavior with no relaxation; replacement failure retaining the current set; one `selected` session per successful choice with no automatic timer; no duplicate session on repeated activation; no History, Reward Card, or Monthly Goal effect; catalog safety, localization, and coverage rules; and absence of forbidden data collection and of social, payment, competition, or device-control behavior. Run type checking, the suite, and the production build, recording actual results.

### Task 11 — Perform manual F002 product-flow verification

#### Outcome

Exercise the built application as a family through category selection, discovery, replacement, exhaustion, unavailable and failure states, and selection into `selected`, across each supported language, each age band, and every Mission Category, at representative narrow and wide viewports.

#### Specification trace

F002 full behavior and acceptance criteria; Technical Architecture manual release checks and root-only behavior; Visual & Ergonomic F002, recovery, responsive, localization, and accessibility requirements; privacy and safety boundaries.

#### Boundary

Serve the production build. Record which browsers, viewports, and scenarios were actually checked.

#### Verification / test intent

Confirm the root-only flow, exactly three suggestions everywhere, correct localized Mission content, visible required adult-involvement and safety copy, bounded replacement and its truthful exhausted state, reload and hydration behavior for a persisted `selected` session, truthful selection-failure messaging, no child-data request, no raw technical error, and no `F003` or `F004` interface. Do not claim browser or assistive-technology coverage that did not run.

### Task 12 — Run the required ergonomic review and target only justified fixes

#### Outcome

Review every implemented F002 view and state against the approved ergonomic method: location, dominant information, primary action or legitimate peer choices, next step, error and recovery clarity, safety and adult context, mobile clarity, accessibility, EN/DE/RU resilience, and unnecessary visual noise. Implement only one to three evidence-based improvements if the review identifies them; record `no change justified` if none is needed.

#### Specification trace

Visual & Ergonomic core ergonomic rule, F002 category and suggestion presentation, ergonomic review method, and acceptance criterion 20; `AGENTS.md` implementation-quality ergonomic gate.

#### Boundary

No broad redesign, new behavior, attention-capture pattern, or design-system expansion.

#### Verification / test intent

Document the reviewed states, concrete findings, the selected zero-to-three outcomes, and why each improves comprehension or safety without altering behavior. Re-run the affected automated and manual checks.

### Task 13 — Audit implementation against owning specifications

#### Outcome

Inspect the complete implementation and dependency diff against F002 and the applicable catalog, safety, technical, data and state, localization, visual, accessibility, and recovery requirements. Identify blockers and make only targeted in-scope corrections.

#### Specification trace

All owning specifications listed above; `AGENTS.md` decisions, implementation quality, traceability, repository hygiene, and material-change rules.

#### Boundary

Expected areas: audit findings only, with targeted in-scope corrections to Plan 02 code, content, or tests where a real blocker is found. No specification, `AGENTS.md`, plan, or dependency change. Do not rewrite correct work for style.

#### Verification / test intent

Produce an evidence-backed audit confirming F002 acceptance-criteria coverage, catalog eligibility and coverage compliance, deterministic ordering and bounded replacement, one-adapter and one-snapshot behavior, truthful failure handling, data minimization, and the absence of `F003` and `F004` behavior, unreviewed content, unrelated code, secrets, and speculative dependencies. Re-run affected tests after any correction.

### Task 14 — Update the dated changelog truthfully

#### Outcome

After implementation, tests, ergonomic review, and audit are factual, update the dated changelog with only the Plan 02 changes and checks that actually occurred.

#### Specification trace

`AGENTS.md` Git and changelog discipline and honest reporting; Plan 02 authorization and completion boundaries.

#### Boundary

Expected areas: the dated changelog only. No product code, test, specification, `AGENTS.md`, or plan change.

#### Verification / test intent

Compare the entry with the actual diff and recorded results. Confirm it describes F002 only, states that `F003` and `F004` remain unimplemented, contains no shell-command diary or conversational material, and introduces no parallel status authority. Do not claim MVP completion, unsupported browser coverage, plan completion, push, PR, or merge prematurely.

### Task 15 — Run final diff, checks, and clean-commit readiness gate

#### Outcome

Review the final repository tree and diff, run every relevant check, resolve real Plan 02 blockers, and prepare focused clean commits only after the plan's completion criteria pass. Keep this plan active until completion is truthful; moving it to `plans/completed/`, pushing, opening a PR, or merging requires its applicable later authorization step.

#### Specification trace

`AGENTS.md` plan discipline, implementation quality, Git and changelog discipline, and repository hygiene; all Plan 02 scope and definition-of-complete requirements.

#### Boundary

Expected areas: verification and commit preparation only. No plan move, push, PR, or merge in this task; each requires its own later authorization.

#### Verification / test intent

Run clean install, type check, automated tests, production build, diff check, repository and status review, secret and personal-data scan, and the recorded manual checks. Confirm only necessary Plan 02 files exist, no specifications or execution contract changed, no `F003` or `F004` implementation exists, no blocker remains, and the commit diff matches the audited work.

## Git discipline

One focused branch, this plan as the sole active plan, focused commits with subjects matching their content, a staged-diff audit before each meaningful commit, and no attribution trailers or AI metadata in repository material. Push, PR, and merge require explicit authorization for the current work. The changelog records only factual completed work. This plan moves to `plans/completed/` only when its status is truthfully complete.

## Specification-change rule during implementation

If implementation exposes a missing or conflicting product, content, safety, technical, state, recovery, or interaction requirement:

1. stop the affected implementation;
2. do not invent behavior or Mission content;
3. update the owning specification first; and
4. follow the material-change revalidation rule in `AGENTS.md` before resuming affected implementation.

Ordinary implementation choices already delegated by unchanged approved specifications and this approved plan do not require specification edits. Choose the smallest reasonable option and verify it.

## Definition of Plan 02 complete

Plan 02 is complete only when all of the following are true:

- the reviewed production Mission catalog exists, passes whole-catalog validation, and every age band x Mission Category x language cell yields at least three eligible Missions;
- every catalog entry has complete meaning-equivalent EN/DE/RU content and consistent adult-involvement and safety metadata;
- the five canonical Mission Categories are presented as one equal peer group and discovery is unreachable without valid F001 setup;
- eligibility, deterministic ordering, and exactly-three derivation match their owning specifications and never relax or fill;
- bounded `Another set` progression never repeats, recycles, auto-loads, or shows a partial set, and its exhausted state is truthful;
- a successful choice creates exactly one Mission Session in `selected` with exactly the approved immutable fields, confirmed by read-back, with no duplicate on repeated activation;
- no `F003` or `F004` behavior, timer, Reward Card, History, or Monthly Goal effect exists;
- F002 unavailable, error, and recovery states remain truthful and expose no raw technical detail;
- EN/DE/RU coverage is complete and the accessibility and responsive baseline covers every implemented F002 view;
- applicable automated tests, type checking, and the production build pass;
- manual F002 product-flow verification is complete and reported accurately;
- the ergonomic review covers every implemented F002 view and state, with any justified one-to-three improvements implemented and verified;
- no unrelated code, speculative infrastructure, new dependency, secret, personal data, or known blocker remains;
- the dated changelog records only factual completed work;
- the final implementation and specification audit and full diff review pass;
- focused clean commits exist; and
- the branch is ready for an explicitly authorized push, PR, and merge workflow.

Plan 02 completion is not MissionKid MVP completion. It establishes `F002` only, and later functions require separately approved plan scope.

## Approval record

- Implementation Plan Audit: recorded in the Plan 02 planning audit.
- Blocking plan defects: `NONE`.
- Blocking implementation guessing required: `NO`.
- Owning specifications require no modification before implementation.
- The durable `SPEC COMPLETE` evidence in [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md) remains valid, and no owning specification changed during Plan 01.
- Implementation authorization is limited strictly to this Plan 02 scope: `F002` Mission Discovery and Selection. `F003`, `F004`, and all other excluded or future work remain unauthorized.
