import { render, testStore } from "../../fixtures/storeFixture"
import { SideBarItem } from "../../../src/journal/layout/SideBarItem";
import React from "react";
import { journalTestWithInfo } from "../../fixtures/journalFixture";
import { authenticatedState } from "../../fixtures/authFixtures";
import { cleanup, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { JournalNote } from "../../../src/types";
import * as journalSlice from "../../../src/store/journal/journalSlice";

describe('SideBarItem', () => {
    afterEach(()=>cleanup())
    test('should render SideBarItem', () => {
        const note: JournalNote = journalTestWithInfo.active!;
        render(<SideBarItem key={1} note={note!} />, testStore({
            auth: authenticatedState,
            journal: journalTestWithInfo
        }))
        expect(screen.getByText(note?.title!)).toBeDefined();
        expect(screen.getByText(note?.body!)).toBeDefined();
    })
    test('should truncate title when this have more 17 characters', () => {
        const note: JournalNote = { ...journalTestWithInfo.active! };
        note.title += ' esto es texto adicional de pruebas'
        render(<SideBarItem key={1} note={note!} />, testStore({
            auth: authenticatedState,
            journal: journalTestWithInfo
        }))
        expect(screen.getByText(note.title.substring(0, 17) + '...')).toBeDefined()

    })

    test('should call dispatch with setActiveNote when clicked list item', async () => {

        const note: JournalNote = journalTestWithInfo.active!;

        const store = testStore({
            auth: authenticatedState,
            journal: journalTestWithInfo
        });
        const { dispatch } = store;
        const mockDispatch = jest.fn(() => dispatch);
        (store.dispatch as any) = mockDispatch
        const spy = jest.spyOn(journalSlice,'setActiveNote')
        // const spy = jest.spyOn(authThunks,'StartLogut')

        render(<SideBarItem key={1} note={note!} />,store)
        const btn= screen.getByRole('button')
        await userEvent.click(btn);
        expect(mockDispatch).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(note)

    })
})