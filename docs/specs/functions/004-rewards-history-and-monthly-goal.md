# Rewards, History, and Monthly Goal Specification

## Status

This document defines the MissionKid MVP behavior for recognition and progress after a Mission Session is completed. It is a product specification only and does not define storage, database, or UI implementation.

## Purpose

Give the child brief positive recognition, let the family review completed real-life missions, and show calm progress toward a private monthly target without competition or prolonged screen engagement.

## Shared completion rule

- Only a Mission Session in the `completed` state can produce a Reward Card, appear in Mission History, or contribute to Monthly Goal progress.
- One completed Mission Session contributes at most one History entry and one monthly completion.
- Reloading a page or repeating a completion action must not create another entry or increment.
- Recognition and progress belong to the same local family/Child Profile context as the completed Mission Session.

## Reward Card

### Behavior

After successful Mission Session completion, MissionKid shows one Reward Card containing:

- positive, non-comparative recognition;
- the completed Mission title;
- its Mission Category;
- a simple completion moment or context, such as the localized completion date;
- current Monthly Goal progress.

The Reward Card provides a short next step back to the core product flow or away from the screen. It does not require further interaction to preserve the completion.

### Boundaries

The Reward Card must not:

- resemble gambling or use loot-box or reveal mechanics;
- grant random, monetary, or purchasable rewards;
- promise or deliver a real-life prize;
- rank the child or compare progress publicly;
- use streak-loss threats, shame, or prompts designed to prolong screen engagement.

## Mission History

### Behavior

- Mission History is a private view of completed Mission Sessions for the current Child Profile.
- Entries are ordered newest first by completion moment.
- Each entry shows only the Mission title, Mission Category, and localized completion date or time context.
- History remains associated with the same Child Profile if its age context or UI language changes later.
- Mission History is not a social feed and has no sharing, likes, public profile, public ranking, photo, or video capability.

### Empty state

When there are no completed Mission Sessions, History explains that completed missions will appear there and offers a clear route back to Mission Category Selection. It does not fabricate example completions.

## Monthly Goal

### Target and counting

- The fixed MVP target is `20 completed missions` per Child Profile in the current monthly goal period.
- Progress is shown in the form `3 / 20 missions`.
- A Mission Session counts when it first reaches `completed`, using its completion moment to determine the monthly period.
- A cancelled or abandoned flow does not count; Mission Sessions in `ready` or `active` do not count.
- Duplicate completion attempts do not count again.

### Monthly period

The monthly goal period follows the family's local calendar month. It begins on the first day of the month and changes conceptually when the next local calendar month begins. A new period starts at `0 / 20 missions`; prior completions remain visible in Mission History.

### Goal completion

- At the twentieth valid completion, progress reaches `20 / 20 missions` and the goal becomes complete.
- After completion, the displayed goal remains at `20 / 20` for that period. Further completed Mission Sessions still appear in History but do not create an overachievement score or repeated goal-complete prompts.
- MissionKid shows one encouraging message inviting the child and parent to choose an optional, parent-approved real-life reward.
- The parent controls and approves any real-life reward. MissionKid does not deliver, promise, sell, assign, or verify a prize.
- The goal is private and never ranks children against one another.

## Error and edge states

- If a completion is already recorded, MissionKid reuses the existing completed result instead of adding another History entry or monthly increment.
- Refreshing or reopening the Reward Card preserves the existing completion and progress result.
- If History or Monthly Goal cannot be shown, MissionKid keeps the completion intact, presents a calm retry state, and does not claim that progress was lost or increment it again.
- A completion at a monthly boundary belongs to the period containing its recorded completion moment.
- Changing UI language changes labels and localized date presentation, not stored completion meaning, ordering, or counts.
- Changing age context does not remove prior History or reset the current Monthly Goal.

## Acceptance criteria

1. Given an active Mission Session that has not previously completed, when the child marks it complete, one Reward Card is shown and one History entry is available; current monthly progress increases by one if it is below `20 / 20`, otherwise it remains complete.
2. Given the same completed Mission Session, when completion is submitted again or the result is refreshed, History and Monthly Goal remain unchanged.
3. A Reward Card shows positive recognition, Mission title, Mission Category, a simple completion context, and current Monthly Goal progress.
4. Mission History contains only completed Mission Sessions for the current Child Profile, displays minimal information, and orders entries newest first.
5. With no completed sessions, Mission History shows its empty state and a route to Mission Category Selection.
6. Mission Sessions in `ready` or `active`, and flows that were cancelled or abandoned, never appear in History or contribute to Monthly Goal progress.
7. Monthly Goal starts at `0 / 20 missions` for a new local calendar month and reaches complete after exactly 20 valid completions in that period.
8. After goal completion, additional completions remain in History while the goal display remains `20 / 20` and no repeated goal-complete prompt is created.
9. At goal completion, MissionKid shows one encouraging message for an optional, parent-controlled, parent-approved real-life reward and does not deliver, promise, sell, or assign it.
10. Reward Card, History, and Monthly Goal contain no gambling, loot-box, payment, public comparison, sharing, likes, child-media, or manipulative engagement behavior.
