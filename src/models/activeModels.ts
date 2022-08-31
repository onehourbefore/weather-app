

export enum PageStatus {
    _CURRENT = 'current',
    _HOURLY = 'hourly',
    _SEARCH = 'search',
    _NONE = ''
}

export interface IActive {
    page: PageStatus,
    query: string
}