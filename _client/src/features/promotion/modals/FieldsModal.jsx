import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../promotion.css';

const FieldsModal = ({ isOpen, onClose, fields, onInsertField }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add Personalization Fields</h3>
                    <button onClick={onClose} className="modal-close">
                        <X className="icon" />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="fields-grid">
                        {fields.map(field => (
                            <div
                                key={field.id}
                                className="field-item"
                                onClick={() => onInsertField(field)}
                            >
                                <h4 className="field-title">{field.name}</h4>
                                <p className="field-description">{field.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

FieldsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    onInsertField: PropTypes.func.isRequired,
};

export default FieldsModal;