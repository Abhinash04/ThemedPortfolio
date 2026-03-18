import { Github, Globe, Instagram, Linkedin } from "lucide-react";
import { socials } from "@/constants/portfolio.constants";

const SOCIAL_ICONS = {
  Github: Github,
  Platform: Globe,
  Instagram: Instagram,
  LinkedIn: Linkedin,
};

const ContactFooter = () => (
  <div className="shrink-0 border-t border-white/8 bg-[#13131c] px-5 py-3 flex items-center gap-3">
    <span className="font-mono text-[11px] text-gray-500">find me on:</span>
    <div className="flex items-center gap-4">
      {socials.map(({ id, text, link }) => {
        const Icon = SOCIAL_ICONS[text];
        if (!Icon) return null;
        return (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="relative group text-gray-500 hover:text-white transition-colors duration-150"
          >
            <Icon size={15} strokeWidth={1.5} />
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {text}
            </span>
          </a>
        );
      })}
    </div>
  </div>
);

export default ContactFooter;
