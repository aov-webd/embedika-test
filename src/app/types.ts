export type FilterCheckboxEntry = {
    name: string,
    id: number,
    checked?: boolean
}

export type FilterCheckboxOptions = {
    title: string,
    entries: FilterCheckboxEntry[]
}
