/* eslint-disable no-unused-vars */
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { AIProvider } from "@/contexts/AIContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FloatingButton from "@/features/aiassistant/FloatingButton";
import Dashboard from "@/features/dashboard/Dashboard";
import LeadManagements from "@/features/leadmanagement/LeadManagement";
import Promotions from "@/features/promotion/Promotion";
import UploadLeads from "@/features/uploadleads/UploadLeads";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
    const [activePage, setActivePage] = useState('dashboard');
    const [activeTab, setActiveTab] = useState('');

    return (
        <ThemeProvider>
            <AIProvider>
                <div className="app-container">
                    <Header />
                    <div className="main-content">
                        <Sidebar
                            activePage={activePage}
                            setActivePage={setActivePage}
                            setActiveTab={setActiveTab}
                        />
                        {activePage === "dashboard" && (
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                <Dashboard setActivePage={setActivePage} />
                            </div>
                        )}
                        {activePage === "promotion-tools" && (
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                <Promotions setActivePage={setActivePage} />
                            </div>
                        )}

                        {activePage === "upload-leads" && (
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                <UploadLeads setActivePage={setActivePage} />
                            </div>
                        )}

                        {activePage === "leads-management" && (
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                <LeadManagements setActivePage={setActivePage} />
                            </div>
                        )}
                    </div>
                </div>
                <FloatingButton />
                <Toaster position="bottom-right" />
            </AIProvider>
        </ThemeProvider>

    )
}

export default App
