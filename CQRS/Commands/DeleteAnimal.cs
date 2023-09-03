using Farm.Data;
using MediatR;

namespace Farm.CQRS.Commands
{
    public record DeleteAnimalCommand(string animalName) : IRequest;

    public class DeleteAnimalHandler : IRequestHandler<DeleteAnimalCommand>
    {
        private readonly FarmDbContext dbContext;

        public DeleteAnimalHandler(FarmDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task Handle(DeleteAnimalCommand request, CancellationToken cancellationToken)
        {
            var removingAnimal = await dbContext.Animals.FindAsync(request.animalName);

            if (removingAnimal == null)
            {
                return;
            }

            dbContext.Animals.Remove(removingAnimal);

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}

