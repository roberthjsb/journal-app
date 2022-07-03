import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Journal } from '../Pages/Journal'

export const JournalRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Journal />}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}
