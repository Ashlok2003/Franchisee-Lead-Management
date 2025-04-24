import React, { useState } from 'react';
import './GoalSet.css';

const GoalSet = ({ setActivePage }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [franchiseDeveloperName, setFranchiseDeveloperName] = useState('');
  
  // State for tracking input values
  const [goals, setGoals] = useState({
    // Lead Generation Goals
    totalLeadsTarget: '',
    linkedin: '',
    whatsappCampaigns: '',
    referralLeads: '',
    emailMarketing: '',
    
    // Conversion Goals
    leadsToClientsTarget: '',
    conversionRateTarget: '',
    avgTimeToConvert: '',
    
    // Follow-up Goals
    followUpCountTarget: '',
    followUpResponseRate: '',
    
    // Campaign Performance Goals
    campaignCountTarget: '',
    emailCTR: '',
    whatsappResponseRate: '',
    roiTarget: '',
    
    // Financial Goals
    revenueFromFranchises: '',
    profitMarginGoal: '',
    averageCostPerLead: '',
    customerAcquisitionCost: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoals({ ...goals, [name]: value });
  };
  
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    // Clear any existing error
    setDateError('');
    
    // If end date is already set, validate the date range
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      setDateError('Start date cannot be after end date');
    }
  };
  
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    
    // Clear any existing error
    setDateError('');
    
    // Validate the date range
    if (startDate && new Date(startDate) > new Date(newEndDate)) {
      setDateError('End date cannot be before start date');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate date range before submission
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        setDateError('End date must be after start date');
        return;
      }
    } else {
      // Check if both dates are filled
      if (!startDate || !endDate) {
        setDateError('Both start and end dates are required');
        return;
      }
    }
    
    // Validate franchise developer name
    if (!franchiseDeveloperName.trim()) {
      // You could set an error for this field if needed
      return;
    }
    
    // Save goals to localStorage for persistence
    const goalsData = {
      franchiseDeveloperName,
      period: {
        startDate,
        endDate
      },
      monthly: {
        title: 'Monthly Lead Goal',
        description: `Reach ${goals.totalLeadsTarget} leads this month`,
        progress: 0, // Start with 0 progress
      },
      conversion: {
        title: 'Conversion Goal',
        description: `Improve conversion rate by ${goals.conversionRateTarget}%`,
        progress: 0,
      },
      revenue: {
        title: 'Revenue Goal',
        description: `$${goals.revenueFromFranchises} revenue target`,
        progress: 0,
      },
      newActivities: [
        { label: 'Email Campaign Progress', value: 0 },
        { label: 'Conversion Rate (%):', value: parseFloat(goals.conversionRateTarget) || 0 },
        { label: 'Revenue Target ($)', value: parseFloat(goals.revenueFromFranchises) || 0 }
      ]
    };
    
    localStorage.setItem('marketingGoals', JSON.stringify(goalsData));
    
    // Show success message
    setShowSuccessMessage(true);
  };
  
  const handleCancel = () => {
    // Reset all form fields
    setStartDate('');
    setEndDate('');
    setDateError('');
    setFranchiseDeveloperName('');
    setGoals({
      totalLeadsTarget: '',
      linkedin: '',
      whatsappCampaigns: '',
      referralLeads: '',
      emailMarketing: '',
      leadsToClientsTarget: '',
      conversionRateTarget: '',
      avgTimeToConvert: '',
      followUpCountTarget: '',
      followUpResponseRate: '',
      campaignCountTarget: '',
      emailCTR: '',
      whatsappResponseRate: '',
      roiTarget: '',
      revenueFromFranchises: '',
      profitMarginGoal: '',
      averageCostPerLead: '',
      customerAcquisitionCost: ''
    });
  };

  const handleViewGoalOverview = () => {
    // Use setActivePage for navigation
    setActivePage("goal-overview");
  };

  return (
    <div className="goal-set-container">
      {showSuccessMessage && (
        <div className="success-message">
          <div className="success-content">
            <i className="fas fa-check-circle"></i>
            <p>Goals successfully saved!</p>
            <button onClick={handleViewGoalOverview}>
              View Goal Overview
            </button>
          </div>
        </div>
      )}
      
      <div className="goal-set-header">
        <div className="goal-set-logo">
          <div className="logo-icon">
            <i className="fas fa-bullseye"></i>
          </div>
        </div>
        <div>
          <h1>Set Your Monthly / Quarterly Goals</h1>
          <p>Track performance, conversions, and marketing KPIs with ease.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Franchise Developer Name Section */}
        <div className="goal-section">
          <h2><i className="fas fa-user"></i> Franchise Developer Information</h2>
          
          <div className="goal-input-group">
            <label>Franchise Developer Name</label>
            <input 
              type="text" 
              name="franchiseDeveloperName" 
              value={franchiseDeveloperName} 
              onChange={(e) => setFranchiseDeveloperName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        {/* Lead Generation Goals Section */}
        <div className="goal-section">
          <h2><i className="fas fa-chart-line"></i> Lead Generation Goals</h2>
          
          <div className="goal-input-group">
            <label>Total Leads Target</label>
            <input 
              type="number" 
              name="totalLeadsTarget" 
              value={goals.totalLeadsTarget} 
              onChange={handleInputChange}
              placeholder="Enter number"
            />
          </div>
          
          <div className="goal-input-group">
            <label>LinkedIn</label>
            <input 
              type="number" 
              name="linkedin" 
              value={goals.linkedin} 
              onChange={handleInputChange}
              placeholder="Enter target"
            />
          </div>
          
          <div className="goal-input-group">
            <label>WhatsApp Campaigns</label>
            <input 
              type="number" 
              name="whatsappCampaigns" 
              value={goals.whatsappCampaigns} 
              onChange={handleInputChange}
              placeholder="Enter target"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Referral Leads</label>
            <input 
              type="number" 
              name="referralLeads" 
              value={goals.referralLeads} 
              onChange={handleInputChange}
              placeholder="Enter target"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Email Marketing</label>
            <input 
              type="number" 
              name="emailMarketing" 
              value={goals.emailMarketing} 
              onChange={handleInputChange}
              placeholder="Enter target"
            />
          </div>
        </div>
        
        {/* Conversion Goals Section */}
        <div className="goal-section">
          <h2><i className="fas fa-exchange-alt"></i> Conversion Goals</h2>
          
          <div className="goal-input-group">
            <label>Leads to Clients Target</label>
            <input 
              type="number" 
              name="leadsToClientsTarget" 
              value={goals.leadsToClientsTarget} 
              onChange={handleInputChange}
              placeholder="Enter number"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Conversion Rate Target (%)</label>
            <input 
              type="number" 
              name="conversionRateTarget" 
              value={goals.conversionRateTarget} 
              onChange={handleInputChange}
              placeholder="Enter %"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Avg. Time to Convert (Days)</label>
            <input 
              type="number" 
              name="avgTimeToConvert" 
              value={goals.avgTimeToConvert} 
              onChange={handleInputChange}
              placeholder="Enter days"
            />
          </div>
        </div>
        
        {/* Follow-up Goals Section */}
        <div className="goal-section">
          <h2><i className="fas fa-reply-all"></i> Follow-Up Goals</h2>
          
          <div className="goal-input-group">
            <label>Follow-up Count Target</label>
            <input 
              type="number" 
              name="followUpCountTarget" 
              value={goals.followUpCountTarget} 
              onChange={handleInputChange}
              placeholder="Enter number"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Follow-up Response Rate Goal (%)</label>
            <input 
              type="number" 
              name="followUpResponseRate" 
              value={goals.followUpResponseRate} 
              onChange={handleInputChange}
              placeholder="Enter %"
            />
          </div>
        </div>
        
        {/* Campaign Performance Goals Section */}
        <div className="goal-section">
          <h2><i className="fas fa-bullhorn"></i> Campaign Performance Goals</h2>
          
          <div className="goal-input-group">
            <label>Campaign Count Target</label>
            <input 
              type="number" 
              name="campaignCountTarget" 
              value={goals.campaignCountTarget} 
              onChange={handleInputChange}
              placeholder="Enter number"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Email CTR Goal (%)</label>
            <input 
              type="number" 
              name="emailCTR" 
              value={goals.emailCTR} 
              onChange={handleInputChange}
              placeholder="Enter %"
            />
          </div>
          
          <div className="goal-input-group">
            <label>WhatsApp Response Rate Goal (%)</label>
            <input 
              type="number" 
              name="whatsappResponseRate" 
              value={goals.whatsappResponseRate} 
              onChange={handleInputChange}
              placeholder="Enter %"
            />
          </div>
          
          <div className="goal-input-group">
            <label>ROI Target (%)</label>
            <input 
              type="number" 
              name="roiTarget" 
              value={goals.roiTarget} 
              onChange={handleInputChange}
              placeholder="Enter value"
            />
          </div>
        </div>
        
        {/* Financial Goals Section */}
        <div className="goal-section">
          <h2><i className="fas fa-rupee-sign"></i> Financial Goals</h2>
          
          <div className="goal-input-group">
            <label>Revenue from Franchises Target (INR)</label>
            <input 
              type="number" 
              name="revenueFromFranchises" 
              value={goals.revenueFromFranchises} 
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Profit Margin Goal (%)</label>
            <input 
              type="number" 
              name="profitMarginGoal" 
              value={goals.profitMarginGoal} 
              onChange={handleInputChange}
              placeholder="Enter %"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Average Cost per Lead Goal (INR)</label>
            <input 
              type="number" 
              name="averageCostPerLead" 
              value={goals.averageCostPerLead} 
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="goal-input-group">
            <label>Customer Acquisition Cost (CAC) Goal (INR)</label>
            <input 
              type="number" 
              name="customerAcquisitionCost" 
              value={goals.customerAcquisitionCost} 
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>
        </div>
        
        {/* Time Period Section */}
        <div className="goal-section time-period-section">
          <h2><i className="fas fa-calendar-alt"></i> Time Period</h2>
          
          <div className="date-range-container">
            <div className="date-input-group">
              <label>Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={handleStartDateChange}
                required
                className="date-picker"
              />
            </div>
            
            <div className="date-input-group">
              <label>End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={handleEndDateChange}
                required
                className="date-picker"
                min={startDate} // Prevents selecting dates before start date
              />
            </div>
          </div>
          
          {dateError && <div className="date-error">{dateError}</div>}
        </div>
        
        {/* Button Group */}
        <div className="button-group">
          <button type="submit" className="save-btn">
            <i className="fas fa-save mr-2"></i> Save Goals
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            <i className="fas fa-times mr-2"></i> Cancel
          </button>
        </div>
        
        <div className="disclaimer">
          <p>Progress will be tracked and visualized in the dashboard reports.</p>
        </div>
      </form>
    </div>
  );
};

export default GoalSet;