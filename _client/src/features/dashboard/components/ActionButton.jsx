import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';

const ActionButton = ({ icon: Icon, label, onClick }) => {
    const handleClick = () => {
        toast.success(`${label} initiated!`);
        if (onClick) onClick();
    };

    return (
        <button
            className="action-button"
            onClick={handleClick}
            aria-label={label}
            data-testid={`action-button-${label.toLowerCase().replace(/\s/g, '-')}`}
        >
            <Icon className="action-icon" />
            {label}
        </button>
    );
};

ActionButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default React.memo(ActionButton);