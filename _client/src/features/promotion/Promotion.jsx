/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import LeadTable from './components/LeadTable';
import PromotionActions from './components/PromotionActions';
import AttachmentsModal from './modals/AttachmentsModal';
import FieldsModal from './modals/FieldsModal';
import ScheduleModal from './modals/ScheduleModal';
import TemplateModal from './modals/TemplateModal';
import './promotion.css';

const Promotions = () => {
    const [activeTab, setActiveTab] = useState('Active Promotions');
    const [selectedAction, setSelectedAction] = useState('WhatsApp Business');
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [selectedLeadsIds, setSelectedLeadsIds] = useState([]);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [whatsappMessage, setWhatsappMessage] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [callScript, setCallScript] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    const [showModals, setShowModals] = useState({
        schedule: false,
        template: false,
        ai: false,
        fields: false,
        attachments: false
    });

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leads');
                const formattedLeads = response.data.map(lead => ({
                    id: lead.id,
                    name: lead.name_of_lead,
                    location: `${lead.city}, ${lead.state}`,
                    phone: lead.contact_number,
                    email: lead.email_id,
                    status: lead.status,
                    source: lead.source,
                    businessType: lead.leadType
                }));
                setLeads(formattedLeads);
                setFilteredLeads(formattedLeads);
            } catch (err) {
                setError('Failed to load leads');
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const toggleModal = (modalName, show) => {
        setShowModals(prev => ({ ...prev, [modalName]: show }));
    };

    const handleLeadSelect = (id, isSelected) => {
        if (isSelected) {
            const selected = leads.find(lead => lead.id === id);
            setSelectedLeadsIds(prev => [...prev, id]);
            setSelectedLeads(prev => [...prev, selected]);
        } else {
            setSelectedLeadsIds(prev => prev.filter(leadId => leadId !== id));
            setSelectedLeads(prev => prev.filter(lead => lead.id !== id));
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedLeadsIds([]);
            setSelectedLeads([]);
        } else {
            const allIds = filteredLeads.map(lead => lead.id);
            setSelectedLeadsIds(allIds);
            setSelectedLeads(filteredLeads);
        }
        setSelectAll(!selectAll);
    };

    const handleFileUpload = (newFiles) => {
        setAttachments(prev => [...prev, ...newFiles]);
    };

    return (
        <div className="promotions-container">
            <header className="promotions-header">
                <h1>Campaign Management</h1>
                <p>Manage your outreach campaigns and track performance</p>
            </header>

            <LeadTable
                leads={filteredLeads}
                loading={loading}
                error={error}
                selectedIds={selectedLeadsIds}
                onSelect={handleLeadSelect}
                onSelectAll={handleSelectAll}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                selectAll={selectAll}
            />

            <PromotionActions
                selectedAction={selectedAction}
                onActionChange={setSelectedAction}
                selectedLeads={selectedLeads}
                content={{ whatsappMessage, emailSubject, emailBody, callScript }}
                onContentChange={{ setWhatsappMessage, setEmailSubject, setEmailBody, setCallScript }}
                onOpenModal={toggleModal}
            />

            <ScheduleModal
                isOpen={showModals.schedule}
                onClose={() => toggleModal('schedule', false)}
                scheduleDate={scheduleDate}
                scheduleTime={scheduleTime}
                onDateChange={setScheduleDate}
                onTimeChange={setScheduleTime}
            />

            <TemplateModal
                isOpen={showModals.template}
                onClose={() => toggleModal('template', false)}
                actionType={selectedAction}
            />


            <FieldsModal
                isOpen={showModals.fields}
                onClose={() => toggleModal('fields', false)}
            />

            <AttachmentsModal
                isOpen={showModals.attachments}
                onClose={() => toggleModal('attachments', false)}
                attachments={attachments}
                onUpload={handleFileUpload}
            />
        </div>
    );
};

export default Promotions;
