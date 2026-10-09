// src/components/ui/CornerTicks.tsx
//
// Drafting marks on a framed panel. Shared by the Act III work previews and
// the Act I spec card so the two cannot drift apart.
//
// Each tick is offset by -1px so it sits ON the parent's hairline rather than
// inside it, which is what makes it read as a registration mark instead of a
// second, smaller border. The parent must be `relative`.

const CORNERS = [
  "-top-px -left-px border-t border-l",
  "-top-px -right-px border-t border-r",
  "-bottom-px -left-px border-b border-l",
  "-right-px -bottom-px border-r border-b",
] as const;

export default function CornerTicks() {
  return (
    <>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`pointer-events-none absolute size-2.5 border-signal ${corner}`}
        />
      ))}
    </>
  );
}
