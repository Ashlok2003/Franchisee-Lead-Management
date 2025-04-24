import { useAI } from '@/contexts/AIContext';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { useEffect, useRef, useState } from 'react';
import './assistant.css';

const FloatingButtonWithModal = () => {
    const {
        isOpen,
        setIsOpen,
        inputText,
        setInputText,
        setError
    } = useAI();

    const { handleGenerate, isGenerating, generationError, setIsGenerating } = useAIAssistant();
    const textareaRef = useRef(null);
    const chatHistoryRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages, isGenerating]);

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim() && attachments.length === 0) return;

        const userMessage = {
            role: 'user',
            content: inputText.trim(),
            attachments: attachments.map(file => ({
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file)
            }))
        };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setAttachments([]);
        setIsGenerating(true);

        try {
            const result = await handleGenerate(inputText);
            const assistantMessage = { role: 'assistant', content: result.content, attachments: [] };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(files);
        e.target.value = null;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const resizeTextarea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    return (
        <>
            {
                !isOpen && (
                    <button
                        className="floating-button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle AI Assistant"
                    >
                        <span className="ai-icon">🤖</span>
                    </button>
                )
            }

            <div className={`assistant-modal-wrapper ${isOpen ? 'open' : ''}`}>
                {isOpen && (
                    <div className="assistant-modal-content">
                        <div className="modal-header">
                            <h3>AI Assistant</h3>
                            <button
                                className="close-button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close assistant"
                            >
                                ×
                            </button>
                        </div>

                        <div className="chat-history" ref={chatHistoryRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`message-wrapper ${msg.role}`}>
                                    <div className="message">
                                        {msg.content}
                                        {msg.attachments && msg.attachments.length > 0 && (
                                            <div className="attachments">
                                                {msg.attachments.map((att, idx) => (
                                                    <div key={idx} className="attachment-item">
                                                        {att.type.startsWith('image/') ? (
                                                            <img src={att.url} alt={att.name} className="attachment-image" />
                                                        ) : (
                                                            <a href={att.url} download={att.name} className="attachment-link">
                                                                📎 {att.name}
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isGenerating && (
                                <div className="message-wrapper assistant">
                                    <div className="typing-indicator">Typing...</div>
                                </div>
                            )}
                        </div>

                        <div className="input-section">
                            {attachments.length > 0 && (
                                <div className="attachment-preview">
                                    {attachments.map((file, idx) => (
                                        <span key={idx} className="attachment-name">
                                            {file.name}
                                            <button
                                                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                                                className="remove-attachment"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="input-area">
                                <textarea
                                    ref={textareaRef}
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        resizeTextarea(e);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    rows={1}
                                    disabled={isGenerating}
                                />
                                <label className="attachment-button">
                                    📎
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        disabled={isGenerating}
                                        hidden
                                    />
                                </label>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isGenerating || (!inputText.trim() && attachments.length === 0)}
                                    className="send-button"
                                >
                                    {isGenerating ? (
                                        <span className="loading-indicator">
                                            <span className="spinner" /> Sending...
                                        </span>
                                    ) : 'Send'}
                                </button>
                            </div>
                        </div>

                        {generationError && (
                            <div className="error-message">
                                ⚠️ {generationError}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default FloatingButtonWithModal;