export function getLessonsUrlParams(status?: string) {
    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    return params
}