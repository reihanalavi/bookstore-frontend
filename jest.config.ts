import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Berikan path ke aplikasi Next.js kamu untuk memuat next.config.js dan file .env di lingkungan pengujian
  dir: './',
})

// Tambahkan konfigurasi Jest kustom untuk dikirim ke Next.js
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  // Jika kamu menggunakan modul alias (@/*), tambahkan ini:
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// createJestConfig diekspor dengan cara ini untuk memastikan bahwa next/jest dapat memuat konfigurasi Next.js yang bersifat async
export default createJestConfig(customJestConfig)