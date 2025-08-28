# Client Portal Chrome Extension

A Chrome extension that allows external web pages to communicate with the Client Portal PWA through Chrome's messaging API.

## Features

- **External Message Listening**: Accepts messages from authorized web pages
- **Message Type Handling**: Supports different message types (`ping`, `getData`, `sendData`)
- **Response System**: Sends structured responses back to requesting pages
- **Security**: Only accepts messages from authorized domains

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `chrome-extension` folder
4. The extension will be loaded and ready to receive messages

## Authorized Domains

The extension accepts messages from:
- `https://v-launcher.github.io/*` (GitHub Pages deployment)
- `http://localhost:*` (Local development)
- `https://localhost:*` (Local development with HTTPS)

## Usage from Web Pages

To send messages to the extension from a web page, use the Chrome runtime messaging API:

```javascript
// Get the extension ID (you'll need to replace this with the actual ID after installation)
const extensionId = 'your-extension-id-here';

// Send a ping message
chrome.runtime.sendMessage(extensionId, {
  type: 'ping'
}, (response) => {
  if (response && response.success) {
    console.log('Ping response:', response.message);
  }
});

// Request data from the extension
chrome.runtime.sendMessage(extensionId, {
  type: 'getData'
}, (response) => {
  if (response && response.success) {
    console.log('Received data:', response.data);
  }
});

// Send data to the extension
chrome.runtime.sendMessage(extensionId, {
  type: 'sendData',
  data: {
    userAction: 'button_click',
    timestamp: Date.now(),
    pageUrl: window.location.href
  }
}, (response) => {
  if (response && response.success) {
    console.log('Data sent successfully:', response.message);
  }
});
```

## Supported Message Types

### `ping`
Simple connectivity test
- **Request**: `{ type: 'ping' }`
- **Response**: `{ success: true, message: 'Pong from Client Portal Extension', timestamp: number, extensionId: string }`

### `getData`
Request data from the extension
- **Request**: `{ type: 'getData' }`
- **Response**: `{ success: true, data: object }`

### `sendData`
Send data to the extension
- **Request**: `{ type: 'sendData', data: any }`
- **Response**: `{ success: true, message: string, receivedData: any, timestamp: number }`

## Error Handling

If an unknown message type is sent, the extension will respond with:
```javascript
{
  success: false,
  error: 'Unknown message type: ...',
  availableTypes: ['ping', 'getData', 'sendData']
}
```

## Development

The extension uses Manifest V3 and consists of:
- `manifest.json`: Extension configuration and permissions
- `background.js`: Service worker that handles external messages

## Security Notes

- The extension only accepts messages from pre-defined domains
- All message handling is logged to the console for debugging
- No sensitive data should be transmitted through this messaging system

## Auto-Updates

For self-hosted installations, the extension includes an `update.xml` file that enables automatic updates:

1. The extension checks for updates using the update manifest at `update.xml`
2. When a new version is available, Chrome will automatically download and install it
3. The update URL points to the GitHub Pages deployment for easy distribution

### Setting up Auto-Updates

1. Host the extension on a web server (like GitHub Pages)
2. Update the `update.xml` file with the correct extension ID
3. Ensure the `.crx` package file is accessible at the specified URL
4. Users who install from the hosted location will receive automatic updates

### Building Extension Package

To create a `.crx` package for distribution:

1. **Manual Method**: Use Chrome's extension developer tools
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Pack extension"
   - Select the `chrome-extension` folder
   - This generates a `.crx` file and `.pem` private key

2. **Command Line Method**: Use Chrome command line tools
   ```bash
   # Example command (requires Chrome/Chromium installed)
   google-chrome --pack-extension=/path/to/chrome-extension --pack-extension-key=/path/to/private-key.pem
   ```

3. **Update the update.xml file**:
   - Replace `{extension-id}` with the actual extension ID
   - Ensure the `.crx` file is uploaded to the correct URL
   - Update version number when releasing new versions

## Troubleshooting

1. **Extension not receiving messages**: Check that the sending domain is listed in `externally_connectable.matches`
2. **Console errors**: Open Chrome DevTools > Extensions > Service Worker to view background script logs
3. **Installation issues**: Ensure all files are in the correct directory structure
4. **Update issues**: Verify the update.xml file is accessible and points to a valid .crx file