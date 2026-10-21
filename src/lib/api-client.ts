export type ApiResult<T=unknown> =
| {ok: true; data: T}
| {ok: false; error: string};

// Wraps fetch so callers always get back {ok, data} or {ok: false, error}
// with a message that is safe to show a person. It never throws.

export async function apiRequest<T= unknown>(
    url: string,
    options: RequestInit = {},
    timeoutMs  = 15000
): Promise<ApiResult<T>> {
    // navigator.onLine === false is reliable: the browser knows it's offline.
    // (true is not a guarantee, so we only trust the false case.)
    if(typeof navigator !=="undefined" && !navigator.onLine){
        return {
            ok: false,
            error: "You appear to be offline. Check your internet connection and try again."
        }
    }

    let res: Response;
    try {
        // AbortSignal.timeout cancels the request if it takes too long
        res = await fetch(url, {...options, signal: AbortSignal.timeout(timeoutMs)});
    } catch (err) {
        const timedOut = err instanceof DOMException && err.name === "TimeoutError";
        return {
            ok: false,
            error:timedOut
            ? "The server is taking too long to respond. Please try again." : "We couldn't reach the server. Check your internet connection and try again."
        }
    }

    // The body might not be JSON (an error page, an empty reply), so parse defensively
    const data = await res.json().catch(() => null);

    if(!res.ok){
        return {
            ok: false,
            error:
            data?.error ??
            (res.status >= 500
                ? "Something wetn wrong on our side. Please try again." : "That did not work, Please try again."
            )
        }
    }
    return {ok: true, data: data as T};
}