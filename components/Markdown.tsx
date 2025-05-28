"use client"

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkMath from "remark-math";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { PSkeleton } from "./Skeleton";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function MarkdownView({ content, className }: { content: string, className?: string }) {
    return (
        <Markdown
            remarkPlugins={[
                remarkMath,
                [remarkGfm, { singleTilde: false }]
            ]}
            rehypePlugins={[rehypeKatex]}
            components={{
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "")

                    return !inline && match ? (
                        <SyntaxHighlighter PreTag="div" language={match[1]} {...props}>
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                img: ({ src, alt, node }: any) => {
                    return <Image src={src} alt={alt} width="600" height="300" />
                },
                // @ts-ignore math exists
                math: ({ value }: { value: string }) => <BlockMath>{value}</BlockMath>,
                inlineMath: ({ value }: { value: string }) => <InlineMath>{value}</InlineMath>
            }}
            className={twMerge("prose prose-stone dark:prose-invert prose-img:rounded prose-img:w-full prose-pre:bg-codeblock-bg", className)}
        >
            {content}
        </Markdown>
    )
}

export function MarkdownViewSkeleton() {
    return (
        <div className="space-y-2">
            <PSkeleton className="w-96" />
            <PSkeleton className="w-80" />
            <PSkeleton className="w-96" />
            <PSkeleton className="w-64" />
            <PSkeleton className="w-80" />
        </div>
    )
}
