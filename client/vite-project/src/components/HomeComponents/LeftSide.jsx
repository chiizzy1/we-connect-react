import React from 'react'
import LogoSearch from '../LogoSearch';
import ProfileCard from '../ProfileCard'
import FollowersCard from '../FollowersCard'

const LeftSide = () => {
  return (
    <div className='flex text-white flex-col gap-4 h-screen overflow-auto pb-8'>
      <LogoSearch />
      <ProfileCard location="homePage" />
      <FollowersCard />
    </div>
  )
}

export default LeftSide