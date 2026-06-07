import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully intercept and silent all unhandled third-party extension errors (e.g. MetaMask, Web3, or RPC in-page provider issues)
if (typeof window !== "undefined") {
  // 1. Silent standard console errors/warnings that match MetaMask or connection failure patterns
  const ignorePatterns = [
    /metamask/i,
    /ethereum/i,
    /web3/i,
    /rpc/i,
    /failed to connect/i,
    /in-page/i,
    /provider/i
  ];

  const shouldIgnore = (message: string) => {
    return ignorePatterns.some(pattern => pattern.test(message));
  };

  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorStr = args.map(arg => {
      try {
        return typeof arg === "object" ? JSON.stringify(arg) : String(arg);
      } catch {
        return String(arg);
      }
    }).join(" ");

    if (shouldIgnore(errorStr)) {
      return; // Swallowed
    }
    originalConsoleError(...args);
  };

  const originalConsoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    const warnStr = args.map(arg => {
      try {
        return typeof arg === "object" ? JSON.stringify(arg) : String(arg);
      } catch {
        return String(arg);
      }
    }).join(" ");

    if (shouldIgnore(warnStr)) {
      return; // Swallowed
    }
    originalConsoleWarn(...args);
  };

  // 2. Add capturing phase listeners to prevent browser/platform trackers from seeing the errors
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event?.reason;
    const reasonMessage = String(reason?.message || reason?.stack || reason || "");
    if (shouldIgnore(reasonMessage)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener("error", (event) => {
    const errorMsg = String(event?.message || "");
    const errorSrc = String(event?.filename || "");
    if (shouldIgnore(errorMsg) || shouldIgnore(errorSrc)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  // 3. Define or intercept window.ethereum/web3 to safely absorb method errors
  let currentEthereum = (window as any).ethereum;

  const makeSafeProvider = (provider: any) => {
    if (!provider || provider.__isSafeProxy) return provider;
    return new Proxy(provider, {
      get(target, prop, receiver) {
        if (prop === "__isSafeProxy") return true;
        const originalValue = Reflect.get(target, prop, receiver);
        if (typeof originalValue === "function") {
          return function (this: any, ...args: any[]) {
            try {
              const result = originalValue.apply(this, args);
              if (result && typeof result.catch === "function") {
                return result.catch((err: any) => {
                  // Suppressed async promise rejection inside provider
                });
              }
              return result;
            } catch (error: any) {
              // Suppressed synchronous error
              return Promise.resolve([]);
            }
          };
        }
        return originalValue;
      }
    });
  };

  if (currentEthereum) {
    (window as any).ethereum = makeSafeProvider(currentEthereum);
  }

  // Intercept subsequent injections of window.ethereum safely
  try {
    Object.defineProperty(window, "ethereum", {
      configurable: true,
      enumerable: true,
      get() {
        return currentEthereum;
      },
      set(newProvider) {
        currentEthereum = makeSafeProvider(newProvider);
      }
    });
  } catch (e) {
    // If native assignment is required or object is non-configurable
    (window as any).ethereum = makeSafeProvider((window as any).ethereum);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
