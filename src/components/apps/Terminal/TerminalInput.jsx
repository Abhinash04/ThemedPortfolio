const TerminalInput = ({ row, keyPress }) => {
  return (
    <div className="flex">
      <div className="w-max flex flex-row items-center space-x-1.5 mr-2">
        <span className="text-yellow-200">
          @abhinash{" "}
          <span className="text-green-300">{row.dirName}</span>
        </span>
        <span className="text-red-400">{">"}</span>
      </div>
      <input
        id={`terminal-input-${row.id}`}
        className="flex-1 px-1 text-white outline-none bg-transparent"
        onKeyDown={(e) => keyPress(e, row.id)}
        autoFocus={true}
        autoComplete="off"
      />
    </div>
  );
};

export default TerminalInput;
