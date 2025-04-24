import { useState } from "react";
import "./ReportSummary.css";

const ReportSummary = ({ setActivePage, setActiveTab }) => {
  const [reportData] = useState({
    totalLeads: 1245,
    convertedLeads: 312,
    conversionRate: "25.1%",
    revenue: "$98,500",
    sourceBreakdown: [
      { source: "LinkedIn", leads: 330, converted: 80, rate: "25%", cpl: "$13.50" },
      { source: "Campaign", leads: 270, converted: 70, rate: "26%", cpl: "$14.00" },
      { source: "Website", leads: 180, converted: 45, rate: "25%", cpl: "$11.80" },
      { source: "Referral", leads: 210, converted: 60, rate: "29%", cpl: "$10.30" },
      { source: "Walk-in", leads: 120, converted: 30, rate: "25%", cpl: "$13.20" },
      { source: "Other", leads: 135, converted: 27, rate: "20%", cpl: "$12.75" }
    ],
    campaignPerformance: [
      { channel: "Facebook", value: 240 },
      { channel: "LinkedIn", value: 180 },
      { channel: "Email", value: 150 },
      { channel: "WhatsApp", value: 120 },
      { channel: "Google", value: 110 },
      { channel: "Other", value: 90 }
    ]
  });

  const handleDownloadPDF = () => {
    setActiveTab("download");
  };

  const handleExportToExcel = () => {
    // Handle export functionality
  };

  const handleBackToFilters = () => {
    setActiveTab("generation");
  };

  return (
    <div className="report-summary-container">
      <h1>Report Summary</h1>
      <p className="description">Your custom franchise report is ready. Review the summary below or explore detailed data and visualizations.</p>

      <div className="key-metrics-section">
        <h2>Key Metrics</h2>
        <div className="metrics-cards">
          <div className="metric-card">
            <div className="metric-header">Leads</div>
            <div className="metric-title">Total Leads</div>
            <div className="metric-value">{reportData.totalLeads}</div>
            <button className="view-details-btn">View Details</button>
          </div>

          <div className="metric-card">
            <div className="metric-header">Conversion</div>
            <div className="metric-title">Leads Converted</div>
            <div className="metric-value">{reportData.convertedLeads}</div>
            <button className="view-details-btn">View Details</button>
          </div>

          <div className="metric-card">
            <div className="metric-header">Rate</div>
            <div className="metric-title">Conversion Rate</div>
            <div className="metric-value">{reportData.conversionRate}</div>
            <button className="view-details-btn">View Details</button>
          </div>

          <div className="metric-card">
            <div className="metric-header">Finance</div>
            <div className="metric-title">Revenue</div>
            <div className="metric-value">{reportData.revenue}</div>
            <button className="view-details-btn">View Details</button>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Lead Source Breakdown</h2>
        <div className="chart-container">
          <div className="bar-chart">
            {reportData.sourceBreakdown.map((item, index) => (
              <div className="chart-bar" key={index}>
                <div 
                  className={`bar bar-color-${index}`} 
                  style={{ height: `${(item.leads / 330) * 200}px` }}
                ></div>
                <div className="bar-label">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Campaign Performance</h2>
        <div className="chart-container">
          <div className="bar-chart">
            {reportData.campaignPerformance.map((item, index) => (
              <div className="chart-bar" key={index}>
                <div 
                  className={`bar bar-color-${index}`} 
                  style={{ height: `${(item.value / 240) * 200}px` }}
                ></div>
                <div className="bar-label">{item.channel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detailed-data-section">
        <h2>Detailed Data</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Lead Source</th>
              <th>Leads</th>
              <th>Converted</th>
              <th>Conversion Rate</th>
              <th>CPL</th>
            </tr>
          </thead>
          <tbody>
            {reportData.sourceBreakdown.map((item, index) => (
              <tr key={index}>
                <td>{item.source}</td>
                <td>{item.leads}</td>
                <td>{item.converted}</td>
                <td>{item.rate}</td>
                <td>{item.cpl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions-container">
        <button className="secondary-button" onClick={handleDownloadPDF}>Download PDF</button>
        <button className="secondary-button" onClick={handleExportToExcel}>Export to Excel</button>
        <button className="secondary-button" onClick={handleBackToFilters}>Back to Filters</button>
      </div>
    </div>
  );
};

export default ReportSummary;