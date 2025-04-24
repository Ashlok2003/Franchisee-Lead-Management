import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';


const LeadCard = ({ icon: Icon, title, description, actionText, onClick }) => {
    const handleClick = () => {
        toast.success(`${actionText} clicked!`);
        if (onClick) onClick();
    };

    return (
        <div
            className="lead-card"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                    e.preventDefault();
                }
            }}
            aria-label={title}
            data-testid={`lead-card-${title.toLowerCase().replace(/\s/g, '-')}`}
        >
            <div className="lead-card-icon">
                <Icon />
            </div>
            <h3 className="lead-card-title">{title}</h3>
            <p className="lead-card-description">{description}</p>
            <button className="lead-card-action" onClick={handleClick}>
                {actionText}
            </button>
        </div>
    );
};

LeadCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default React.memo(LeadCard);