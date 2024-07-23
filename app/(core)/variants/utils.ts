export function getVariantsUrlParams(status: string, generated: string) {
    const params = new URLSearchParams()
    if (status !== "all") params.append("status", status)
    if (generated !== "all") params.append("generated", generated)
    return params
}