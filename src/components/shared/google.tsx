"use client"
import { Button } from '../ui/button';

function GoogleButton() {
    return (
        <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
        >
            <svg className="mr-2 size-4" viewBox="0 0 24 24" aria-hidden="true" > <path fill="#4285F4" d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.41Z" /> <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.5Z" /> <path fill="#FBBC05" d="M6.53 13.58A5.85 5.85 0 0 1 6.22 12c0-.55.1-1.08.31-1.58V7.89H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.11l3.25-2.53Z" /> <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.39l3.25 2.53c.77-2.31 2.93-4.03 5.47-4.03Z" /> </svg>
            Continue with Google
        </Button>
    )
}

export default GoogleButton
