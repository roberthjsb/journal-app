import React from 'react'
import { mount } from 'enzyme';
import '../../setupTests';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { MemoryRouter } from 'react-router-dom'
import { AppRouter } from './../../routers/AppRouter';
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebaseConfig'
import { act } from 'react-dom/test-utils';

const middlewares = [thunk];
let mockStore;
let store;
let wrapper;
const initialStore = {
    auth:{},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'ABC'
        },
        notes:[]
    }
};
jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}))

// jest.clearAllMocks();
mockStore = configureStore(middlewares);
store = mockStore(initialStore);
store.dispatch = jest.fn();


describe('AppRouter test', () => {

    it('should call login si estoy autenticado 2', async () => {
        let user;
        await act(async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user=userCred.user;
            wrapper =  mount(
                <Provider store={store}>
                    <MemoryRouter>
                    <AppRouter/>
                    </MemoryRouter>
                </Provider>);
        });
        expect(login).toHaveBeenCalledWith('i4lHEgC1bjTazQ3CZtkmOMX6jdz2',null)
    });
})
