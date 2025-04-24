"use client"

import { useState } from "react"
import "./App.css"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import LeadsManagement from "./pages/LeadsManagement"
import UploadLeads from "./pages/UploadLeads"
import DataCleaning from "./pages/DataCleaning"
import EmailVerification from "./pages/EmailVerification"
import BulkVerification from "./pages/BulkVerification"
import Filter from "./pages/Filter"
import Promotion from "./pages/Promotion"  
import Campaign from "./pages/Campaign"
import DefineAudience from "./pages/DefineAudience"
import CreateCampaign from "./pages/CreateCampaign"
import CompleteCampaign from "./pages/CompleteCampaign"
import GoalSet from "./pages/GoalSet"
import GoalOverview from "./pages/GoalOverview";
import ReportDownload from "./pages/ReportDownload";
import ReportsGeneration from "./pages/ReportsGeneration";
import ReportSummary from "./pages/ReportSummary";

function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const [activeTab, setActiveTab] = useState("")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard setActivePage={setActivePage} />

      case "leads-management":
        return <LeadsManagement />

      case "upload-leads":
        if (activeTab === "upload-new-lead") {
          return <UploadLeads uploadType="new" />
        } else if (activeTab === "upload-prospect-leads") {
          return <UploadLeads uploadType="prospect" />
        } else {
          return <UploadLeads uploadType="existing" />
        }
      case "data-cleaning":
        return <DataCleaning setActivePage={setActivePage} setActiveTab={setActiveTab} />

      case "email-verification":
        return <EmailVerification setActivePage={setActivePage} />

      case "bulk-verification":
        return <BulkVerification setActivePage={setActivePage} />

      case "filter":
        return <Filter setActivePage={setActivePage} />

      case "campaign":
        return <Campaign setActivePage={setActivePage} setActiveTab={setActiveTab} />

      case "create-campaign":
        return <CreateCampaign setActivePage={setActivePage} setActiveTab={setActiveTab} />  

      case "define-audience":
        return <DefineAudience setActivePage={setActivePage} setActiveTab={setActiveTab} /> 
      
      case "complete-campaign":
        return <CompleteCampaign setActivePage={setActivePage} setActiveTab={setActiveTab} />    

      case "promotion-tools":  
        return <Promotion setActivePage={setActivePage} setActiveTab={setActiveTab} />

      case "goalset":  
        return <GoalSet setActivePage={setActivePage} setActiveTab={setActiveTab} />
      
      case "goal-overview":
        return <GoalOverview setActivePage={setActivePage} setActiveTab={setActiveTab} />
             
      case "reports":
        // Render reports tabs here if needed
        switch (activeTab) {
          case "generation":
            return <ReportsGeneration setActivePage={setActivePage} setActiveTab={setActiveTab} />;
          case "summary":
            return <ReportSummary setActivePage={setActivePage} setActiveTab={setActiveTab} />;
          case "download":
            return <ReportDownload setActivePage={setActivePage} setActiveTab={setActiveTab} />;
          default:
            return <ReportsGeneration setActivePage={setActivePage} setActiveTab={setActiveTab} />;
        } 

      default:
        return <Dashboard setActivePage={setActivePage} />
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar activePage={activePage} setActivePage={setActivePage} setActiveTab={setActiveTab} />
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  )
}

export default App ;