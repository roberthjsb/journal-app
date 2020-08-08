import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('authReducer tests', () => {
    it('should be register State with user login info', () => {
        const initialState = {}
        const newState = authReducer(
            initialState,
            {
                type: types.login,
                payload: {
                    uid: 'pe13deqqe',
                    displayName: 'Roberth'
                }
            }
        );
        expect(newState).toEqual({
            uid: 'pe13deqqe',
            name: 'Roberth'
        });
    });
    it('should be delete data the user auth', () => {
        const initialState = {
            uid: 'pe13deqqe',
            displayName: 'Roberth'
        }
        const newState = authReducer(
            initialState,
            {
                type: types.logout,
                payload: {
                    uid: 'pe13deqqe',
                    displayName: 'Roberth'
                }
            }
        );
        expect(newState).toEqual({});
    });
    it('should be preserve the state user auth', () => {
        const initialState = {
            uid: 'pe13deqqe',
            displayName: 'Roberth'
        }
        const newState = authReducer(
            initialState,
            {
                type: types.login+'000',
                payload: {
                    uid: 'pe13deqqe',
                    displayName: 'Roberth'
                }
            }
        );
        expect(newState).toEqual({
            uid: 'pe13deqqe',
            displayName: 'Roberth'
        });
    });
});
