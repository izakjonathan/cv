export default function Nav() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner nav-inner-minimal">
          <a href="#about" className="blend-text">CV</a>
          <a href="mailto:izakhyllested@icloud.com" className="blend-text">CONTACT</a>
        </div>
      </header>
      <footer className="footer-nav">
        <div className="footer-inner">
          <a href="mailto:izakhyllested@icloud.com" className="blend-text">EMAIL</a>
          <a href="/Izak-Hyllested-CV.pdf" className="blend-text">PDF CV</a>
        </div>
      </footer>
    </>
  );
}
