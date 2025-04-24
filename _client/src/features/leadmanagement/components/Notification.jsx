/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Notification = ({ message = 'An error occurred' }) => {
    if (!message) return null;
    return (
        <motion.div
            className="notification-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="alert"
        >
            <div className="notification-content">
                <span aria-hidden="true">⚠</span>
                <span>{message}</span>
            </div>
        </motion.div>
    );
};

Notification.propTypes = {
    message: PropTypes.string,
};

export default Notification;
