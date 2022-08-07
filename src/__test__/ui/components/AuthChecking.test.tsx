
import React from 'react';
import '@testing-library/jest-dom'
import { AuthChecking } from "../../../ui/components/AuthChecking";
import { render, testStore } from '../../fixtures/storeFixture';
import { initialState } from '../../fixtures/authFixtures';
describe('AuthChecking', () => { 
 
    test('should render component AuthChecking', () => { 
        const {getByRole}=render(<AuthChecking />,testStore({auth:initialState}));
        
        expect(getByRole('progressbar')).toBeInTheDocument()
     })

})