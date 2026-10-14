import { config } from "@/config/site";

export const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div>&copy; {new Date().getFullYear()} { config.global.name }</div>
      <div className="mono">{ config.global.location }</div>
    </div>
  </footer>
);