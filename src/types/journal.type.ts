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