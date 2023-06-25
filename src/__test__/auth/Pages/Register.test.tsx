import { cleanup, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"
import { Register } from "../../../auth/Pages"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { render, renderWithRouter, testStore } from "../../fixtures/storeFixture"
import * as authThunks from "../../../store/auth/thunks"

describe('auth/Pages Register', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  })
  test('should render Register page', async () => {
    const store = testStore({ auth: notAuthenticatedState })
    renderWithRouter(<Register />, store)
    expect(screen.getByLabelText(/Nombre Completo/i))
    expect(screen.getByLabelText(/Correo/i))
    expect(screen.getByLabelText(/Contraseña/i))
    expect(screen.getByRole('button', { name: /Crear cuenta/i }))
    expect(screen.getByRole('link', { name: /Ingresar/i }))
  })
  test('should call startRegisterUserWithCredential when fields register are valid', async () => {

    const startRegisterUserWithCredentialSpy = jest.spyOn(authThunks, 'startRegisterUserWithCredential')
    const mockDispatch = jest.fn();
    const store = testStore({ auth: notAuthenticatedState })
    store.dispatch = mockDispatch

    renderWithRouter(<Register />, store)

    const txtNombre = screen.getByLabelText(/Nombre Completo/i)
    await userEvent.type(txtNombre, "user test")

    const txtcorreo = screen.getByPlaceholderText(/correo/i)
    await userEvent.type(txtcorreo, "test@test.com")

    const txtpasswd = screen.getByPlaceholderText(/contraseña/i)

    await userEvent.type(txtpasswd, "123456")

    const btnCrearCuenta = screen.getByRole('button', { name: /Crear cuenta/i })
    await userEvent.click(btnCrearCuenta)

    await waitFor(async () => {
      expect(mockDispatch).toHaveBeenCalled()
      expect(startRegisterUserWithCredentialSpy).toHaveBeenCalledWith({ email: "test@test.com", password: "123456", displayName: "user test" })
    })

  })

  describe('When fields register are valid', () => {
    test('should not call startRegisterUserWithCredential', async () => {

      const startRegisterUserWithCredentialSpy = jest.spyOn(authThunks, 'startRegisterUserWithCredential')
      const mockDispatch = jest.fn();
      const store = testStore({ auth: notAuthenticatedState })
      store.dispatch = mockDispatch

      renderWithRouter(<Register />, store)

      const txtNombre = screen.getByLabelText(/Nombre Completo/i)
      await userEvent.type(txtNombre, "user test")

      const txtcorreo = screen.getByPlaceholderText(/correo/i)
      await userEvent.type(txtcorreo, "test@test.com")

      const txtpasswd = screen.getByPlaceholderText(/contraseña/i)

      await userEvent.type(txtpasswd, "1")

      const btnCrearCuenta = screen.getByRole('button', { name: /Crear cuenta/i })
      await userEvent.click(btnCrearCuenta)

      await waitFor(async () => {
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(startRegisterUserWithCredentialSpy).not.toHaveBeenCalled()
      })
    })

    test('should show message error', async () => {

      const errorMessagePassword = /El password debe de tener más de 6 letras/
      const errorMessageDisplayName = /El nombre es obligatorio/
      const errorMessageEmail = /El correo debe de tener una @/

      const store = testStore({ auth: notAuthenticatedState })

      renderWithRouter(<Register />, store)

      const txtcorreo = screen.getByPlaceholderText(/correo/i)
      await userEvent.type(txtcorreo, "testtest.com")

      const txtpasswd = screen.getByPlaceholderText(/contraseña/i)

      await userEvent.type(txtpasswd, "1")
      expect(screen.queryByText(errorMessagePassword)).toBeNull()
      expect(screen.queryByText(errorMessageDisplayName)).toBeNull()
      expect(screen.queryByText(errorMessageEmail)).toBeNull()

      const btnCrearCuenta = screen.getByRole('button', { name: /Crear cuenta/i })
      await userEvent.click(btnCrearCuenta)
      
      expect( screen.queryByText(errorMessagePassword)).toBeInTheDocument()
      expect( screen.queryByText(errorMessageDisplayName)).toBeInTheDocument()
      expect( screen.queryByText(errorMessageEmail)).toBeInTheDocument()
    })
  })
})