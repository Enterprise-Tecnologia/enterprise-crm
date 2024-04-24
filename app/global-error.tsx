'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error]);
      
  return (
    <html>
      <body>
        <h2 className="text-2xl">
            Something went wrong!
        </h2>
        <Button onClick={() => reset()}>
            Try again
        </Button>
      </body>
    </html>
  )
}
