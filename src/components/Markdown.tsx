import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownProps = {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ children }) {
          return <h1 className="my-4 text-2xl font-bold">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="my-4 text-xl font-bold">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="my-4 text-lg font-bold">{children}</h3>
        },
        hr({ children }) {
          return <hr className="mb-4 mt-[-8px]">{children}</hr>
        },
        strong({ children }) {
          return <strong className="font-bold">{children}</strong>
        },
        em({ children }) {
          return <em className="italic">{children}</em>
        },
        p({ children }) {
          return <p className="mb-4">{children}</p>
        },
        ul({ children }) {
          return <ul className="mb-4 pl-8">{children}</ul>
        },
        li({ children }) {
          return <li className="list-disc">{children}</li>
        },
        table({ children }) {
          return (
            <table className="mb-4 block w-max max-w-full overflow-auto">
              {children}
            </table>
          )
        },
        tr({ children }) {
          return <tr className="even:bg-gray-200">{children}</tr>
        },
        th({ children }) {
          return <th className="border border-black px-1 py-2">{children}</th>
        },
        td({ children }) {
          return <td className="border border-black px-1 py-2">{children}</td>
        },
        thead({ children }) {
          return <thead className="">{children}</thead>
        },
        tbody({ children }) {
          return <tbody className="">{children}</tbody>
        },
      }}
    />
  )
}
