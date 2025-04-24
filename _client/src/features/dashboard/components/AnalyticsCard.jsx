import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';

const AnalyticsCard = ({ icon: Icon, title, description, actionText }) => {
    const handleAction = () => {
        toast.success(`${actionText} for ${title}!`);
    };

    return (
        <div className="analytics-card" data-testid={`analytics-card-${title.toLowerCase().replace(/\s/g, '-')}`}>
            <div className="analytics-card-icon">
                <Icon />
            </div>
            <h3 className="analytics-card-title">{title}</h3>
            <p className="analytics-card-description">{description}</p>
            <button
                className="analytics-card-action"
                onClick={handleAction}
                aria-label={`${actionText} ${title}`}
            >
                {actionText}
            </button>
        </div>
    );
};

AnalyticsCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
};

export default React.memo(AnalyticsCard);