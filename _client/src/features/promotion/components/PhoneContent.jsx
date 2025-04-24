import PropTypes from 'prop-types';
import '../promotion.css';

const PhoneContent = ({ content, onContentChange }) => {
    return (
        <div className="action-content">
            <div className="message-editor">
                <h3 className="editor-title">Call Script</h3>
                <textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    className="editor-textarea"
                    placeholder="Type your call script..."
                />
            </div>
        </div>
    );
};

PhoneContent.propTypes = {
    content: PropTypes.string.isRequired,
    onContentChange: PropTypes.func.isRequired,
};

export default PhoneContent;