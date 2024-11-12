import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/video_feed': 'http://localhost:5000',  // Proxy video feed requests to Flask
  //   },
  // },
})
