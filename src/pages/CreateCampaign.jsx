import React, { useState } from 'react';
import './CreateCampaign.css';
import DefineAudience from './DefineAudience';
import CompleteCampaign from "./CompleteCampaign";

function CreateCampaign({ onCancel, onCreateSuccess, navigate }) {
  const [currentStep, setCurrentStep] = useState('campaign');
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    channel: '',
    source: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the campaign data
    console.log("Campaign data submitted:", formData);
    
    // Move to the audience definition step
    setCurrentStep('audience');
    
    // If you're using a router, you could also navigate to the audience page
    // if (navigate) {
    //   navigate('/campaigns/new/audience', { state: { campaignData: formData } });
    // }
    
    // Alternatively, if you want to call the success callback
    // if (onCreateSuccess) {
    //   onCreateSuccess(formData);
    // }
  };

  const handleCancel = () => {
    // Navigate to campaigns page
    if (navigate) {
      navigate('/campaigns');
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleBack = () => {
    // Go back to campaign details step
    setCurrentStep('campaign');
  };

  const handleNext = (combinedData) => {
    // Handle the combined data from both steps
    console.log("Combined campaign and audience data:", combinedData);
    
    // Here you would typically submit the data to an API
    
    // Then call the success callback or navigate to the next page
    if (onCreateSuccess) {
      onCreateSuccess(combinedData);
    }
    
    // Or navigate to the campaigns list or next step
    if (navigate) {
      navigate('/campaigns');
    }
  };

  // Render the Define Audience component if we're on that step
  if (currentStep === 'audience') {
    return (
      <DefineAudience 
        onBack={handleBack}
        onNext={handleNext}
        navigate={navigate}
        campaignData={formData}
      />
    );
  }

  // Otherwise render the Campaign creation form
  return (
    <div className="create-campaign-container">
      <div className="create-campaign-header">
        <div className="breadcrumb">
          <span>Campaigns</span>
          <span className="separator">{'>'}</span>
          <span className="current">New Campaign</span>
        </div>
        <h1>Create Campaign</h1>
      </div>

      <div className="campaign-form-container">
        <div className="form-section">
          <h2>Campaign Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Campaign Name <span className="required">*</span></label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter campaign name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">✏️</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="objective">Objective <span className="required">*</span></label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="objective"
                  name="objective"
                  placeholder="e.g. Lead Generation"
                  value={formData.objective}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">🎯</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="channel">Channel <span className="required">*</span></label>
              <div className="input-with-icon">
                <select
                  id="channel"
                  name="channel"
                  value={formData.channel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select channel</option>
                  <option value="email">Email</option>
                  <option value="social">Social Media</option>
                  <option value="google">Google Ads</option>
                  <option value="meta">Meta Ads</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
                <span className="input-icon">📢</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="source">Source <span className="required">*</span></label>
              <div className="input-with-icon">
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select source</option>
                  <option value="google-ads">Google Ads</option>
                  <option value="meta-ads">Meta Ads</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                  <option value="direct">Direct</option>
                </select>
                <span className="input-icon">📋</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date <span className="required">*</span></label>
              <div className="input-with-icon">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">📅</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date <span className="required">*</span></label>
              <div className="input-with-icon">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate}
                  required
                />
                <span className="input-icon">📅</span>
              </div>
            </div>

            <div className="form-group description-group">
              <h3>Campaign Description</h3>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your campaign goals and details"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="create-button"
              >
                Create Campaign
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="campaign-logo">
        {/* The logo div is kept, but without the image reference */}
      </div>
    </div>
  );
}

export default CreateCampaign;