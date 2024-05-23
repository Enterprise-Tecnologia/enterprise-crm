'use client'

export default function ErrorBoundary({error}:{error:Error}) {
    return(<div className="italic">{error.message}</div>);
};
