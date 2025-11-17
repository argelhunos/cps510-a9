export default function Navbar() {
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
                    <a className="nav-link" href="#">Drop Tables</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Create Tables</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Populate Tables</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Simple Query Tables</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Advanced Query Tables</a>
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            <button className="btn btn-outline-success" type="submit">Logout</button>
            </div>
        </div>
        </nav>
    )
}