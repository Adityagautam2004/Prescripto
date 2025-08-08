import React from 'react'
import{ assets } from '../assets/assets'

const Header = () => {
  return (
    <div>

        {/*----------left side----------*/}
        <div>
            <p>
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div>
                <img src={assets.group_profiles} alt="" />
                <p>Simply Browse Through Our Extensive Network of Doctors, <br /> schedule your appointments today </p>
            </div>
        </div>

        {/*----------right side----------*/}

        <div>

        </div>
    </div>
  )
}

export default Header