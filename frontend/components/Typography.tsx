import { ReactNode } from "react";

interface TypoGraphyProps {
  children: ReactNode;
  className?: string;
}

export function H1({children, className = ""}: TypoGraphyProps){
  return (
  <h1 className={`text-h1 ${className}`}>
    {children}
  </h1>
  );
}

export function H2({children, className = ""}: TypoGraphyProps){
  return (
  <h2 className={`text-h2 ${className}`}>
    {children}
  </h2>
  );
}

export function SubHeading({children, className = ""}: TypoGraphyProps){
  return (
  <h3 className={`text-subheading ${className}`}>
    {children}
  </h3>
  );
}

export function Body({children, className = ""}: TypoGraphyProps){
  return (
  <p className={`text-body ${className}`}>
    {children}
  </p>
  );
}

export function BodySmall({children, className = ""}: TypoGraphyProps){
  return (
  <p className={`text-body ${className}`}>
    {children}
  </p>
  );
}

export function Caption({children, className = ""}: TypoGraphyProps){
  return (
  <span className={`text-caption ${className}`}>
    {children}
  </span>
  );
}