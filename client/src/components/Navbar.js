import '../css/Navbar.css'

const Navbar = () => {

    return (
        <nav className='top-nav'>
            <div className="top-nav-brand">Bucket Tasks</div>
            <div className="top-nav-links">
                <a href="/register">Register</a>
                <a href="/login">Log In</a>
            </div>
        </nav>
    )

}

export default Navbar