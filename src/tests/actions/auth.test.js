import { login, logout, startLoginEmailPassword, startGoogleLogin,startLogout } from "../../actions/auth";
import { types } from './../../types/types';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { registerWithEmailAndPassword } from './../../actions/auth';

const middlewares = [thunk];
const initialStore = {
    auth: {
        uid: 'testing'
    }
};
let mockStore;
let store;

describe('Auth actions test', () => {
    beforeEach(() => {
        mockStore = configureStore(middlewares);
        store     = mockStore(initialStore);
    });
    it('should be change state user authenticated ', () => {
        const actions = login('testing', 'testUser');

        expect(actions).toEqual({
            type: types.login,
            payload: {
                uid: 'testing',
                displayName: 'testUser'
            }
        });
    });
    it('should be remove state the user authenticated ', () => {
        const actions = logout();
        expect(actions).toEqual({
            type: types.logout
        });
    });

    it('should be change state logout', async () => {
        await store.dispatch(startLogout())
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.logout)
        expect(actions[1].type).toBe(types.noteLogoutCleaning)
    });

    it('should be change state loging', async () => {
        await store.dispatch(startLoginEmailPassword('test@testing.com','123456'))
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid:expect.any(String),
                displayName: null
            }
        })
    });
   

});