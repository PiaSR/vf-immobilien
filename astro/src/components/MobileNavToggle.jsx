// src/components/MobileNavToggle.jsx
import { useEffect } from "react";

export default function MobileNavToggle() {
  useEffect(() => {
    const toggleButton = document.querySelector(".cs-toggle");
    const nav = document.getElementById("cs-navigation");

    const handleClick = () => {
      nav.classList.toggle("cs-active");

      const expanded = nav.classList.contains("cs-active");
      document.getElementById("cs-expanded").setAttribute("aria-expanded", expanded);
    };

    toggleButton.addEventListener("click", handleClick);
    return () => toggleButton.removeEventListener("click", handleClick);
  }, []);

  return null; // we don't need to render anything, just attach event
}
