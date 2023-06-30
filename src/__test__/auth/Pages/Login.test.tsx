import { cleanup, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { Login } from "../../../auth/Pages/Login"
import * as useFormHook from "../../../hooks/useForm"
import { initialState, notAuthenticatedState, } from "../../fixtures/authFixtures"
import { render, renderWithRouter, testStore } from "../../fixtures/storeFixture"

import * as authThunks from "../../../store/auth/thunks"

describe('auth/Pages Login', () => {

    afterEach(() => {
        cleanup();
        vi.clearAllMocks()
    })
    test('should render page login', () => {
        const store = testStore({ auth: notAuthenticatedState })
        renderWithRouter(<Login />, store)
        expect(screen.getByLabelText(/correo/i))
        expect(screen.getByLabelText(/contraseña/i))
        expect(screen.getByRole('button', { name: /google/i }))
        expect(screen.getByRole('button', { name: /login/i }))
        expect(screen.getByRole('link', { name: /crear un cuenta/i }))

    })


    test('should called the hooks useForm when text input change values ', async () => {
        const userFormSpy = vi.spyOn(useFormHook, 'useForm')

        const store = testStore({ auth: notAuthenticatedState })
        renderWithRouter(<Login />, store)
        const txtcorreo = screen.getByPlaceholderText(/correo/i)
        await userEvent.type(txtcorreo, "test@test.com")
        expect(userFormSpy).lastReturnedWith(expect.objectContaining({ email: "test@test.com" }))
        userFormSpy.mockClear()
        const txtpasswd = screen.getByPlaceholderText(/contraseña/i)
        await userEvent.type(txtpasswd, "123456")
        expect(userFormSpy).lastReturnedWith(expect.objectContaining({ password: "123456" }))

    })


    
    test('should disable button when have been checking user ', async () => {
        // const userFormSpy = vi.spyOn(useFormHook, 'useForm')

        const store = testStore({ auth: initialState })
        renderWithRouter(<Login />, store)


        const btnGoogle = screen.getByRole('button', { name: /google/i })
        const btnLogin = screen.getByRole('button', { name: /login/i })


        expect(btnGoogle).toBeDisabled()
        expect(btnLogin).toBeDisabled()

    })

      
    test('should call startLoginUserWithEmailAndPassword when user fill fields and clicked login button', async () => {
        const startLoginUserWithEmailAndPasswordSpy =vi.spyOn(authThunks,'startLoginUserWithEmailAndPassword')
        const mockDispatch=vi.fn();
        const store = testStore({ auth: notAuthenticatedState })
        store.dispatch=mockDispatch

        renderWithRouter(<Login />, store)

        const txtcorreo = screen.getByPlaceholderText(/correo/i)
        
        await userEvent.type(txtcorreo, "test@test.com")

        const txtpasswd = screen.getByPlaceholderText(/contraseña/i)

        await userEvent.type(txtpasswd, "123456")

        const btnLogin = await screen.findByRole('button', { name: /login/i })
        await waitFor(async ()=>{            
            expect(btnLogin).not.toBeDisabled()
            await userEvent.click(btnLogin)
            expect(mockDispatch).toHaveBeenCalled()
            expect(startLoginUserWithEmailAndPasswordSpy).toHaveBeenCalledWith({email: "test@test.com", password: "123456" })
        })
            
        })


    test('should call startGoogleSignIn when user fill fields and clicked google button', async () => {
        const startGoogleSignInSpy =vi.spyOn(authThunks,'startGoogleSignIn')
        const mockDispatch=vi.fn();
        const store = testStore({ auth: notAuthenticatedState })
        store.dispatch=mockDispatch

        renderWithRouter(<Login />, store)

        const btnLoginGoogle = screen.getByRole('button', { name: /google/i })
        expect(btnLoginGoogle).not.toBeDisabled()
        await userEvent.click(btnLoginGoogle)
        expect(mockDispatch).toHaveBeenCalled()
        expect(startGoogleSignInSpy).toHaveBeenCalled()
       

    })





})