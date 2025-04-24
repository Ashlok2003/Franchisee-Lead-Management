
import { Plus, Upload, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import '../promotion.css';

const EmailContent = ({
    content,
    onContentChange,
    selectedLeads,
    onRemoveLead,
    setShowTemplateModal,
    setShowFieldsModal,
    setShowAIModal,
    setShowScheduleModal,
    setShowAttachmentsModal,
    handleSaveTemplate,
    sendMessageNow,
}) => {
    const handleRemoveLead = useCallback(
        (id) => {
            if (onRemoveLead) {
                onRemoveLead(id);
            }
        },
        [onRemoveLead]
    );

    const handleKeyDown = useCallback((e, callback) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback();
        }
    }, []);

    return (
        <div className="action-content">
            <div className="selected-leads">
                {(!selectedLeads || selectedLeads?.length === 0) ? (
                    <div className="info-box">
                        <p className="info-text">No recipients selected. Add recipients to send emails.</p>
                    </div>
                ) : (
                    <div className="lead-list">
                        {selectedLeads.map((lead) => (
                            <div key={lead.id} className="lead-chip">
                                <img
                                    src={lead.avatar || '/api/placeholder/36/36'}
                                    alt={lead.name}
                                    className="lead-chip-avatar"
                                />
                                <div>
                                    <p className="lead-chip-name">{lead.name}</p>
                                    <p className="lead-chip-detail">{lead.email || 'No email'}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveLead(lead.id)}
                                    className="lead-chip-remove"
                                    aria-label={`Remove ${lead.name} from recipients`}
                                >
                                    <X className="icon" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="add-recipients-button"
                    onClick={() => console.log('Add recipients clicked')}
                    aria-label="Add more recipients"
                >
                    <Plus className="icon" /> Add More Recipients
                </button>
            </div>

            <div className="action-options">
                <div
                    className="option-card"
                    onClick={() => setShowTemplateModal()}
                    onKeyDown={(e) => handleKeyDown(e, setShowTemplateModal)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="option-icon template-icon">Aa</div>
                    <h3 className="option-title">Email Template</h3>
                    <p className="option-description">Select or create a custom email</p>
                </div>
                <div
                    className="option-card"
                    onClick={() => setShowFieldsModal()}
                    onKeyDown={(e) => handleKeyDown(e, setShowFieldsModal)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="option-icon personalization-icon">@</div>
                    <h3 className="option-title">Personalization</h3>
                    <p className="option-description">Add custom fields</p>
                </div>
                <div
                    className="option-card"
                    onClick={() => setShowAIModal()}
                    onKeyDown={(e) => handleKeyDown(e, setShowAIModal)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="option-icon ai-icon">🤖</div>
                    <h3 className="option-title">AI Email Generator</h3>
                    <p className="option-description">Generate email content using AI</p>
                </div>
                <div
                    className="option-card"
                    onClick={() => setShowAttachmentsModal()}
                    onKeyDown={(e) => handleKeyDown(e, setShowAttachmentsModal)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="option-icon attachment-icon">
                        <Upload className="icon" />
                    </div>
                    <h3 className="option-title">Attachments</h3>
                    <p className="option-description">Add files to your email</p>
                </div>
            </div>

            <div className="message-editor">
                <h3 className="editor-title">Subject</h3>
                <input
                    type="text"
                    value={content.emailSubject || ''}
                    onChange={(e) => onContentChange.setEmailSubject(e.target.value)}
                    className="editor-input"
                    placeholder="Enter email subject..."
                    aria-label="Email subject"
                />
                <h3 className="editor-title">Body</h3>
                <textarea
                    value={content.emailBody || ''}
                    onChange={(e) => onContentChange.setEmailBody(e.target.value)}
                    className="editor-textarea"
                    placeholder="Type your email body..."
                    rows="10"
                    aria-label="Email body"
                />
            </div>

            {content.attachments?.length > 0 && (
                <div className="attachment-list">
                    <h4 className="attachment-title">Attachments</h4>
                    {content.attachments.map((file) => (
                        <div key={file.id} className="attachment-item">
                            <div>
                                <p className="attachment-name">{file.name}</p>
                                <p className="attachment-size">{file.size}</p>
                            </div>
                            <button
                                onClick={() =>
                                    onContentChange.setAttachments(
                                        content.attachments.filter((att) => att.id !== file.id)
                                    )
                                }
                                className="attachment-remove"
                                aria-label={`Remove attachment ${file.name}`}
                            >
                                <X className="icon" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="action-buttons">
                <button
                    onClick={sendMessageNow}
                    disabled={!selectedLeads || selectedLeads.length === 0 || !content.emailSubject?.trim()}
                    className="btn btn-primary"
                    aria-label="Send email now"
                >
                    Send Now
                </button>
                <button
                    onClick={() => setShowScheduleModal()}
                    disabled={!selectedLeads || selectedLeads.length === 0 || !content.emailSubject?.trim()}
                    className="btn btn-secondary"
                    aria-label="Schedule email"
                >
                    Schedule
                </button>
                <button
                    onClick={handleSaveTemplate}
                    disabled={!content.emailSubject?.trim() && !content.emailBody?.trim()}
                    className="btn btn-secondary"
                    aria-label="Save email as template"
                >
                    Save as Template
                </button>
            </div>
        </div>
    );
};

EmailContent.propTypes = {
    content: PropTypes.shape({
        emailSubject: PropTypes.string.isRequired,
        emailBody: PropTypes.string.isRequired,
        attachments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                size: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onContentChange: PropTypes.shape({
        setEmailSubject: PropTypes.func.isRequired,
        setEmailBody: PropTypes.func.isRequired,
        setAttachments: PropTypes.func.isRequired,
    }).isRequired,
    selectedLeads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            avatar: PropTypes.string,
        })
    ),
    onRemoveLead: PropTypes.func,
    setShowTemplateModal: PropTypes.func.isRequired,
    setShowFieldsModal: PropTypes.func.isRequired,
    setShowAIModal: PropTypes.func.isRequired,
    setShowScheduleModal: PropTypes.func.isRequired,
    setShowAttachmentsModal: PropTypes.func.isRequired,
    handleSaveTemplate: PropTypes.func.isRequired,
    sendMessageNow: PropTypes.func.isRequired,
};

EmailContent.defaultProps = {
    selectedLeads: [],
    onRemoveLead: () => { },
};

export default EmailContent;