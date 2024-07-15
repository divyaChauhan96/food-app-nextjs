import appLogo from "@/assets/logo.png";
import Link from "next/link";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <img src={appLogo.src} role="link" alt="Go to homepage" />
        FoodiesBlog
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
