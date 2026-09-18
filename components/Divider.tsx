export function Divider({ fleuron = false }: { fleuron?: boolean }) {
  if (fleuron) {
    return (
      <div role="separator" className="my-ed-xl flex items-center gap-ed-md">
        <div className="h-px bg-hairline flex-1" />
        <span className="fleuron text-[length:var(--font-size-h3)]" aria-hidden>
          ❦
        </span>
        <div className="h-px bg-hairline flex-1" />
      </div>
    );
  }

  return (
    <div role="separator" className="my-ed-xl">
      <div className="h-px bg-hairline" />
      <div className="h-px bg-hairline mt-[3px]" />
    </div>
  );
}
