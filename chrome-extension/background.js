// Background service worker for Client Portal Extension
// Listens for external messages from web pages

console.log('Client Portal Extension background service worker loaded');

// Listen for external messages from web pages
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log('Received external message:', message);
  console.log('From sender:', sender);

  // Handle different message types
  switch (message.type) {
    case 'ping':
      console.log('Ping received from:', sender.url);
      sendResponse({
        success: true,
        message: 'Pong from Client Portal Extension',
        timestamp: Date.now(),
        extensionId: chrome.runtime.id
      });
      break;

    case 'getData':
      console.log('Data request received from:', sender.url);
      // Example: Return some data to the requesting page
      sendResponse({
        success: true,
        data: {
          extensionName: 'Client Portal Extension',
          version: '1.0.0',
          timestamp: Date.now(),
          message: 'Data successfully retrieved from extension'
        }
      });
      break;

    case 'sendData':
      console.log('Data received from web page:', message.data);
      // Process the received data here
      sendResponse({
        success: true,
        message: 'Data received and processed successfully',
        receivedData: message.data,
        timestamp: Date.now()
      });
      break;

    default:
      console.log('Unknown message type:', message.type);
      sendResponse({
        success: false,
        error: 'Unknown message type: ' + message.type,
        availableTypes: ['ping', 'getData', 'sendData']
      });
  }

  // Return true to indicate that the response will be sent asynchronously
  return true;
});

// Optional: Listen for extension installation/startup
chrome.runtime.onStartup.addListener(() => {
  console.log('Client Portal Extension started');
});

chrome.runtime.onInstalled.addListener((details) => {
  console.log('Client Portal Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    console.log('Extension installed for the first time');
  } else if (details.reason === 'update') {
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// Example: Store some data in extension storage (optional)
chrome.runtime.onMessage.addListener((message) => {
  // This handles internal messages within the extension
  console.log('Internal message received:', message);
  return true;
});