import {render,renderWithRouter,testStore} from '../../fixtures/storeFixture'
import '@testing-library/jest-dom'
import {initialState} from '../../fixtures/authFixtures'
import {Login} from  '../../../src/auth/Pages'
import React from 'react'
import { screen } from '@testing-library/react'
describe('first', () => { 
    test('should first', async () => { 
        const store =testStore(initialState)
        renderWithRouter(<Login/>,store)
        const heading =await screen.findByRole('heading',{name:/login/i})
        screen.debug(heading)
        expect(heading).toBeInTheDocument()
     })
 })
