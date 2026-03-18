const contentMap = {
  PROFILE_OVERVIEW: (
    <div className="py-1 space-y-2">
      <div>
        Hello, I'm{" "}
        <span className="text-green-300">Abhinash Pritiraj</span>, an
        Information Technology undergraduate at Odisha University of
        Technology and Research with a strong focus on modern web
        engineering and artificial intelligence-driven solutions.
      </div>
      <div>
        I enjoy designing scalable interfaces, building full-stack web
        applications, and exploring how intelligent systems can enhance
        real-world workflows. My work blends structured problem solving,
        clean UI practices, and continuous experimentation with emerging
        technologies.
      </div>
      <div>
        This portfolio reflects my technical journey, projects, and areas
        of curiosity — particularly artificial intelligence, data-centric
        development, and performance-focused frontend engineering.
      </div>
    </div>
  ),

  PROFILE_CONTACT: (
    <ul className="list-disc ml-6">
      <li>
        Email:{" "}
        <a
          className="text-blue-300 hover:underline"
          href="mailto:abhinash.pritiraj@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          abhinash.pritiraj@gmail.com
        </a>
      </li>
      <li>
        GitHub:{" "}
        <a
          className="text-blue-300 hover:underline"
          href="https://github.com/Abhinash04"
          target="_blank"
          rel="noreferrer"
        >
          @Abhinash04
        </a>
      </li>
      <li>
        LinkedIn:{" "}
        <a
          className="text-blue-300 hover:underline"
          href="https://www.linkedin.com/in/abhinashpritiraj"
          target="_blank"
          rel="noreferrer"
        >
          Abhinash Pritiraj
        </a>
      </li>
      <li>
        Portfolio:{" "}
        <a
          className="text-blue-300 hover:underline"
          href="https://portfolio-two-rose-56.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          portfolio-two-rose-56.vercel.app
        </a>
      </li>
      <li>
        Instagram:{" "}
        <a
          className="text-blue-300 hover:underline"
          href="https://www.instagram.com/abhinashpritiraj/"
          target="_blank"
          rel="noreferrer"
        >
          @abhinashpritiraj
        </a>
      </li>
    </ul>
  ),

  PHILOSOPHY: (
    <div className="py-1">
      <div>
        <span className="text-yellow-400">while</span>(
        <span className="text-blue-400">learning</span>) {"{"}
      </div>
      <div>
        <span className="text-blue-400 ml-9">experience</span>
        <span className="text-yellow-400">++</span>;
      </div>
      <div>{"}"}</div>
    </div>
  ),
};

export const renderTerminalContent = (key) => contentMap[key];
