import { RefObject, useEffect } from "react";

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>, handler: (event: Event) => void
) {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current
            if (el && !el.contains(event?.target as Node)) handler(event)
        }

        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}
