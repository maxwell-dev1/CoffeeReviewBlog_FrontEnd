'use client';
import { useEffect, useState } from 'react';

const ScrollAwareFooter = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight -150;
      setShowFooter(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${showFooter ? 'show' : 'hide'}`}>
      <p className="footerItem">About</p>
      <p className="footerItem">Contact</p>
      <p className="footerItem">Copyright</p>
      <p className="footerItem">Home</p>
      <p className="footerItem">Reviews</p>
    </footer>
  );
};

export default ScrollAwareFooter;
