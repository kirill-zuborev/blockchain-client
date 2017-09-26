export type NotesData = {
    id: number,
    name: string,
    description: string,
    creationDate: Date
}

export type NotesFilter = {
    nameFilter: string,
    onlyWithComments: boolean,
    dateRange: DateRange,
    pager: Pager
}

export type Pager = {
    page: number,
    count: number
}

export type DateRange = {
    minDate: string,
    maxDate: string
}

export type CreateSignModel = {
    minDate: string,
    maxDate: string
}

export type UserModel = {
    firstName: string,
    lastName: string,
    email: string
}

export type IdAndName<I, N> = {
    id: I,
    name: N
}

export type SignModel = {
    manifest: string,
    signed: IdAndName<string, string>[],
    toSign: IdAndName<string, string>[]
}