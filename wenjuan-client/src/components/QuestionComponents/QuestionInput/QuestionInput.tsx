import type { FC } from "react";

type PropsType = {
    fe_id: string,
    props:{
        title:string,
        placeholder?: string
    }
}
const  QuestionInput: FC<PropsType> = ({fe_id,props}) =>{
    const {title,placeholder = ''} = props
    return <>
    <p>{title}</p>
    <div className="mb-4 px-[5px]">
        <input name={fe_id} placeholder={placeholder}
        className="w-full border border-[#d8d8d8] rounded-[3px] py-[6px] px-[12px]"/>
    </div>
    </>
}
export default QuestionInput
