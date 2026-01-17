# UI/UX Rules - Slack Style

## Design System

- Follow Slack's clean, minimal, and professional aesthetic
- Use consistent spacing, typography, and color schemes throughout
- Prioritize clarity and readability over decorative elements

## Layout & Spacing

- Use consistent padding: 12px, 16px, 24px, 32px
- Maintain generous whitespace between sections
- Keep content width readable (max-width: 1200px for main content)
- Use flexbox/grid for responsive layouts

## Colors

- Use a neutral color palette with accent colors for actions
- Background: Light grays (#f8f8f8, #ffffff) for main areas
- Borders: Subtle borders (#e0e0e0, #ddd)
- Text: Dark gray (#1d1c1d) for primary, lighter grays for secondary
- Accent: Purple/blue for primary actions, green for success, red for errors

## Typography

- Use system fonts or sans-serif font stacks
- Font sizes: 13px-15px for body, 18px-24px for headings
- Line height: 1.5 for readability
- Font weight: 400 (normal), 600 (semi-bold), 700 (bold)

## Components

### Buttons
- Rounded corners (4px-6px border-radius)
- Clear hover states with subtle color changes
- Primary: Filled with accent color
- Secondary: Outlined or ghost style
- Padding: 8px 16px for standard buttons

### Cards
- Subtle shadows (box-shadow: 0 1px 3px rgba(0,0,0,0.1))
- Rounded corners (8px border-radius)
- White background with light border

### Inputs
- Clean borders with focus states
- Border-radius: 4px
- Padding: 8px 12px
- Clear error states with red borders and helper text

### Navigation
- Sidebar navigation with clear active states
- Hover effects on interactive elements
- Icons paired with text labels

## Interactions

- Smooth transitions (150ms-300ms)
- Loading states for async operations
- Toast notifications for feedback (top-right corner)
- Confirmation modals for destructive actions
- Hover states on all clickable elements

## Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Keyboard navigation support
- Focus indicators on interactive elements
- Semantic HTML elements
- ARIA labels where needed

## Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Collapsible sidebar on mobile
- Touch-friendly tap targets (min 44x44px)

## Consistency

- Reuse components across the application
- Maintain consistent icon style and size
- Use the same interaction patterns throughout
- Keep terminology consistent
