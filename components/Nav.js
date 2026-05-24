import Link from "next/link";

export default function Nav() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo blend-text">IZAK HYLLESTED</Link>
          <a href="#about" className="blend-text">PROFILE</a>
        </div>
      </header>
      <footer className="footer-nav">
        <div className="footer-inner">
          <a href="mailto:izakhyllested@icloud.com" className="blend-text">CONTACT</a>
          <a href="/Izak-Hyllested-CV.pdf" className="blend-text">PDF CV</a>
        </div>
      </footer>
    </>
  );
}
