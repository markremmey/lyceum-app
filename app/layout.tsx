export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>ChatGPT</h1>
      {children}
    </div>
  )
}