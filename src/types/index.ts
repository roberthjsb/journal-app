type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;


export type JournalNote = {
    id: string,
    title: string,
    body: string,
    date?: number,
    imageUrls: string[]
}

export type Journal = {
    isSaving: boolean,
    messageSaved: string,
    notes: JournalNote[],
    active: JournalNote | null
}


export type statusState={ status?: 'checking' | 'not-authenticated' | 'authenticated'}
export type errorState= { errorMessage?: string | null}
export type AuthUserState = {
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
}
export type AuthState= statusState & AuthUserState & errorState;
export type StatusResponse = {ok:boolean};
export type AuthResult = AuthState & StatusResponse

export type StoreState = {
    auth:AuthState,
    journal:Journal
}
