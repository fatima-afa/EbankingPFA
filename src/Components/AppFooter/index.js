import React from 'react'

import "./footer.css";

const AppFooter = () => {
  return (
    <div className='footer'>
        {/* <div className='sb_footer section_padding '></div> */}
        <div className='sb_footer-below'>
            <div className='sb_footer-copyright'>
                <p>
                    @{new Date().getFullYear()} Adria-Bt. All right reserved.
                </p>
            </div>

            <div className='sb_footer-below-links'>
                <a href='#'><div><p>Terms & Conditions</p></div></a>
                <a href='#'><div><p>Privacy</p></div></a>
                <a href='#'><div><p>Security</p></div></a>
                <a href='#'><div><p>Cookies</p></div></a>
            </div>
        </div>
    </div>
  )
}

export default AppFooter;