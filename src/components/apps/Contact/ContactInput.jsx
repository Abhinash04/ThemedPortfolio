import { ErrorLine } from "@/components/apps/Contact/ContactTerminalLines";

const ContactInput = ({
  inputRef,
  input,
  setInput,
  error,
  clearError,
  currentConfig,
  onKeyDown,
}) => (
  <>
    <div className="flex items-center gap-2 pt-0.5 contact-line">
      <span className="text-green-400" aria-hidden>
        →
      </span>
      <span className="text-gray-500">~</span>
      <span className="text-gray-500">{currentConfig?.label}:</span>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (error) clearError();
        }}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent text-white caret-green-400 outline-none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={currentConfig?.label}
        aria-invalid={!!error}
      />
    </div>
    {error && <ErrorLine message={error} />}
  </>
);

export default ContactInput;
