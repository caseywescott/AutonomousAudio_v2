import './globals.css'

export const metadata = {
  title: 'AutonomousAudio',
  description: 'Demo of Starknet.js with Cairo 1',
  icons: {
    icon: "./favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
