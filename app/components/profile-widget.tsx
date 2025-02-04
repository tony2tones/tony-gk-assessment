import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowIcon } from './icons/arrow-icon'
import Image from 'next/image'
import profileImage from '@/public/profile.jpg'
import { widgetDetails } from '../constants/widget-interface'

const ProfileWidget = ({uid, email}:widgetDetails ) => {
  const router = useRouter();
  
  const goToProfile = () => {
    router.push(`/profile-management/${uid}`)
  }

  return (
    <section className='flex gap-11'>
          <div>
            <h1 className="text-xl">User profile</h1>
            <h3>Your credentials</h3>
            <p><strong>User ID:</strong> {uid}</p>
            <p><strong>Email:</strong> {email ? email : 'No email found'}</p>
            <div className='flex gap-3'>
            <p>Click on the image to update your profile </p> 
            <ArrowIcon />

            </div>
          </div>
          <div className='flex flex-col hover:border-2 border-sky-700 hover:bg-blue-500 hover:text-slate-100 transition-all duration-300' onClick={goToProfile} >
            <Image className='rounded-md hover:cursor-pointer' src={profileImage} width={230} height={300} alt='Profile figure' />
            <p className='font-normal pt-4 pl-3 hover:cursor-pointer hover:bg-blue-500 text-slate-100'>Click to manage your profile?</p>
          </div>
        </section>
  )
}

export default ProfileWidget;