import React from 'react'
import FollowersCard from './FollowersCard'
import InfoCard from './InfoCard'
import LogoSearch from './LogoSearch'

const ProfileLeft = () => {
  return (
    <div className="flex flex-col gap-4 h-screen overflow-auto pb-8">
        <LogoSearch />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default ProfileLeft