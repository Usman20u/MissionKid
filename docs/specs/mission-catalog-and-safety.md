# Mission Catalog and Safety Specification

## Status and scope

This document defines the Mission content, age-appropriateness, and safety rules for MissionKid MVP v1. It is a content specification, not an actual Mission catalog, editorial organization, moderation system, legal policy, runtime algorithm, storage design, or UI design.

MissionKid remains parent-guided. Catalog approval establishes a controlled minimum standard but does not replace a parent's judgment about the child, current environment, supervision, accessibility needs, or whether to begin or leave a Mission.

## Core content purpose

MissionKid uses one focused transition:

```text
screen time → short guided real-life Mission → child leaves the screen and does something useful in the real world
```

A Mission qualifies for the MVP catalog only when it:

- is understandable quickly by the family;
- gives one clear real-life action and an understandable end condition;
- moves attention away from passive screen use;
- can be completed without watching or interacting with the app continuously;
- is short enough for the focused MVP interaction;
- is realistic and approved for every age band assigned to it;
- uses positive, non-punitive language;
- requires no unnecessary child or family data; and
- contributes directly to movement, creativity, helping at home, learning, or calm in real life.

Content whose main value is watching, tapping, scrolling, repeatedly checking the app, or prolonging screen engagement is not a MissionKid Mission.

## Closed Mission Categories

Every Mission belongs to exactly one canonical Mission Category. Classification follows the Mission's primary real-life action, not a secondary benefit.

| Mission Category | Content purpose |
| --- | --- |
| Movement | Encourage simple, safe, age-appropriate physical movement without competition or performance pressure. |
| Creativity | Encourage imagining, arranging, drawing, storytelling, building, or making with safe and accessible materials. |
| Helping at Home | Encourage low-risk, child-appropriate participation in ordinary family or household tasks without framing help as punishment. |
| Learning | Encourage playful real-world observing, counting, remembering, reading, reasoning, or explaining without assessment pressure. |
| Calm | Encourage a low-stimulation pause through safe noticing, gentle relaxation, sensory attention, or reflection without therapeutic claims. |

The catalog must not add, rename, merge, or substitute categories. `Monthly Goal` is not a Mission Category.

## Closed age bands

The only supported age bands are `4–6`, `7–8`, and `9–10`. Approval means the complete Mission—including its action, wording, duration, materials, environment, adult involvement, and safety guidance—is suitable across the entire assigned band.

| Content consideration | `4–6` | `7–8` | `9–10` |
| --- | --- | --- | --- |
| Reading and wording | Familiar, concrete words; content must be easy for an adult to read aloud and must not assume independent reading. | Short, direct sentences with familiar terms and limited explanation. | Concise language that may include a little more detail while remaining quickly understandable. |
| Steps and attention | One main action with very few directly connected steps and a short attention demand. | A small, clearly ordered sequence that remains easy to remember away from the screen. | A short multi-step action may be used when the sequence and end condition remain clear without returning to the app. |
| Physical coordination | Basic, low-risk movements with simple boundaries and easy stopping. | Modestly varied coordination that remains low-impact and non-competitive. | Somewhat more independent coordination may be used, but not increased height, impact, exertion, speed, or equipment risk. |
| Independence and adult help | Expect that explanation or nearby help may often be useful; state required help explicitly. | Allow greater independence only where the action and setting are clearly safe; state required help explicitly. | Allow short independent planning where safe; adult involvement remains content-specific and explicit. |
| Materials | Prefer no materials or a very small number of familiar, safe household items. | A small number of common, safe items and simple preparation may be acceptable. | Limited preparation or arrangement of common, safe items may be acceptable without purchases or dangerous tools. |
| Reasoning | Use concrete noticing, matching, naming, or imitation. | Simple counting, remembering, comparing, or explaining may be used. | Short planning, inference, explanation, or reflection may be used without becoming a test. |

These differences are content guidance, not medical, psychological, or educational claims. An age band does not prove an individual child's reading level, coordination, attention, health, independence, or ability. The parent remains responsible for the individual decision.

A Mission may be approved for multiple age bands only when the same complete content remains understandable, realistic, and safe for each band. The catalog must not broaden an age approval merely to fill a discovery set.

## Conceptual Mission content

Each controlled Mission conceptually includes:

| Content element | Requirement |
| --- | --- |
| Stable Mission identifier | One non-empty, unique, language-independent identity shared by all localizations and stable references. |
| Mission Category | Exactly one of the five canonical Mission Categories. |
| Approved age bands | One or more of `4–6`, `7–8`, or `9–10`, each approved for the complete Mission. |
| Guidance duration | One positive guidance duration representing a reasonable expected activity length. |
| Localized title | Reviewed, meaning-equivalent content for English, German, and Russian. |
| Localized instruction | Reviewed, meaning-equivalent real-world action and end condition for English, German, and Russian. |
| Deterministic catalog order | One valid finite, non-negative whole-number order value used by the technical catalog implementation. |
| Optional controlled safety metadata | Adult involvement, materials, environment, space, and localized safety guidance when relevant. |
| Content provenance | A catalog/content version or equivalent stable context indicating which controlled content and eligibility decision apply. |

These are content requirements, not database columns, API fields, storage records, or runtime filtering steps. Localized strings are never identifiers. The actual catalog and its Mission entries are a separate later deliverable.

## Titles

A Mission title must be:

- short enough to scan as part of a bounded three-choice set;
- positive, concrete, and specific to the real-world action;
- understandable to a child and parent in the approved age context;
- meaning-equivalent in English, German, and Russian; and
- free from competitive, punitive, or manipulative framing.

A title must not use shame, fear, punishment, scarcity, streaks, winning against other children, social comparison, money, or prize promises to motivate selection.

## Instructions and end conditions

A Mission instruction must:

- tell the family exactly what real-world action to do;
- provide a clear, observable end condition without demanding proof;
- remain concise and avoid unnecessary multi-step complexity;
- be understandable without continuous access to the screen;
- use wording appropriate to every approved age band;
- state required adult help and safety conditions explicitly;
- avoid ambiguous wording that could reasonably invite a dangerous interpretation; and
- preserve the same action, difficulty, tone, and safety meaning in English, German, and Russian.

Instructions must not request a photo, video, audio recording, location, wearable signal, public post, or other completion evidence. They must not introduce social sharing or external completion verification.

## Mission Experience Principles

Catalog eligibility establishes that a Mission is safe, complete, and age-suitable. These principles establish whether it is worth choosing. A Mission that is technically eligible but reads as a cautious exercise, a disguised chore, a school test, adult reflection language rewritten for a child, or an activity whose final instruction immediately undoes what the child produced does not meet the intended content quality.

Every production Mission should satisfy these principles unless a documented safety, materials, environment, accessibility, or age-suitability reason justifies an exception. That justification is recorded with the content review rather than left implicit.

These are content-quality rules for human review. They introduce no schema field, no runtime behavior, no engagement mechanic, no product feature, and no Mission entry, and they set no catalog total.

### Role or purpose

The child should understand why the Mission is worth doing. A Mission may give a simple role such as explorer, helper, builder, detective, listener, creator, or caretaker.

A role exists to give purpose, not to create narrative complexity. A mascot, story world, recurring character, or fantasy framing must not be required for a Mission to work, and a role must never make an excluded or unsafe action attractive.

### Concrete real-world action

A Mission must result in real physical, creative, observational, helping, learning, or calming activity away from passive screen use. Where a concrete physical action expresses the same developmental value as an abstract instruction, prefer the concrete action.

### Satisfying final beat

The final instruction should normally be the most satisfying moment of the Mission, such as revealing, showing, noticing, completing, telling, comparing, admiring, delivering, discovering, using, or sharing safely within the family.

Immediate cleanup, dismantling, or undoing what the child produced must not be the emotional payoff. Where returning materials or tidying is appropriate, it follows the satisfying completion beat and must not erase the sense of achievement. This does not weaken the requirement for a clear observable end condition; it governs which moment that end condition lands on.

### A meaningful outcome

Where naturally applicable, a Mission should leave something behind: an arrangement, a drawing, a discovery, a solved grouping, a built object, a helpful result, an observation, a story, a cared-for space or object, a remembered fact, or a shared moment.

This does not require permanent physical output, a keepsake, or a collection for every Mission, and it never introduces completion evidence.

### One hero object or focal action

Each Mission should have one clear focus a reviewer can name, such as a cup, a tower, a pair of shoes, a sheet of paper, a pillow, a basket, footprints, a shelf, a table, or a sound source.

A single focus keeps the instruction concrete, supports child comprehension, and gives presentation work an unambiguous subject.

This is a human-reviewed content and presentation handoff. It introduces no machine-readable hero-object field, no catalog schema change, and no persisted value. If a future approved requirement genuinely needs machine-readable presentation metadata, the owning technical specifications introduce it rather than this section.

### Observable completion

Wherever natural, the child should be able to tell that the Mission is finished from a simple observable condition, such as finding three things, building five, matching every pair, completing one route, telling one short story, or placing one item at each setting.

Counting must not be forced where it harms the activity, and an observable condition must never become a performance target, score, or comparison.

### Titles that promise an activity

A title should read as an activity or event rather than a worksheet heading. Prefer an action, a discovery, a role, a transformation, or a challenge the child sets against the task itself rather than against another child.

Test framing such as testing yourself, proving, scoring, correct-and-incorrect labelling, or performance ranking must not be used. This adds to the existing title rules and relaxes none of them; competitive, punitive, scarcity, streak, and prize framing remain excluded.

### Category experience quality

These expectations apply in addition to the category safety boundaries defined below, which always take precedence.

| Mission Category | Intended experience quality |
| --- | --- |
| Movement | The category should primarily feel physically active. Safety must not turn it into a set of mostly slow or still exercises; slowness belongs where it is the actual Mission mechanic, not as a default tone. |
| Creativity | The Mission should produce imagining, construction, drawing, storytelling, or transformation, and should normally reach a visible or expressive final beat. |
| Helping at Home | The Mission should create agency, responsibility, care, and contribution. It must not read as a chore renamed with friendlier wording; prefer a clear role, purpose, recipient, or result over generic tidying. |
| Learning | The Mission should feel like discovery, investigation, experimentation, pattern-finding, or curiosity. Worksheet and test language does not belong, and ordinary mistakes or forgetting must not read as failure. |
| Calm | Calm should usually emerge from a concrete sensory or physical task rather than from an instruction to be calm. Adult mindfulness language rewritten for children does not belong; the experience stays warm, grounded, and age-appropriate. |

### Age-band voice

The approved age bands remain `4–6`, `7–8`, and `9–10`. A Mission may support several bands, but review must consider whether the actual wording and action genuinely fit every approved band rather than only whether the action is safe for each.

Content for `4–6` should be especially concrete, short, physical, immediately understandable, and low in abstraction. One wording must not be assumed equally suitable for `4–6` and `9–10` merely because the action is safe for both. Where one wording cannot serve every approved band, the correct outcome is a narrower age approval or separate reviewed content, never a broadened approval.

### Safety precedence

These experience principles never override the child-safety exclusions, adult-involvement requirements, privacy rules, materials and environment rules, localization requirements, global neutrality, the absence of any purchase requirement, the exclusion of stranger contact and identifying data, or the reward and engagement safety rules.

A Mission that is more exciting but less safe is worse, not better. Where an experience principle and a safety rule conflict, the safety rule applies and the Mission is either written to satisfy it or excluded.

## Guidance duration

Duration is calm planning guidance, not a performance target, score, deadline, or claim about how fast a child should work.

- It must be a positive duration that reasonably reflects the complete real-life action.
- It must remain consistent with the short MissionKid MVP concept.
- It may vary by Mission according to the action rather than a scoring formula.
- It must not imply failure, lost progress, or reduced recognition when a child finishes earlier or later.
- It must not encourage rushing, particularly during movement or household participation.

The existing product specifications intentionally define no universal minimum or maximum duration. This content specification does not invent one. Duration approval is based on whether the Mission remains short, realistic, and safe for its complete context.

## Core child-safety exclusions

A Mission is ineligible if it requires, encourages, rewards, or can reasonably be read as encouraging:

- dangerous heights or climbing furniture, balconies, windows, railings, roofs, trees, or unstable structures;
- intentional falling, impact, collision, unsafe jumping, or high-impact activity;
- roads or traffic exposure without appropriate adult control, or leaving the home or safe area without appropriate adult involvement;
- unsupervised water activity or activity involving a meaningful drowning, scalding, or slipping risk;
- fire, flames, matches, lighters, fireworks, steam, hot liquids, or hot surfaces;
- knives, sharp tools, power tools, dangerous household equipment, or unsafe cleaning tools;
- chemicals, cleaning agents, medicines, unknown substances, or experiments involving ingestion or skin exposure;
- electrical outlets, plugs or exposed wiring, device disassembly, or appliance operation that is unsafe for the age context;
- choking or ingestion challenges, breath-holding contests, forced or extreme breathing, or putting unknown objects or substances in the mouth;
- extreme physical exertion, pain tolerance, unsafe lifting, ignoring fatigue, or continuing through discomfort;
- interaction with unknown or unsafe animals;
- contact with strangers or unsupervised travel;
- sharing personal information, credentials, media, location, or private family information;
- spending money, purchases, gambling, chance-based rewards, or paid competition;
- dieting, weight-loss behavior, body shaming, humiliation, punishment, or fear-based compliance; or
- keeping secrets from a parent or caregiver.

This is a practical minimum exclusion list for MissionKid, not an exhaustive hazard manual. If a reasonable safety concern cannot be resolved with short, clear content and appropriate adult involvement, the Mission is ineligible.

## Adult involvement and visible safety guidance

The catalog uses only the minimum adult-involvement distinction needed for clear content:

| Adult-involvement level | Meaning |
| --- | --- |
| No special adult assistance required | The Mission has no Mission-specific adult assistance requirement. This does not replace ordinary parental judgment or supervision. |
| Adult nearby required | An adult must remain nearby and available because the Mission's age context, materials, environment, or action requires immediate availability, but direct participation is not required. |
| Adult participation required | An adult must directly participate in or supervise the action for the Mission to be eligible. |

The least restrictive level must never be chosen merely to increase catalog eligibility. Required adult involvement must be explicit in the localized Mission content and must never rely on hidden metadata alone. The metadata, instruction, and safety note must agree.

Exact presentation timing and placement are owned by the relevant interaction and later Visual/Ergonomic specifications.

This specification introduces no permission workflow, account approval, or supervision-verification mechanism.

## Materials and environment

Missions should need no materials or only ordinary, safe household items. Any required material must be:

- common and inexpensive where possible;
- safe for every approved age band when used as instructed;
- described generically without brand dependency;
- available without a required purchase; and
- unrelated to collecting personal or family data.

Missions must not depend on dangerous substances or tools, breakable items where breakage creates risk, expensive equipment, or specialized facilities. A material that is safe only with adult handling requires explicit adult participation; if the remaining action is not child-appropriate, the Mission is ineligible.

Environment requirements must be explicit and realistic. A Mission must not silently assume outdoor access, a large home, a private garden, favorable weather, a particular household structure, or ample empty space. Movement and materials must fit a reasonably small safe area where possible. Content must remain globally suitable and avoid unnecessary cultural, geographic, climatic, economic, and housing assumptions.

## Mission Category safety and scope

### Movement

Movement Missions must use simple, age-appropriate, low-risk movement; work in a reasonably small safe space where possible; allow stopping at any time; and avoid high-impact, extreme, competitive, or speed-focused actions and equipment that creates unnecessary injury risk. Fatigue or pain must never be framed as something to overcome.

MissionKid does not assess fitness, health, mobility, or medical readiness. Movement content must not introduce medical screening or claim suitability for an individual child.

### Creativity

Creativity Missions may involve drawing, arranging, building, imagining, storytelling, or simple making. They must favor safe, common materials; avoid dangerous craft tools; avoid perfection or artistic-quality pressure; recognize participation rather than comparative quality; and never require posting or sharing the result.

### Helping at Home

Helping at Home Missions must focus on safe, child-appropriate participation rather than punishment or adult responsibility. Acceptable task classes may include tidying toys, organizing safe objects, placing non-breakable items, or simple sorting; these are boundaries, not catalog entries.

These Missions must not involve a stove or oven, hot liquids, knives or sharp tools, chemicals or cleaning agents, heavy objects, dangerous appliances, high shelves, unstable reaching, or unsafe cleaning equipment.

### Learning

Learning Missions may encourage short real-world observing, counting, remembering, reading, reasoning, or explaining. They must remain playful and low-pressure and must not present themselves as formal assessment, diagnose ability, assign grades, compare children publicly, shame incorrect answers, or require external account creation or web browsing.

### Calm

Calm Missions may support quiet noticing, gentle relaxation, safe sensory attention, or calm reflection. They must use neutral language and must not claim to treat anxiety, ADHD, trauma, sleep disorders, or any other medical or psychological condition; give treatment advice; pressure a child to suppress emotion; or require breath holding, forced breathing, hyperventilation, or extreme breathing exercises.

## Privacy in Mission content

No Mission may ask the child or family to provide or reveal:

- a full name, exact birth date, address, school, class, contact details, or precise location;
- a photo, video, audio recording, biometric signal, or other completion proof;
- account credentials, device identifiers, or payment information;
- personal secrets or private family information; or
- identifying or sensitive information about another child or person.

Mission completion remains parent-guided and self-reported. Mission content must not create an account, profile, survey, upload, tracking, or public-sharing requirement.

## Reward and engagement safety

Mission titles, instructions, and safety content must not promise or imply money, purchases, guaranteed physical prizes, random prizes, loot boxes, paid competition, public ranking, or child entitlement to a reward.

Mission content must not use streak-loss threats, countdown pressure, shame for skipping or stopping, fear of losing progress, scarcity, social pressure such as “everyone else is doing this,” or any infinite engagement mechanic. It must not ask the child to return repeatedly to the app during the real-life activity.

Reward Card recognition remains positive and non-comparative. Any optional real-life reward associated with Monthly Goal remains controlled and approved by the parent; Mission content neither chooses nor promises it.

## Localization safety

Every catalog-eligible Mission has reviewed English, German, and Russian content. Across all three versions:

- the real-world action and end condition are the same;
- the safety meaning and visible warning are not weakened or omitted;
- the adult-involvement requirement is the same;
- the difficulty and expected activity scope are substantially equivalent;
- the tone remains positive, non-punitive, and age-appropriate; and
- cultural adaptation does not introduce purchases, unsafe assumptions, or identifying-data requests.

Literal translation is not required, but meaning equivalence is. A translation must not silently fill missing Mission content from another language, and translated titles or instructions must not become identifiers.

## Catalog eligibility

A Mission is eligible for the controlled catalog only when all of the following are true:

1. Its stable language-independent identifier is present and unique.
2. It has exactly one valid Mission Category.
3. It has at least one approved supported age band, and the complete content is suitable across every assigned band.
4. Its guidance duration is valid, positive, realistic, and non-punitive.
5. Its English, German, and Russian titles and instructions are complete and meaning-equivalent.
6. Every applicable safety note and condition is complete in all three languages.
7. Adult-involvement metadata, visible content, materials, environment, and age approvals are internally consistent.
8. Its deterministic catalog order and content provenance are valid.
9. It passes every applicable content, global-suitability, privacy, engagement, and child-safety rule in this specification.

An invalid, incomplete, ambiguous, unreviewed, or safety-ineligible Mission must not appear in discovery. Eligibility is an approval outcome; this specification does not define editorial staffing, review queues, a CMS, or a moderation workflow. Technical validation, filtering, ordering, and unavailable-state behavior remain owned by the Technical Architecture and Mission Discovery specifications.

## Existing-session safety

Removing a Mission from future discovery must not substitute or rewrite the Mission attached to an existing Mission Session. A stable reference may continue to resolve retained content only while that content remains complete, reviewed, and safe for the existing flow. If safety approval is withdrawn, an unfinished Mission must not resume as though it were still approved. A completed History record must remain associated with the Mission that was actually completed and must never be rewritten as another Mission.

Runtime recovery, presentation fallback, and persisted-session mechanics remain defined by the Technical Architecture and Data and State Model.

## Catalog coverage

Every supported age-band × Mission Category context must eventually contain at least three approved Missions with complete English, German, and Russian content so the initial exactly-three discovery requirement can be satisfied without relaxing eligibility.

Catalog planning should provide further eligible Missions in complete groups where bounded **Another set** is intended to be useful. A partial group, repeated content, or unsafe filler is not acceptable, and an infinite supply is not required. This specification sets no total catalog size beyond the existing initial exactly-three requirement. Actual quantities beyond that minimum and all actual Mission entries belong to later catalog work.

## Acceptance criteria

1. Every approved Mission supports the screen-to-real-life transition, has one clear action and end condition, and requires no continuous app interaction.
2. Every Mission uses exactly one of Movement, Creativity, Helping at Home, Learning, or Calm according to its primary action; no additional category is accepted.
3. Every assigned age band is exactly `4–6`, `7–8`, or `9–10`, and the complete Mission is suitable across the entire band without diagnostic assumptions.
4. Every eligible Mission has a unique stable identifier, one category, approved age bands, valid guidance duration, complete English/German/Russian content, valid catalog order, applicable safety information, and stable content provenance.
5. Every title is short, concrete, positive, meaning-equivalent across all three languages, and free from competitive, punitive, prize, scarcity, or streak framing.
6. Every instruction states the real-world action and end condition concisely, works away from the screen, exposes required adult help, and admits no reasonably dangerous interpretation.
7. Guidance duration is realistic, calm, and non-punitive and does not imply failure or encourage rushing when the actual activity is shorter or longer.
8. Content containing any prohibited physical, household, travel, stranger, ingestion, exertion, body-image, fear, secret-keeping, data, purchase, gambling, or engagement condition is ineligible.
9. Any Mission requiring an adult nearby or direct adult participation states that requirement explicitly in its localized Mission content and never relies on hidden metadata alone; exact presentation timing and placement remain owned by the relevant interaction and later Visual/Ergonomic specifications.
10. Required materials and environment are safe, common, purchase-free, globally realistic, and suitable for every approved age band.
11. Each Mission meets the category-specific Movement, Creativity, Helping at Home, Learning, or Calm safety boundaries.
12. No Mission requests child identity data, personal secrets, precise location, media, credentials, payment information, or completion proof.
13. No Mission promises or assigns a reward, uses manipulative engagement, creates competition, or pressures the child to remain in the app.
14. English, German, and Russian versions preserve the same action, safety meaning, adult involvement, difficulty, and positive tone without using localized strings as identity.
15. Any Mission failing one eligibility condition is excluded rather than repaired with guessed content or relaxed safety, age, category, or localization rules.
16. Every supported age-band × Mission Category context contains at least three eligible Missions before that context can satisfy initial discovery.
17. Removing or safety-withdrawing content never substitutes a different Mission into an existing session or rewrites completed History, and a safety-withdrawn unfinished Mission cannot resume as approved content.
18. The specification introduces no actual Mission entry, runtime filtering algorithm, storage change, product feature, or implementation claim.
19. Every production Mission has an understandable purpose or role, one concrete real-world action, and a final beat that lands on completion rather than on undoing what the child produced; any exception records its documented safety, materials, environment, accessibility, or age-suitability reason.
20. Every production Mission has one nameable hero object or focal action and, where natural, a simple observable completion condition, without introducing a catalog schema field, machine-readable presentation metadata, forced counting that harms the activity, or completion evidence.
21. Titles read as activities rather than worksheet headings, each Mission Category meets its intended experience quality alongside its safety boundary, `4–6` wording is concrete and low in abstraction, and no experience principle weakens a safety, privacy, adult-involvement, localization, or engagement rule.

## Explicit non-goals

This specification does not introduce or define:

- the actual MVP Mission catalog or example Mission entries;
- runtime AI-generated or AI-rewritten Missions;
- a machine-readable hero-object, focal-action, scene, or other presentation field on Mission content;
- community-created Missions, child-generated public content, or a public Mission marketplace;
- social voting, ratings, sharing, public profiles, or public leaderboards;
- school or classroom content systems;
- medical, diagnostic, or therapeutic Missions;
- paid Mission packs, purchases, advertising, or behavioral-profile recommendations;
- a content CMS, editorial organization, remote moderation platform, or legal/compliance policy;
- runtime catalog filtering, deterministic grouping, storage, database, API, or deployment implementation; or
- detailed screen layout, visual design, or ergonomic presentation.

## Source-of-truth boundaries

- The Global Product Specification owns MissionKid's product purpose, MVP boundaries, and product-level safety commitments.
- The feature specifications own setup, discovery, Mission Session, timer, completion, Reward Card, History, and Monthly Goal interaction behavior.
- The Technical Architecture owns bundled-catalog delivery and runtime validation, filtering, ordering, recovery, and exactly-three implementation.
- The Data and State Model owns conceptual Mission and Mission Session data, persistence representation, relationships, and invariants.
- This Mission Catalog and Safety Specification owns Mission content eligibility, content-writing rules, age-appropriateness, adult-involvement meaning, materials/environment boundaries, localization safety, and category-specific content safety.
- Later Visual and Ergonomic specifications own detailed presentation and interaction design.
- Actual Mission entries are a separate later content deliverable and are not created here.
