import { PayloadAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredencials, login, logout, statusState } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, initialState as testInitialState, notAuthenticatedState, notAuthenticatedWithState, testUser } from "../../fixtures/authFixtures";


describe('authSlice', () => {


    test('should return the initial state', () => {

        const storeInitialstate = authSlice.getInitialState()
        const state = authSlice.reducer(testInitialState, {} as PayloadAction);

        expect(storeInitialstate).toEqual(testInitialState)
        expect(state).toEqual(testInitialState)
        expect(authSlice.name).toBe('auth')
        

    })

    test('should do the authtenticate', () => { 
        const state = authSlice.reducer(initialState, login(testUser));

        expect(state).toEqual(authenticatedState)

     })
     

     test('should return state checking', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredencials());
        expect(state.status).toEqual("checking")
      })

      test('should return state not authenticate when not pass argument', () => { 
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState)

       })
     
       test('should return state not authenticate with errorMessage', () => { 
        const errorMsg = {errorMessage:"Credenciales no son correctas"}
        const state = authSlice.reducer(authenticatedState, logout(errorMsg));
        expect(state).toEqual(notAuthenticatedWithState)

       })


})