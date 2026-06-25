const Badge = ({ label }: { label: string }) => {
  return (
    <span
      className="
        inline-flex items-center rounded-full
        bg-cyan-400 px-3 py-[5px]
        text-[11px] font-semibold tracking-wide text-white shadow-sm
      "
      role="note"
      aria-label={`Category: ${label}`}
    >
      {label}
    </span>
  );
}

export default Badge;