import * as modMocked from "../../../src/firebase/providers";
import { checkingCredencials, login, logout } from "../../../src/store"
import { checkingAuthentication, startGoogleSignIn, startLoginUserWithEmailAndPassword, StartLogut, startRegisterUserWithCredential } from "../../../src/store/auth/thunks"
import { clearJournal } from "../../../src/store/journal/journalSlice";
import { authenticatedState, notAuthenticatedState, testUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers")


describe('auth thunks', () => {
     const dispatch = jest.fn();
     const signInWithGoogle = modMocked.signInWithGoogle as jest.Mock
     const loginWithEmailAndPassword = modMocked.loginWithEmailAndPassword as jest.Mock
     const registerUserWithCredential= modMocked.registerUserWithCredential as jest.Mock

     beforeEach(() => {
          jest.clearAllMocks()
     })

     test('should call the checkingCredential', async () => {
          await checkingAuthentication()(dispatch);
          expect(dispatch).toHaveBeenCalledWith(checkingCredencials());

     })

     test('startGoogleSignIn should call checkingCredencials and login success', async () => {
          const logingData = { ok: true, ...testUser }
          signInWithGoogle.mockResolvedValue(logingData)

          await startGoogleSignIn()(dispatch)

          expect(dispatch).toHaveBeenCalledWith(checkingCredencials())
          expect(dispatch).toHaveBeenCalledWith(login(logingData))
     })

     test('startGoogleSignIn should call checkingCredencials and logout with error message', async () => {
          const logingData = { ok: false, errorMessage: 'Error Firebase' }
          signInWithGoogle.mockResolvedValue(logingData)

          await startGoogleSignIn()(dispatch)

          expect(dispatch).toHaveBeenCalledWith(checkingCredencials())
          expect(dispatch).toHaveBeenCalledWith(logout(logingData))
     })
     test('should call checkingCredencials and login successfully', async () => {
          const formData = {
               email: 'prueba@prueba.com',
               password: '123456'
          }
          const loginData = { ok: true, ...notAuthenticatedState }
          loginWithEmailAndPassword.mockResolvedValue(loginData)

          await startLoginUserWithEmailAndPassword(formData)(dispatch)

          expect(dispatch).toBeCalledWith(checkingCredencials())
          expect(dispatch).toBeCalledWith(login(notAuthenticatedState))
     })

     test('should call checking and logout if it can not authenticate', async () => {
          const formData = {
               email: 'prueba@prueba.com',
               password: '123456'
          }
          const loginData = { ok: false, errorMessage: 'Error Firebase' }
          loginWithEmailAndPassword.mockResolvedValue(loginData)

          await startLoginUserWithEmailAndPassword(formData)(dispatch)
          expect(dispatch).toHaveBeenCalledWith(checkingCredencials())
          expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'Error Firebase' }))
     })
     test('should call Logout and clear store', async () => {
          await StartLogut()(dispatch)
          expect(dispatch).toHaveBeenCalledWith(clearJournal())
          expect(dispatch).toHaveBeenCalledWith(logout())

     })
     test('should call checkingCredencials and login if this have not error message', async () => {
          const formData: { email: string, password: string, displayName: string } = {
               email: 'prueba@prueba.com',
               password: '123456',
               displayName:'testuser'
          }
          const loginData = { ok: true, ...authenticatedState }
          registerUserWithCredential.mockResolvedValue(loginData)

          await startRegisterUserWithCredential(formData)(dispatch)

          expect(dispatch).toBeCalledWith(checkingCredencials())
          expect(dispatch).toBeCalledWith(login(formData))

     })


     test('should call checkingCredencials and logout when have error message', async () => {
          const formData: { email: string, password: string, displayName: string } = {
               email: 'prueba@prueba.com',
               password: '123456',
               displayName:'testuser'
          }
          const loginData = { ok: false, errorMessage: 'Error Firebase' }
          registerUserWithCredential.mockResolvedValue(loginData)

          await startRegisterUserWithCredential(formData)(dispatch)

          expect(dispatch).toHaveBeenCalledWith(checkingCredencials())
          expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'Error Firebase' }))

     })





})
