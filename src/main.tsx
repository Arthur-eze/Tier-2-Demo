import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully intercept and swallow unresolved third-party extension errors (e.g., MetaMask, MetaMask in-page provider, or other injected Web3 errors)
if (typeof window !== "undefined") {
  // Swallow console.error logs for MetaMask/Web3 connection errors
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const errorStr = args.map(arg => String(arg)).join(" ");
    if (
      /metamask/i.test(errorStr) || 
      /ethereum/i.test(errorStr) || 
      /web3/i.test(errorStr) ||
      /failed to connect/i.test(errorStr)
    ) {
      // Swallowed silently
      return;
    }
    originalError(...args);
  };

  window.addEventListener("unhandledrejection", (event) => {
    const reasonString = String(event?.reason?.message || event?.reason || "");
    const isMetaMaskOrWeb3 = 
      /metamask/i.test(reasonString) || 
      /ethereum/i.test(reasonString) || 
      /web3/i.test(reasonString) || 
      /rpc/i.test(reasonString) ||
      /failed to connect/i.test(reasonString);
    
    if (isMetaMaskOrWeb3) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener("error", (event) => {
    const errorMsg = String(event?.message || "");
    const errorSrc = String(event?.filename || "");
    const isMetaMaskOrWeb3 = 
      /metamask/i.test(errorMsg) || 
      /ethereum/i.test(errorMsg) || 
      /web3/i.test(errorMsg) || 
      /rpc/i.test(errorMsg) ||
      /metamask/i.test(errorSrc) ||
      /failed to connect/i.test(errorMsg);

    if (isMetaMaskOrWeb3) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
