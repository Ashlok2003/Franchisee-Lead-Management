import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';

const PromotionCard = ({ icon: Icon, title, description, actionText, iconClass }) => {
    const handleAction = () => {
        toast.success(`${actionText} for ${title}!`);
    };

    return (
        <div className="promotion-card" data-testid={`promotion-card-${title.toLowerCase().replace(/\s/g, '-')}`}>
            <div className={`promotion-card-icon ${iconClass}`}>
                <Icon />
            </div>
            <h3 className="promotion-card-title">{title}</h3>
            <p className="promotion-card-description">{description}</p>
            <button
                className="promotion-card-action"
                onClick={handleAction}
                aria-label={`${actionText} ${title}`}
            >
                {actionText}
            </button>
        </div>
    );
};

PromotionCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
};

export default React.memo(PromotionCard);