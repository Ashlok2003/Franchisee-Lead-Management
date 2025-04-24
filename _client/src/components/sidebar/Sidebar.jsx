/* eslint-disable no-unused-vars */
import { useTheme } from '@/contexts/ThemeContext';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    FaArrowLeft,
    FaArrowRight,
    FaBuilding,
    FaBullhorn,
    FaChartBar,
    FaMinus,
    FaPlus,
    FaThLarge,
    FaUpload,
    FaUsers,
} from 'react-icons/fa';
import './sidebar.css';

const NavItem = ({
    icon: Icon,
    label,
    isActive,
    onClick,
    children,
    isSubmenu,
    toggleSubmenu,
    isSubmenuOpen,
}) => (
    <div className={`nav-item ${isSubmenu ? 'sub-menu-item' : ''}`}>
        <button
            className={`nav-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
        >
            <Icon className="nav-icon" />
            <span>{label}</span>
            {children && (
                <div
                    className="toggle-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSubmenu(e);
                    }}
                    aria-label={isSubmenuOpen ? 'Collapse submenu' : 'Expand submenu'}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            toggleSubmenu(e);
                        }
                    }}
                >
                    {isSubmenuOpen ? <FaMinus /> : <FaPlus />}
                </div>
            )}
        </button>
        {isSubmenuOpen && children}
    </div>
);

NavItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    isSubmenu: PropTypes.bool,
    toggleSubmenu: PropTypes.func,
    isSubmenuOpen: PropTypes.bool,
};

const Sidebar = ({ activePage, setActivePage, setActiveTab }) => {
    const [expanded, setExpanded] = useState(true);
    const [franchiseExpanded, setFranchiseExpanded] = useState(false);
    const { theme } = useTheme();

    const handleNavClick = (page, tab = '') => {
        setActivePage(page);
        if (tab) {
            setActiveTab(tab);
        }
    };

    const toggleSidebar = () => {
        setExpanded(!expanded);
        if (!expanded && franchiseExpanded) {
            setFranchiseExpanded(false);
        }
    };

    const toggleFranchise = (e) => {
        e.stopPropagation();
        setFranchiseExpanded((prev) => !prev);
        console.log('Franchise Expanded:', !franchiseExpanded);
    };

    const navItems = [
        { page: 'dashboard', icon: FaThLarge, label: 'Dashboard' },
        { page: 'upload-leads', icon: FaUpload, label: 'Upload Leads' },
        { page: 'leads-management', icon: FaUsers, label: 'Leads Management' },
        { page: 'promotion-tools', icon: FaBullhorn, label: 'Promotion Tools' },
        { page: 'reports', icon: FaChartBar, label: 'Reports & Analytics' },
    ];

    return (
        <aside
            className={`sidebar ${expanded ? '' : 'collapsed'}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {expanded ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
            <nav className="sidebar-nav">
                <div className="nav-item franchise-item">
                    <NavItem
                        icon={FaBuilding}
                        label="Franchise Leads Management"
                        isActive={activePage === 'franchise-management'}
                        onClick={() => handleNavClick('franchise-management')}
                        toggleSubmenu={toggleFranchise}
                        isSubmenuOpen={franchiseExpanded}
                    >
                        <div
                            className={`sub-menu ${franchiseExpanded ? 'open' : ''}`}
                            role="menu"
                            data-testid="submenu"
                        >
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.page}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={activePage === item.page}
                                    onClick={() => handleNavClick(item.page)}
                                    isSubmenu
                                />
                            ))}
                        </div>
                    </NavItem>
                </div>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    activePage: PropTypes.string.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};

export default Sidebar;