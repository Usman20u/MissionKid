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
- **Setup context unavailable on a later visit:** treat the visit as first use; default to English and request an age band without claiming that prior context was recovered.
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

## MVP boundaries

This feature introduces no product code, UI design, database model, account system, authentication, analytics profile, payment, social behavior, child media, AI mission generation, device blocking, or native mobile capability. The setup remains parent-guided and private within the local family context.
