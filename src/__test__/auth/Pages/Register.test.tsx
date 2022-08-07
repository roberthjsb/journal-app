import { cleanup, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { Register } from "../../../auth/Pages"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { render, testStore } from "../../fixtures/storeFixture"
import * as authThunks from "../../../store/auth/thunks"


describe('first', () => {
    afterEach(() => cleanup())
    test('should render Register page', async () => {
        const store = testStore({ auth: notAuthenticatedState })
        render(<Register />, store)
        expect(screen.getByLabelText(/Nombre Completo/i))
        expect(screen.getByLabelText(/Correo/i))
        expect(screen.getByLabelText(/Contraseña/i))
        expect(screen.getByRole('button', { name: /Crear cuenta/i }))
        expect(screen.getByRole('link', { name: /Ingresar/i }))
    })
    test('should render Register page', async () => {

        const startRegisterUserWithCredentialSpy =jest.spyOn(authThunks,'startRegisterUserWithCredential')
        const mockDispatch=jest.fn();
        const store = testStore({ auth: notAuthenticatedState })
        store.dispatch=mockDispatch


        render(<Register />, store)

        const txtNombre = screen.getByLabelText(/Nombre Completo/i)
        await userEvent.type(txtNombre, "user test")

        const txtcorreo = screen.getByPlaceholderText(/correo/i)
        await userEvent.type(txtcorreo, "test@test.com")

        const txtpasswd = screen.getByPlaceholderText(/contraseña/i)

        await userEvent.type(txtpasswd, "123456")

        const btnCrearCuenta = screen.getByRole('button', { name: /Crear cuenta/i })

        await userEvent.click(btnCrearCuenta)
        expect(mockDispatch).toHaveBeenCalled()
        expect(startRegisterUserWithCredentialSpy).toHaveBeenCalled()

    })
})