import { useTheme } from '@/contexts/ThemeContext';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import {
    FaBell,
    FaBroom,
    FaBullhorn,
    FaChartBar,
    FaChartLine,
    FaClock,
    FaFileExport,
    FaFilter,
    FaPhone,
    FaSearch,
    FaTags,
    FaTasks,
    FaUpload,
    FaUserPlus,
    FaUsers,
    FaWhatsapp,
} from 'react-icons/fa';
import ActionButton from './components/ActionButton';
import AnalyticsCard from './components/AnalyticsCard';
import FollowUpsTable from './components/FollowUpsTable';
import LeadCard from './components/LeadCard';
import PromotionCard from './components/PromotionCard';
import SummaryCard from './components/SummaryCard';
import './dashboard.css';

const Dashboard = ({ setActivePage }) => {
    const { theme } = useTheme();

    const handleCardClick = useCallback(
        (page) => {
            setActivePage(page);
        },
        [setActivePage]
    );

    const summaryData = [
        {
            label: 'NEW',
            value: '847',
            description: 'Added this week',
            icon: FaUserPlus,
            actionText: 'View',
        },
        {
            label: 'EXISTING',
            value: '1,256',
            description: 'Active customers',
            icon: FaUsers,
            actionText: 'Manage',
        },
        {
            label: 'PROSPECTS',
            value: '444',
            description: 'Potential conversions',
            icon: FaSearch,
            actionText: 'Follow up',
        },
        {
            label: 'PENDING',
            value: '28',
            description: 'Follow-ups today',
            icon: FaClock,
            actionText: 'Action',
        },
    ];

    const actionButtons = [
        { icon: FaUpload, label: 'Upload Leads', onClick: () => handleCardClick('upload-leads') },
        { icon: FaBullhorn, label: 'Start Campaign' },
        { icon: FaChartBar, label: 'View Reports' },
    ];

    const leadCards = [
        {
            icon: FaUpload,
            title: 'Upload Leads',
            description: 'Import CSV/XLSX files',
            actionText: 'Upload',
            onClick: () => handleCardClick('upload-leads'),
        },
        {
            icon: FaBroom,
            title: 'Data Cleaning',
            description: 'Clean and organize data',
            actionText: 'Clean Data',
            onClick: () => handleCardClick('data-cleaning'),
        },
        {
            icon: FaTags,
            title: 'Categorize',
            description: 'Organize by lead type',
            actionText: 'Categorize',
        },
        {
            icon: FaFilter,
            title: 'Filter Leads',
            description: 'Search by status/interest',
            actionText: 'Filter',
            onClick: () => handleCardClick('filter'),
        },
    ];

    const promotionCards = [
        {
            icon: FaWhatsapp,
            title: 'WhatsApp',
            description: 'Send bulk messages',
            actionText: 'Compose',
            iconClass: 'whatsapp',
        },
        {
            icon: FaPhone,
            title: 'Call Scheduling',
            description: 'Auto dialer setup',
            actionText: 'Schedule',
            iconClass: 'call',
        },
        {
            icon: FaBell,
            title: 'Reminders',
            description: 'Set follow-up alerts',
            actionText: 'Create',
            iconClass: 'reminder',
        },
        {
            icon: FaTasks,
            title: 'Status Update',
            description: 'Track lead progress',
            actionText: 'Update',
            iconClass: 'status',
        },
    ];

    const analyticsCards = [
        {
            icon: FaChartLine,
            title: 'Conversion Metrics',
            description: 'Track lead performance',
            actionText: 'View',
        },
        {
            icon: FaUsers,
            title: 'Franchisee Tracking',
            description: 'Performance by team',
            actionText: 'Analyze',
        },
        {
            icon: FaFileExport,
            title: 'Export Reports',
            description: 'CSV, PDF, Excel formats',
            actionText: 'Export',
        },
    ];

    const followUps = [
        { name: 'Rahul Sharma', interest: 'High Interest', channel: 'WhatsApp', time: 'Today, 2:00 PM' },
        { name: 'Priya Patel', interest: 'Medium Interest', channel: 'Call', time: 'Today, 3:30 PM' },
        { name: 'Amit Kumar', interest: 'Low Interest', channel: 'Email', time: 'Tomorrow, 10:00 AM' },
        { name: 'Neha Singh', interest: 'High Interest', channel: 'WhatsApp', time: 'Tomorrow, 1:00 PM' },
    ];

    return (
        <div className="dashboard-container" data-theme={theme}>
            <div className="main-content">
                <section className="content" aria-label="Dashboard content">
                    <h2 className="section-title">Lead Summary</h2>
                    <div className="summary-cards">
                        {summaryData.map((card) => (
                            <SummaryCard key={card.label} {...card} />
                        ))}
                    </div>
                    <hr className="section-divider" />

                    <div className="quick-actions">
                        <h2 className="section-title">Quick Actions</h2>
                        <div className="action-buttons">
                            {actionButtons.map((button) => (
                                <ActionButton key={button.label} {...button} />
                            ))}
                        </div>
                    </div>
                    <hr className="section-divider" />

                    <h2 className="section-title">Lead Management</h2>
                    <div className="lead-management-cards">
                        {leadCards.map((card) => (
                            <LeadCard key={card.title} {...card} />
                        ))}
                    </div>
                    <hr className="section-divider" />

                    <h2 className="section-title">Lead Promotion Tools</h2>
                    <div className="promotion-cards">
                        {promotionCards.map((card) => (
                            <PromotionCard key={card.title} {...card} />
                        ))}
                    </div>
                    <hr className="section-divider" />

                    <h2 className="section-title">Pending Follow-ups</h2>
                    <FollowUpsTable followUps={followUps} />
                    <hr className="section-divider" />

                    <h2 className="section-title">Analytics Overview</h2>
                    <div className="analytics-cards">
                        {analyticsCards.map((card) => (
                            <AnalyticsCard key={card.title} {...card} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    setActivePage: PropTypes.func.isRequired,
};

export default Dashboard;