import { Prompt } from "@/components/apps/Contact/ContactTerminalLines";

const ContactHeader = () => (
  <>
    <Prompt>
      Hey there! Got an Idea? A Bug to squash? Or just want to talk tech? Feel free to reach out!
    </Prompt>
    <p className="text-gray-600 text-[11px] tracking-wider pb-1 contact-line">
      {"─".repeat(95)}
    </p>
  </>
);

export default ContactHeader;
