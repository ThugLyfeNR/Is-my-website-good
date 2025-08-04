import React, { useState, useCallback } from 'react';
import type { AuditData } from './types';
import { performUIAudit } from './services/geminiService';
import Header from './components/Header';
import URLInputForm from './components/URLInputForm';
import Loader from './components/Loader';
import AuditResult from './components/AuditResult';

function App() {
  const [url, setUrl] = useState<string>('');
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAuditData(null);

    try {
      const result = await performUIAudit(url);
      if (result) {
        setAuditData(result);
      } else {
        setError("Failed to get a valid audit report. The response might be empty or malformed.");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to perform audit. Please check the URL and your connection. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [url, isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-10">
          <URLInputForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleAudit}
            isLoading={isLoading}
          />
          <div className="mt-10 min-h-[400px]">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-center animate-fadeInUp" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {auditData && (
              <div className="opacity-0 animate-fadeInUp" style={{ animationFillMode: 'forwards' }}>
                 <AuditResult data={auditData} url={url} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;