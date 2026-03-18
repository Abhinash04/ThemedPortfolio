import { STEP_CONFIG } from "../config";
import { Prompt, SummaryEntry, CheckLine } from "./ContactTerminalLines";

const ContactSummary = ({ formData, isSent }) => (
  <>
    <Prompt>Beautiful! Here&apos;s what I&apos;ve got:</Prompt>
    {STEP_CONFIG.map(({ key }) => (
      <SummaryEntry key={key} label={key} value={formData[key]} />
    ))}
    <Prompt>Look good?</Prompt>
    {isSent && <CheckLine value="Sent! I'll get back to you ASAP 🤩" />}
  </>
);

export default ContactSummary;
