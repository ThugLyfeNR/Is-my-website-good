import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { FileTextIcon } from './icons/FileTextIcon';

const ConsultationCTA: React.FC = () => {
  return (
    <div className="p-[1px] bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 rounded-xl">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700">
              <UserCircleIcon className="w-16 h-16 text-cyan-400" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Get a Personal Consultation with Ryan Soni</h3>
            <p className="mt-1 text-cyan-400 font-semibold">Lead UX Strategist, 7+ Years Experience</p>
            <p className="mt-3 text-gray-300 max-w-xl mx-auto sm:mx-0">
              For just $5 (the price of a coffee), you can book a 1-hour call to discuss this audit, get expert insights, and create a tailored action plan for your website.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://calendly.com/ryansoni/ux-consultation" // Replace with your actual booking link
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            Book Your Call
          </a>
          <a
            href="https://example.com/ryan-soni-resume.pdf" // Replace with your resume link
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-800/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-all duration-300"
          >
            <FileTextIcon className="w-5 h-5"/>
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCTA;