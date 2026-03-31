export default function BackgroundGradient() {
  return (
    <>
      {/* Main gradient (lighter + more breathable) */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,58,255,0.72)_0%,rgba(74,60,38,0.55)_45%,rgba(245,247,242,0.88)_100%)]" />

      {/* Soft organic lighting (less intense) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,169,107,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(120,92,58,0.10),transparent_40%)]" />
    
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(32,58,36,0.74)_0%,rgba(74,60,38,0.54)_46%,rgba(245,247,242,0.90)_100%)]" />

      {/* Soft atmospheric layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,169,107,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(120,92,58,0.10),transparent_42%)]" />

      {/* Subtle reading support */}
      <div className="absolute left-0 top-0 h-full w-[55%] bg-white/5 blur-3xl" />
    
    </>
  );
}