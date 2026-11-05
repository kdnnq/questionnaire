import type { FC } from "react";

type PropsType = {
    fe_id: string,
    props: {
        title: string,
        options: Array<{
            value: string,
            text: string
        }>
        value: string
        isVertical: boolean
    }
}

const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
    const { title, options = [], value, isVertical } = props

    return <>
        <p>{title}</p>
        <ul className={`flex ${isVertical ? 'flex-col' : 'flex-row'} flex-wrap gap-x-5 gap-y-2 list-none px-0`}>
            {options.map(opt => {
                const { value: val, text } = opt
                return (
                    <li key={val} className="flex items-center gap-1">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input type="radio" name={fe_id} value={val} defaultChecked={val == value} />
                            {text}
                        </label>
                    </li>
                )
            })}
        </ul>
    </>
}
export default QuestionRadio
