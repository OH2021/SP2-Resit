# SP2 Resit Style Guide

## 1. Color Palette (Bootstrap & custom SCSS)

| Purpose                             | Class / Variable  | Hex Value |
| ----------------------------------- | ----------------- | --------- |
| Primary (buttons, highlights)       | btn-primary       | #0d6efd   |
| Primary Hover                       | btn-primary:hover | #0b5ed7   |
| Success / Positive (bid placed)     | btn-success       | #198754   |
| Success Hover                       | btn-success:hover | #157347   |
| Destructive / Logout / Danger       | btn-danger        | #dc3545   |
| Destructive Hover                   | btn-danger:hover  | #bb2d3b   |
| Secondary / Neutral (view listings) | btn-secondary     | #6c757d   |
| Light Gray Background / cards       | bg-light          | #f8f9fa   |
| Gray text                           | text-muted        | #6c757d   |
| Dark Text                           | text-dark         | #212529   |
| Borders / subtle                    | border            | #dee2e6   |

## 2. Typography

**Font stack (Bootstrap default + SCSS overrides if any):**

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

| Element               | Class / SCSS                        |
| --------------------- | ----------------------------------- |
| Page Title            | h1 / display-4 / custom .page-title |
| Section Heading       | h2 / display-5 / .section-heading   |
| Subheading            | h3 / .subheading                    |
| Button text           | btn (with btn-* variant)            |
| Body text             | p / .text-body                      |
| Small text / captions | small / .text-muted                 |

## 3. Buttons

**Primary**

```html
class="btn btn-primary"
```

**Success / Positive**

```html
class="btn btn-success"
```

**Destructive / Red**

```html
class="btn btn-danger"
```

**Secondary / Neutral**

```html
class="btn btn-secondary"
```

*Use hover states from Bootstrap by default.*

## 4. Layout & Spacing

| Spacing          | Class / Utility     |
| ---------------- | ------------------- |
| Small padding    | p-2                 |
| Standard spacing | p-3, m-3            |
| Larger spacing   | p-4, m-4, py-5      |
| Grid gaps        | row g-3, g-4        |
| Margins          | mt-3, mb-3, mx-auto |

*Bootstrap container conventions:* `.container` for fixed width, `.container-fluid` for full width.

## 5. Imagery

**Listing image styling (SCSS or Bootstrap classes):**

```html
class="img-fluid rounded"
```

**Placeholder image example:**

```
https://via.placeholder.com/400x300
```

## 6. Form Fields & Inputs

```html
class="form-control"
```

*Optional SCSS overrides for padding or border radius in your custom scss file.*

## 7. Alerts & Messages

* **Success alert:** `alert alert-success`
* **Error alert:** `alert alert-danger`
* **Info / neutral:** `alert alert-info`

*Include `role="alert"` for accessibility.*

## 8. SCSS Conventions

* Use variables for colors, spacing, or font sizes where needed:

```scss
$primary-color: #0d6efd;
$success-color: #198754;
$danger-color: #dc3545;
```

* Nest classes under components for clarity:

```scss
.card {
  .card-title { font-weight: 600; }
  .card-text { font-size: 0.9rem; }
}
```

* Keep modular structure: forms, buttons, cards, navbar, footer.

## 9. Alerts / Messages

| Type                | Bootstrap Class     |
| ------------------- | ------------------- |
| Success             | alert alert-success |
| Error / Destructive | alert alert-danger  |
| Info / Neutral      | alert alert-info    |

## 10. General Guidelines

* Use Bootstrap classes wherever possible for layout, spacing, typography, and components.
* Use SCSS for custom overrides and site-specific styling.
* Maintain semantic HTML structure.
* Accessibility: always use alt text for images and proper form labels.
* Maintain consistent spacing, colors, and typography throughout pages.

## 11. Color Summary

* **Blue / Primary:** #0d6efd
* **Green / Success:** #198754
* **Red / Danger:** #dc3545
* **Gray Neutrals:** #6c757d, #f8f9fa, #212529

*This style guide reflects the Bootstrap-based styling and custom SCSS used in the SP2 Resit project.*
