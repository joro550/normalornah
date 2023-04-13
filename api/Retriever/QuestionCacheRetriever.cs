using Microsoft.Extensions.Caching.Memory;
using OneOf;
using OneOf.Types;

namespace api.Retriever;

public interface IQuestionCacheRetriever
{
    Task<OneOf<Question, NotFound>> GetQuestion(int question);
    Task<IEnumerable<int>> GetQuestionIds();
}

public class QuestionCacheRetriever : QuestionRetrieverDecorator, IQuestionCacheRetriever
{
    private readonly IMemoryCache _memoryCache;

    public QuestionCacheRetriever(IMemoryCache memoryCache, 
        IQuestionRetriever retriever)
        : base(retriever)
    {
        _memoryCache = memoryCache;
    }

    public override Task<OneOf<Question, NotFound>> GetQuestion(int questionId)
    {
        return _memoryCache.GetOrCreateAsync<OneOf<Question, NotFound>>(questionId,
                async (cacheEntry) =>
            {
                var question = await base.GetQuestion(questionId);

                return question.Match<OneOf<Question, NotFound>>(
                    question => 
                    {
                        cacheEntry.SlidingExpiration = TimeSpan.FromMinutes(30);
                        return question;
                    },
                    notFound => notFound);
            });
    }

    public override async Task<IEnumerable<int>> GetQuestionIds()
    {
        return await _memoryCache.GetOrCreateAsync<IEnumerable<int>>(CacheKeys.QuestionIds,
                async (cacheEntry) =>
            {
                var questionIds = await base.GetQuestionIds();
                cacheEntry.SlidingExpiration = TimeSpan.FromMinutes(30);
                return questionIds;
            }) ?? Enumerable.Empty<int>();
    }
}


