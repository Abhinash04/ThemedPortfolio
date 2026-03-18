import { useState } from "react";
import {
  STEP_CONFIG,
  FORM_KEYS,
  ALL_STEPS,
  EMPTY_FORM,
} from "../config";

export const useTerminalContactForm = () => {
  const [step, setStep] = useState(FORM_KEYS[0]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const getStepIndex = (s) => ALL_STEPS.indexOf(s);
  const currentStepIndex = getStepIndex(step);
  const currentConfig = STEP_CONFIG.find((s) => s.key === step) ?? null;

  const isInputStep = currentStepIndex < getStepIndex("summary");
  const canSend = FORM_KEYS.every((k) => Boolean(formData[k]));

  const advance = () => {
    const value = input.trim();
    if (!value) return;

    const result = currentConfig?.validator?.(value) ?? true;
    if (result !== true) {
      setError(result);
      return;
    }

    setError("");
    setInput("");
    setFormData((prev) => ({ ...prev, [step]: value }));
    setStep(ALL_STEPS[currentStepIndex + 1]);
  };

  const restart = () => {
    setStep(FORM_KEYS[0]);
    setFormData(EMPTY_FORM);
    setInput("");
    setError("");
  };

  const send = () => setStep("sent");

  const clearError = () => setError("");

  return {
    // State
    step,
    formData,
    input,
    setInput,
    error,
    // Derived
    currentStepIndex,
    currentConfig,
    isInputStep,
    canSend,
    // Helpers
    getStepIndex,
    clearError,
    // Actions
    advance,
    restart,
    send,
  };
};
