import React from 'react'
import Feed from '../Feed'
import NewPost from '../NewPost'

const Middle = () => {
  return (
    <div className="flex text-white flex-col gap-4 h-screen overflow-auto">
      <NewPost />
      <Feed />
    </div>
  )
}

export default Middle