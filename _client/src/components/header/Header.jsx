import logo from '@/assets/brand-logo.png';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaMoon, FaQuestionCircle, FaSun } from 'react-icons/fa';
import './header.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header" role="banner">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Talent Corner HR Services Logo"
                    className="logo"
                />
                <h1>Talent Corner HR Services Pvt. Ltd</h1>
            </div>

            <div className="header-actions">
                <button
                    className="theme-toggle"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    onClick={() => {
                        toggleTheme();
                        toast.success(`Switched to ${theme === 'light' ? 'dark' : 'light'} mode`);
                    }}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <button
                    className="help-btn"
                    aria-label="Help and Support"
                    onClick={() => toast('Help is on the way!')}
                >
                    <FaQuestionCircle />
                </button>

                <div className="user-profile">
                    <button
                        className="avatar"
                        aria-label="User profile menu"
                        aria-expanded={isDropdownOpen}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    ></button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu" role="menu">
                            <li role="menuitem" className="dropdown-item">
                                Profile
                            </li>
                            <li role="menuitem" className="dropdown-item">
                                Settings
                            </li>
                            <li role="menuitem" className="dropdown-item dropdown-item--danger" onClick={() => toast('Logged out')}>
                                Logout
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;