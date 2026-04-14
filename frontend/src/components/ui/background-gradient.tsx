export default function BackgroundGradient() {
  return (
    <>
      {/* Main gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-primary)_62%,transparent)_0%,color-mix(in_srgb,var(--color-secondary)_62%,transparent)_68%,rgba(245,247,242,0.90)_100%)]" />

      {/* Soft atmospheric lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-primary)_20%,transparent),transparent_42%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--color-secondary)_12%,transparent),transparent_45%)]" />

      {/* Background gradient (aligned shift) */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-primary)_66%,transparent)_0%,color-mix(in_srgb,var(--color-secondary)_60%,transparent)_70%,rgba(245,247,242,0.92)_100%)]" />

      {/* Soft atmospheric layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-primary)_16%,transparent),transparent_40%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--color-secondary)_14%,transparent),transparent_48%)]" />

      {/* Reading support */}
      <div className="absolute left-[18%] top-[18%] h-[52%] w-[42%] rounded-full bg-text/10 blur-3xl" />
    </>
  );
}