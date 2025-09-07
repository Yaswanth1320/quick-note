import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTopButton from "@/components/BackToTopButton";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickNotes",
  description: "Capture your ideas instantly with QuickNotes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>

          <BackToTopButton />
          <Toaster
            position="top-right"
            richColors
            expand
            closeButton
            toastOptions={{
              classNames: {
                toast: `bg-card text-card-foreground border border-border shadow-md rounded-lg ${geistMono.variable}`,
                title: `${geistMono.variable} font-mono text-foreground`,
                description: `${geistMono.variable} text-sm font-mono text-muted-foreground`,
                actionButton:
                  "bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium hover:opacity-90",
                cancelButton:
                  "bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
