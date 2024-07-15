import appLogo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import classes from "./header.module.css";
import NavLink from "../navigationLink/NavLink";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <Image src={appLogo} role="link" alt="Go to homepage" priority />
        NextLevel Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
