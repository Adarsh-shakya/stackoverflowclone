import React from 'react'

const ProfileBio = ({currentProfile}) => {
    return (
        
        <div>
            
            <div>
                {
                 
                    currentProfile?.name.length !== 0 ? (
                        <>
                            <h4>Tags watched</h4>
                            {
                                // currentProfile?.tags.map((tag) => (
                                //     <p key={tag}>{tag}</p>
                                // ))
                                <p>currentProfile?.name</p>
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.name ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.name}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileBio
