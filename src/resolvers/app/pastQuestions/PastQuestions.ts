import { PastQuestion } from '../../../entity/PastQuestions';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { CreatePastQuestionInput } from './types/CreatePastQuestionInput';

@Resolver()
export class CreatePastQuestionsResolver {
  @Mutation(() => PastQuestion)
  async createPastQuestion(
    @Arg('input') { question, solutions, image, course, level }: CreatePastQuestionInput,
  ): Promise<PastQuestion> {
    const pastQuestion = await PastQuestion.create({
      question,
      solutions,
      image,
      course,
      level,
    }).save();
    return pastQuestion;
  }
}
