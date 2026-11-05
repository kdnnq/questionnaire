import { NextResponse } from 'next/server';
import postAnswer from '@/service/answer';

type AnswerItem = {
    componentId: string;
    value: string;
};

type AnswerInfo = {
    questionId: string;
    answerList: AnswerItem[];
};

function genAnswerInfo(reqBody: Record<string, FormDataEntryValue>): AnswerInfo {
    const answerList: AnswerItem[] = [];

    Object.keys(reqBody).forEach((key) => {
        if (key === 'questionId') return;

        answerList.push({
            componentId: key,
            value: String(reqBody[key]),
        });
    });

    return {
        questionId: String(reqBody.questionId || ''),
        answerList,
    };
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const reqBody = Object.fromEntries(formData.entries());
        const answerInfo = genAnswerInfo(reqBody);
        const resData = await postAnswer(answerInfo);
        if (Number(resData?.errno) === 0) {
            return NextResponse.redirect(
                new URL('/success', request.url)
            );
        }
        return NextResponse.redirect(
            new URL('/fail', request.url)
        );
    } catch (err) {
        console.error('POST error:', err);

        return NextResponse.redirect(
            new URL('/fail', request.url)
        );
    }
}
