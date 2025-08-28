import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Check if chrome.runtime is available
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      console.log('chrome.runtime is available:', chrome.runtime)
    } else {
      console.log('chrome.runtime is not available')
    }
  }, [])
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>Welcome to our PWA!</p>
    </div>
  )
}

export default App
