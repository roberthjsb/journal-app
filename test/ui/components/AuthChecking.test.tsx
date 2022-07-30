
import React from 'react';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AuthChecking } from "../../../src/ui/components/AuthChecking";
describe('AuthChecking', () => { 
 
    test('should render component AuthChecking', () => { 
        const {getByRole}=render(<AuthChecking />);
        
        expect(getByRole('progressbar')).toBeInTheDocument()
     })

})