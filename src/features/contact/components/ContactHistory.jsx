import { Fragment } from "react";
import { STEP_CONFIG } from "@/features/contact/config";
import { Prompt, CheckLine } from "@/features/contact/components/ContactTerminalLines";

const ContactHistory = ({ formData, currentStepIndex, getStepIndex }) => (
  <>
    {STEP_CONFIG.map(({ key, prompt }) => {
      if (currentStepIndex < getStepIndex(key)) return null;
      return (
        <Fragment key={key}>
          <Prompt>
            {prompt.pre}{" "}
            <span className="text-violet-400">{prompt.highlight}</span>
          </Prompt>
          {formData[key] && <CheckLine value={formData[key]} />}
        </Fragment>
      );
    })}
  </>
);

export default ContactHistory;
