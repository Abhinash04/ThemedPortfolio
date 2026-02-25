import React from "react";

const terminal = [
  {
    id: "profile",
    title: "profile",
    type: "folder",
    children: [
      {
        id: "profile-overview",
        title: "overview.txt",
        type: "file",
        content: (
          <div className="py-1 space-y-2">
            <div>
              Hello, I'm <span className="text-green-300">Abhinash Pritiraj</span>, 
              an Information Technology undergraduate at Odisha University of 
              Technology and Research with a strong focus on modern web engineering 
              and artificial intelligence-driven solutions.
            </div>
            <div>
              I enjoy designing scalable interfaces, building full-stack web 
              applications, and exploring how intelligent systems can enhance 
              real-world workflows. My work blends structured problem solving, 
              clean UI practices, and continuous experimentation with emerging technologies.
            </div>
            <div>
              This portfolio reflects my technical journey, projects, and areas of 
              curiosity — particularly artificial intelligence, data-centric development, 
              and performance-focused frontend engineering.
            </div>
          </div>
        )
      },
      {
        id: "profile-interests",
        title: "interests.txt",
        type: "file",
        content:
          "Artificial Intelligence / Machine Learning Concepts / Modern Web Development / UI Engineering / React Ecosystem / Problem Solving / System Design Fundamentals"
      },
      {
        id: "profile-education",
        title: "education.txt",
        type: "file",
        content:
          "Bachelor's Degree in Information Technology — Odisha University of Technology and Research. Focused on software engineering principles, web technologies, and exploring AI-based applications through self-driven learning."
      },
      {
        id: "profile-community",
        title: "community.txt",
        type: "file",
        content:
          "Active member of the Zairza Technical Club, contributing to web development initiatives and preparing for national and campus-level technical competitions. Continuously collaborating with peers to improve development practices and innovation skills."
      },
      {
        id: "profile-goals",
        title: "goals.txt",
        type: "file",
        content:
          "My objective is to contribute to impactful software products by combining strong frontend engineering with intelligent systems design. I aim to build scalable applications that solve practical problems while continuously expanding my expertise in artificial intelligence and advanced web technologies."
      },
      {
        id: "profile-contact",
        title: "contact.txt",
        type: "file",
        content: (
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
        )
      }
    ]
  },
  {
    id: "philosophy",
    title: "learning-philosophy.cpp",
    type: "file",
    content: (
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
    )
  }
];

export default terminal;
