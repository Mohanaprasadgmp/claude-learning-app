export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

      {/* Amber glow — top centre */}
      <div className="pointer-events-none absolute -top-[20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Orange glow — bottom right */}
      <div className="pointer-events-none absolute -bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-orange-600/8 blur-[100px]" />

      {/* Subtle dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#ffffff12_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Radial vignette — fades grid at edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,#0a0a0a_100%)]" />

      <div className="relative z-10 w-full px-4 py-12">
        {children}
      </div>
    </div>
  )
}
