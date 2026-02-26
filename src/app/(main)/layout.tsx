import GlobalHeader from '@/components/GlobalHeader'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalHeader />
      {children}
    </>
  )
}
