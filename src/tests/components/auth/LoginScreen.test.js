import React from 'react'
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import '../../../setupTests';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {MemoryRouter} from 'react-router-dom'
import {startGoogleLogin,startLoginEmailPassword} from '../../../actions/auth'

const middlewares = [thunk];
let mockStore;
let store;
let wrapper;
const initialStore={
    ui:{
        loading:false,
        msgError: null

    }
};
jest.mock('../../../actions/auth',()=>({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

describe('LoginScreen Test', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
        mockStore = configureStore(middlewares);
        store     = mockStore(initialStore);
        store.dispatch= jest.fn();
        wrapper =  mount(
            <Provider store={store}>
                <MemoryRouter>
                <LoginScreen/>
                </MemoryRouter>
            </Provider>);
    })


    it('should be display LoginScreen', () => {
        
        expect(wrapper).toMatchSnapshot();
    });
    it('should be fire method startGoogleLogin ', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled()
    });
   
    it('should be fire method handleLogin ', () => {
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        expect(startLoginEmailPassword).toHaveBeenCalledWith( "roberth.salazar@outlook.com","123456")
    });
    
})
