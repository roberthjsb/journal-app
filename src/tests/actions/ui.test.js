import {
    setError,
    removeError,
    startLoading,
    finishLoading
} from '../../actions/ui';
import { types } from '../../types/types';

describe('ui action test', () => {
    it('should be work all functions', () => {
        const errorState = 'there is an error';
        const setErrorAction = setError(errorState);
        expect(setErrorAction).toEqual({
            type: types.uiSetError,
            payload: errorState
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    });
})
