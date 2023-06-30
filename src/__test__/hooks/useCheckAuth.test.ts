import { testStore, wrapperWithRedux } from '../fixtures/storeFixture';
import { authenticatedState,initialState } from './../fixtures/authFixtures';
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useSelector } from 'react-redux';
import * as auththunks from '../../store/journal/thunks';
import { User } from 'firebase/auth';
import { Mock, vi } from 'vitest';



const mockDispatch = vi.fn()

vi.mock("react-redux", async () => {
    const module: typeof import("react-redux")=await vi.importActual("react-redux");
    return ({
        ...module,
        useSelector: vi.fn(),
        useDispatch: vi.fn(() => mockDispatch),
    });
});


vi.mock('firebase/auth', async () => {
    const module: typeof import('firebase/auth') = await vi.importActual('firebase/auth')
    return ({
        ...module,
        onAuthStateChanged: (_: any, callback: (user: User | null) => void) => callback(authenticatedState as User | null)
    });
})

describe('useCheckAuth', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    test('should return the auth state status', () => {
        const cbStore = testStore({ auth:authenticatedState });
        (useSelector as Mock).mockImplementation(cb =>cb(cbStore.getState()))
        
        const { result } = renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(cbStore) })

         expect(result.current.status).toBe(authenticatedState.status)
    })

    test('should call dispatch and onChangeUser when hook receive response of firebase auth with new state of authentication', async () => {
        const testingStore = testStore({auth: initialState });
        (useSelector as Mock).mockImplementation(cb => cb(testingStore.getState()))
        const spyonChangeUser = vi.spyOn(auththunks, 'onChangeUser')

        renderHook(() => useCheckAuth(), { wrapper: wrapperWithRedux(testingStore) })
        
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledTimes(1)
            expect(spyonChangeUser).toHaveBeenCalledWith(authenticatedState)

        })
    })

})