
import SideBar from '@/Components/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div className='bg-gray-200 flex pt-16'>
      <SideBar/>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Admin
