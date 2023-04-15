using api;
using api.Retriever;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

var databaseUrl = "";
var databaseKey = "";

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true
};

var client = new Supabase.Client(databaseUrl, databaseKey, options); 

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(client);
builder.Services.AddMemoryCache();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddSingleton<IQuestionRetriever, QuestionRetriever>();
builder.Services.AddSingleton<IQuestionCacheRetriever, QuestionCacheRetriever>();
builder.Services.AddSingleton(Random.Shared);
builder.Services.AddSingleton(d =>
    new SupbaseConfiguration
    {
      SupabaseUrl = builder.Configuration["SupabaseUrl"] ?? throw new ArgumentNullException("No Database url"),
      SupabaseToken = builder.Configuration["SupabaseToken"] ?? throw new ArgumentNullException("No database token")


    });
var app = builder.Build();

app.MapPost("/questions",
    async ([FromBody] CreateQuestionModel model,
        Supabase.Client client,
        IMapper mapper) =>
    {
        var question = await client.From<Question>()
            .Insert(new Question{ Text = model.Text, Approved = false });
        return Results.Ok();
    });

app.MapGet("/questions/random", 
    async (IQuestionCacheRetriever retriever, 
        [FromHeader] Guid? userId,
        Supabase.Client client,
        Random random,
        IMapper mapper) => 
    {
        var questionIds = (await retriever.GetQuestionIds())
            .ToList();

        // If we have seen this user before then we don' want to show them 
        // questions they've all ready answered
        if(userId != null) 
        {
            var answers = await client.From<Answer>()
                .Where(x => x.UserId == userId.Value)
                .Get(); 

            var answeredQuestions = answers.Models
                .Select(x => x.QuestionId)
                .ToList();

            foreach(var answer in answeredQuestions)
                questionIds.Remove(answer);
        }

        var randomId = random.Next(questionIds.Count());
        var questionId = questionIds[randomId];
        
        var question = await retriever.GetQuestion(questionId);
        return question.Match(
            question => Results.Ok(mapper.Map<QuestionModel>(question)),
            notFound => Results.NotFound());
    });

app.MapGet("/questions/{questionId}/stat", 
    async (int questionId,
        IQuestionRetriever retriever,
        Supabase.Client client,
        IMapper mapper) =>
    {
        var question = await retriever.GetQuestion(questionId);
        return await question.Match(
            async question => 
            {
                var stats = await client.From<Answer>()
                    .Where(x=> x.QuestionId == questionId)
                    .Get();

                if(stats.Models.Count == 0)
                    return Results.Ok(StatsModel.Zero(questionId));

                var total = stats.Models.Count;
                var normal = stats.Models.Count(x => x.QuestionAnswer == QuestionAnswer.Normal);

                return Results.Ok(new StatsModel
                {
                    QuestionId = questionId,
                    TotalAnswers = total,
                    NormalAnswers = normal,
                    NahAnswers = total - normal
                });
            },
            notFound => Task.FromResult(Results.NotFound()));
    });

app.MapPost("/questions/{questionId}/stat", 
    async (int questionId, 
        [FromBody]QuestionStat questionStat,
        [FromHeader]Guid  userId,
        IQuestionRetriever retriever,
        Supabase.Client client,
        ILogger<Program> logger) => 
    {
        var question = await retriever.GetQuestion(questionId);
        return await question.Match<Task<IResult>>(
            async question =>
            {
                if(questionStat.Answer == null)
                    return Results.BadRequest();

                await client.From<Answer>()
                    .Insert(new Answer
                        {
                            UserId = userId,
                            QuestionId = questionId,
                            QuestionAnswer = questionStat.Answer.Value,
                            AnsweredAt = DateTime.UtcNow,
                        });

                return Results.NoContent();
            },
            notFound => Task.FromResult(Results.NotFound())
        );
    });

app.Run();

public class SupbaseConfiguration 
{
  public string SupabaseUrl {get;set;} = string.Empty;
  public string SupabaseToken {get;set;} = string.Empty;
}
