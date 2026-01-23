export interface ParamsDataTable {
  page: number
  limit: number
  orderBy?: string
  orderDir?: string
  search?: string
  done?: boolean | null
}

export interface DataServerOptions {
    page: number
    itemsPerPage: number
    serch?: string
    sortBy?: SortBy
}

interface SortBy {
    key: string
    order: string
}