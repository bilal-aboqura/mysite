# Routes

This is a Vite React single-page application without a client router.

| URL | Entry | Layout |
| --- | --- | --- |
| `/` | `src/main.jsx` → `src/App.jsx` | Active portfolio shell |
| `/?lang=ar` | `src/App.jsx` Arabic RTL branch | Active portfolio shell |
| `/?lang=en` | `src/App.jsx` English LTR branch | Active portfolio shell |

Anchor destinations include `#work`, `#services`, `#process`, `#why`, `#faq`,
and `#contact`.

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```
