using api;
using AutoMapper;

[AutoMap(typeof(Question))]
public class QuestionModel
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool Approved { get; set; }
}

[AutoMap(typeof(Question), ReverseMap = true)]
public class CreateQuestionModel
{
    public string Text { get; set; } = string.Empty;
}
