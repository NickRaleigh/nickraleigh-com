import Link from "next/link";
import Image from "next/image";
import { config } from "@/config/site";
import { toLowerHyphenCase } from "@/utils/helpers";

export const Nav = () => (
  <nav className="nav">
    <div className="wrap">
      <Link className="nav__brand" href="/">
        <Image
          className="nav__logo"
          src={ config.nav.logo.src }
          alt={ config.nav.logo.alt }
          width={ config.nav.logo.width }
          height={ config.nav.logo.height }
        />
        <span className="nav__name">{ config.global.name }</span>
      </Link>
      <ul className="nav__links">
      { config.nav.links.map( link => (
        <li className="nav__item" key={`nav-link-${link.href}`}>
          <Link
            className={ `nav__link link--${toLowerHyphenCase(link.text)}` }
            href={ link.href }
          >
            { link.text }
          </Link>
        </li>
      ))
      }
      </ul>
    </div>
  </nav>
);
