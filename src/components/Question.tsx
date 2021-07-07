import '../style/questions.scss'
import {ReactNode} from 'react'
import cx from 'classnames'

type QuestionsProps = {
    content: string
    author: {
        name: string
        avatar: string
    }
    isAnswered?: boolean
    isHighLithed?: boolean
    children?: ReactNode

}

export function Questions({ content, author, children, isAnswered=false, isHighLithed=false }: QuestionsProps) {
    return (
        <div className={cx("questions", {
            answered:isAnswered,
            highlithed:isHighLithed && isAnswered
        })}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.avatar} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}