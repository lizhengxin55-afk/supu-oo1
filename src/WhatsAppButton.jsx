import { WhatsappLogo } from "@phosphor-icons/react";

const whatsappUrl = "https://wa.me/8618061128988?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Supfield on WhatsApp"
      title="Chat on WhatsApp"
    >
      <WhatsappLogo size={29} weight="fill" aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
