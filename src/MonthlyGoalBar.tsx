type MonthlyGoalBarProps = Readonly<{
  // The count the text beside the bar displays, already capped at the target.
  displayedCount: number;
  target: number;
}>;

// A calm picture of the Monthly Goal text it sits beside. Its filled share is
// exactly the displayed count over the target, so it is full at `20 / 20` and
// never beyond. It carries no value of its own — the words `X / 20 missions`
// do, and assistive technology reads those — and it never animates.
export function MonthlyGoalBar({ displayedCount, target }: MonthlyGoalBarProps) {
  // Whole counts over a whole target, so the share is exact: 7 of 20 is 35%.
  const percent =
    target > 0 ? (Math.min(Math.max(displayedCount, 0), target) * 100) / target : 0;

  return (
    <div aria-hidden="true" className="goal-bar">
      <span className="goal-bar__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
