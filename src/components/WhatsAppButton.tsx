const WHATSAPP_URL = 'https://wa.me/8615996890066?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.';

export function WhatsAppButton() {
  return <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contact GEELUNG on WhatsApp" title="WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3.2A12.7 12.7 0 0 0 5.2 22.6L3.5 28.8l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.8 1 1-3.7-.2-.4a10.5 10.5 0 1 1 8.8 4.8Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.9-.9-3.2-2.5-3.7-3.4-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z"/></svg>
    <span>WhatsApp</span>
  </a>;
}

