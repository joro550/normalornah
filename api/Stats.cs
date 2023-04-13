using Postgrest.Attributes;
using Postgrest.Models;

namespace api;

[Table("stats")]
public class Stats : BaseModel 
{
    [PrimaryKey("question_id")]
    public long QuestionId {get;set;}

    [Column("normal")]
    public long NormalAnswers {get;set;}

    [Column("nah")]
    public long NahAnswers {get;set;}

    [Column("total_answers")]
    public long TotalAnswers {get;set;}
}
