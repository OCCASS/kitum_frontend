import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function MarkdownView({ content, className }: { content: string, className?: string }) {
    return <Markdown
        remarkPlugins={[remarkGfm]}
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
            }
        }}
        className={twMerge("prose prose-stone dark:prose-invert prose-img:rounded prose-img:w-full prose-pre:bg-bg_codeblock", className)}
    >
        {content}
    </Markdown>
}
