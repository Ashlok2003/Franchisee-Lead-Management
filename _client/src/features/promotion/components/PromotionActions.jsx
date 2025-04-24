import PropTypes from 'prop-types';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import '../promotion.css';
import EmailContent from './EmailContent';
import PhoneContent from './PhoneContent';
import WhatsAppContent from './WhatsAppContent';

const PromotionActions = ({
    selectedAction,
    onActionChange,
    selectedLeads,
    content,
    onContentChange,
    setShowTemplateModal,
    setShowFieldsModal,
    setShowAIModal,
    setShowScheduleModal,
    setShowAttachmentsModal,
    handleSaveTemplate,
    sendMessageNow,
}) => {
    return (
        <div className="promotion-actions-container">
            <div className="action-tabs">
                {['WhatsApp Business', 'Email', 'Phone Call'].map((action) => (
                    <button
                        key={action}
                        className={`action-tab ${selectedAction === action ? 'action-tab-active' : ''}`}
                        onClick={() => onActionChange(action)}
                    >
                        {action === 'WhatsApp Business' && <FaWhatsapp className="icon" />}
                        {action === 'Email' && <FaEnvelope className="icon" />}
                        {action === 'Phone Call' && <FaPhone className="icon" />}
                        {action}
                    </button>
                ))}
            </div>

            <div className="action-content">
                {selectedAction === 'WhatsApp Business' && (
                    <WhatsAppContent
                        content={content.whatsappMessage}
                        onContentChange={onContentChange.setWhatsappMessage}
                        selectedLeads={selectedLeads}
                        setShowTemplateModal={setShowTemplateModal}
                        setShowFieldsModal={setShowFieldsModal}
                        setShowAIModal={setShowAIModal}
                        setShowScheduleModal={setShowScheduleModal}
                        handleSaveTemplate={handleSaveTemplate}
                        sendMessageNow={sendMessageNow}
                    />
                )}
                {selectedAction === 'Email' && (
                    <EmailContent
                        content={content}
                        onContentChange={onContentChange}
                        selectedLeads={selectedLeads}
                        setShowTemplateModal={setShowTemplateModal}
                        setShowFieldsModal={setShowFieldsModal}
                        setShowAIModal={setShowAIModal}
                        setShowScheduleModal={setShowScheduleModal}
                        setShowAttachmentsModal={setShowAttachmentsModal}
                        handleSaveTemplate={handleSaveTemplate}
                        sendMessageNow={sendMessageNow}
                    />
                )}
                {selectedAction === 'Phone Call' && (
                    <PhoneContent
                        content={content.callScript}
                        onContentChange={onContentChange.setCallScript}
                    />
                )}
            </div>
        </div>
    );
};

PromotionActions.propTypes = {
    selectedAction: PropTypes.string.isRequired,
    onActionChange: PropTypes.func.isRequired,
    selectedLeads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ).isRequired,
    content: PropTypes.shape({
        whatsappMessage: PropTypes.string.isRequired,
        emailSubject: PropTypes.string.isRequired,
        emailBody: PropTypes.string.isRequired,
        callScript: PropTypes.string.isRequired,
        attachments: PropTypes.array.isRequired,
    }).isRequired,
    onContentChange: PropTypes.shape({
        setWhatsappMessage: PropTypes.func.isRequired,
        setEmailSubject: PropTypes.func.isRequired,
        setEmailBody: PropTypes.func.isRequired,
        setCallScript: PropTypes.func.isRequired,
        setAttachments: PropTypes.func.isRequired,
    }).isRequired,
    setShowTemplateModal: PropTypes.func.isRequired,
    setShowFieldsModal: PropTypes.func.isRequired,
    setShowAIModal: PropTypes.func.isRequired,
    setShowScheduleModal: PropTypes.func.isRequired,
    setShowAttachmentsModal: PropTypes.func.isRequired,
    handleSaveTemplate: PropTypes.func.isRequired,
    sendMessageNow: PropTypes.func.isRequired,
};

export default PromotionActions;