
import React, { useState } from 'react';
import type { AuditData, AuditSection, GroundingSource, ImprovementPoint } from '../types';
import { generateVisualExample, getWebsiteStyleDescription } from '../services/geminiService';
import ImageModal from './ImageModal';
import { LinkIcon } from './icons/LinkIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WarningIcon } from './icons/WarningIcon';
import { EyeIcon } from './icons/EyeIcon';
import ConsultationCTA from './ConsultationCTA';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  
  let scoreColorClass, ringColorClass, glowColorClass;
  if (score >= 80) {
    scoreColorClass = 'text-green-400';
    ringColorClass = 'stroke-green-500';
    glowColorClass = 'shadow-[0_0_20px_5px] shadow-green-500/20';
  } else if (score >= 50) {
    scoreColorClass = 'text-yellow-400';
    ringColorClass = 'stroke-yellow-500';
    glowColorClass = 'shadow-[0_0_20px_5px] shadow-yellow-500/20';
  } else {
    scoreColorClass = 'text-red-400';
    ringColorClass = 'stroke-red-500';
    glowColorClass = 'shadow-[0_0_20px_5px] shadow-red-500/20';
  }

  return (
    <div className={`relative flex items-center justify-center w-40 h-40 rounded-full transition-shadow duration-700 ${glowColorClass}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle className="text-gray-700/50" strokeWidth="8" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
        <circle
          className={`${ringColorClass} transition-all duration-1000 ease-out`}
          style={{ transitionProperty: 'stroke-dashoffset' }}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
      </svg>
      <span className={`absolute text-4xl font-bold ${scoreColorClass}`}>{score}</span>
    </div>
  );
};

const SectionCard: React.FC<{ section: AuditSection; index: number; onViewExample: (prompt: string) => void }> = ({ section, index, onViewExample }) => {
  const scoreColor = section.score >= 8 ? 'text-green-400' : section.score >= 5 ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="p-[1px] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900/80 rounded-xl opacity-0 animate-fadeInUp" style={{ '--animation-delay': `${index * 150}ms` } as React.CSSProperties}>
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 h-full">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white pr-4">{section.title}</h3>
          <span className={`text-2xl font-bold ${scoreColor}`}>{section.score}<span className="text-base text-gray-400">/10</span></span>
        </div>
        <p className="mt-2 text-sm text-gray-400 italic">{section.explanation}</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-green-400">
              <CheckIcon className="w-5 h-5"/>
              Positive Points
            </h4>
            <ul className="mt-2 space-y-2 text-gray-300 text-sm list-inside">
              {section.positivePoints.map((point, i) => <li key={i} className="flex items-start gap-2"><span className="text-green-500 mt-1">&#8226;</span><span>{point}</span></li>)}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-yellow-400">
              <WarningIcon className="w-5 h-5"/>
              Areas for Improvement
            </h4>
            <ul className="mt-2 space-y-3 text-gray-300 text-sm">
                {section.areasForImprovement.map(({ point, isVisualizable }, i) => (
                    <li key={i} className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1 flex-shrink-0">&#8226;</span>
                            <span>{point}</span>
                        </div>
                        {isVisualizable && (
                            <button 
                                onClick={() => onViewExample(point)} 
                                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1 rounded-md bg-cyan-900/40 hover:bg-cyan-900/60 transition-colors flex-shrink-0"
                                aria-label={`View visual for ${point}`}
                            >
                                <EyeIcon className="w-4 h-4" />
                                <span>Visual</span>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sources: React.FC<{ sources: GroundingSource[], sectionCount: number }> = ({ sources, sectionCount }) => {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="p-[1px] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900/80 rounded-xl lg:col-span-2 opacity-0 animate-fadeInUp" style={{ '--animation-delay': `${sectionCount * 150}ms` } as React.CSSProperties}>
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-lg font-bold text-white">Sources</h3>
        <p className="text-sm text-gray-400 mb-4">The AI used the following web pages to inform this audit.</p>
        <ul className="space-y-2">
            {sources.map((source, index) => (
                <li key={index}>
                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:underline break-all text-sm">
                        <LinkIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{source.web.title || source.web.uri}</span>
                    </a>
                </li>
            ))}
        </ul>
    </div>
  </div>
  );
};

interface AuditResultProps {
  data: AuditData;
  url: string;
}

const AuditResult: React.FC<AuditResultProps> = ({ data, url }) => {
  const [modalState, setModalState] = useState<{
      isOpen: boolean;
      isLoading: boolean;
      imageData: string | null;
      promptText: string | null;
      error: string | null;
    }>({ isOpen: false, isLoading: false, imageData: null, promptText: null, error: null });

  const handleViewExample = async (improvementPoint: string) => {
    setModalState({ isOpen: true, isLoading: true, imageData: null, promptText: improvementPoint, error: null });
    try {
      // Step 1: Get the visual style description from the URL
      const styleDescription = await getWebsiteStyleDescription(url);
      
      // Step 2: Generate the visual example using the style description
      const base64Image = await generateVisualExample(improvementPoint, styleDescription);

      setModalState(prevState => ({ ...prevState, isLoading: false, imageData: `data:image/jpeg;base64,${base64Image}` }));
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Could not generate visual example.';
      setModalState(prevState => ({ ...prevState, isLoading: false, error: errorMessage }));
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, isLoading: false, imageData: null, promptText: null, error: null });
  };

  return (
    <div className="space-y-8">
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        isLoading={modalState.isLoading}
        imageData={modalState.imageData}
        promptText={modalState.promptText}
        error={modalState.error}
      />

      <div className="p-[1px] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900/80 rounded-xl opacity-0 animate-fadeInUp">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            <ScoreGauge score={data.audit.overallScore} />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">Overall UX/UI Score</h2>
              <p className="mt-2 text-gray-300 max-w-xl">{data.audit.summary}</p>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.audit.sections.map((section, index) => (
          <SectionCard key={index} section={section} index={index + 1} onViewExample={handleViewExample} />
        ))}
        <Sources sources={data.sources} sectionCount={data.audit.sections.length + 1} />
      </div>

      <div className="mt-12 opacity-0 animate-fadeInUp" style={{ '--animation-delay': `${(data.audit.sections.length + 2) * 150}ms` } as React.CSSProperties}>
          <ConsultationCTA />
      </div>
    </div>
  );
};

export default AuditResult;