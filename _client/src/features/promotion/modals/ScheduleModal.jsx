import { Calendar, Clock, X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../promotion.css';

const ScheduleModal = ({ isOpen, onClose, scheduleDate, setScheduleDate, scheduleTime, setScheduleTime, selectedLeadsCount, onSchedule }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Schedule Message</h3>
                    <button onClick={onClose} className="modal-close">
                        <X className="icon" />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="form-label">
                            <Calendar className="icon" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            <Clock className="icon" />
                            Time
                        </label>
                        <input
                            type="time"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="info-box">
                        <h4 className="info-title">Recipients</h4>
                        <p className="info-text">{selectedLeadsCount} leads selected</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={onSchedule}
                        disabled={!scheduleDate || !scheduleTime}
                        className="btn btn-primary"
                    >
                        Confirm Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

ScheduleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    scheduleDate: PropTypes.string.isRequired,
    setScheduleDate: PropTypes.func.isRequired,
    scheduleTime: PropTypes.string.isRequired,
    setScheduleTime: PropTypes.func.isRequired,
    selectedLeadsCount: PropTypes.number.isRequired,
    onSchedule: PropTypes.func.isRequired,
};

export default ScheduleModal;