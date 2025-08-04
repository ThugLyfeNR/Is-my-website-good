import React from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { SearchIcon } from './icons/SearchIcon';

interface URLInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const URLInputForm: React.FC<URLInputFormProps> = ({ url, setUrl, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <LinkIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full pl-11 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
          aria-label="Website URL"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {isLoading ? (
          <span className="flex items-center gap-1">
            Auditing
            <span className="dot-pulse" style={{ animationDelay: '0s' }}>.</span>
            <span className="dot-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="dot-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          </span>
        ) : (
          <>
            <SearchIcon className="h-5 w-5" />
            Audit Website
          </>
        )}
      </button>
    </form>
  );
};

export default URLInputForm;
