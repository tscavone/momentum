/////////////
// Requests
//
export interface LoginRequest {
    username: string
    password: string
}

export interface SignupRequest {}

/////////////
// Responses
//

// We use the `never` type to express that you may NEVER pass `error` if you have passed `success`.
interface Success {
    successMessage: string
    errorMessage?: never
    payload?: object
    type?: string
}

interface Failure {
    successMessage?: never
    errorMessage: string
    payload?: object
    type?: string
}

export type QueryResponse = Success | Failure

export interface LoginPayload {
    userId: string
    token: string
}
