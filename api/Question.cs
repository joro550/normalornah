using Postgrest.Attributes;
using Postgrest.Models;

namespace api;

[Table("questions")]
public class Question : BaseModel 
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("text")]
    public string Text { get; set; } 
        = string.Empty;

    [Column("approved")]
    public bool Approved { get; set; }
}
