using Postgrest.Attributes;
using Postgrest.Models;

namespace api;

[Table("answers")]
public class Answer : BaseModel 
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Column("answer")]
    public QuestionAnswer QuestionAnswer { get; set; }
    
    [Column("answered_at")]
    public DateTime AnsweredAt { get; set; }
    
    [Column("question_id")]
    public int QuestionId { get; set; }
}

public enum QuestionAnswer
{
    None = -1,
    Normal = 0,
    Nah = 1
}

