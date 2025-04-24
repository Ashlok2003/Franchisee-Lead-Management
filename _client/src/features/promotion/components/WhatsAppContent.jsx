/* eslint-disable no-unused-vars */
import { Plus, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import '../promotion.css';

const WhatsAppContent = ({
    content,
    onContentChange,
    selectedLeads,
    setShowTemplateModal,
    setShowFieldsModal,
    setShowAIModal,
    setShowScheduleModal,
    handleSaveTemplate,
    sendMessageNow,
}) => {
    const handleRemoveLead = useCallback(
        (id) => {
            // Assuming Promotions.jsx updates selectedLeads and selectedLeadsIds
            // This would typically be handled in the parent component
        },
        []
    );

    return (
        <div className="action-content">
            <div className="selected-leads">
                <div className="lead-list">
                    {selectedLeads.map((lead) => (
                        <div key={lead.id} className="lead-chip">
                            <img src={lead.avatar} alt={lead.name} className="lead-chip-avatar" />
                            <div>
                                <p className="lead-chip-name">{lead.name}</p>
                                <p className="lead-chip-detail">{lead.phone}</p>
                            </div>
                            <button onClick={() => handleRemoveLead(lead.id)} className="lead-chip-remove">
                                <X className="icon" />
                            </button>
                        </div>
                    ))}
                </div>
                <button className="add-recipients-button">
                    <Plus className="icon" /> Add More Recipients
                </button>
            </div>

            <div className="action-options">
                <div className="option-card" onClick={() => setShowTemplateModal()}>
                    <div className="option-icon template-icon">Aa</div>
                    <h3 className="option-title">Message Template</h3>
                    <p className="option-description">Select or create a custom message</p>
                </div>
                <div className="option-card" onClick={() => setShowFieldsModal()}>
                    <div className="option-icon personalization-icon">@</div>
                    <h3 className="option-title">Personalization</h3>
                    <p className="option-description">Add custom fields</p>
                </div>
                <div className="option-card" onClick={() => setShowAIModal()}>
                    <div className="option-icon ai-icon">🤖</div>
                    <h3 className="option-title">AI Message Generator</h3>
                    <p className="option-description">Generate content using AI</p>
                </div>
                <div className="option-card" onClick={() => setShowScheduleModal()}>
                    <div className="option-icon schedule-icon">📅</div>
                    <h3 className="option-title">Schedule</h3>
                    <p className="option-description">Set a time to send</p>
                </div>
            </div>

            <div className="message-editor">
                <h3 className="editor-title">Message</h3>
                <textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    className="editor-textarea"
                    placeholder="Type your WhatsApp message..."
                />
            </div>

            <div className="action-buttons">
                <button
                    onClick={sendMessageNow}
                    disabled={selectedLeads.length === 0}
                    className="btn btn-primary"
                >
                    Send Now
                </button>
                <button
                    onClick={() => setShowScheduleModal()}
                    disabled={selectedLeads.length === 0}
                    className="btn btn-secondary"
                >
                    Schedule
                </button>
                <button onClick={handleSaveTemplate} className="btn btn-secondary">
                    Save as Template
                </button>
            </div>
        </div>
    );
};

WhatsAppContent.propTypes = {
    content: PropTypes.string.isRequired,
    onContentChange: PropTypes.func.isRequired,
    selectedLeads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ).isRequired,
    setShowTemplateModal: PropTypes.func.isRequired,
    setShowFieldsModal: PropTypes.func.isRequired,
    setShowAIModal: PropTypes.func.isRequired,
    setShowScheduleModal: PropTypes.func.isRequired,
    handleSaveTemplate: PropTypes.func.isRequired,
    sendMessageNow: PropTypes.func.isRequired,
};

export default WhatsAppContent;