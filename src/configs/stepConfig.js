export const STEP_CONFIG = [
  {
    key: "email",
    label: "Enter email",
    prompt: { pre: "To start, could you give me", highlight: "your email?" },
    validator: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
        ? true
        : "Invalid email format — expected name@example.com",
  },
  {
    key: "name",
    label: "Enter name",
    prompt: { pre: "Awesome! And what's", highlight: "your name?" },
    validator: () => true,
  },
  {
    key: "number",
    label: "Enter number",
    prompt: { pre: "Great! And what's", highlight: "your contact number?" },
    validator: (v) =>
      /^\d{10}$/.test(v)
        ? true
        : "Must be exactly 10 digits with no spaces or dashes",
  },
  {
    key: "description",
    label: "Enter description",
    prompt: { pre: "Perfect, and", highlight: "how can I help you?" },
    validator: () => true,
  },
];

export const FORM_KEYS = STEP_CONFIG.map((s) => s.key);
export const ALL_STEPS = [...FORM_KEYS, "summary", "sent"];
export const EMPTY_FORM = Object.fromEntries(FORM_KEYS.map((k) => [k, ""]));
