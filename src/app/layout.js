import { Inter } from "next/font/google";
import "./globals.css";

// Configure the font
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "Kalakaar Ventures",
  description: "Storytelling-driven creative brand offering video editing, photography, and design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}