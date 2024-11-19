import type { Metadata } from "next";
import localFont from "next/font/local";
import "./theme-colors.css";
import "./themes.css";
import "./globals.css";
import NavBar from "../components/oodreact/NavBar";
import NavLink from "../components/oodreact/NavLink";
import styles from "./page.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Star Wars Galactic Map",
  description: "Interactive map of the Star Wars Galaxy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <h1>Star Wars Galactic Map</h1>
          <NavBar home="/" homeLabel="Galactic Map">
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/resources">Resources</NavLink>
              </li>
            </ul>
          </NavBar>
        </header>
        <div className={styles.content_row}>
          <div className={styles.content_container}>{children}</div>
        </div>
      </body>
    </html>
  );
}
