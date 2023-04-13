using OneOf;
using OneOf.Types;

namespace api.Retriever;

public interface IQuestionRetriever
{
    Task<IEnumerable<int>> GetQuestionIds();
    Task<OneOf<Question, NotFound>> GetQuestion(int questionId);
}

public class QuestionRetriever : IQuestionRetriever
{
    private readonly Supabase.Client _client;

    public QuestionRetriever(Supabase.Client client) => _client = client;

    public async Task<IEnumerable<int>> GetQuestionIds()
    {
        var questions = await _client.From<Question>()
            .Select(x => new object[] { x.Id })
            .Get();
        return questions.Models.Select(x => x.Id);
    }

    public async Task<OneOf<Question, NotFound>> GetQuestion(int questionId)
    {
        var question = await _client.From<Question>()
            .Where(x => x.Id == questionId)
            .Single();
        return question == null ? new NotFound() : question;
    }
}

