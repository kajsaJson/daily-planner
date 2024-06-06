import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'src/App.tsx';
import 'src/index.css';

export const root = document.body.appendChild(document.createElement('div'));

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
