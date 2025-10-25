
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return ( 
        <nav className='navbar'>
            <Link to="/" className='button'>Home</Link>
            <Link to="/addExpense" className='button'>ajouter une dépense</Link>
        </nav>

    );
        
};

export default Navbar;