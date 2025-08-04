import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          AI UX/UI Auditor
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Enter a website URL to receive an instant, AI-powered UX/UI audit. Get insights on usability, design, accessibility, and more.
      </p>
    </header>
  );
};

export default Header;