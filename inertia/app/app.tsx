/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = (import.meta as any).env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name: string) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      (import.meta as any).glob('../pages/**/*.tsx'),
    )
  },

  setup({ el, App, props }: { el: any, App: any, props: any }) {
    
    hydrateRoot(el, <App {...props} />)
    
  },
});