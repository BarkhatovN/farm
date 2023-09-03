using Farm.CQRS.Commands;
using Farm.CQRS.Queries;
using Farm.Data.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Farm.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalsController : Controller
    {
        private readonly IMediator mediator;
        public AnimalsController(IMediator mediator) => this.mediator = mediator;

        // GET: animals
        [HttpGet]
        public Task<IEnumerable<Animal>> Get(CancellationToken ct)
        {
            return mediator.Send(new GetAnimalsQuery(), ct);
        }

        // POST animals
        [HttpPost]
        public Task Post([FromBody] Animal animal, CancellationToken ct)
        {
            return mediator.Send(new CreateAnimalCommand(animal), ct);
        }

        // DELETE animals/sheep
        [HttpDelete("{name}")]
        public Task Delete(string name, CancellationToken ct)
        {
            return mediator.Send(new DeleteAnimalCommand(name), ct);
        }
    }
}

