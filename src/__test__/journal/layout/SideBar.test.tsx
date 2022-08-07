import React from "react";
import { render, testStore } from "../../fixtures/storeFixture";
import { authenticatedState} from "../../fixtures/authFixtures";
import { journalTestWithInfo} from "../../fixtures/journalFixture";
import { SideBar } from "../../../journal/layout/SideBar";
import { cleanup, screen } from "@testing-library/react";

describe('test SideBar', () => { 

    afterEach(()=>{
        cleanup()
    })
    test('should render displayName', () => { 

        const userName='test user'
        authenticatedState.displayName=userName

        render(<SideBar drawerWidth={250} />, testStore({
            auth: authenticatedState,
            journal: journalTestWithInfo
        }));

        expect(screen.getByText(userName)).toBeDefined()
     })


     test('should render notes', () => { 

        const {notes} =journalTestWithInfo;
        render(<SideBar drawerWidth={250} />, testStore({
            auth: authenticatedState,
            journal: journalTestWithInfo
        }));
       
        expect(screen.getAllByRole('listitem').length).toBe(notes.length)

        expect(screen.getByText(notes[0].title)).toBeDefined()
        expect(screen.getByText(notes[1].title)).toBeDefined()
     })
 })