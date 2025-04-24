import React, { useState, useEffect } from 'react';
import './GoalOverview.css';

const GoalOverview = ({ setActivePage }) => {
  // Initial state with sample goal data
  const [goals, setGoals] = useState({
    monthly: {
      title: 'Monthly Lead Goal',
      description: 'Target: 300 leads this month',
      progress: 65, // percentage
    },
    conversion: {
      title: 'Conversion Goal',
      description: 'Target: 20% conversion rate',
      progress: 40, // percentage
    },
    revenue: {
      title: 'Revenue Goal',
      description: 'Target: $50,000 from leads',
      progress: 72, // percentage
    },
    newActivities: [
      { label: 'Email Campaign Progress', value: 58 },
      { label: 'Conversion Rate (%):', value: 12.5 },
      { label: 'Revenue Target ($)', value: 85000 }
    ]
  });

  // Form state for editing goals
  const [monthlyLeadTarget, setMonthlyLeadTarget] = useState('');
  const [conversionRate, setConversionRate] = useState('');
  const [revenueTarget, setRevenueTarget] = useState('');
  const [showSetGoalForm, setShowSetGoalForm] = useState(false);

  // Load goals from localStorage when component mounts
  useEffect(() => {
    const savedGoals = localStorage.getItem('marketingGoals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        console.error('Error parsing saved goals', e);
      }
    }
  }, []);

  const handleBack = () => {
    // Navigate back to dashboard
    setActivePage('dashboard');
  };

  const handleEditGoals = () => {
    setShowSetGoalForm(true);
  };

  const handleSaveGoals = () => {
    // Update goals with new values
    const updatedGoals = {
      ...goals,
      monthly: {
        ...goals.monthly,
        description: `Target: ${monthlyLeadTarget} leads this month`
      },
      conversion: {
        ...goals.conversion,
        description: `Target: ${conversionRate}% conversion rate`
      },
      revenue: {
        ...goals.revenue,
        description: `Target: $${revenueTarget} from leads`
      }
    };
    
    setGoals(updatedGoals);
    
    // Save to localStorage
    localStorage.setItem('marketingGoals', JSON.stringify(updatedGoals));
    
    // Hide the form
    setShowSetGoalForm(false);
  };

  const handleViewPerformance = () => {
    // Navigate to performance page
    setActivePage('performance');
  };

  // Function to render progress bars
  const renderProgressBar = (value) => {
    return (
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${value}%` }}
        >
          <span className="progress-value">{value}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="goal-overview-container">
      <div className="goal-overview-header">
        <button className="back-button" onClick={handleBack}>
          &larr; Back
        </button>
        <h1>Goal Overview</h1>
        <button className="performance-button" onClick={handleViewPerformance}>
          Performance
        </button>
      </div>

      {!showSetGoalForm ? (
        <>
          <div className="goal-summary-cards">
            {/* Monthly Lead Goal Card */}
            <div className="goal-card">
              <h3>{goals.monthly.title}</h3>
              <p>{goals.monthly.description}</p>
              <div className="progress-indicator">
                <div 
                  className="progress-circle" 
                  style={{ 
                    background: `conic-gradient(#6347b9 ${goals.monthly.progress * 3.6}deg, #e6e6e6 0deg)` 
                  }}
                >
                  <div className="progress-inner">{goals.monthly.progress}%</div>
                </div>
              </div>
              <button className="edit-goal-btn">Edit Goal</button>
            </div>

            {/* Conversion Goal Card */}
            <div className="goal-card">
              <h3>{goals.conversion.title}</h3>
              <p>{goals.conversion.description}</p>
              <div className="progress-indicator">
                <div 
                  className="progress-circle" 
                  style={{ 
                    background: `conic-gradient(#6347b9 ${goals.conversion.progress * 3.6}deg, #e6e6e6 0deg)` 
                  }}
                >
                  <div className="progress-inner">{goals.conversion.progress}%</div>
                </div>
              </div>
              <button className="edit-goal-btn">Edit Goal</button>
            </div>

            {/* Revenue Goal Card */}
            <div className="goal-card">
              <h3>{goals.revenue.title}</h3>
              <p>{goals.revenue.description}</p>
              <div className="progress-indicator">
                <div 
                  className="progress-circle" 
                  style={{ 
                    background: `conic-gradient(#6347b9 ${goals.revenue.progress * 3.6}deg, #e6e6e6 0deg)` 
                  }}
                >
                  <div className="progress-inner">{goals.revenue.progress}%</div>
                </div>
              </div>
              <button className="edit-goal-btn">Edit Goal</button>
            </div>
          </div>

          <div className="goal-details-section">
            <h2>Goal Progress</h2>
            
            <div className="goal-progress-list">
              {/* Display newActivities from goals state */}
              {goals.newActivities.map((activity, index) => (
                <div className="progress-item" key={index}>
                  <div className="progress-label">{activity.label}</div>
                  {renderProgressBar(activity.value)}
                </div>
              ))}
            </div>
            
            <button className="edit-goals-btn" onClick={handleEditGoals}>
              Set New Goal
            </button>
          </div>
        </>
      ) : (
        <div className="set-new-goal-form">
          <h2>Set New Goal</h2>
          
          <div className="form-group">
            <label>Monthly Lead Target</label>
            <input 
              type="number" 
              placeholder="Enter number of leads"
              value={monthlyLeadTarget}
              onChange={(e) => setMonthlyLeadTarget(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Conversion Rate (%)</label>
            <input 
              type="number" 
              placeholder="Enter conversion rate"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Revenue Target ($)</label>
            <input 
              type="number" 
              placeholder="Enter revenue goal"
              value={revenueTarget}
              onChange={(e) => setRevenueTarget(e.target.value)}
            />
          </div>
          
          <button className="save-goals-btn" onClick={handleSaveGoals}>
            Save Goals
          </button>
        </div>
      )}
      
      {/* Background decoration */}
      <div className="background-decoration"></div>
    </div>
  );
};

export default GoalOverview;