import PropTypes from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const FollowUpsTable = ({ followUps }) => (
    <div className="follow-ups-table" data-testid="follow-ups-table">
        <table>
            <thead>
                <tr>
                    <th>Lead</th>
                    <th>Interest</th>
                    <th>Channel</th>
                    <th>Follow-up Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {followUps.map((followUp, index) => (
                    <tr key={index}>
                        <td>
                            <span className="user-icon">👤</span> {followUp.name}
                        </td>
                        <td>{followUp.interest}</td>
                        <td>{followUp.channel}</td>
                        <td>{followUp.time}</td>
                        <td>
                            <button
                                className="icon-button call"
                                onClick={() => toast.success(`Calling ${followUp.name}!`)}
                                aria-label={`Call ${followUp.name}`}
                            >
                                <FaPhone />
                            </button>
                            <button
                                className="icon-button whatsapp"
                                onClick={() => toast.success(`Messaging ${followUp.name} on WhatsApp!`)}
                                aria-label={`Message ${followUp.name} on WhatsApp`}
                            >
                                <FaWhatsapp />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

FollowUpsTable.propTypes = {
    followUps: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            interest: PropTypes.string.isRequired,
            channel: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default React.memo(FollowUpsTable);