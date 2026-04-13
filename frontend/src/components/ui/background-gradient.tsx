// export default function BackgroundGradient() {
//   return (
//     <>
//       {/* Main gradient (shifted brown later) */}
//       <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,58,40,0.72)_0%,rgba(74,60,38,0.55)_55%,rgba(245,247,242,0.88)_100%)]" />

//       {/* Soft organic lighting */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,169,107,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(120,92,58,0.10),transparent_40%)]" />
    
//       {/* Background gradient (also shifted to match) */}
//       <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,58,36,0.74)_0%,rgba(74,60,38,0.54)_56%,rgba(245,247,242,0.90)_100%)]" />

//       {/* Soft atmospheric layer */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,169,107,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(120,92,58,0.10),transparent_42%)]" />

//       {/* Subtle reading support */}
//       <div className="absolute left-0 top-0 h-full w-[55%] bg-white/5 blur-3xl" />
//     </>
//   );
// }


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