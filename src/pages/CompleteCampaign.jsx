import React, { useState, useRef } from 'react';
import './CompleteCampaign.css';

function CompleteCampaign({ campaignData = {}, onBack, onComplete }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: false,
    twitter: false,
    linkedin: false,
    instagram: false
  });
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      
      // Check if the file is a video
      setIsVideo(file.type.startsWith('video/'));
      
      // Create a preview URL for the file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPosterPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle removing the file
  const handleRemoveFile = () => {
    setPosterFile(null);
    setPosterPreview(null);
    setIsVideo(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle platform selection
  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  // Handle drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setPosterFile(file);
      
      // Check if the file is a video
      setIsVideo(file.type.startsWith('video/'));
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPosterPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const posterData = {
      file: posterFile,
      platforms: selectedPlatforms,
      isVideo: isVideo
    };
    
    if (onComplete) {
      onComplete(posterData);
    }
  };

  return (
    <div className="complete-campaign-container">
      <div className="campaign-breadcrumb">
        <span>Campaigns</span>
        <span className="separator">{'>'}</span>
        <span>New Campaign</span>
        <span className="separator">{'>'}</span>
        <span>Poster</span>
        <span className="separator">{'>'}</span>
        <span className="current">Upload Poster</span>
      </div>
      
      <h1 className="campaign-title">Add Poster</h1>
      
      <div className="campaign-content">
        <div className="upload-section">
          <h2>Upload your campaign {isVideo ? 'video' : 'poster'}</h2>
          
          <div className="upload-container">
            <div 
              className={`poster-preview-box ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {posterPreview ? (
                isVideo ? (
                  <video 
                    src={posterPreview} 
                    className="poster-preview-video" 
                    controls
                  />
                ) : (
                  <img 
                    src={posterPreview} 
                    alt="Poster preview" 
                    className="poster-preview-image" 
                  />
                )
              ) : (
                <div className="empty-preview">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            
            <div className="upload-controls">
              <div className="upload-poster-box">
                <div className="upload-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L12 8" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11L12 8 15 11" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 16L16 22" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 19L16 22 19 19" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Upload {isVideo ? 'Video' : 'Poster'}</h3>
                <p>Choose a file or drag & drop your {isVideo ? 'video' : 'poster'} here</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                />
                <button className="browse-button" onClick={handleBrowseClick}>
                  Browse Files
                </button>
                
                {posterFile && (
                  <div className="file-info">
                    <span className="file-name">{posterFile.name}</span>
                    <button className="remove-file-button" onClick={handleRemoveFile}>
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="platforms-section">
          <h2>Select Platforms</h2>
          <p>Choose where to share your {isVideo ? 'video' : 'poster'}</p>
          
          <div className="platforms-grid">
            <div className={`platform-card ${selectedPlatforms.facebook ? 'selected' : ''}`}>
              <div className="platform-icon facebook-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Facebook</h3>
              <p>Share to your Facebook page</p>
              <button 
                className={`select-button ${selectedPlatforms.facebook ? 'selected' : ''}`}
                onClick={() => handlePlatformSelect('facebook')}
              >
                {selectedPlatforms.facebook ? 'Selected' : 'Select'}
              </button>
            </div>
            
            <div className={`platform-card ${selectedPlatforms.twitter ? 'selected' : ''}`}>
              <div className="platform-icon twitter-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>X (Twitter)</h3>
              <p>Post to your X timeline</p>
              <button 
                className={`select-button ${selectedPlatforms.twitter ? 'selected' : ''}`}
                onClick={() => handlePlatformSelect('twitter')}
              >
                {selectedPlatforms.twitter ? 'Selected' : 'Select'}
              </button>
            </div>
            
            <div className={`platform-card ${selectedPlatforms.linkedin ? 'selected' : ''}`}>
              <div className="platform-icon linkedin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>LinkedIn</h3>
              <p>Promote on LinkedIn</p>
              <button 
                className={`select-button ${selectedPlatforms.linkedin ? 'selected' : ''}`}
                onClick={() => handlePlatformSelect('linkedin')}
              >
                {selectedPlatforms.linkedin ? 'Selected' : 'Select'}
              </button>
            </div>
            
            <div className={`platform-card ${selectedPlatforms.instagram ? 'selected' : ''}`}>
              <div className="platform-icon instagram-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Instagram</h3>
              <p>Share as an Instagram post</p>
              <button 
                className={`select-button ${selectedPlatforms.instagram ? 'selected' : ''}`}
                onClick={() => handlePlatformSelect('instagram')}
              >
                {selectedPlatforms.instagram ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="campaign-actions">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="done-button" onClick={handleSubmit}>Done</button>
      </div>
      
      <div className="campaign-logo">
        {/* Talent Corner logo will be shown via background-image in CSS */}
      </div>
    </div>
  );
}

export default CompleteCampaign;