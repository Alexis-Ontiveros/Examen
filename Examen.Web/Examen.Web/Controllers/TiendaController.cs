using Examen.Dto;
using Examen.Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Examen.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class TiendaController : ControllerBase
    {
        private readonly ITiendaService service;
        private readonly IArticuloTiendaService atService;

        public TiendaController(ITiendaService service, IArticuloTiendaService atService)
        {
            this.service = service;
            this.atService = atService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await service.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            return Ok(await service.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TiendaDto tienda)
        {
            return Ok(await service.Create(tienda));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] TiendaDto tienda)
        {
            return Ok(await service.Update(id, tienda));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            return Ok(await service.Delete(id));
        }

        [HttpGet("Articulos/{id}")]
        public async Task<IActionResult> GetArticulos([FromRoute] int id)
        {
            return Ok(await atService.GetByTiendaId(id));
        }

        [HttpGet("Articulos/NoAsginados/{id}")]
        public async Task<IActionResult> GetArticulosNoAsginados([FromRoute] int id)
        {
            return Ok(await atService.GetArticulosNoAsignados(id));
        }

        [HttpPost("Articulos")]
        public async Task<IActionResult> Post([FromBody] ArticuloTiendaDto articuloTienda)
        {
            return Ok(await atService.SaveArticuloTienda(articuloTienda));
        }

        [HttpDelete("Articulos/{IdArticulo}/{IdTienda}")]
        public async Task<IActionResult> Delete([FromRoute] int IdArticulo, [FromRoute] int IdTienda)
        {
            return Ok(await atService.RemoveArticuloTienda(new ArticuloTiendaDto { IdArticulo = IdArticulo, IdTienda = IdTienda }));
        }

        [HttpGet("Articulos/Dashboard")]
        public async Task<IActionResult> GetArticulosTienda()
        {
            return Ok(await atService.GetArticulosTiendas());
        }
    }
}
