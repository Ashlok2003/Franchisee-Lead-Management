
import { AlertCircle, Mic, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../promotion.css';

const AIModal = ({ isOpen, onClose, actionType, onGenerate }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }
        setIsGenerating(true);
        setError(null);
        try {
            await onGenerate(prompt);
            setPrompt(''); // Clear prompt after successful generation
        } catch (err) {
            console.error(err);
            setError('Failed to generate content');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="modal-overlay" role="dialog" aria-labelledby="ai-modal-title">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="ai-modal-title">
                        AI {actionType === 'Email' ? 'Email' : 'Message'} Generator
                    </h3>
                    <button
                        onClick={onClose}
                        className="modal-close"
                        aria-label="Close AI generator modal"
                    >
                        <X className="icon" />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="form-label" htmlFor="ai-prompt">
                            Prompt
                        </label>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={`Describe the ${actionType === 'Email' ? 'email' : 'message'} content you want to generate...`}
                            className="form-textarea"
                            rows="5"
                            aria-describedby={error ? 'ai-error' : undefined}
                        />
                    </div>
                    {error && (
                        <div className="error-message" id="ai-error">
                            <AlertCircle className="icon" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="btn btn-secondary"
                        aria-label="Cancel and close modal"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="btn btn-primary"
                        aria-label={isGenerating ? 'Generating content' : 'Generate content'}
                    >
                        {isGenerating ? (
                            <span className="spinner" aria-hidden="true"></span>
                        ) : (
                            <Mic className="icon" aria-hidden="true" />
                        )}
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

AIModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    actionType: PropTypes.oneOf(['WhatsApp Business', 'Email', 'Phone Call']).isRequired,
    onGenerate: PropTypes.func.isRequired,
};

export default AIModal;