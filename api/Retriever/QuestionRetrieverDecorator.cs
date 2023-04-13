using OneOf;
using OneOf.Types;

namespace api.Retriever;

public class QuestionRetrieverDecorator : IQuestionRetriever
{
    private readonly IQuestionRetriever _retriever;

    public QuestionRetrieverDecorator(IQuestionRetriever retriever) 
        => _retriever = retriever;

    public virtual async Task<OneOf<Question, NotFound>> GetQuestion(int questionId) 
        => await _retriever.GetQuestion(questionId);

    public virtual async Task<IEnumerable<int>> GetQuestionIds() => 
        await _retriever.GetQuestionIds();
}


