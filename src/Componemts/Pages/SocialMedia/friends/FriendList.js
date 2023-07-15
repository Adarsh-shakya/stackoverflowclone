import React from 'react'
import { useSelector } from 'react-redux'
import Friend from './Friend'
const FriendList = () => {

    const users=useSelector((state) =>state.usersReducer)
  return (
    <div className='friend-list'>
       {
                users.map((user) => (
                    <Friend user={user} key={user?._id} />
                ))
            }
    </div>
  )
}

export default FriendList
