import { Upload, X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../promotion.css';

const AttachmentsModal = ({ isOpen, onClose, attachments, onUpload, onRemove }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Upload Attachments</h3>
                    <button onClick={onClose} className="modal-close">
                        <X className="icon" />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="upload-area">
                        <Upload className="upload-icon" />
                        <p className="upload-text">Drag and drop files here or</p>
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            onChange={onUpload}
                            className="file-input"
                        />
                        <label htmlFor="file-upload" className="btn btn-primary">
                            Browse Files
                        </label>
                    </div>
                    {attachments.length > 0 && (
                        <div className="attachment-list">
                            <h4 className="attachment-title">Selected Files</h4>
                            {attachments.map(file => (
                                <div key={file.id} className="attachment-item">
                                    <div>
                                        <p className="attachment-name">{file.name}</p>
                                        <p className="attachment-size">{file.size}</p>
                                    </div>
                                    <button
                                        onClick={() => onRemove(file.id)}
                                        className="attachment-remove"
                                    >
                                        <X className="icon" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-primary">
                        Confirm Attachments
                    </button>
                </div>
            </div>
        </div>
    );
};

AttachmentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    attachments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            size: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpload: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default AttachmentsModal;