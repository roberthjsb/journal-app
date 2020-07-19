import React from 'react'
import  { Provider } from 'react-redux'
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter'
import './styles/styles.scss'


export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter/>
        </Provider>
    )
}
