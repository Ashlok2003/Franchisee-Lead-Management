CREATE TABLE leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  status ENUM('pending', 'verified', 'invalid') DEFAULT 'pending',
  source VARCHAR(255),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE verifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lead_id INT NOT NULL,
  type ENUM('email', 'phone', 'duplicate', 'enrichment') NOT NULL,
  status ENUM('valid', 'invalid', 'pending') DEFAULT 'pending',
  details JSON,
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX idx_lead_status ON leads(status);
CREATE INDEX idx_verification_type ON verifications(type);