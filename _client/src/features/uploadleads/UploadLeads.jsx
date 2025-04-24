/* eslint-disable no-unused-vars */
import { useTheme } from '@/contexts/ThemeContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download, FileText, RefreshCcw } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import './uploadleads.css';


const UploadLeads = ({ setActivePage }) => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('existing');
    const [activeNewLeadSubTab, setActiveNewLeadSubTab] = useState('uploadCsv');
    const [selectedFile, setSelectedFile] = useState(null);
    const [existingHistory, setExistingHistory] = useState([]);
    const [newLeadHistory, setNewLeadHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const [leadForm, setLeadForm] = useState({
        name: '',
        franchiseDeveloper: '',
        source: '',
        status: '',
        city: '',
        state: '',
        contactNumber: '',
        email: '',
        campaignDate: '',
        month: '',
        financialYear: '',
        isUpdated: false,
        notes: '',
    });

    useEffect(() => {
        const savedExistingHistory = localStorage.getItem('existingLeadsHistory');
        const savedNewLeadsHistory = localStorage.getItem('newLeadsHistory');

        if (savedExistingHistory) {
            setExistingHistory(JSON.parse(savedExistingHistory));
        }
        if (savedNewLeadsHistory) {
            setNewLeadHistory(JSON.parse(savedNewLeadsHistory));
        }

        fetchUploadHistory();
    }, []);

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
        setError(null);
    }, []);

    const handleNewLeadSubTabChange = useCallback((subTab) => {
        setActiveNewLeadSubTab(subTab);
        setError(null);
    }, []);

    const handleFileChange = useCallback((event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    }, []);

    const handleFileDeselect = useCallback(() => {
        setSelectedFile(null);
        setError(null);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setLeadForm((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    const handleToggleChange = useCallback((e) => {
        const { name, checked } = e.target;
        setLeadForm((prev) => ({ ...prev, [name]: checked }));
    }, []);

    const fetchUploadHistory = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/leads/history');

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);

                if (Array.isArray(data)) {
                    const existing = data.filter((item) => item.leadType === 'Existing');
                    const newLeads = data.filter((item) => item.leadType === 'New');
                    setExistingHistory(existing);
                    setNewLeadHistory(newLeads);
                    localStorage.setItem('existingLeadsHistory', JSON.stringify(existing));
                    localStorage.setItem('newLeadsHistory', JSON.stringify(newLeads));
                }
            } else {
                throw new Error('Failed to fetch upload history');
            }
        } catch (err) {
            setError('Failed to fetch upload history. Using local data.');
            console.error('Error fetching history:', err);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('leadType', activeTab === 'existing' ? 'Existing' : 'New');

        console.log(formData);

        try {
            const response = await axios.post('http://localhost:5000/api/leads/upload', formData);
            const newHistoryItem = {
                id: selectedFile.name,
                status: 'Success',
                records: response.data.records,
                date: new Date().toLocaleDateString(),
                leadType: activeTab === 'existing' ? 'Existing' : 'New',
            };

            if (activeTab === 'existing') {
                const updatedHistory = [newHistoryItem, ...existingHistory];
                setExistingHistory(updatedHistory);
                localStorage.setItem('existingLeadsHistory', JSON.stringify(updatedHistory));
            } else {
                const updatedHistory = [newHistoryItem, ...newLeadHistory];
                setNewLeadHistory(updatedHistory);
                localStorage.setItem('newLeadsHistory', JSON.stringify(updatedHistory));
            }

            setSelectedFile(null);
            toast.success('File uploaded successfully', { duration: 4000 });
            fetchUploadHistory();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to upload file.');
            toast.error('Failed to upload file', { duration: 4000 });
            console.error('Error uploading file:', err);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/leads/template');
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Download failed');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Lead-Template.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success('Template downloaded successfully', { duration: 4000 });
        } catch (err) {
            setError('Failed to download template: ' + err.message);
            toast.error('Failed to download template', { duration: 4000 });
            console.error('Download error:', err);
        }
    };

    const downloadUpload = useCallback((id) => {
        window.location.href = `http://localhost:5000/api/leads/download/${id}`;
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};
        if (!leadForm.name.trim()) errors.name = 'Name is required';
        if (!leadForm.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(leadForm.email)) errors.email = 'Invalid email format';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [leadForm]);

    const handleSubmitLead = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/api/leads', leadForm);
            toast.success('Lead added successfully', { duration: 4000 });
            setLeadForm(initialLeadForm);
            setFormErrors({});
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add lead.');
            toast.error('Failed to add lead', { duration: 4000 });
            console.error('Error adding lead:', err);
        } finally {
            setLoading(false);
        }
    };

    const goBackToLeads = useCallback(() => {
        setActivePage('leads-management');
    }, [setActivePage]);

    const historyItems = useMemo(() => {
        return (activeTab === 'existing' ? existingHistory : newLeadHistory).map((item, index) => (
            <tr key={item.id} className="history-row">
                <td>
                    <FileText className="file-icon" />
                    {item.id}
                </td>
                <td>{item.records}</td>
                <td>{item.date}</td>
                <td>
                    <button
                        onClick={() => downloadUpload(item.id)}
                        aria-label={`Download ${item.id}`}
                        className="download-btn"
                    >
                        <Download className="icon" />
                        Download
                    </button>
                </td>
            </tr>
        ));
    }, [activeTab, existingHistory, newLeadHistory, downloadUpload]);

    return (
        <motion.div
            className="upload-leads-container"
            data-theme={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="upload-tabs">
                <button
                    className={`tab-button ${activeTab === 'existing' ? 'active' : ''}`}
                    onClick={() => handleTabChange('existing')}
                    aria-label="Upload Existing Leads"
                >
                    Existing Leads
                </button>
                <button
                    className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
                    onClick={() => handleTabChange('new')}
                    aria-label="Upload New Lead"
                >
                    New Leads
                </button>
            </div>

            {activeTab === 'existing' && (
                <div className="upload-section">
                    <h2>Upload Existing Leads</h2>
                    <p>Upload a CSV file containing your existing leads database.</p>

                    <div className="upload-controls">
                        <input
                            type="file"
                            id="csvFileExisting"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="csvFileExisting" className="file-label">
                            Select CSV File
                        </label>

                        <button
                            className="upload-csv-btn"
                            onClick={handleUpload}
                            disabled={!selectedFile || loading}
                            aria-label="Upload CSV file"
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>

                        <button
                            className="download-template-btn"
                            onClick={downloadCSV}
                            aria-label="Download CSV template"
                        >
                            Download Template
                        </button>
                    </div>

                    {selectedFile && (
                        <div className="file-info">
                            <span>{selectedFile.name}</span>
                            <button onClick={handleFileDeselect} aria-label="Remove selected file">
                                Remove
                            </button>
                        </div>
                    )}

                    <div className="upload-requirements">
                        <h3>Requirements</h3>
                        <ul>
                            <li>File Format: Valid CSV with UTF-8 encoding</li>
                            <li>Required Columns: Name, Email, Phone, Source, Status</li>
                            <li>Maximum File Size: 10MB</li>
                        </ul>
                    </div>


                    <div className="history-section">
                        <h3>
                            Upload History
                            <button
                                className="refresh-btn"
                                onClick={fetchUploadHistory}
                                aria-label="Refresh upload history"
                            >
                                <RefreshCcw className="icon" />
                            </button>
                        </h3>
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Records</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="no-history">
                                            No upload history available.
                                        </td>
                                    </tr>
                                ) : (
                                    historyItems
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'new' && (
                <div className="new-lead-content">
                    <div className="new-lead-subtabs">
                        <button
                            className={`subtab-button ${activeNewLeadSubTab === 'uploadCsv' ? 'active' : ''}`}
                            onClick={() => handleNewLeadSubTabChange('uploadCsv')}
                            aria-label="Upload New Lead CSV"
                        >
                            Upload CSV
                        </button>
                        <button
                            className={`subtab-button ${activeNewLeadSubTab === 'addLeadForm' ? 'active' : ''}`}
                            onClick={() => handleNewLeadSubTabChange('addLeadForm')}
                            aria-label="Add Lead Form"
                        >
                            Add Lead
                        </button>
                    </div>

                    {activeNewLeadSubTab === 'uploadCsv' && (
                        <div className="upload-section">
                            <h2>Upload New Leads</h2>
                            <p>Upload a CSV file containing your new leads database.</p>

                            <div className="upload-controls">
                                <input
                                    type="file"
                                    id="csvFileNew"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="csvFileNew" className="file-label">
                                    Select CSV File
                                </label>

                                <button
                                    className="upload-csv-btn"
                                    onClick={handleUpload}
                                    disabled={!selectedFile || loading}
                                    aria-label="Upload CSV file"
                                >
                                    {loading ? 'Uploading...' : 'Upload'}
                                </button>

                                <button
                                    className="download-template-btn"
                                    onClick={downloadCSV}
                                    aria-label="Download CSV template"
                                >
                                    Download Template
                                </button>
                            </div>

                            {selectedFile && (
                                <div className="file-info">
                                    <span>{selectedFile.name}</span>
                                    <button onClick={handleFileDeselect} aria-label="Remove selected file">
                                        Remove
                                    </button>
                                </div>
                            )}

                            <div className="upload-requirements">
                                <h3>Requirements</h3>
                                <ul>
                                    <li>File Format: Valid CSV with UTF-8 encoding</li>
                                    <li>Required Columns: Name, Email, Phone, Source, Status</li>
                                    <li>Maximum File Size: 10MB</li>
                                </ul>
                            </div>

                            <div className="history-section">
                                <h3>Upload History</h3>
                                <table className="history-table">
                                    <thead>
                                        <tr>
                                            <th>File Name</th>
                                            <th>Records</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyItems.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="no-history">
                                                    No upload history available.
                                                </td>
                                            </tr>
                                        ) : (
                                            historyItems
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeNewLeadSubTab === 'addLeadForm' && (
                        <div className="lead-form-container">
                            <div className="form-header">
                                <h2>Add New Lead</h2>
                                <div className="form-actions">
                                    <button
                                        className="back-btn"
                                        onClick={goBackToLeads}
                                        aria-label="Back to leads list"
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="save-btn"
                                        onClick={handleSubmitLead}
                                        disabled={loading}
                                        aria-label="Save lead"
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitLead}>
                                <div className="form-section">
                                    <h3>Basic Information</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={leadForm.name}
                                                onChange={handleInputChange}
                                                aria-invalid={!!formErrors.name}
                                                aria-describedby={formErrors.name ? 'name-error' : undefined}
                                            />
                                            {formErrors.name && (
                                                <span className="error-text" id="name-error">
                                                    {formErrors.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="franchiseDeveloper">Franchise Developer</label>
                                            <input
                                                type="text"
                                                id="franchiseDeveloper"
                                                name="franchiseDeveloper"
                                                value={leadForm.franchiseDeveloper}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="source">Source</label>
                                            <select
                                                id="source"
                                                name="source"
                                                value={leadForm.source}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select source</option>
                                                <option value="Website">Website</option>
                                                <option value="Referral">Referral</option>
                                                <option value="Social Media">Social Media</option>
                                                <option value="Direct">Direct</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={leadForm.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select status</option>
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Qualified">Qualified</option>
                                                <option value="Proposal">Proposal</option>
                                                <option value="Negotiation">Negotiation</option>
                                                <option value="Closed Won">Closed Won</option>
                                                <option value="Closed Lost">Closed Lost</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Contact Information</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={leadForm.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state">State</label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={leadForm.state}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="contactNumber">Contact Number</label>
                                            <input
                                                type="text"
                                                id="contactNumber"
                                                name="contactNumber"
                                                value={leadForm.contactNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={leadForm.email}
                                                onChange={handleInputChange}
                                                aria-invalid={!!formErrors.email}
                                                aria-describedby={formErrors.email ? 'email-error' : undefined}
                                            />
                                            {formErrors.email && (
                                                <span className="error-text" id="email-error">
                                                    {formErrors.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Campaign Details</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="campaignDate">Campaign Date</label>
                                            <input
                                                type="date"
                                                id="campaignDate"
                                                name="campaignDate"
                                                value={leadForm.campaignDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="month">Month</label>
                                            <select
                                                id="month"
                                                name="month"
                                                value={leadForm.month}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select month</option>
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="March">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="financialYear">Financial Year</label>
                                            <select
                                                id="financialYear"
                                                name="financialYear"
                                                value={leadForm.financialYear}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select year</option>
                                                <option value="2024-2025">2024-2025</option>
                                                <option value="2025-2026">2025-2026</option>
                                                <option value="2026-2027">2026-2027</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="isUpdated"
                                                    checked={leadForm.isUpdated}
                                                    onChange={handleToggleChange}
                                                />
                                                Updated Lead
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>Additional Information</h3>
                                    <div className="form-group">
                                        <label htmlFor="notes">Notes</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={leadForm.notes}
                                            onChange={handleInputChange}
                                            rows="4"
                                        />
                                    </div>
                                </div>

                                <div className="form-actions bottom-actions">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setLeadForm(initialLeadForm)}
                                        aria-label="Cancel and reset form"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="save-btn"
                                        disabled={loading}
                                        aria-label="Save lead"
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

const initialLeadForm = {
    name: '',
    franchiseDeveloper: '',
    source: '',
    status: '',
    city: '',
    state: '',
    contactNumber: '',
    email: '',
    campaignDate: '',
    month: '',
    financialYear: '',
    isUpdated: false,
    notes: '',
};

UploadLeads.propTypes = {
    setActivePage: PropTypes.func.isRequired,
};

UploadLeads.defaultProps = {
    setActivePage: () => { },
};

export default React.memo(UploadLeads);