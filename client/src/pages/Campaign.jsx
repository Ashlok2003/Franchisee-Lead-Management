import React, { useState } from 'react';
import './Campaign.css';
import CreateCampaign from './CreateCampaign';
import DefineAudience from './DefineAudience';
import CompleteCampaign from "./CompleteCampaign";



function Campaign() {
  const [activeCampaigns, setActiveCampaigns] = useState([
    { id: 1, name: 'Spring Promo', source: 'Google Ads', leads: 120, status: 'Running' },
    { id: 2, name: 'Summer Launch', source: 'Meta Ads', leads: 85, status: 'Running' },
    { id: 3, name: 'Holiday Blast', source: 'LinkedIn', leads: 60, status: 'Running' }
  ]);

  const [endedCampaigns, setEndedCampaigns] = useState([
    { id: 4, name: 'Winter Drive', source: 'Google Ads', leads: 95, status: 'Ended' },
    { id: 5, name: 'Autumn Push', source: 'Meta Ads', leads: 70, status: 'Ended' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedSource, setSelectedSource] = useState('All sources');
  const [dateRange, setDateRange] = useState('Select dates');
  
  // State for tracking current step and campaign data
  const [currentStep, setCurrentStep] = useState('campaign-list');
  const [campaignData, setCampaignData] = useState({});
  const [audienceData, setAudienceData] = useState({});

  const pauseCampaign = (id) => {
    setActiveCampaigns(activeCampaigns.map(campaign => 
      campaign.id === id ? {...campaign, status: 'Paused'} : campaign
    ));
  };

  const reactivateCampaign = (id) => {
    const campaign = endedCampaigns.find(c => c.id === id);
    if (campaign) {
      setEndedCampaigns(endedCampaigns.filter(c => c.id !== id));
      setActiveCampaigns([...activeCampaigns, {...campaign, status: 'Running'}]);
    }
  };

  const handleCreateCampaign = () => {
    setCurrentStep('create-campaign');
  };

  const handleCancelCreate = () => {
    setCurrentStep('campaign-list');
    setCampaignData({});
    setAudienceData({});
  };

  // Handle first step completion - store campaign data and move to audience step
  const handleCampaignCreated = (newCampaignData) => {
    setCampaignData(newCampaignData);
    setCurrentStep('define-audience');
  };

  // Handle second step completion - store audience data and move to next step
  const handleAudienceCreated = (audienceData) => {
    setAudienceData(audienceData);
    setCurrentStep('next-step'); // This will be replaced with your next step
  };

  // Handle going back from audience step to campaign step
  const handleBackToCreate = () => {
    setCurrentStep('create-campaign');
  };

  // Final submission after all steps are complete
  const handleFinalSubmit = (finalData) => {
    // Add the new campaign to the active campaigns list
    const campaignWithId = {
      ...campaignData,
      ...audienceData,
      ...finalData,
      id: Math.max(...activeCampaigns.map(c => c.id), 0) + 1,
      leads: 0,
      status: 'Running'
    };
    
    setActiveCampaigns([...activeCampaigns, campaignWithId]);
    setCurrentStep('campaign-list');
    setCampaignData({});
    setAudienceData({});
  };

  // The handleDateRangeChange function
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    // Additional logic for date range filtering can be added here
  };

  // Render different components based on current step
  if (currentStep === 'create-campaign') {
    return (
      <CreateCampaign 
        onCancel={handleCancelCreate} 
        onCreateSuccess={handleCampaignCreated}
      />
    );
  }

  if (currentStep === 'define-audience') {
    return (
      <DefineAudience
        campaignData={campaignData}
        onBack={handleBackToCreate}
        onNext={handleAudienceCreated}
      />
    );
  }



  // Default view - campaign list
  return (
    <div className="campaign-container">
      <div className="campaign-overview">
        <h1>Campaign Overview</h1>
        
        <div className="card-container">
          {/* New Campaign */}
          <div className="card">
            <div className="card-header">
              <div className="icon-circle">
                <span className="icon">+</span>
              </div>
              <h2>New Campaign</h2>
            </div>
            <p className="card-description">Create a new digital campaign.</p>
            <button className="primary-button" onClick={handleCreateCampaign}>Create</button>
          </div>
          
          {/* Active Campaigns */}
          <div className="card">
            <div className="card-header">
              <div className="icon-circle">
                <span className="icon">⏱</span>
              </div>
              <h2>Active Campaigns</h2>
            </div>
            <p className="card-description">View and manage running campaigns.</p>
            <button className="secondary-button">View All</button>
          </div>
          
          {/* Past Campaigns */}
          <div className="card">
            <div className="card-header">
              <div className="icon-circle">
                <span className="icon">⌛</span>
              </div>
              <h2>Past Campaigns</h2>
            </div>
            <p className="card-description">Review completed campaigns.</p>  
            <button className="primary-button">Browse</button>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="filter-section">
        <h2>Filter Campaigns</h2>
        <div className="filter-controls">
          <div className="filter-item">
            <label>Search</label>
            <div className="input-container">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Campaign name or ID" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-item">
            <label>Status</label>
            <div className="input-container">
              <span className="filter-icon">🔍</span>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All statuses</option>
                <option>Running</option>
                <option>Paused</option>
                <option>Ended</option>
              </select>
            </div>
          </div>
          
          <div className="filter-item">
            <label>Source</label>
            <div className="input-container">
              <span className="filter-icon">🔍</span>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option>All sources</option>
                <option>Google Ads</option>
                <option>Meta Ads</option>
                <option>LinkedIn</option>
              </select>
            </div>
          </div>
          
          <div className="filter-item">
            <label>Date Range</label>
            <div className="input-container">
              <span className="calendar-icon">📅</span>
              <input 
                type="text" 
                placeholder="Select dates" 
                value={dateRange}
                readOnly
                onClick={() => {
                  alert('Date picker would open here');
                  // handleDateRangeChange('New date range');
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="filter-actions">
          <button className="primary-button">Apply Filters</button>
        </div>
      </div>
      
      {/* Active Campaigns Table */}
      <div className="campaigns-table-container">
        <h2>Active Campaigns</h2>
        <div className="table-wrapper">
          <table className="campaigns-table">
            <tbody>
              {activeCampaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>
                    <div className="campaign-name">
                      <span className="campaign-icon">⏱</span>
                      <span>{campaign.name}</span>
                    </div>
                  </td>
                  <td>{campaign.source}</td>
                  <td>Leads: {campaign.leads}</td>
                  <td>Status: {campaign.status}</td>
                  <td className="action-buttons">
                    <button className="icon-button" title="Edit">✏️</button>
                    <button 
                      className="icon-button" 
                      title="Pause"
                      onClick={() => pauseCampaign(campaign.id)}
                    >⏸️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recently Ended Campaigns */}
      <div className="campaigns-table-container">
        <h2>Recently Ended</h2>
        <div className="table-wrapper">
          <table className="campaigns-table">
            <tbody>
              {endedCampaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>
                    <div className="campaign-name">
                      <span className="campaign-icon">⌛</span>
                      <span>{campaign.name}</span>
                    </div>
                  </td>
                  <td>{campaign.source}</td>
                  <td>Leads: {campaign.leads}</td>
                  <td>Status: {campaign.status}</td>
                  <td className="action-buttons">
                    <button className="icon-button" title="Analytics">📊</button>
                    <button 
                      className="icon-button" 
                      title="Reactivate"
                      onClick={() => reactivateCampaign(campaign.id)}
                    >🔄</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Campaign;