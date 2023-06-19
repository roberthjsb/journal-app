
import { testUser } from './../fixtures/authFixtures';
jest.mock('firebase/auth', () => {
    return {
        ...jest.requireActual('firebase/auth'),
        signInWithPopup: jest.fn()
            .mockResolvedValueOnce({
                user: testUser
            }),
        signInWithEmailAndPassword: jest.fn()
            .mockResolvedValueOnce({
                user: testUser
            }),
        createUserWithEmailAndPassword: jest.fn().mockResolvedValueOnce({
            user: testUser
        }),
        updateProfile: jest.fn().mockImplementation(() => Promise.resolve())
    }
})
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config';
import { loginWithEmailAndPassword, logoutSession, registerUserWithCredential, signInWithGoogle } from '../../firebase/providers'
import { AuthUserState, StatusResponse, errorState } from '../../store';



describe('firebase providers', () => {
    describe('logoutSession', () => {
        const spySignOut = jest.spyOn(FirebaseAuth, 'signOut');
        afterEach(() => {
            jest.clearAllMocks()
        });
        test('should call logoutSession', async () => {
            await logoutSession()
            expect(spySignOut).toHaveBeenCalled()
        });
        test('should call console.log with message error', async () => {
            const errorMsg = 'Failed test'
            spySignOut.mockImplementation(() => {
                const err: Error = new Error(errorMsg);
                throw { ...err, code: errorMsg }
            })
            await logoutSession()

            expect(spySignOut).toHaveBeenCalled()
        });
    })

    describe('signInWithGoogle', () => {
        afterEach(() => {
            jest.clearAllMocks()
        });

        test('should call signInWithGoogle and return user Information', async () => {
            const result = await signInWithGoogle()
            expect(signInWithPopup).toHaveBeenCalledTimes(1)
            expect(result).toEqual({ ...testUser, ok: true } as AuthUserState & StatusResponse)
        });

        test('should call signInWithGoogle and return error', async () => {

            const errorMsg = 'Failed test';
            (signInWithPopup as jest.Mock).mockImplementation(() => {
                const err: Error = new Error(errorMsg);
                throw { ...err, code: errorMsg }
            })

            const result = await signInWithGoogle()
            expect(signInWithPopup).toHaveBeenCalled()
            expect(result).toEqual({ errorMessage: errorMsg, ok: false } as errorState & StatusResponse)
        });

    })

    describe('loginWithEmailAndPassword', () => {


        test('should call signInWithEmailAndPassword when call loginWithEmailAndPassword an return AuthResult information ok', async () => {
            const result = await loginWithEmailAndPassword({ email: testUser.email!, password: '123455' })
            expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
            expect(result).toEqual({ ...testUser, ok: true })

        })


        test('should call signInWithEmailAndPassword and return error', async () => {

            const errorMsg = 'Failed test';
            (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
                const err: Error = new Error(errorMsg);
                throw { ...err, code: errorMsg }
            })

            const result = await loginWithEmailAndPassword({ email: testUser.email!, password: 'abcde' })
            expect(signInWithEmailAndPassword).toHaveBeenCalled()
            expect(result).toEqual({ errorMessage: errorMsg, ok: false } as errorState & StatusResponse)
        });
    })


    describe('registerUserWithCredential', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })

        test('should call createUserWithEmailAndPassword  and updateProfile when called registerUserWithCredential an return testResult with email and displayname  ', async () => {
            const { email, displayName } = testUser;
            const password = '123456';
            const result = await registerUserWithCredential({ displayName, email, password } as { email: string, password: string, displayName: string })

            expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
                expect.anything(),
                testUser.email,
                password
            );

            expect(result).toEqual({ ok: true, ...testUser });
            expect(updateProfile).toHaveBeenCalledTimes(1);
        })

        test('should return an error result when have exception', async () => {
             const errorMsg = 'Failed test';
            (createUserWithEmailAndPassword as jest.Mock).mockImplementation(()=>{
                const err: Error = new Error(errorMsg);
                throw { ...err, code: errorMsg }
            })
            const { email, displayName } = testUser;
            const password = '123456';
            const result = await registerUserWithCredential({ displayName, email, password } as { email: string, password: string, displayName: string })

            expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
                expect.anything(),
                testUser.email,
                password
            );

            expect(result).toEqual({ errorMessage: errorMsg, ok: false } as errorState & StatusResponse)
            expect(updateProfile).not.toHaveBeenCalledTimes(1);
        })
    })

});