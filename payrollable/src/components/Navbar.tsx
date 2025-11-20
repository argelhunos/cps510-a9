import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

// Navbar UI component to be displayed in every webpage other than Login.
// Contains the links to the features of the application the user uses:
// i.e. Drop Tables, Create Tables, Populate Tables, etc.
// Links are non traditional links and uses <Link> react component from react-router.

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Payrollable</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/db/drop">Drop Tables</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/db/create">Create Tables</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/db/populate">Populate Tables</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/simple">Simple Query Tables</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/advanced">Advanced Query Tables</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/update">Update Table</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/homepage/inserts">Table Insertions</Link>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            <button 
                className="btn btn-outline-success"
                onClick={() => {
                    logout();
                    navigate('/login');
                }}
            >
                Logout
            </button>
            </div>
        </div>
        </nav>
    )
}