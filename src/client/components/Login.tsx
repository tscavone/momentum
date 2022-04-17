import React, { useState } from 'react'
import { Id } from '../util/Id'
import { useAuthedUserStore, useRootStore } from './RootStoreProvider'

async function loginUser(credentials) {
    console.log('credentials: ', JSON.stringify(credentials))
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json())
}

export default function Login() {
    const authedUserStore = useAuthedUserStore()
    const rootStore = useRootStore()
    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let responseData: { userId: string; token: string } = null

        try {
            responseData = await loginUser({
                username,
                password,
            })
            console.log('------> logged in')
            rootStore.initialize(Id.fromString(responseData.userId))
            console.log('-------> initialized')
            authedUserStore.token = responseData.token
            authedUserStore.userId = Id.fromString(responseData.userId)
        } catch (e) {
            console.log('error logging in :  ', e)
            return
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
