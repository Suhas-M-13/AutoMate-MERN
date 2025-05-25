import React, { useEffect, useState } from 'react'

const UserIcon = ({username, reverse = false}) => {
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        // console.log("username inside icon : ",username)
        // Generate profile image
        const firstCharacter = username.charAt(0).toUpperCase();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        context.fillStyle = '#F2AA4CFF';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#101820FF';
        context.font = 'bold 50px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(firstCharacter, canvas.width / 2, canvas.height / 2);
        setProfileImage(canvas.toDataURL());
    }, [username]);

    return (
        <div>
            <div className="relative">
                <div className="flex items-center space-x-3">
                    {reverse ? (
                        <>
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-indigo-500 hover:ring-indigo-600 transition-all duration-300 hover:scale-110"
                            />
                            <span className="text-indigo-900 font-medium">{username}</span>
                        </>
                    ) : (
                        <>
                            <span className="text-indigo-900 font-medium">{username}</span>
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-indigo-500 hover:ring-indigo-600 transition-all duration-300 hover:scale-110"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserIcon
