using System.ComponentModel.DataAnnotations;

namespace api;

public class QuestionStat
{
    [Required]
    public QuestionAnswer? Answer {get;set;}
}
