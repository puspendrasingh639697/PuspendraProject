// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['three', '@react-three/fiber', '@react-three/drei'],
//     include: [
//       'react', 
//       'react-dom',
//       'framer-motion'
//     ]
//   },
//   build: {
//     commonjsOptions: {
//       include: [/node_modules/],
//       transformMixedEsModules: true
//     },
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           three: ['three'],
//           r3f: ['@react-three/fiber', '@react-three/drei']
//         }
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       three: 'three/build/three.module.js'
//     }
//   }
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // वापस सही प्लगइन पर

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // यहाँ exclude हटा दिया है ताकि बिल्ड में दिक्कत न आए
    include: [
      'three', 
      '@react-three/fiber', 
      '@react-three/drei', 
      'react', 
      'react-dom', 
      'framer-motion'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  resolve: {
    alias: {
      // ✅ बस 'three' को 'three' पर रखो, पुराना रास्ता (build/three.module.js) हटा दो
      'three': 'three' 
    }
  }
})