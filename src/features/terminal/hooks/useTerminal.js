import { useState, useRef, useEffect } from "react";
import { terminalData } from "@/features/terminal/config";

export const useTerminal = () => {
  const [contentRows, setContentRows] = useState([]);
  const [rmrf, setRmrf] = useState(false);
  const [uniqueId, setUniqueId] = useState(0);

  const history = useRef([]);
  const historyIndex = useRef(0);
  const curDirPath = useRef([]);
  const curChildren = useRef(terminalData);

  const getCurDirName = () => {
    if (curDirPath.current.length === 0) return "~";
    return curDirPath.current[curDirPath.current.length - 1];
  };

  const getCurChildren = () => {
    let children = terminalData;
    for (const name of curDirPath.current) {
      const found = children.find(item => item.title === name && item.type === "folder");
      if (found) children = found.children;
    }
    return children;
  };

  const addRow = (row) => {
    setContentRows((prev) => {
      if (prev.find((item) => item.key === row.key)) return prev;
      return [...prev, row];
    });
  };

  const generateInputRow = (id) => {
    addRow({
      key: `terminal-input-row-${id}`,
      type: "input",
      id,
      dirName: getCurDirName(),
    });
  };

  const generateResultRow = (id, resultElement) => {
    addRow({
      key: `terminal-result-row-${id}`,
      type: "result",
      element: resultElement,
    });
  };

  // Commands
  const cd = (args, id) => {
    if (args === undefined || args === "~") {
      curDirPath.current = [];
      curChildren.current = terminalData;
    } else if (args === ".") {
      return;
    } else if (args === "..") {
      if (curDirPath.current.length === 0) return;
      curDirPath.current.pop();
      curChildren.current = getCurChildren();
    } else {
      const target = curChildren.current.find(item => item.title === args && item.type === "folder");
      if (target === undefined) {
        generateResultRow(id, `cd: no such file or directory: ${args}`);
      } else {
        curChildren.current = target.children;
        curDirPath.current.push(target.title);
      }
    }
  };

  const ls = (_args, id) => {
    const items = curChildren.current.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type
    }));
    generateResultRow(id, { type: "ls", items });
  };

  const cat = (args, id) => {
    const file = curChildren.current.find(item => item.title === args && item.type === "file");
    if (file === undefined) {
      generateResultRow(id, `cat: ${args}: No such file or directory`);
    } else {
      generateResultRow(id, file.content);
    }
  };

  const clear = () => setContentRows([]);

  const show = (args, id) => {
    if (args === "tech stack") {
      generateResultRow(id, { type: "techstack" });
    } else if (!args) {
      generateResultRow(id, "show: missing argument");
    } else {
      generateResultRow(id, `show: invalid argument: ${args}`);
    }
  };

  const help = (_args, id) => {
    generateResultRow(id, { type: "help" });
  };

  const commands = { cd, ls, cat, clear, show, help };

  const autoComplete = (text) => {
    if (text === "") return text;
    const input = text.split(" ");
    const cmd = input[0];
    const args = input[1];
    let result = text;

    if (args === undefined) {
      const guess = Object.keys(commands).find(item => item.substring(0, cmd.length) === cmd);
      if (guess !== undefined) result = guess;
    } else if (cmd === "cd" || cmd === "cat") {
      const type = cmd === "cd" ? "folder" : "file";
      const guess = curChildren.current.find(item => item.type === type && item.title.substring(0, args.length) === args);
      if (guess !== undefined) result = cmd + " " + guess.title;
    }
    return result;
  };

  const executeCommand = (inputText, id) => {
    const input = inputText.split(" ");
    const cmd = input[0];
    const args = input.length > 1 ? input.slice(1).join(" ") : undefined;

    if (inputText.substring(0, 6) === "rm -rf") {
      setRmrf(true);
    } else if (cmd && Object.keys(commands).includes(cmd)) {
      commands[cmd](args, id);
    } else if (cmd !== "") {
      generateResultRow(id, `zsh: command not found: ${cmd}`);
    }
    
    setUniqueId(prev => prev + 1);
  };

  // Initialize terminal
  useEffect(() => {
    generateInputRow(0);
    // Intentionally omits generateInputRow from deps: this must run only on mount
    // to seed the first prompt row; re-running on every render would duplicate rows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Track new prompts
  useEffect(() => {
    if (uniqueId > 0) {
       if (contentRows.length === 0) {
         generateInputRow(uniqueId);
       } else {
         // Only append input if the last row isn't already an input row for this ID
         const lastRow = contentRows[contentRows.length - 1];
         if (lastRow.type !== "input" || lastRow.id !== uniqueId) {
           generateInputRow(uniqueId);
         }
       }
    }
    // Intentionally omits contentRows from deps: including it would cause an infinite
    // loop because generateInputRow updates contentRows, which would re-trigger this
    // effect on every keystroke. uniqueId is the sole trigger for appending a new prompt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueId]);

  return {
    contentRows,
    rmrf,
    setRmrf,
    executeCommand,
    autoComplete,
    history,
    historyIndex
  };
};