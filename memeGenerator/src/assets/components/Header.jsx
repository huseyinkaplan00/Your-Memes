import React from "react";

export default function Header() {
  // scroll position control
  const [isSmallHeader, setIsSmallHeader] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition > 50) {
        setIsSmallHeader(true);
      } else if (currentScrollPosition < 20) {
        setIsSmallHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header ${isSmallHeader ? "smallHeader" : "largeHeader"}`}
    >
      <a href="index.html">
        <img
          src="/logo.png"
          alt="header icon troll face"
          className="header__logo"
        />
        <h1> Meme Generator</h1>
      </a>
      <p>Generate your favorite memes</p>
    </header>
  );
}
