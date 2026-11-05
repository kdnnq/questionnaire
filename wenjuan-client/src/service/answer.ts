import { post } from "./axios"

type AnswerItem = {
    componentId: string
    value: string | string[]
}

type AnswerInfo = {
    questionId: string
    answerList: AnswerItem[]
}

// 提交答卷
export default async function postAnswer(answerInfo: AnswerInfo) {
    const url = '/api/answer'
    const data = await post(url, answerInfo)
    return data
}
