import { useRef, useEffect } from "react";
import windowWrapper from "@/hoc/windowWrapper";
import { useTerminalContactForm } from "@/hooks/useTerminalContactForm";
import ContactHeader from "@/components/apps/Contact/ContactHeader";
import ContactHistory from "@/components/apps/Contact/ContactHistory";
import ContactInput from "@/components/apps/Contact/ContactInput";
import ContactSummary from "@/components/apps/Contact/ContactSummary";
import ContactActions from "@/components/apps/Contact/ContactActions";
import ContactFooter from "@/components/apps/Contact/ContactFooter";

export const ContactCore = () => {
  const {
    step,
    formData,
    input,
    setInput,
    error,
    clearError,
    currentStepIndex,
    currentConfig,
    isInputStep,
    canSend,
    getStepIndex,
    advance,
    restart,
    send,
  } = useTerminalContactForm();

  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isInputStep) inputRef.current?.focus();
  }, [step, error, isInputStep]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      advance();
    }
  };

  const showSummary = currentStepIndex >= getStepIndex("summary");
  const isSent = step === "sent";

  return (
    <div className="h-full flex flex-col bg-[#1a1b26] font-mono text-[13px] select-text">
      <div
        className="flex-1 overflow-y-auto px-5 pt-5 pb-3 space-y-1.5 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <ContactHeader />

        <ContactHistory
          formData={formData}
          currentStepIndex={currentStepIndex}
          getStepIndex={getStepIndex}
        />

        {showSummary && (
          <ContactSummary formData={formData} isSent={isSent} />
        )}

        {isInputStep && (
          <ContactInput
            inputRef={inputRef}
            input={input}
            setInput={setInput}
            error={error}
            clearError={clearError}
            currentConfig={currentConfig}
            onKeyDown={handleKeyDown}
          />
        )}

        <div ref={endRef} />
      </div>

      {showSummary && (
        <ContactActions
          onRestart={restart}
          onSend={send}
          canSend={canSend}
          showSend={!isSent}
        />
      )}

      <ContactFooter />
    </div>
  );
};

const Contact = windowWrapper(ContactCore, "contact", "abhinash.pritiraj@gmail.com", {
  scrollableContent: false,
});

export default Contact;
