using Microsoft.EntityFrameworkCore;

namespace Farm.Data.Entities;
[PrimaryKey(nameof(Name))]
public class Animal
{
    public required string Name { get; set; }
}