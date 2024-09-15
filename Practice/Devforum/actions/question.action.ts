interface QuestionVoteParams {
    questionId: string;
    userId: string;
    hasupVoted: boolean;
    hasdownVoted: boolean;
    path: string;
}

export async function upvoteQuestion(params: QuestionVoteParams) {
    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;
    try {
        connectToDatabase();

        await prisma.transactions(async (tx) => {
            const question = await tx.question.update({
                where: { id: questionId },
                data: {
                    upvotes: hasupVoted
                        ? { disconnect: { id: userId } }
                        : { connect: { id: userId } },
                    downvotes: hasdownVoted
                        ? { disconnect: { id: userId } }
                        : undefined,

                },
                include: { author: true },
            })
            if (!question) {
                throw new Error("Question not found");
            }

            // update user's reputation
            await tx.user.update({
                where: { id: userId },
                data: {
                    reputation: {
                        increment: hasupVoted ? -1 : 1,
                    }
                }
            });

            // Update the question author's reputation
            await tx.user.update({
                where: { id: question.author.id },
                data: {
                    reputation: {
                        increment: hasupVoted ? -10 : 10,
                    },
                },
            });
        })
        revalidatePath(path);

    } catch (error) {
        console.log(error);
        throw error;
    }
}