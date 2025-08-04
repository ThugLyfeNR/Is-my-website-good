import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  imageData: string | null;
  promptText: string | null;
  error: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, isLoading, imageData, promptText, error }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div 
        className="bg-gray-900/80 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-2xl animate-zoomIn"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-start mb-4">
            <h2 id="image-modal-title" className="text-lg font-semibold text-gray-200 pr-4">
                <span className="font-normal text-gray-400">Visual Example for: </span>
                {promptText}
            </h2>
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="Close modal"
            >&times;</button>
        </div>
        
        <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            {isLoading && (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400">Generating visual example...</p>
                </div>
            )}
            {error && (
                <div className="text-center text-red-400 px-4">
                    <p className="font-semibold">Generation Failed</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {imageData && (
                <img 
                    src={imageData}
                    alt={`AI-generated visual example for: ${promptText}`}
                    className="w-full h-full object-contain rounded-lg animate-fadeIn"
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;