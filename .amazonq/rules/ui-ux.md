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
- Text: Dark gray (#1d1c1d) for primary, lighter grays (#616061) for secondary
- Accent: Purple (#611f69) for primary actions, green (#2d9f5d) for success, red (#e01e5a) for errors
- Selected states: Light purple background (#f8f4f9) with purple border

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
- Rounded corners (6px-8px border-radius)
- White background with light border

### List Cards (Repositories, Webhooks, etc.)
- Padding: 20px (p-5)
- Border: 1px solid #e0e0e0, rounded-xl
- Hover effects: border-color #b8b8b8, shadow-lg with shadow-slate-200/50
- Transition: transition-all duration-200
- Layout: flex with items-start justify-between
- Title: font-semibold text-slate-900
- Description: text-sm text-slate-500
- Chevron icon on right: text-slate-300 hover:text-[#611f69]
- Use consistent structure across all list views (repositories, webhooks, etc.)

### Selection Cards
- Use card-based selection for radio/checkbox groups
- 2px borders (#e0e0e0) that change to accent color when selected
- Hidden radio/checkbox inputs with visible card selection
- Include icons (16px-20px) with labels and descriptions
- Hover state: border-color #b8b8b8, background #f8f8f8
- Selected state: border-color #611f69, background #f8f4f9
- Padding: 12px-16px
- Smooth transitions (150ms)
- Icons change color to accent (#611f69) when selected

### Inputs
- Clean borders with focus states
- Border-radius: 4px
- Padding: 8px 12px
- Clear error states with red borders and helper text
- Focus ring: 2px accent color (#611f69)

### Help Text
- Font size: 12px-13px
- Color: #616061
- Placed below labels or inputs
- Use for descriptions and character counts

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
- Card hover effects: subtle border and background changes
- Icon color changes on selection/hover

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
- Maintain consistent icon style and size (16px-20px for UI elements)
- Use the same interaction patterns throughout
- Keep terminology consistent
- Use card-based selection for all radio/checkbox groups in modals
- Apply consistent color scheme: purple (#611f69) for primary, green (#2d9f5d) for success, red (#e01e5a) for errors
