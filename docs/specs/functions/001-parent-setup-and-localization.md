# Parent Setup and Localization Specification

## Status and scope

This document defines the MVP v1 behavior for parent-guided setup, age context, and interface localization. It specifies product behavior only; it does not define screens, database tables, storage technology, accounts, or implementation architecture.

## Purpose

Parent setup establishes the minimum family and child context MissionKid needs to present understandable, age-appropriate missions. The setup is intentionally brief and private so the family can move quickly from the screen to a real-life activity.

## MVP setup inputs

The only required setup choices are:

- **UI language:** English, German, or Russian. English is selected by default.
- **Child age context:** one of these inclusive age bands:
  - **4–6**
  - **7–8**
  - **9–10**

The age band is the minimal Child Profile context used for mission suitability. A Child Profile is not a child account.

MissionKid must not request or require:

- a full child name or other identifying name;
- an exact birth date;
- an address or precise location;
- a school or class;
- an email address or other contact details;
- a photo or video;
- login credentials; or
- other unnecessary sensitive or identifying child data.

Accounts, authentication, named or public child profiles, and multiple-profile management are outside this MVP setup.

## First-use introduction

Before the setup choices, a first-time visitor reaches one brief parent introduction. Its purpose is to let a parent understand what MissionKid is for and decide whether it suits their family, before being asked for anything.

The introduction explains, in the resolved UI language:

- what MissionKid is for — turning the end of screen time into a short real-life activity;
- what a Mission looks like, through exactly one non-selectable example;
- what the family will do, as a short account of the flow from Mission Category selection to marking a Mission done; and
- that setup is brief, needs no account, and asks for no identifying child data.

It offers exactly one forward action, which continues to the setup choices. That action opens parent setup; it does not start, select, or prepare a Mission.

The introduction is not a step the family can fail and records no choice about the child. **Reaching, reading, or leaving the introduction performs no durable write of any kind.** It creates no Mission Session, Reward Card, Mission History entry, or Monthly Goal increment; it stores no language, age context, Child Profile, or acknowledgement that it was seen; and it leaves any existing stored context exactly as it found it.

This constrains writing, not reading. Deciding whether the introduction is eligible at all requires reading and validating the stored context exactly as every other arrival does. That read is the existing hydration path, it is unchanged, and it is precisely what preserves the returning-session, current-result, recovery and temporary-mode precedence set out below. A specification that forbade it would make the eligibility rules unenforceable.

### The example Mission

The introduction may show one Mission from the controlled predefined mission catalog as an illustration of what a Mission looks like. That example:

- is presented as an example and is not selectable;
- is informational only: viewing it selects no Mission, creates no Mission Session, and starts no discovery;
- is not a mission suggestion and does not replace or pre-empt Mission Category selection;
- must not be preselected, promoted, pinned, reordered, or given any preference in later discovery. After setup, it is an ordinary catalog Mission with no memory of having been the example, and the deterministic eligibility and ordering rules in [F002](002-mission-discovery-and-selection.md) apply to it unchanged;
- must already be approved for every supported age band, so showing it infers no age context and decides no eligibility question; and
- uses its reviewed localized content unchanged, including any required adult-involvement wording and safety guidance, which remains visible exactly as it would be before a selection.

MissionKid must not invent example content, rewrite or shorten reviewed content for the introduction, or show an example whose age approval is narrower than the supported bands. A Mission's age approval must never be broadened so that it can serve as the example; the introduction selects only from Missions the catalog already approves for every band, under the rules owned by [Mission Catalog and Safety](../mission-catalog-and-safety.md).

If no Mission is approved for every supported age band, or its content is incomplete in the resolved language, the introduction shows no example rather than relaxing this rule. The rest of the introduction remains valid and its forward action still continues to setup.

### Language on the introduction

The introduction resolves the UI language exactly as the rest of setup does: English by default, with German and Russian equally available. The supported language choice is offered on the introduction itself, so a parent who does not read English is not required to pass through an English screen before reaching it. The same choice remains available in the setup step, and choosing a language on the introduction is the same `F001` language choice with no other effect.

Before setup is confirmed, that choice behaves as follows:

- it applies immediately to the interface, including the example Mission's reviewed localized content;
- it is **not** written anywhere, because nothing on the introduction is written;
- it carries forward into the setup step within the same visit, where it appears as the current selection rather than being asked for again; and
- it becomes durable only through the confirmed setup save, together with the age band. If the parent leaves before confirming setup, nothing was stored, and the next first use resolves to English again, which is the default rather than a lost setting.

This adds no second language mechanism. The confirmed setup save remains the only thing that makes a language durable, and English remains the default and the only fallback.

### When the introduction is shown

The introduction is eligible in exactly one case and in no other. Existing durable-state precedence is unchanged: nothing below reorders it, and the introduction never outranks anything the family is actually in.

Three different conditions are easily confused, so they are named separately here and the word *unavailable* is not used for more than one of them:

- **No stored context** — browser-local storage works and holds no MissionKid context, whether because this is a genuine first visit or because a previously stored context no longer exists. This is the *Setup context unavailable on a later visit* error state below.
- **Unreadable stored context** — a stored context exists but cannot be trusted: structurally invalid data, or a snapshot version with no valid migration. This is a recovery condition.
- **Unusable storage** — the browser-local storage mechanism itself cannot be read or written, so no conclusion about prior context is possible at all. This is the temporary-mode condition.

| Resolved context on arrival | What the family reaches | Introduction |
| --- | --- | --- |
| **No stored context** — storage works and holds nothing, on a first visit or after a previously stored context ceased to exist | The introduction | **Shown** |
| **Valid setup, nothing in progress** | Mission Category Selection or the setup handoff, as today | Not shown |
| **Incomplete setup** — stored context valid but no valid age band | The age-context step under *Incomplete setup* | Not shown |
| **Current Mission Session `selected`** | That Mission's start experience | Not shown |
| **Current Mission Session `ready`** | That Mission's start experience | Not shown |
| **Current Mission Session `active`** | The running Mission | Not shown |
| **Current completed-result pointer** | That Reward Card | Not shown |
| **Unreadable stored context** — structurally invalid data or an unsupported snapshot version | The approved recovery surface, with its reset choice | Not shown |
| **Unusable storage** — the storage mechanism cannot be read or written | The approved temporary-mode surface, with its warning | Not shown |

Two of these are deliberate and are recorded as such:

- **Recovery is not an introduction.** A parent being told their stored data cannot be read must be given that fact and the approved recovery choice, not an introduction to the product.
- **Temporary mode is not an introduction.** When storage is unusable, a first visit and a returning one cannot be distinguished at all, and the warning that nothing will be durable is the information the parent needs first. A genuinely new visitor with blocked storage therefore reaches temporary mode without an introduction.

The table describes arrival cases; it is not a precedence algorithm. Each row names a context MissionKid resolves on arrival and the surface that context already reaches, and nothing in it reorders anything. Where two of these conditions coexist, the existing precedence stated elsewhere in this specification decides, unchanged: in particular an incomplete age context reaches the age-context step under *Incomplete setup* even when a current Mission Session or a current completed-result pointer also exists, and that stored session, those completed records and that pointer are left untouched.

A parent who has continued to the setup choices is not returned to the introduction by MissionKid. Nothing has been recorded yet, so a later visit in the same context legitimately begins at the introduction again; that is the no-stored-context row, not a repeat.

## First-use setup

1. On first use, MissionKid uses English unless the parent selects German or Russian.
2. The parent selects exactly one age band: 4–6, 7–8, or 9–10.
3. Setup is complete only when the UI language resolves to a supported language and one valid age band is selected.
4. Completing setup makes the selected language and age context available to the rest of the local family experience and continues to Mission Category selection.
5. On a later visit in the same local product context, a valid completed setup remains in effect and does not need to be repeated.

The setup must make clear that the parent remains responsible for deciding whether a suggested mission is suitable for the child and current environment.

## Incomplete setup

- A missing language choice does not block setup because English is the default.
- A missing or invalid age band keeps setup incomplete.
- Mission discovery cannot begin while setup is incomplete. MissionKid returns the family to the missing age-context step and retains any other valid setup choice.
- No Mission Session, Reward Card, Mission History entry, or Monthly Goal increment is created by starting or completing setup.

## Changing setup later

### Changing the UI language

- The parent can change the UI language later to English, German, or Russian.
- The new language applies to subsequent interface text and mission content as soon as the change is confirmed.
- Changing language does not change the selected age band, chosen Mission Category, active Mission Session state, completed Mission History, or Monthly Goal progress.
- A currently displayed mission must retain the same meaning, age suitability, duration, and safety guidance when shown in another supported language.

### Changing the age context

- The parent can change the age context later to any of the three supported age bands.
- The new age band affects future mission suggestions and is used for the next mission-discovery request.
- A Mission Session already in `selected` remains attached to the same Mission as it proceeds to `ready` or is abandoned.
- A Mission Session already in `ready` remains unchanged until it is started or abandoned.
- A Mission Session already in `active` remains unchanged until it is completed or abandoned.
- An already completed Mission Session, its Mission History entry, its Reward Card, and its Monthly Goal effects remain unchanged.
- Changing the age band must not silently replace or mutate the Mission attached to an existing Mission Session and must not cancel a Mission Session automatically.
- The changed age band does not replace parental judgment about the suitability of a mission.

## Effect on mission suitability

- Mission discovery uses the selected age band together with the selected Mission Category and UI language.
- A Mission is eligible only when the controlled predefined mission catalog explicitly marks it as suitable for the selected age band.
- Eligible mission content must have a reviewed title and short instruction in the selected UI language, with any safety guidance preserved.
- A language change changes presentation, not the Mission's identity, Mission Category, expected duration, age suitability, or safety meaning.
- Setup never enables uncontrolled AI-generated missions or uses sensitive child data to personalize suggestions.

## Localization rules

- All MVP interface text and mission content must be available in English, German, and Russian.
- English is the fallback when there is no valid supported language choice.
- Localization must preserve the intent, age appropriateness, and safety meaning of the English source content; literal translation is not required.
- Localized content must remain globally suitable and must not introduce country-specific assumptions, purchases, unsafe actions, or identifying-data requests.
- A mission with missing or unusable content in the selected language is not eligible for suggestion. MissionKid must not silently combine languages within that mission's title, instruction, or safety guidance.

## Error and edge states

- **Unsupported or unreadable language value:** use English and allow the parent to select any supported language.
- **Missing, unreadable, or out-of-range age value:** treat setup as incomplete, require a valid age-band selection, and do not continue to mission discovery.
- **Setup context unavailable on a later visit:** where storage works and holds no MissionKid context, treat the visit as first use — the *No stored context* row of the introduction's eligibility table — default to English and request an age band without claiming that prior context was recovered. An unreadable stored context and an unusable storage mechanism are different conditions and are not treated as first use.
- **Age context changed while a Mission Session is `ready` or `active`:** keep the existing Mission Session and its attached Mission unchanged without automatic cancellation; a `ready` session remains until it is started or abandoned, an `active` session remains until it is completed or abandoned, and the new band applies to future discovery.
- **Localized mission content unavailable:** exclude that Mission from suggestions in the selected language; the mission-discovery unavailable state applies if exactly three eligible Missions cannot be presented.

Error handling must use calm, clear language, preserve valid choices where possible, and never ask for more child data as a workaround.

## Acceptance criteria

1. Given a first-use context, when setup begins, then English is the selected default and German and Russian are also available.
2. The only selectable age bands are the inclusive ranges 4–6, 7–8, and 9–10, and exactly one can be active.
3. Given no valid age band, when the family tries to continue, then mission discovery does not begin and the missing age choice is clearly identified.
4. Given a supported language and a valid age band, when the parent completes setup, then MissionKid continues to Mission Category selection with both choices in effect.
5. Given a completed setup in the same available local product context, when the family returns, then the valid language and age band remain in effect without repeating setup.
6. Given a completed setup, when the parent changes language, then subsequent interface and mission content use the new supported language without altering mission records or Monthly Goal progress.
7. Given an existing Mission Session in `ready` or `active`, when the parent changes the age band, then a `ready` session remains unchanged until it is started or abandoned, an `active` session remains unchanged until it is completed or abandoned, the attached Mission is not modified, and the next discovery request uses the new band.
8. Given an unsupported language value, when MissionKid resolves the setup, then it uses English and exposes only English, German, and Russian as choices.
9. Given a missing or invalid age value, when MissionKid resolves the setup, then it requires a new selection from 4–6, 7–8, or 9–10 before discovery.
10. Given a selected language and age band, every suggested Mission is explicitly approved for that band and has complete reviewed content in that language with equivalent safety meaning.
11. Setup can be completed without entering a child's name, birth date, address, school, email, contact details, credentials, photo, video, or other sensitive or identifying data.
12. Completing or editing setup does not itself create a Mission Session, Reward Card, Mission History entry, or Monthly Goal increment.
13. Given working storage that holds no MissionKid context, when MissionKid opens, then the parent introduction is shown in the resolved UI language and offers exactly one forward action into the setup choices.
14. Given a valid completed setup in the same available local product context, when the family returns, then the introduction is not shown and the family continues to its current Mission Session, its current completed result, or Mission Category selection.
15. Given the introduction shows an example Mission, then that example is not selectable, is already approved for every supported age band, presents its reviewed localized content unchanged including any required adult-involvement wording and safety guidance, and creates no Mission Session, discovery result, Reward Card, Mission History entry, or Monthly Goal effect.
16. Given the introduction, when the parent selects a supported language there, then the interface and the example Mission's content use that language, the setup step carries the same choice forward within the visit, nothing is written until setup is confirmed, and English remains the default and the only fallback.
17. Given any arrival context, the introduction is shown when and only when storage works and holds no MissionKid context; a valid setup, an incomplete setup, a `selected`, `ready`, or `active` Mission Session, a current completed-result pointer, an unreadable stored context, and an unusable storage mechanism each reach their own approved surface instead, with existing durable-state precedence unchanged.
18. Given the introduction, when it is reached, read, or left, then no durable write of any kind occurs and no stored context is modified, while the ordinary hydration read and validation that decide eligibility run unchanged; and the example Mission is neither selected nor given any preference in later discovery.

## MVP boundaries

This feature introduces no database model, account system, authentication, analytics profile, payment, social behavior, child media, AI mission generation, device blocking, or native mobile capability. The setup remains parent-guided and private within the local family context.
