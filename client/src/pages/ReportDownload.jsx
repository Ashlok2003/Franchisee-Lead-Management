import { useState } from "react";
import "./ReportDownload.css";

const ReportDownload = ({ setActivePage, setActiveTab }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger the PDF download
    }, 1500);
  };

  const handleCancel = () => {
    // Navigate back to summary page
    setActiveTab("summary");
  };

  const handleNavigateToReports = () => {
    setActiveTab("generation");
  };


  return (
    <div className="report-download-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item clickable" onClick={handleNavigateToReports}>Reports</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item active">Download PDF</span>
      </div>

      <h1>Report Preview</h1>
      
      <div className="report-preview-section">
        <div className="report-preview-frame">
          {isGenerating ? (
            <div className="generating-preview">
              <div className="loading-spinner"></div>
              <p>Generating preview...</p>
            </div>
          ) : (
            <div className="empty-preview">
              <p>Preview will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="download-options-section">
        <h2>Download Options</h2>
        <div className="download-buttons">
          <button className="download-pdf-btn" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      <div className="tips-section">
        <h2>Tips for Best Results</h2>
        <p>
          Ensure all data is up to date before downloading. For large reports, allow extra
          time for conversion.
        </p>
      </div>
    </div>
  );
};

export default ReportDownload;