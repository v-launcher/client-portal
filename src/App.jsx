import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [extensionStatus, setExtensionStatus] = useState('checking...')
  const [lastResponse, setLastResponse] = useState(null)

  useEffect(() => {
    // Check if chrome.runtime is available
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      console.log('chrome.runtime is available:', chrome.runtime)
      setExtensionStatus('Chrome runtime available')
    } else {
      console.log('chrome.runtime is not available')
      setExtensionStatus('Chrome runtime not available')
    }
  }, [])

  const testExtensionCommunication = (messageType) => {
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      setLastResponse({ error: 'Chrome runtime not available' })
      return
    }

    // Note: In a real scenario, you would need to replace 'your-extension-id-here' 
    // with the actual extension ID after installing the extension
    const extensionId = 'your-extension-id-here'
    
    let message
    switch (messageType) {
      case 'ping':
        message = { type: 'ping' }
        break
      case 'getData':
        message = { type: 'getData' }
        break
      case 'sendData':
        message = {
          type: 'sendData',
          data: {
            userAction: 'button_click',
            timestamp: Date.now(),
            pageUrl: window.location.href
          }
        }
        break
      default:
        message = { type: 'unknown' }
    }

    chrome.runtime.sendMessage(extensionId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Extension communication error:', chrome.runtime.lastError)
        setLastResponse({ 
          error: chrome.runtime.lastError.message,
          note: 'Make sure the Chrome extension is installed and the extension ID is correct'
        })
      } else {
        console.log('Extension response:', response)
        setLastResponse(response)
      }
    })
  }

  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>Welcome to our PWA!</p>
      
      <div className="extension-test">
        <h2>Chrome Extension Communication Test</h2>
        <p>Status: {extensionStatus}</p>
        
        <div className="test-buttons">
          <button onClick={() => testExtensionCommunication('ping')}>
            Test Ping
          </button>
          <button onClick={() => testExtensionCommunication('getData')}>
            Get Data
          </button>
          <button onClick={() => testExtensionCommunication('sendData')}>
            Send Data
          </button>
        </div>

        {lastResponse && (
          <div className="response">
            <h3>Last Response:</h3>
            <pre>{JSON.stringify(lastResponse, null, 2)}</pre>
          </div>
        )}

        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Install the Chrome extension from the <code>chrome-extension/</code> folder</li>
            <li>Get the extension ID from <code>chrome://extensions/</code></li>
            <li>Replace 'your-extension-id-here' in the code with the actual extension ID</li>
            <li>Test the communication using the buttons above</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
