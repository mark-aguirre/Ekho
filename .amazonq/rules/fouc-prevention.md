# FOUC Prevention Rules

## Flash of Unstyled Content (FOUC) Prevention

### Nuxt Configuration

Always include these settings in `nuxt.config.ts`:

```typescript
experimental: {
  inlineSSRStyles: false
},
features: {
  inlineStyles: true
}
```

This ensures critical CSS is inlined during SSR for immediate styling.

### External Font Loading

Load external fonts (Google Fonts, etc.) asynchronously to prevent blocking:

```typescript
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap',
        media: 'print',
        onload: "this.media='all'"
      }
    ]
  }
}
```

The `media='print'` trick loads fonts without blocking render.

### Font Fallbacks

Always provide system font fallbacks in CSS:

```css
font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

This ensures text renders properly before custom fonts load.

## Checklist

- ✅ Enable `inlineStyles: true` in nuxt.config.ts
- ✅ Load external fonts asynchronously
- ✅ Include system font fallbacks
- ✅ Use `preconnect` for external font domains
