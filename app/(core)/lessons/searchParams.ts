import {
    createLoader,
    parseAsString
} from 'nuqs/server'

const params = {
    status: parseAsString.withDefault(""),
    subscription: parseAsString.withDefault("")
}

export const loadSearchParams = createLoader(params)
