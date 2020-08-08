import React from 'react'
import { mount } from 'enzyme';
import '../../../setupTests';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { MemoryRouter } from 'react-router-dom'
import { RegisterScreen } from './../../../components/auth/RegisterScreen';
import { types } from './../../../types/types';
import { registerWithEmailAndPassword } from './../../../actions/auth';

const middlewares = [thunk];
let mockStore;
let store;
let wrapper;
const initialStore = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};
jest.mock('../../../actions/auth', () => ({
    registerWithEmailAndPassword: jest.fn()
}))


describe('RegisterScreen test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockStore = configureStore(middlewares);
        store = mockStore(initialStore);
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>);
    })

    it('should be display RegisterScreen', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h3.auth__title')).toBeTruthy()
    });
    it('should be change state de msgError for email invalid', () => {
        const inputField = wrapper.find('input[name="email"]');
        inputField.simulate('change', {
            target: {
                name: 'email',
                value: ''
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        const actions = store.getActions();
        //Email is not valid
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
    });
    it('should be change state de msgError for name ', () => {
        const inputField = wrapper.find('input[name="name"]');
        inputField.simulate('change', {
            target: {
                name: 'name',
                value: ''
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        const actions = store.getActions();
        //Email is not valid
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Name is require'
        });
    });

    it('should be change state de msgError for password validation ', () => {
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>);
        const inputField = wrapper.find('input[name="password"]');
        inputField.simulate('change', {
            target: {
                name: 'password',
                value: ''
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(store.getActions()[0]).toEqual({
            type: types.uiSetError,
            payload: 'Password should ve at least 6 characters and match password with confirmation'
        })
    });

    it('should be Display error message in state ', () => {
        const initialStore = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Error email invalido'
            }
        };
        store = mockStore(initialStore);
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>);
        expect(wrapper.find('.auth__alert-error').text()).toBe(initialStore.ui.msgError)
    })

    it('should be remove error message in state ', () => {
        const initialStore = {
            auth: {},
            ui: {
                loading: false,
                msgError: null
            }
        };
        
        store = mockStore(initialStore);
        store.dispatch= jest.fn();
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>);

        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        expect(registerWithEmailAndPassword).toBeCalledWith("roberth.salazar@outlook.com",123456,"Roberth J");
    })

});