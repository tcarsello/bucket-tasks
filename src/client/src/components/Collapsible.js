import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/Collapsible.css';

const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="collapsible">
            <button onClick={toggleCollapse} className="collapsible-header">
            <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '8px' }}></i>
                <h3 style={{margin: 0, display: 'inline'}}>{title}</h3>
            </button>
            <div className={`collapsible-content ${isOpen ? 'open' : 'closed'}`}>
                {isOpen && children}
            </div>
        </div>
    );
};

export default Collapsible;