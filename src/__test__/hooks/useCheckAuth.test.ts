import { testStore, wrapperWithRedux } from '../fixtures/storeFixture';
import { authenticatedState,initialState } from './../fixtures/authFixtures';
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useSelector,useDispatch } from 'react-redux';
import * as auththunks from '../../store/journal/thunks';
import { Auth, User } from 'firebase/auth';



const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => mockDispatch),
}));


jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    onAuthStateChanged: (_: any, callback: (user: User | null) => void) => callback(authenticatedState as User|null)
}))

describe('useCheckAuth', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })

    test('should return the auth state status', () => {
        const cbStore = testStore({ auth:authenticatedState });
        (useSelector as jest.Mock).mockImplementation(cb =>cb(cbStore.getState()))
        
        const { result } = renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(cbStore) })

         expect(result.current.status).toBe(authenticatedState.status)
    })

    test('should call dispatch and onChangeUser when hook receive response of firebase auth with new state of authentication', async () => {
        const testingStore = testStore({auth: initialState });
        (useSelector as jest.Mock).mockImplementation(cb => cb(testingStore.getState()))
        const spyonChangeUser = jest.spyOn(auththunks, 'onChangeUser')

        renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(testingStore) })
        
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledWith(authenticatedState)

        })
    })

})