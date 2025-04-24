import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../promotion.css';

const TemplateModal = ({ isOpen, onClose, templates, onSelectTemplate }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content template-modal">
                <div className="modal-header">
                    <h3 className="modal-title">Select Template</h3>
                    <button onClick={onClose} className="modal-close">
                        <X className="icon" />
                    </button>
                </div>
                <div className="modal-body">
                    {templates.map(template => (
                        <div
                            key={template.id}
                            className="template-item"
                            onClick={() => onSelectTemplate(template)}
                        >
                            <h4 className="template-title">{template.name}</h4>
                            <p className="template-content">{template.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TemplateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    templates: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            subject: PropTypes.string,
        })
    ).isRequired,
    onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateModal;