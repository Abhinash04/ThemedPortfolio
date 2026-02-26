import React from "react";
import terminalConfig from "@/configs/terminal";
import HowDare from "./HowDare";
import { techStack } from "@/constants";
import { Check, Flag } from "lucide-react";

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.history = [];
    this.curHistory = 0;
    this.curInputTimes = 0;
    this.curDirPath = [];
    this.curChildren = terminalConfig;
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      help: this.help,
      show: this.show
    };
    
    this.state = {
      content: [],
      rmrf: false
    };
  }

  componentDidMount() {
    this.generateInputRow(this.curInputTimes);
  }

  addRow = (row) => {
    this.setState((prevState) => {
      if (prevState.content.find((item) => item.key === row.key)) return null;
      return { content: [...prevState.content, row] };
    });
  };

  getCurDirName = () => {
    if (this.curDirPath.length === 0) return "~";
    else return this.curDirPath[this.curDirPath.length - 1];
  };

  getCurChildren = () => {
    let children = terminalConfig;
    for (const name of this.curDirPath) {
      const found = children.find((item) => {
        return item.title === name && item.type === "folder";
      });
      if(found) children = found.children;
    }
    return children;
  };

  cd = (args) => {
    if (args === undefined || args === "~") {
      this.curDirPath = [];
      this.curChildren = terminalConfig;
    } else if (args === ".") {
      return;
    } else if (args === "..") {
      if (this.curDirPath.length === 0) return;
      this.curDirPath.pop();
      this.curChildren = this.getCurChildren();
    } else {
      const target = this.curChildren.find((item) => {
        return item.title === args && item.type === "folder";
      });
      if (target === undefined) {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`cd: no such file or directory: ${args}`}</span>
        );
      } else {
        this.curChildren = target.children;
        this.curDirPath.push(target.title);
      }
    }
  };

  ls = () => {
    const result = [];
    for (const item of this.curChildren) {
      result.push(
        <span
          key={`terminal-result-ls-${this.curInputTimes}-${item.id}`}
          className={`${item.type === "file" ? "text-white" : "text-purple-300"}`}
        >
          {item.title}
        </span>
      );
    }
    this.generateResultRow(
      this.curInputTimes,
      <div className="grid grid-cols-4 w-full">{result}</div>
    );
  };

  cat = (args) => {
    const file = this.curChildren.find((item) => {
      return item.title === args && item.type === "file";
    });

    if (file === undefined) {
      this.generateResultRow(
        this.curInputTimes,
        <span>{`cat: ${args}: No such file or directory`}</span>
      );
    } else {
      this.generateResultRow(this.curInputTimes, <span>{file.content}</span>);
    }
  };

  clear = () => {
    this.setState({ content: [] });
  };

  show = (args) => {
    if (args === "tech stack") {
      const content = (
        <div className="w-full mt-2 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map(({ category, items }) => (
              <div key={category} className="mb-2">
                <h3 className="text-green-300 font-bold mb-2 flex items-center gap-2 border-b border-gray-700/50 pb-1 w-max">
                  <Check size={16} className="text-green-400" /> {category}
                </h3>
                <ul className="pl-6 space-y-1 list-disc list-inside marker:text-gray-500">
                  {items.map((item, i) => (
                    <li key={i} className="text-gray-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between text-xs text-gray-500">
              <p className="flex items-center gap-1.5 mb-2 sm:mb-0">
                <Check size={14} className="text-green-500"/> {techStack.length} of {techStack.length} stacks loaded successfully (100%)
              </p>
              <p className="flex items-center gap-1.5">
                <Flag size={12} className="text-gray-500" fill="currentColor"/> Render time: 6ms
              </p>
          </div>
        </div>
      );
      this.generateResultRow(this.curInputTimes, content);
    } else if (!args) {
      this.generateResultRow(
        this.curInputTimes,
        <span>show: missing argument</span>
      );
    } else {
      this.generateResultRow(
        this.curInputTimes,
        <span>{`show: invalid argument: ${args}`}</span>
      );
    }
  };

  help = () => {
    const help = (
      <ul className="list-disc ml-6 pb-1.5">
        <li>
          <span className="text-red-400">cat {"<file>"}</span> - See the content of {"<file>"}
        </li>
        <li>
          <span className="text-red-400">cd {"<dir>"}</span> - Move into
          {" <dir>"}, "cd .." to move to the parent directory, "cd" or "cd ~" to return to
          root
        </li>
        <li>
          <span className="text-red-400">ls</span> - See files and directories in the current
          directory
        </li>
        <li>
          <span className="text-red-400">clear</span> - Clear the screen
        </li>
        <li>
          <span className="text-red-400">help</span> - Display this help menu
        </li>
        <li>
          <span className="text-red-400">show tech stack</span> - Display my tech stack
        </li>
        <li>
          <span className="text-red-400">rm -rf /</span> - :)
        </li>
        <li>
          press <span className="text-red-400">up arrow / down arrow</span> - Select history commands
        </li>
        <li>
          press <span className="text-red-400">tab</span> - Auto complete
        </li>
      </ul>
    );
    this.generateResultRow(this.curInputTimes, help);
  };

  autoComplete = (text) => {
    if (text === "") return text;

    const input = text.split(" ");
    const cmd = input[0];
    const args = input[1];

    let result = text;

    if (args === undefined) {
      const guess = Object.keys(this.commands).find((item) => {
        return item.substring(0, cmd.length) === cmd;
      });
      if (guess !== undefined) result = guess;
    } else if (cmd === "cd" || cmd === "cat") {
      const type = cmd === "cd" ? "folder" : "file";
      const guess = this.curChildren.find((item) => {
        return item.type === type && item.title.substring(0, args.length) === args;
      });
      if (guess !== undefined) result = cmd + " " + guess.title;
    }
    return result;
  };

  keyPress = (e) => {
    const keyCode = e.key;
    const inputElement = document.querySelector(
      `#terminal-input-${this.curInputTimes}`
    );
    if (!inputElement) return;
    const inputText = inputElement.value.trim();
    const input = inputText.split(" ");

    if (keyCode === "Enter") {
      if (inputText !== "") {
        this.history.push(inputText);
      }

      const cmd = input[0];
      const args = input.length > 1 ? input.slice(1).join(" ") : undefined;

      inputElement.setAttribute("readonly", "true");

      if (inputText.substring(0, 6) === "rm -rf") this.setState({ rmrf: true });
      else if (cmd && Object.keys(this.commands).includes(cmd)) {
        this.commands[cmd](args);
      } else if (cmd !== "") {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`zsh: command not found: ${cmd}`}</span>
        );
      }

      this.curHistory = this.history.length;
      this.curInputTimes += 1;
      this.generateInputRow(this.curInputTimes);
    } else if (keyCode === "ArrowUp") {
      if (this.history.length > 0) {
        if (this.curHistory > 0) this.curHistory--;
        const historyCommand = this.history[this.curHistory];
        inputElement.value = historyCommand;
      }
    } else if (keyCode === "ArrowDown") {
      if (this.history.length > 0) {
        if (this.curHistory < this.history.length) this.curHistory++;
        if (this.curHistory === this.history.length) inputElement.value = "";
        else {
          const historyCommand = this.history[this.curHistory];
          inputElement.value = historyCommand;
        }
      }
    } else if (keyCode === "Tab") {
      inputElement.value = this.autoComplete(inputText);
      e.preventDefault();
    }
  };

  focusOnInput = (id) => {
    const input = document.querySelector(`#terminal-input-${id}`);
    if(input) input.focus();
  };

  generateInputRow = (id) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} className="flex">
        <div className="w-max flex flex-row items-center space-x-1.5 mr-2">
          <span className="text-yellow-200">
            @abhinash <span className="text-green-300">{this.getCurDirName()}</span>
          </span>
          <span className="text-red-400">{">"}</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 px-1 text-white outline-none bg-transparent"
          onKeyDown={this.keyPress}
          autoFocus={true}
          autoComplete="off"
        />
      </div>
    );
    this.addRow(newRow);
  };

  generateResultRow = (id, result) => {
    const newRow = (
      <div key={`terminal-result-row-${id}`} className="break-all pt-1 pb-1">
        {result}
      </div>
    );
    this.addRow(newRow);
  };

  render() {
    return (
      <div
        className="font-normal relative h-full bg-gray-900/95 overflow-y-auto text-white text-sm"
        onClick={() => this.focusOnInput(this.curInputTimes)}
      >
        {this.state.rmrf && (
          <HowDare setRMRF={(value) => this.setState({ rmrf: value })} />
        )}
        <div className="py-2 px-1.5 font-mono">
          <span className="text-green-300">help</span>: Hey, you found the terminal!
          Type `help` to get started.
        </div>
        <div id="terminal-content" className="px-1.5 pb-2 font-mono">
          {this.state.content}
        </div>
      </div>
    );
  }
}
