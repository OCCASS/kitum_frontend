"use client"

import Button from "@/components/ui/Button";
import LoadingButton from "@/components/ui/LoadingButton";
import ITask, { TTaskAnswer } from "@/types/task";
import { useState } from "react";

type ActionButtonsProps = {
    task: ITask;
    disabled: boolean;
    answerAction: (taskId: string, answer: TTaskAnswer) => void;
    skipAction: (taskId: string) => void;
    nextTask: () => void;
    answer: TTaskAnswer;
    isLast: boolean;
};

const ActionButtons = ({
    task,
    disabled,
    answerAction,
    skipAction,
    nextTask,
    answer,
    isLast
}: ActionButtonsProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const actionWrapper = async (
        action: any,
        ...args: any[]
    ) => {
        setIsLoading(true);
        await action(...args);
        setIsLoading(false);
    };

    return (
        <>
            {(task.answer || task.answerFile) ? (
                <div className="space-x-3">
                    <Button
                        variant="gray"
                        disabled={disabled || isLast}
                        title="Следующее задание"
                        aria-label="Следующнее задание"
                        onClick={nextTask}
                    >
                        Далее
                    </Button>
                    <LoadingButton
                        disabled={disabled}
                        title="Ответить на задание"
                        aria-label="Ответить на задание"
                        onClick={() => actionWrapper(answerAction, task.id, answer, setIsLoading)}
                        isLoading={isLoading}
                    >
                        Ответить
                    </LoadingButton>
                </div>
            ) : (
                <div className="space-x-3">
                    <LoadingButton
                        disabled={disabled}
                        title="Ответить на задание"
                        aria-label="Ответить на задание"
                        onClick={() => actionWrapper(answerAction, task.id, answer, setIsLoading)}
                        isLoading={isLoading}
                    >
                        Ответить
                    </LoadingButton>
                    {!task.isSkipped && (
                        <LoadingButton
                            disabled={disabled}
                            variant="gray"
                            title="Пропустить задание"
                            aria-label="Пропустить задание"
                            onClick={() => actionWrapper(skipAction, task.id, undefined, setIsLoading)}
                            isLoading={isLoading}
                        >
                            Пропустить
                        </LoadingButton>
                    )}
                </div>
            )}
        </>
    );
};

export default ActionButtons;
