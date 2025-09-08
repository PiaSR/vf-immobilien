# VF Immobilien Design System

## Buttons

### Base Styles

Applies to all `<button>` elements without a class:

```css
button:not([class]) {
  border: none;
  border-radius: 26px;
  font-family: var(--font-sans);
  padding: 0.75rem 1.25rem;
}
```

### Variants

| Class                 | Purpose           | Example                        |
| --------------------- | ----------------- | ------------------------------ |
| `.cta-button-green`   | Primary actions   | Contact forms, lead generation |
| `.cta-button-outline` | Secondary actions | Less prominent actions         |

### Usage in Astro

```astro
<button>Default Button</button>
<button class="cta-button-green">Primary Action</button>
```
