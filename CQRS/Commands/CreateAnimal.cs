using Farm.Data;
using Farm.Data.Entities;
using MediatR;

namespace Farm.CQRS.Commands
{
    public record CreateAnimalCommand(Animal animal) : IRequest;

    internal class CreateAnimalHandler : IRequestHandler<CreateAnimalCommand>
    {
        private readonly FarmDbContext dbContext;

        public CreateAnimalHandler(FarmDbContext dbContext)
		{
            this.dbContext = dbContext;
		}

        public Task Handle(CreateAnimalCommand request, CancellationToken cancellationToken)
        {
            dbContext.Animals.Add(request.animal);
            return dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}

