export const Prompt = ({ children }) => (
  <p className="text-gray-200 leading-relaxed contact-line">{children}</p>
);

export const CheckLine = ({ value }) => (
  <p className="text-green-400 flex items-center gap-2 leading-relaxed contact-line">
    <span aria-hidden>✅</span>
    <span>{value}</span>
  </p>
);

export const SummaryEntry = ({ label, value }) => (
  <p className="leading-relaxed contact-line">
    <span className="text-violet-400">{label}: </span>
    <span className="text-gray-200">{value}</span>
  </p>
);

export const ErrorLine = ({ message }) => (
  <p className="text-red-400 flex items-center gap-2 leading-relaxed contact-line">
    <span aria-hidden>✗</span>
    <span>{message}</span>
  </p>
);
