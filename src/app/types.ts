export type FilterEntry = {
    name: string,
    id?: number,
    checked?: boolean
}

export type FilterOptions = {
    title?: string,
    entries?: FilterEntry[]
}

export type LaunchesPast = {
    loading: boolean
    entries?: LaunchesPastEntry[]
}
export type LaunchesPastEntry = {
    mission_name: string,
    launch_year: string,
    rocket: {
        rocket_name: string
    }
}
