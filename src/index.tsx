import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@arcgis/core/assets/esri/themes/dark/main.css';

import './index.css';

import { App } from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from './contexts/SupabaseContext';

// Create a root element for the application
const root = createRoot(document.querySelector('#root')!);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
// Render the application
root.render(
  <StrictMode>
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SupabaseProvider>
  </StrictMode>
);
