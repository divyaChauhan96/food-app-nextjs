import AppHeader from "@/components/mainHeader/AppHeader";
import "./globals.css";

export const metadata = {
  title: "Foodies",
  description: "Prepare meals at your home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
