using AutoMapper;

namespace api;

[AutoMap(typeof(Stats), ReverseMap = true)]
public class StatsModel
{
    public long QuestionId { get; set; }
    public long NormalAnswers { get; set; }
    public long NahAnswers { get; set; }
    public long TotalAnswers { get; set; }

    public static StatsModel Zero(long questionId) =>
        new StatsModel
        {
            QuestionId = questionId,
            NormalAnswers = 0,
            NahAnswers = 0,
            TotalAnswers = 0
        };
}
