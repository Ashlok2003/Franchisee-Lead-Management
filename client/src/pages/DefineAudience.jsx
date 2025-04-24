import { useState, useEffect } from "react"
import "./DefineAudience.css"
import CompleteCampaign from "./CompleteCampaign"

function DefineAudience({ onBack, onNext, navigate, campaignData = {} }) {
  const [audienceData, setAudienceData] = useState({
    jobTitle: "",
    location: "",
    experienceMin: "",
    experienceMax: "",
    skills: "",
    education: "",
    salary: "",
    targetCount: "",
    additionalDetails: "",
  })
  const [currentStep, setCurrentStep] = useState('audience')

  const handleChange = (e) => {
    const { name, value } = e.target
    setAudienceData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Combine campaign data with audience data
    const combinedData = {
      ...campaignData,
      audience: audienceData,
    }

    console.log("Combined data:", combinedData)
    
    // Move to the complete campaign step
    setCurrentStep('complete')
  }

  // If we're on the complete campaign step
  if (currentStep === 'complete') {
    return (
      <CompleteCampaign
        campaignData={{ ...campaignData, audience: audienceData }}
        onBack={() => setCurrentStep('audience')}
        onComplete={(posterData) => {
          console.log("Campaign completed with data:", { 
            ...campaignData, 
            audience: audienceData, 
            poster: posterData 
          })
          // Handle completion logic here
          if (navigate) {
            navigate('/campaigns')
          }
        }}
      />
    )
  }

  return (
    <div className="define-audience-container">
      <div className="define-audience-header">
        <div className="breadcrumb">
          <span>Campaigns</span>
          <span className="separator">{">"}</span>
          <span>New Campaign</span>
          <span className="separator">{">"}</span>
          <span className="current">Define Audience</span>
        </div>
        <h1>Define Target Audience</h1>
      </div>

      <div className="audience-form-container">
        <div className="form-section">
          <h2>Audience Criteria</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="jobTitle">
                Job Title <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="e.g. Software Developer"
                  value={audienceData.jobTitle}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">👔</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. Mumbai, Delhi"
                  value={audienceData.location}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">📍</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="experienceMin">
                  Min Experience <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="number"
                    id="experienceMin"
                    name="experienceMin"
                    placeholder="0"
                    min="0"
                    value={audienceData.experienceMin}
                    onChange={handleChange}
                    required
                  />
                  <span className="input-icon">⏱️</span>
                </div>
              </div>

              <div className="form-group half-width">
                <label htmlFor="experienceMax">
                  Max Experience <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input
                    type="number"
                    id="experienceMax"
                    name="experienceMax"
                    placeholder="10"
                    min={audienceData.experienceMin || 0}
                    value={audienceData.experienceMax}
                    onChange={handleChange}
                    required
                  />
                  <span className="input-icon">⏱️</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">
                Key Skills <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="e.g. React, Java, HR Management"
                  value={audienceData.skills}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">🔧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="education">Education</label>
              <div className="input-with-icon">
                <select id="education" name="education" value={audienceData.education} onChange={handleChange}>
                  <option value="" disabled>
                    Select education level
                  </option>
                  <option value="high-school">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
                <span className="input-icon">🎓</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary Range</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="e.g. 5-10 LPA"
                  value={audienceData.salary}
                  onChange={handleChange}
                />
                <span className="input-icon">💰</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="targetCount">Target Count</label>
              <div className="input-with-icon">
                <input
                  type="number"
                  id="targetCount"
                  name="targetCount"
                  placeholder="e.g. 50"
                  min="1"
                  value={audienceData.targetCount}
                  onChange={handleChange}
                />
                <span className="input-icon">🎯</span>
              </div>
            </div>

            <div className="form-group description-group">
              <h3>Additional Requirements</h3>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                placeholder="Any specific requirements or details about the target audience"
                value={audienceData.additionalDetails}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="create-button">
                Save and Next
              </button>
              <button type="button" className="back-button" onClick={onBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="audience-logo">{/* The logo div for Talent Corner branding */}</div>
    </div>
  )
}

export default DefineAudience