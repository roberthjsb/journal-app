
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react"
import { NavBar } from "../../../journal/layout/NavBar";
import * as  authThunks from "../../../store/auth/thunks"
import { render, testStore } from "../../fixtures/storeFixture";
import {authenticatedState } from "../../fixtures/authFixtures";

describe('Test NavBar', () => {
    afterEach(()=>{
        cleanup()
    })
    test('should render Navbar', () => {

        render(<NavBar drawerWidth={250} />, testStore({}));
        expect(screen.getByText(/Journal App/i)).toBeDefined()

    })

    test('should call dispatch with StartLogut when clicked logout', async () => { 
        const store = testStore({auth:authenticatedState});
        const { dispatch } = store;
        const mockDispatch = jest.fn(() => dispatch);
        (store.dispatch as any)=mockDispatch
        const spy = jest.spyOn(authThunks,'StartLogut')


        render(<NavBar drawerWidth={250} />, store);
        const btn = screen.getByTestId('LogoutBtn')
        await userEvent.click(btn)
        expect(mockDispatch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();


     })
})


