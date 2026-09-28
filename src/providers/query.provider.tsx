"use client"

import { environmentManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'


function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClinet() {
    if (environmentManager.isServer()) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient()
        }
        return browserQueryClient
    }
}

function QueryProvider({ children }: { children: ReactNode }) {
    const queryClinet = getQueryClinet()

    return (
        <QueryClientProvider client={queryClinet}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
