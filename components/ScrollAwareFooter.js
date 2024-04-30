'use client';
import { useEffect, useState } from 'react';

const ScrollAwareFooter = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight -55;
      setShowFooter(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${showFooter ? 'show' : 'hide'}`} style={{color:"#dbc1ac"}}>
      <a href="/about" style={{textDecoration:'none', color: 'rgb(216, 178, 178)'}}><p className="footerItem">About</p></a>
      <a href="/contact" style={{textDecoration:'none', color: 'rgb(216, 178, 178)'}}><p className="footerItem">Contact</p></a>
      <a href="/copyright" style={{textDecoration:'none', color: 'rgb(216, 178, 178)'}}><p className="footerItem">Copyright</p></a>
      <a href="/" style={{textDecoration:'none', color: 'rgb(216, 178, 178)'}}><p className="footerItem">Home</p></a>
      <a href="/coffeereviews" style={{textDecoration:'none', color: 'rgb(216, 178, 178)'}}><p className="footerItem">Reviews</p></a>
    </footer>
  );
};

export default ScrollAwareFooter;
