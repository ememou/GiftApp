import React from 'react'

const Sidebar = ({user}) => {
    return (
        <div className="offcanvas offcanvas-start bg-dark text-white sidebar-nav" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-body py-3">
                <nav className="navbar-dark">
                    <ul className="navbar-nav">
                        <li>
                            <div className='text-muted mediun fw-bold px-3'>Profile</div>
                        </li>
                        <li>
                            <a className="nav-link px-3" href={`/profile/${user.username}`}>
                                <img className='border imgGoProf rounded-circle me-2' src={`http://localhost:5000/image/${user.profilePic}`} alt="" />
                                <span>{user.username}</span>
                            </a>
                        </li>
                        <li className='my-4'>
                            <hr className='dropdown-divider'/>
                        </li>
                        <li>
                            <div className='text-muted mediun fw-bold px-3 mb-3'>Options</div>
                        </li>
                        <li>
                            <a className="nav-link px-3" href={`/profile/${user.username}`}>
                                <span className="me-2"><i className="fas fa-list"></i></span>
                                <span>My WishList</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/profile/${user.username}/friends`} className="nav-link px-3">
                                <span className="me-2"><i className="fas fa-user"></i></span>
                                <span>My Friends</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/profile/${user.username}/mygifts`} className="nav-link px-3">
                                <span className="me-2"><i className="fas fa-gift"></i></span>
                                <span>My Gifts</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/profile/${user.username}/donatedto`} className="nav-link px-3">
                                <span className="me-2"><i className="fas fa-gifts"></i></span>
                                <span>Donated to</span>
                            </a>
                        </li>
                        <li>
                            <a href={`/profile/${user.username}/pending`} className="nav-link px-3">
                                <span className="me-2"> <i className="fas fa-shopping-cart"></i></span>
                                <span>Pending</span>
                            </a>
                        </li>
                        <li className='my-4'>
                            <hr className='dropdown-divider'/>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar