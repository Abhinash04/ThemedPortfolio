const ContactActions = ({ onRestart, onSend, canSend, showSend }) => (
  <div className="flex items-center gap-3 px-5 py-3 border-t border-white/8 bg-[#13131c] shrink-0">
    <button
      onClick={onRestart}
      className="px-4 py-1.5 rounded-md bg-[#2a2b3d] hover:bg-[#383952] text-gray-200 text-xs font-sans transition-colors"
    >
      Restart
    </button>

    {showSend && (
      <button
        onClick={onSend}
        disabled={!canSend}
        className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-sans transition-colors"
      >
        Send it!
      </button>
    )}
  </div>
);

export default ContactActions;
