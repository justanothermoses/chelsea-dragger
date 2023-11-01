import { defineConfig } from '@playwright/test'

export const port = '3333'

export default defineConfig({
  webServer: {
    command: `npx vite ./example -c ./vite.config.ts --strictPort --port ${port}`,
    reuseExistingServer: false,
  },
})
