import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases?: string[];
  text?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  text = 'Vignesh S',
  typingSpeed = 100,
  pauseDuration = 2400,
  deletingSpeed = 45,
  className = '',
  cursorClassName = 'bg-[#ff8a50]',
}) => {
  const words = phrases && phrases.length > 0 ? phrases : [text];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const currentWord = words[wordIndex % words.length];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= currentWord.length) {
      if (charIndex === currentWord.length) {
        // Full word typed, pause before deleting if multiple words
        timeout = setTimeout(() => {
          if (words.length > 1) {
            setIsDeleting(true);
          }
        }, pauseDuration);
      } else {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed + Math.random() * 35);
      }
    } else if (isDeleting && charIndex >= 0) {
      if (charIndex === 0) {
        // Finished deleting, move to next word
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 400);
      } else {
        // Deleting backward
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWord, words.length, typingSpeed, pauseDuration, deletingSpeed]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      <span
        className={`inline-block w-[2px] h-[1.1em] ml-1 ${cursorClassName} animate-pulse shadow-[0_0_8px_#ff8a50]`}
      />
    </span>
  );
};
