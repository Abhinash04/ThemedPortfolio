import { windowWrapper } from "@/core/components";
import { useTerminal } from "@/features/terminal/hooks";
import { TerminalError, TerminalInput, TerminalRow } from "@/features/terminal/components";

export const TerminalCore = () => {
  const {
    contentRows,
    rmrf,
    setRmrf,
    executeCommand,
    autoComplete,
    history: historyRef,
    historyIndex: historyIndexRef
  } = useTerminal();

  const keyPress = (e, id) => {
    const keyCode = e.key;
    const inputElement = e.target;
    const inputText = inputElement.value.trim();

    if (keyCode === "Enter") {
      if (inputText !== "") {
        historyRef.current.push(inputText);
      }
      historyIndexRef.current = historyRef.current.length;
      inputElement.setAttribute("readonly", "true");

      executeCommand(inputText, id);
    } else if (keyCode === "ArrowUp") {
      if (historyRef.current.length > 0) {
        if (historyIndexRef.current > 0) historyIndexRef.current--;
        inputElement.value = historyRef.current[historyIndexRef.current];
      }
      e.preventDefault();
    } else if (keyCode === "ArrowDown") {
      if (historyRef.current.length > 0) {
        if (historyIndexRef.current < historyRef.current.length) historyIndexRef.current++;
        if (historyIndexRef.current === historyRef.current.length) {
          inputElement.value = "";
        } else {
          inputElement.value = historyRef.current[historyIndexRef.current];
        }
      }
      e.preventDefault();
    } else if (keyCode === "Tab") {
      inputElement.value = autoComplete(inputText);
      e.preventDefault();
    }
  };

  const focusOnInput = () => {
    if (contentRows.length > 0) {
      const inputs = contentRows.filter((r) => r.type === "input");
      if (inputs.length > 0) {
        const lastInput = inputs[inputs.length - 1];
        const inputEl = document.querySelector(`#terminal-input-${lastInput.id}`);
        if (inputEl) inputEl.focus();
      }
    }
  };

  return (
    <div
      className="font-normal relative h-full bg-gray-900/95 overflow-y-auto text-white text-sm"
      onClick={focusOnInput}
    >
      {rmrf && <TerminalError setRMRF={(value) => setRmrf(value)} />}
      <div className="py-2 px-1.5 font-mono">
        <span className="text-green-300">help</span>: Hey, you found the
        terminal! Type `help` to get started.
      </div>
      <div id="terminal-content" className="px-1.5 pb-2 font-mono">
        {contentRows.map((row) => {
          if (row.type === "input") {
            return <TerminalInput key={row.key} row={row} keyPress={keyPress} />;
          } else if (row.type === "result") {
            return <TerminalRow key={row.key} row={row} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Terminal = windowWrapper(TerminalCore, "terminal", "me@abhinash: ~");
export default Terminal;
