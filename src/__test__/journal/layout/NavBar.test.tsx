
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "../../../journal/layout/NavBar";
import * as  authThunks from "../../../store/auth/thunks"
import { render, testStore } from "../../fixtures/storeFixture";
import { authenticatedState } from "../../fixtures/authFixtures";
import { vi } from "vitest";

describe('Test NavBar', () => {
    afterEach(() => {
        cleanup()
    })
    test('should render Navbar', () => {

        render(<NavBar drawerWidth={250} />, testStore({}));
        expect(screen.getByText(/Journal App/i)).toBeDefined()

    })

    test('should call dispatch with StartLogut when clicked logout', async () => { 
        const store = testStore({auth:authenticatedState});
        const mockDispatch = vi.fn();
        (store.dispatch as any) = mockDispatch;
        // (authThunks.StartLogut as any) = vi.fn();
        const spy =vi.spyOn(authThunks,'StartLogut')


        render(<NavBar drawerWidth={250} />, store);
        const btn = screen.getByTestId('LogoutBtn')
        await userEvent.click(btn)
        expect(mockDispatch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();


    })
})


