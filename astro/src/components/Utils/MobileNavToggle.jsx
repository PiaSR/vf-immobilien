// src/components/MobileNavToggle.jsx

import { useEffect } from "react";
import "./MobileNavToggle.css";


export default function MobileNavToggle() {
  useEffect(() => {
    const nav = document.getElementById("cs-navigation");
    const toggleButton = document.querySelector(".cs-toggle");

    if (toggleButton) {
      const handleClick = () => {
        nav.classList.toggle("cs-active");
        const expanded = nav.classList.contains("cs-active");
        document.getElementById("cs-expanded").setAttribute("aria-expanded", expanded);
      };
      
      toggleButton.addEventListener("click", handleClick);
      return () => {
        toggleButton.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <button className="cs-toggle" aria-label="mobile menu toggle">
      <div className="cs-box" aria-hidden="true">
        <span className="cs-line cs-line1" aria-hidden="true"></span>
        <span className="cs-line cs-line2" aria-hidden="true"></span>
        <span className="cs-line cs-line3" aria-hidden="true"></span>
      </div>
    </button>
  );
}
