using MediatR;
using Farm.Data.Entities;
using Farm.Data;
using Microsoft.EntityFrameworkCore;

namespace Farm.CQRS.Queries
{
    public record GetAnimalsQuery() : IRequest<IEnumerable<Animal>>;

    public class GetAnimalsHandler : IRequestHandler<GetAnimalsQuery, IEnumerable<Animal>>
    {
        private readonly FarmDbContext dbContext;

        public GetAnimalsHandler(FarmDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Animal>> Handle(GetAnimalsQuery request,
        CancellationToken cancellationToken)
        {
            var result = await dbContext.Animals.ToListAsync(cancellationToken);
            return result;
        }
    }

}
