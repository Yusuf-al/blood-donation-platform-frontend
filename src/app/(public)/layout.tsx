import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            This is public layout
            {children}
        </div>
    )
}

export default layout
