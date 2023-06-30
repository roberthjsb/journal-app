
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }

  return defineConfig({
    plugins: [react()],
    define: processEnvValues,
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        reporter: ['text', 'html', 'clover', 'json'],
        exclude: [
          'node_modules/',
          'src/setupTests.ts',
        ],
         coverage: {
          provider:'istanbul',
          exclude: ['./src/__test__/*'],
    },
      },
    },
  })
}
