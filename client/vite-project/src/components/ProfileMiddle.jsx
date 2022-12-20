import React from 'react'
import Middle from './HomeComponents/Middle'
import ProfileCard from './ProfileCard'

const ProfileMiddle = () => {
  return (
    <div className='gap-4 h-screen overflow-auto pb-8'>
        <ProfileCard />
        <Middle />
    </div>
  )
}

export default ProfileMiddle