import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { SideBar } from '../../../components/journal/SideBar';
import { startLogout } from './../../../actions/auth';
import { startNewNote } from './../../../actions/notes';


const middlewares = [thunk];
const initialStore = {
    auth: {
        uid: 'testing'
    },
    ui: {},
    notes: {
        notes: []
    }
};
let mockStore = configureStore(middlewares);

let store;
let wrapper;

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}))
jest.mock('./../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))
store = mockStore(initialStore);
store.dispatch = jest.fn();
describe('SideBar Tests', () => {

    wrapper = mount(
        <Provider store={store}>
            <SideBar />
        </Provider>
    );
    it('Should be Display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    }
    )
    it('should be Call to startLogout method', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toBeCalled();

    });
    it('should be call to startNewNote method', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toBeCalled();
       
    });

})
