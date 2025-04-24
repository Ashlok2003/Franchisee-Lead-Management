import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';

const SummaryCard = ({ label, value, description, icon: Icon, actionText, onAction }) => {
    const handleAction = () => {
        toast.success(`${actionText} clicked!`);
        if (onAction) onAction();
    };

    return (
        <div className="summary-card" data-testid={`summary-card-${label.toLowerCase()}`}>
            <div className="card-icon">
                <Icon />
            </div>
            <div className="card-details">
                <span className="card-label">{label}</span>
                <h3 className="card-value">{value}</h3>
                <p className="card-description">{description}</p>
            </div>
            <button
                className="card-action"
                onClick={handleAction}
                aria-label={`${actionText} ${label} leads`}
            >
                {actionText}
            </button>
        </div>
    );
};

SummaryCard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    actionText: PropTypes.string.isRequired,
    onAction: PropTypes.func,
};

export default React.memo(SummaryCard);