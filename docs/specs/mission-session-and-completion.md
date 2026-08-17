# Mission Session and Completion Specification

## Status and scope

This document defines the planned MissionKid MVP v1 behavior from choosing one Mission through recording its completion. It is a product behavior specification only. It does not define UI implementation, runtime architecture, persistence technology, device controls, or database tables.

The flow is parent-guided and serves families with children aged 4–10. A Mission comes from the controlled predefined mission catalog and has already been filtered for the selected age band (`4–6`, `7–8`, or `9–10`), Mission Category, language, and safety suitability before its Mission Session begins.

## Purpose

A Mission Session should make it easy for a child to understand one chosen Mission, leave the screen to do it in real life, and return to record one deliberate completion. The timer provides calm guidance; it does not judge performance or enforce screen use.

## Mission Session lifecycle

The complete MVP lifecycle is:

```text
selected → ready → active → completed
```

The states mean:

- **selected:** The family has chosen one of the three suggested Missions, and one Mission Session represents that choice. The timer has not started and the Mission cannot yet count as complete.
- **ready:** The mission start screen is available with the information needed to decide whether to begin. Entering `ready` follows selection without another family decision. The timer has not started.
- **active:** A deliberate start action has begun the Mission Session and its countdown. The child can leave the screen, perform the Mission in real life, return, and mark it done.
- **completed:** One deliberate completion action has been accepted for this Mission Session. Completion is terminal for that session and produces its completion effects exactly once.

The MVP has no pause, failed, expired, or overtime lifecycle state. Reaching zero does not complete or expire a Mission Session. Cancellation and abandonment end the current flow without moving the session to `completed`; they are non-completion outcomes rather than additional lifecycle states.

Only one current, not-completed Mission Session may be in the family’s selected Child Profile context at a time. If the family attempts to begin another Mission while one is active, MissionKid must offer a clear choice to return to the current Mission or deliberately abandon it before selecting another.

## Ready state and mission start screen

The start screen must make the following clear without requiring extra navigation:

- the family is viewing a Mission that is ready to start;
- the localized Mission title and short instruction;
- its Mission Category;
- its approximate expected duration;
- any short, necessary safety guidance;
- that the Mission happens away from the screen and the family can return when it is done.

The single primary action is **Start mission**. It moves the Mission Session from `ready` to `active` and starts the countdown once. A less prominent action may return to mission choices without starting; using it ends this current selection without completion.

The parent remains responsible for deciding whether the Mission is appropriate for the child, current setting, available supervision, and any relevant accessibility needs. MissionKid must not imply that catalog suitability replaces parental judgment.

## Mission Break

**Mission Break** is the guided transition from passive screen use toward performing the selected real-life Mission away from the screen. It is a brief part of the ready-to-active experience, not a separate activity, reward, or lifecycle state.

Suggested transition wording is:

> Time for a mission.

Supporting wording may say:

> Start when you’re ready, then leave the screen and do your mission in real life. Come back when you’re done.

Equivalent wording must be localized into English, German, and Russian while preserving the positive, non-punitive meaning. The transition should remain brief and should not add content intended to keep the child engaged on-screen.

Mission Break:

- does not block, lock, restrict, or disable the device;
- does not control, close, pause, or inspect third-party apps;
- does not claim operating-system parental-control or screen-time enforcement capabilities;
- does not monitor the child, the device, or whether the real-life activity occurred;
- does not require a native mobile capability, background surveillance, or completion proof.

## Active state and timer

The MVP timer is a **countdown used as approximate guidance**. It behaves as follows:

1. It starts at the selected Mission’s expected duration only after the family uses **Start mission**.
2. Starting is deliberate and can occur only once for the current Mission Session; repeated start input must not create another session or restart the countdown.
3. The active screen keeps the Mission title, short instruction, safety guidance when applicable, and approximate time understandable for when the family returns.
4. The screen clearly says that the child may leave the screen and come back when the Mission is done. No interaction is required while performing the Mission.
5. Returning before the countdown reaches zero is allowed. Because the duration is guidance, the family may mark the Mission done whenever the real-life activity is actually complete.
6. At zero, the timer stays at zero and uses neutral wording such as **Ready when you are**. It does not count overtime, sound an urgent alarm, mark failure, remove progress, or auto-complete the Mission.
7. Completing after zero has exactly the same result as completing before zero.

The timer must not use points, penalties, streak loss, urgency, shame, or escalating prompts. It is not evidence that the activity occurred and does not monitor activity away from the screen.

## Leaving and returning

After start, the intended next action is to leave the screen and perform the Mission in real life. The child does not need to keep MissionKid visible or interact with it during the countdown. MissionKid does not request a photo, video, location, wearable signal, or other proof.

When the family returns, the same active Mission Session must remain understandable. The screen presents one clear completion action, **Mission done**, and a less prominent way to leave the Mission without completion. The completion action is a self-report within the parent-guided family context.

The product must not repeatedly notify or pressure the child to return. It must not present a failure message if the family returns late or does not return.

## Completion and exactly-once behavior

Using **Mission done** is the only MVP action that moves an active Mission Session to `completed`. Completion must behave as one logical, exactly-once result for that Mission Session:

- the Mission Session becomes completed once;
- one Reward Card is made available and shown;
- one entry is added to Mission History;
- the completion is applied once under the Monthly Goal rules: displayed progress increases by one only while below `20 / 20` and otherwise remains complete.

Repeated taps, delayed responses, retries, back-and-forward navigation, or refreshes must not create another completion, another History entry, another Monthly Goal increment, or a different Reward Card for the same Mission Session. Repeating the same Mission at another time is allowed only as a new Mission Session and may then count once for that new session.

If completion cannot be recorded, MissionKid must not claim success or show goal progress that has not been recorded. It keeps the current session recoverable, explains the problem in calm language, and offers a retry. A retry must remain safe from duplicate completion if the first attempt actually succeeded but its confirmation was interrupted.

After successful completion, MissionKid transitions directly to the Reward Card for that completed Mission Session. If the Reward Card cannot be displayed immediately, the completion remains completed; retrying the display must recover the same recognition without repeating any completion effect.

## Cancellation and abandonment

- From `ready`, the family may return to the three mission suggestions. The unstarted selection ends without completion and without any timer, Reward Card, History entry, or Monthly Goal change.
- From `active`, leaving the Mission through MissionKid requires a clear confirmation such as **Leave this mission? It won’t be counted.** The choices must make **Keep going** easy and **Leave mission** explicit.
- Confirmed abandonment ends the current Mission Session flow without completion, Reward Card, History entry, Monthly Goal change, penalty, lost streak, or shame-based message.
- Ordinary navigation away from MissionKid, closing the page, hiding the page, or locking the screen is not abandonment. The active Mission remains available on return unless the family explicitly confirms abandonment.
- A completed Mission Session cannot be cancelled or abandoned. Completion correction or deletion is not part of this MVP specification.

Abandoned and unstarted selections do not appear in Mission History. The MVP does not require a separate abandonment history.

## Refresh and recovery behavior

Refreshing or reopening the current Mission flow must not create a new Mission Session or silently advance its lifecycle:

- A refresh in `ready` restores the same selected Mission in `ready`; the countdown has not begun.
- A refresh in `active` restores the same active Mission and the countdown’s approximate remaining time; it does not reset to the full duration or start a second timer.
- If the expected duration has elapsed while MissionKid was not visible, the restored timer shows zero and the session remains active until deliberately completed or abandoned.
- A refresh after `completed` restores the completed result or its Reward Card without applying completion effects again.

If the current Mission Session cannot be recovered, MissionKid shows a calm explanation and offers retry or a safe return to Mission Category Selection. It must not guess that the Mission was completed, award progress, or create a replacement completion. Returning to selection through this recovery path does not count the unrecovered session.

## Safety and healthy engagement

- Mission instructions and any safety guidance must remain short, understandable, age-appropriate, localized without weakened meaning, and suitable for the selected age context.
- A Mission must not require dangerous physical actions, unsafe equipment, unsupervised travel, purchases, contact with strangers, or sharing sensitive or identifying child data.
- Parent guidance and supervision take priority. A family can choose not to start or can abandon any Mission without penalty.
- The session must not use pressure, streak-loss threats, shame, scarcity, competitive ranking, gambling or loot-box mechanics, paid competition, or manipulative completion effects.
- MissionKid must not encourage the child to stay in the app. The intended active behavior is to leave the screen and do the Mission in real life.
- Completion is self-reported. No child photo, video, public post, social interaction, or other evidence is requested.
- No timer, Mission Break, cancellation, or completion behavior may imply device blocking, third-party app control, surveillance, or enforcement.

## Error and edge states

| Situation | Required MVP behavior |
| --- | --- |
| Mission details cannot be shown before start | Do not start the timer. Show a calm retry action and a way back to mission suggestions. |
| Start action is submitted more than once | Keep one Mission Session active with one countdown; do not restart or duplicate it. |
| The timer display is temporarily unavailable | Keep the Mission instruction and expected duration visible when possible. Explain that timing is approximate and allow the family to complete or abandon the active Mission. |
| The child finishes earlier than expected | Allow deliberate completion; do not require waiting for zero. |
| The timer reaches zero | Keep the session active at zero with neutral guidance; do not fail or auto-complete it. |
| The page is hidden, closed, or refreshed | Preserve the current lifecycle behavior described under refresh and recovery; do not treat navigation as abandonment. |
| Another Mission is requested while one is active | Offer return to the active Mission or explicit, confirmed abandonment before another Mission is selected. |
| Completion input is repeated | Return the one completed result and apply History and Monthly Goal effects only once. |
| Completion confirmation is interrupted or fails | Do not show unverified success; offer an exactly-once-safe retry and retain a recoverable session. |
| Reward Card display fails after completion | Keep the session completed and offer to show the same Reward Card again; do not repeat completion effects. |
| The family abandons a Mission | Return to a clear selection path without counting, penalty, or manipulative language. |

## Acceptance criteria

1. Given one suitable Mission is chosen, when its Mission Session is created, then it proceeds from `selected` to a `ready` start screen without starting the timer.
2. Given a session is `ready`, then the start screen shows the localized title, short instruction, Mission Category, approximate expected duration, applicable safety guidance, and the instruction to complete the Mission away from the screen.
3. Given a session is `ready`, then **Start mission** is the one clear primary action and a deliberate use changes the session to `active` and begins one countdown.
4. Given repeated start input for the same session, then only one session and one countdown remain active and the countdown does not restart.
5. Given a session is `active`, then the interface clearly permits the child to leave the screen, requires no interaction or proof during the real-life activity, and provides **Mission done** on return.
6. Given the Mission is completed before the countdown reaches zero, when **Mission done** is used, then completion is allowed without a timing penalty.
7. Given the countdown reaches zero, then the display remains at zero with neutral guidance, the session remains `active`, and no failure, overtime penalty, or automatic completion occurs.
8. Given the page is refreshed in `ready`, then the same Mission remains `ready` and no countdown starts.
9. Given the page is refreshed or reopened in `active`, then the same Mission Session is restored with approximate elapsed time reflected, without resetting the countdown or creating another session.
10. Given a Mission’s expected duration elapsed while MissionKid was not visible, when the session is restored, then the timer shows zero and the family can still complete or abandon it.
11. Given one active Mission Session is deliberately marked done, then it reaches `completed`, one Reward Card is shown, one History entry is produced, and the completion is applied once to Monthly Goal; displayed progress increases only while below `20 / 20`.
12. Given completion input is repeated or the completed page is refreshed, then the same completed result is returned and no additional Reward Card, History entry, or Monthly Goal increment is produced.
13. Given completion cannot be confirmed, then MissionKid does not claim success and offers a retry that cannot duplicate a completion already accepted for that session.
14. Given the Reward Card cannot be displayed after confirmed completion, then retrying displays the same Reward Card without changing History or Monthly Goal progress again.
15. Given a family leaves a `ready` Mission before starting, then it returns to mission suggestions and receives no completion effect.
16. Given a family chooses to leave an `active` Mission, then MissionKid requests explicit confirmation and, once confirmed, returns to selection without completion, History, Monthly Goal progress, Reward Card, penalty, or shame.
17. Given the page is merely hidden, closed, or left through ordinary navigation, then MissionKid does not interpret that action as deliberate abandonment.
18. Given another Mission is requested while one is active, then the family must resume the active Mission or confirm its abandonment before a new Mission Session begins.
19. Given any Mission Break presentation, then it describes a brief transition to a real-life Mission and makes no claim or attempt to block the device, control third-party apps, or provide operating-system parental controls.
20. Given any supported UI language, then lifecycle actions, safety meaning, away-from-screen guidance, cancellation consequences, timer guidance, and error messages preserve the same behavior in English, German, and Russian.
21. Given any Mission Session path, then it contains no dangerous instructions, manipulative completion mechanics, pressure to stay on-screen, child media request, social behavior, payment, real prize promise, device control, or surveillance.

## Explicit non-goals

This specification does not authorize product code, UI implementation, notifications, native mobile behavior, authentication, child accounts, chat, social features, public profiles or leaderboards, likes, child photos or videos, payments, real prize delivery, AI-generated Missions, device blocking, third-party app control, operating-system integration, background monitoring, or database design.
