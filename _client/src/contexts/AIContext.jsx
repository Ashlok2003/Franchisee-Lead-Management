import { createContext, useContext, useState } from 'react';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contentType, setContentType] = useState('email');

    return (
        <AIContext.Provider
            value={{
                isOpen,
                setIsOpen,
                inputText,
                setInputText,
                outputText,
                setOutputText,
                loading,
                setLoading,
                error,
                setError,
                contentType,
                setContentType
            }}
        >
            {children}
        </AIContext.Provider>
    );
};

export const useAI = () => useContext(AIContext);