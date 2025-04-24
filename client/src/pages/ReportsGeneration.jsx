import { useState } from "react";
import "./ReportsGeneration.css";

const ReportsGeneration = ({ setActivePage, setActiveTab }) => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedFields, setSelectedFields] = useState({
    leads: {},
    campaigns: {},
    revenue: {}
  });

  const handleDateChange = (section, type, value) => {
    if (section === "leads") {
      setDateRange({ ...dateRange, [type]: value });
    } else {
      // Handle campaign and revenue date ranges if needed
      setSelectedFilters(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          dateRange: {
            ...(prev[section]?.dateRange || {}),
            [type]: value
          }
        }
      }));
    }
  };

  const handleFieldToggle = (section, fieldId) => {
    setSelectedFields(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [fieldId]: !prev[section][fieldId]
      }
    }));
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate the report
    // For now, navigate to report summary
    setActiveTab("summary");
  };

  const handleExportToExcel = () => {
    // Handle export functionality
    console.log("Exporting to Excel...");
  };

  const handleDownloadPDF = () => {
    // Navigate to download page
    setActiveTab("download");
  };

  const handleResetFilters = () => {
    // Reset all filters
    setSelectedFilters({});
    setDateRange({ from: "", to: "" });
    setSelectedFields({
      leads: {},
      campaigns: {},
      revenue: {}
    });
  };

  return (
    <div className="reports-container">
      <h1>Generate Franchise Reports</h1>
      <p className="description">
        Use filters, date ranges, and detailed field selection to generate custom reports across Leads, Campaigns, and Finance.
      </p>

      <div className="report-section">
        <h2>Lead Overview Reports</h2>
        <div className="filters-row">
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-inputs">
              <div className="date-input">
                <input 
                  type="date" 
                  placeholder="From" 
                  value={dateRange.from} 
                  onChange={(e) => handleDateChange("leads", "from", e.target.value)} 
                />
              </div>
              <div className="date-range-separator">-</div>
              <div className="date-input">
                <input 
                  type="date" 
                  placeholder="To" 
                  value={dateRange.to} 
                  onChange={(e) => handleDateChange("leads", "to", e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Lead Source</label>
            <div className="select-wrapper">
              <select>
                <option>Select sources</option>
                <option>LinkedIn</option>
                <option>Campaign</option>
                <option>Referral</option>
                <option>Website</option>
                <option>Walk-in</option>
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Lead Status</label>
            <div className="select-wrapper">
              <select>
                <option>All statuses</option>
                <option>New</option>
                <option>Qualified</option>
                <option>Converted</option>
                <option>Lost</option>
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Assigned Executive</label>
            <div className="select-wrapper">
              <select>
                <option>Select executive</option>
                <option>Executive 1</option>
                <option>Executive 2</option>
                <option>Executive 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fields-selection">
          <h3>Select Fields</h3>
          <div className="fields-grid">
            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="total-leads" 
                  checked={selectedFields.leads.totalLeads || false}
                  onChange={() => handleFieldToggle("leads", "totalLeads")}
                />
                <div className="field-icon total-icon"></div>
                <div className="field-details">
                  <label htmlFor="total-leads">Total Leads Added</label>
                  <span>Today / Week / Month</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="leads-converted" 
                  checked={selectedFields.leads.converted || false}
                  onChange={() => handleFieldToggle("leads", "converted")}
                />
                <div className="field-icon convert-icon"></div>
                <div className="field-details">
                  <label htmlFor="leads-converted">Leads Converted</label>
                  <span>Clients</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="conversion-rate" 
                  checked={selectedFields.leads.conversionRate || false}
                  onChange={() => handleFieldToggle("leads", "conversionRate")}
                />
                <div className="field-icon rate-icon"></div>
                <div className="field-details">
                  <label htmlFor="conversion-rate">Conversion Rate</label>
                  <span>%</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="dropped-leads" 
                  checked={selectedFields.leads.droppedLeads || false}
                  onChange={() => handleFieldToggle("leads", "droppedLeads")}
                />
                <div className="field-icon dropped-icon"></div>
                <div className="field-details">
                  <label htmlFor="dropped-leads">Dropped Leads</label>
                  <span>Cold / Dropped</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="follow-up-stage" 
                  checked={selectedFields.leads.followUpStage || false}
                  onChange={() => handleFieldToggle("leads", "followUpStage")}
                />
                <div className="field-icon followup-icon"></div>
                <div className="field-details">
                  <label htmlFor="follow-up-stage">Follow-up Stage</label>
                  <span>Leads in follow-up</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="time-to-convert" 
                  checked={selectedFields.leads.timeToConvert || false}
                  onChange={() => handleFieldToggle("leads", "timeToConvert")}
                />
                <div className="field-icon time-icon"></div>
                <div className="field-details">
                  <label htmlFor="time-to-convert">Avg. Time to Convert</label>
                  <span>Days</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="follow-up-response" 
                  checked={selectedFields.leads.followUpResponse || false}
                  onChange={() => handleFieldToggle("leads", "followUpResponse")}
                />
                <div className="field-icon response-icon"></div>
                <div className="field-details">
                  <label htmlFor="follow-up-response">Follow-up Response</label>
                  <span>Response rate</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="source-breakdown" 
                  checked={selectedFields.leads.sourceBreakdown || false}
                  onChange={() => handleFieldToggle("leads", "sourceBreakdown")}
                />
                <div className="field-icon source-icon"></div>
                <div className="field-details">
                  <label htmlFor="source-breakdown">Source Breakdown</label>
                  <span>By source</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="cost-per-lead" 
                  checked={selectedFields.leads.costPerLead || false}
                  onChange={() => handleFieldToggle("leads", "costPerLead")}
                />
                <div className="field-icon cost-icon"></div>
                <div className="field-details">
                  <label htmlFor="cost-per-lead">Cost per Lead</label>
                  <span>CPL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h2>Campaign Performance Reports</h2>
        <div className="filters-row">
          <div className="filter-group">
            <label>Campaign Type</label>
            <div className="select-wrapper">
              <select>
                <option>Select type</option>
                <option>Email</option>
                <option>Social Media</option>
                <option>PPC</option>
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-inputs">
              <div className="date-input">
                <input 
                  type="date" 
                  placeholder="From" 
                  value={selectedFilters.campaign?.dateRange?.from || ""} 
                  onChange={(e) => handleDateChange("campaign", "from", e.target.value)} 
                />
              </div>
              <div className="date-range-separator">-</div>
              <div className="date-input">
                <input 
                  type="date" 
                  placeholder="To" 
                  value={selectedFilters.campaign?.dateRange?.to || ""} 
                  onChange={(e) => handleDateChange("campaign", "to", e.target.value)} 
                />
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Budget Range</label>
            <div className="budget-inputs">
              <input type="text" placeholder="Min" />
              <span>-</span>
              <input type="text" placeholder="Max" />
            </div>
          </div>
          
          <div className="filter-group">
            <label>Region</label>
            <div className="select-wrapper">
              <select>
                <option>Select regions</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fields-selection">
          <h3>Select Fields</h3>
          <div className="fields-grid">
            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="campaigns-run" 
                  checked={selectedFields.campaigns.campaignsRun || false}
                  onChange={() => handleFieldToggle("campaigns", "campaignsRun")}
                />
                <div className="field-icon campaign-icon"></div>
                <div className="field-details">
                  <label htmlFor="campaigns-run">Campaigns Run</label>
                  <span>Last 30 Days / Custom</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="leads-campaigns" 
                  checked={selectedFields.campaigns.leadsCampaigns || false}
                  onChange={() => handleFieldToggle("campaigns", "leadsCampaigns")}
                />
                <div className="field-icon leads-icon"></div>
                <div className="field-details">
                  <label htmlFor="leads-campaigns">Leads from Campaigns</label>
                  <span>Total leads</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="cpl-campaigns" 
                  checked={selectedFields.campaigns.cplCampaigns || false}
                  onChange={() => handleFieldToggle("campaigns", "cplCampaigns")}
                />
                <div className="field-icon cpl-icon"></div>
                <div className="field-details">
                  <label htmlFor="cpl-campaigns">CPL from Campaigns</label>
                  <span>Cost per lead</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="call-to-conversion" 
                  checked={selectedFields.campaigns.callToConversion || false}
                  onChange={() => handleFieldToggle("campaigns", "callToConversion")}
                />
                <div className="field-icon call-icon"></div>
                <div className="field-details">
                  <label htmlFor="call-to-conversion">Call-to-Conversion</label>
                  <span>Ratio</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="email-open-rate" 
                  checked={selectedFields.campaigns.emailOpenRate || false}
                  onChange={() => handleFieldToggle("campaigns", "emailOpenRate")}
                />
                <div className="field-icon email-icon"></div>
                <div className="field-details">
                  <label htmlFor="email-open-rate">Email Open Rate</label>
                  <span>CTR</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="whatsapp-delivery" 
                  checked={selectedFields.campaigns.whatsappDelivery || false}
                  onChange={() => handleFieldToggle("campaigns", "whatsappDelivery")}
                />
                <div className="field-icon whatsapp-icon"></div>
                <div className="field-details">
                  <label htmlFor="whatsapp-delivery">WhatsApp Delivery</label>
                  <span>Delivery & Response</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="spend-roi" 
                  checked={selectedFields.campaigns.spendRoi || false}
                  onChange={() => handleFieldToggle("campaigns", "spendRoi")}
                />
                <div className="field-icon roi-icon"></div>
                <div className="field-details">
                  <label htmlFor="spend-roi">Spend vs ROI</label>
                  <span>Return on campaign</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="channel-performance" 
                  checked={selectedFields.campaigns.channelPerformance || false}
                  onChange={() => handleFieldToggle("campaigns", "channelPerformance")}
                />
                <div className="field-icon channel-icon"></div>
                <div className="field-details">
                  <label htmlFor="channel-performance">Channel Performance</label>
                  <span>By channel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h2>Revenue & Finance Reports</h2>
        <div className="filters-row">
          <div className="filter-group">
            <label>Time Period</label>
            <div className="select-wrapper">
              <select>
                <option>Monthly / Quarterly / Yearly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Franchise Type</label>
            <div className="select-wrapper">
              <select>
                <option>Select type</option>
                <option>Standard</option>
                <option>Premium</option>
                <option>Enterprise</option>
              </select>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Region/Country</label>
            <div className="select-wrapper">
              <select>
                <option>Select region</option>
                <option>North India</option>
                <option>South India</option>
                <option>East India</option>
                <option>West India</option>
              </select>
            </div>
          </div>
        </div>

        <div className="fields-selection">
          <h3>Select Fields</h3>
          <div className="fields-grid">
            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="revenue-sold" 
                  checked={selectedFields.revenue.revenueSold || false}
                  onChange={() => handleFieldToggle("revenue", "revenueSold")}
                />
                <div className="field-icon revenue-icon"></div>
                <div className="field-details">
                  <label htmlFor="revenue-sold">Revenue Sold</label>
                  <span>From franchises</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="profit-margin" 
                  checked={selectedFields.revenue.profitMargin || false}
                  onChange={() => handleFieldToggle("revenue", "profitMargin")}
                />
                <div className="field-icon profit-icon"></div>
                <div className="field-details">
                  <label htmlFor="profit-margin">Profit Margin</label>
                  <span>%</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="expense-breakdown" 
                  checked={selectedFields.revenue.expenseBreakdown || false}
                  onChange={() => handleFieldToggle("revenue", "expenseBreakdown")}
                />
                <div className="field-icon expense-icon"></div>
                <div className="field-details">
                  <label htmlFor="expense-breakdown">Expense Breakdown</label>
                  <span>Operating expense</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="revenue-forecast" 
                  checked={selectedFields.revenue.revenueForecast || false}
                  onChange={() => handleFieldToggle("revenue", "revenueForecast")}
                />
                <div className="field-icon forecast-icon"></div>
                <div className="field-details">
                  <label htmlFor="revenue-forecast">Revenue Forecast</label>
                  <span>Monthly / Quarterly</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="growth-graphs" 
                  checked={selectedFields.revenue.growthGraphs || false}
                  onChange={() => handleFieldToggle("revenue", "growthGraphs")}
                />
                <div className="field-icon growth-icon"></div>
                <div className="field-details">
                  <label htmlFor="growth-graphs">Growth Graphs</label>
                  <span>MoM / YoY</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="financial-kpis" 
                  checked={selectedFields.revenue.financialKpis || false}
                  onChange={() => handleFieldToggle("revenue", "financialKpis")}
                />
                <div className="field-icon kpi-icon"></div>
                <div className="field-details">
                  <label htmlFor="financial-kpis">Financial KPIs</label>
                  <span>Gross, Net, EBITDA</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="cost-per-closure" 
                  checked={selectedFields.revenue.costPerClosure || false}
                  onChange={() => handleFieldToggle("revenue", "costPerClosure")}
                />
                <div className="field-icon closure-icon"></div>
                <div className="field-details">
                  <label htmlFor="cost-per-closure">Cost per Closure</label>
                  <span>Average</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="cac" 
                  checked={selectedFields.revenue.cac || false}
                  onChange={() => handleFieldToggle("revenue", "cac")}
                />
                <div className="field-icon cac-icon"></div>
                <div className="field-details">
                  <label htmlFor="cac">CAC</label>
                  <span>Acquisition cost</span>
                </div>
              </div>
            </div>

            <div className="field-checkbox">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="avg-cost-per-lead" 
                  checked={selectedFields.revenue.avgCostPerLead || false}
                  onChange={() => handleFieldToggle("revenue", "avgCostPerLead")}
                />
                <div className="field-icon avg-cost-icon"></div>
                <div className="field-details">
                  <label htmlFor="avg-cost-per-lead">Avg. Cost per Lead</label>
                  <span>Average</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions-container">
        <button className="primary-button" onClick={handleGenerateReport}>Generate Report</button>
        <button className="secondary-button" onClick={handleDownloadPDF}>Download PDF</button>
        <button className="secondary-button" onClick={handleExportToExcel}>Export to Excel</button>
        <button className="secondary-button" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default ReportsGeneration;