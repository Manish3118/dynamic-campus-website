function Header({ links, isMenuOpen, setIsMenuOpen }) {
  return (
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Greenfield University home">
        Greenfield University
      </a>
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <nav id="site-navigation" className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;
