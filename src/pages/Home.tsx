import React from "react";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaHardHat, FaGithub } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="max-w-xl w-full text-center space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Steve Massey</h1>
        <p className="text-gray-700">Software Engineer | Engineering Leader</p>
        <div className="flex justify-center space-x-6 text-indigo-700 text-xl">
          <a href="mailto:steve@stevemassey.net" title="Email">
            <FaEnvelope />
          </a>
          <a href="tel:+17067667816" title="Phone">
            <FaPhoneAlt />
          </a>
          <a href="https://www.linkedin.com/in/stevepmassey" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/stmassey84/engineering-doctrine"
            title="View Source"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </section>
      <hr className="border-t border-gray-300" />
      <section className="space-y-4">
        <FaHardHat className="mx-auto text-4xl text-yellow-600" />
        <h2 className="text-2xl font-semibold">Blog coming soon</h2>
        <p className="text-gray-600">
          Stay tuned for insights on engineering philosophy, design, challenges, solutions, and more. I will be sharing
          my thoughts and experiences in the world of software engineering. Until then, feel free to{" "}
          <a
            className="text-indigo-600 hover:underline"
            href="https://github.com/stmassey84/engineering-doctrine"
            title="View Source"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore how I built this site
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Home;
