import { useEffect } from "react"

export default (history, nextPath) => {
    const { pathname } = history.location;
    useEffect(() => {
        if(pathname !== nextPath) {
            history.replace(nextPath);
        }
    }, [nextPath])
}