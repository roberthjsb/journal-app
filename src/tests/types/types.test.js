import { types } from '../../types/types';


describe('Types tests', () => {
    
const typesSpec = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError : '[UI] Set Error',
    uiRemoveError : '[UI] Remove Error',
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] Set Active note",
    noteLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Updated note note',
    notesFileUrl: '[Notes] Updated image url',
    noteDelete: '[Notes] Delete note',
    noteLogoutCleaning: '[Notes] Logout Cleaning',
};
    it('should be match with types', () => {
        expect(types).toEqual(typesSpec);
    });
});