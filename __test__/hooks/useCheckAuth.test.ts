import { testStore, wrapperWithRedux } from '../fixtures/storeFixture';
import { authenticatedState as auth, authenticatedState } from './../fixtures/authFixtures';
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useCheckAuth } from '../../src/hooks/useCheckAuth'
import { useSelector } from 'react-redux';
import * as auththunks from '../../src/store/journal/thunks';


const cbStore = testStore({ auth });
const mockDispatch = jest.fn()

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => mockDispatch),
}));


jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    onAuthStateChanged: (_:any,cb: (user: any) => void)=>cb(authenticatedState)
}))

describe('useCheckAuth ', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })
    test('should return the auth state status', () => {
        (useSelector as jest.Mock).mockImplementation(cb => cb(cbStore.getState()))
        const { result } = renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(cbStore) })
        expect(result.current.status).toBe('authenticated')
    })
    test('should first', async () => {
        (useSelector as jest.Mock).mockImplementation(cb => cb(cbStore.getState()))
        const spyonChangeUser = jest.spyOn(auththunks, 'onChangeUser')

        renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(cbStore) })
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledWith(authenticatedState)

        })
    })

})