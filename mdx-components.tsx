import type {MDXComponents} from "mdx/types"
import Link from "next/link";


function A(props: any) {
    const {className, ...otherProps} = props
    return <Link className="text-blue" {...otherProps} />
}

function H1(props: any) {
    return <h1 className="mb-5" {...props} />
}


export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: A,
        h1: H1,
        ...components
    }
}