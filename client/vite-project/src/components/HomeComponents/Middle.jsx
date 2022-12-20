import React from 'react'
import Feed from '../Feed'
import NewPost from '../NewPost'

const Middle = () => {
  return (
    <div className="font-poppins text-white flex flex-col gap-4 h-screen overflow-auto pb-8">
      <NewPost />
      <Feed />
    </div>
  )
}

export default Middle