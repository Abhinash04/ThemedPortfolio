import { Fragment } from "react";
import { STEP_CONFIG } from "../config";
import { Prompt, CheckLine } from "./ContactTerminalLines";

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
