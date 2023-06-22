using Examen.Dto;
using Examen.Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Examen.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class ArticuloController : ControllerBase
    {
        private readonly IArticuloService service;

        public ArticuloController(IArticuloService service)
        {
            this.service = service;
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
        public async Task<IActionResult> Post()
        {
            var req = Request.Form;

            var file = req.Files[0];
            var stream = new MemoryStream();

            await file.CopyToAsync(stream);

            var codigo = req["codigo"];
            var desc = req["descripcion"];
            var precio = req["precio"];
            var stock = req["stock"];

            return Ok(await service.Create(new ArticuloDto
            {
                Codigo = codigo,
                Descripcion = desc,
                Precio = decimal.Parse(precio),
                Stock = int.Parse(stock),
                Imagen = stream.ToArray()
            }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id)
        {
            var req = Request.Form;

            var file = req.Files[0];
            var stream = new MemoryStream();

            await file.CopyToAsync(stream);

            var codigo = req["codigo"];
            var desc = req["descripcion"];
            var precio = req["precio"];
            var stock = req["stock"];

            return Ok(await service.Update(id, new ArticuloDto
            {
                Codigo = codigo,
                Descripcion = desc,
                Precio = decimal.Parse(precio),
                Stock = int.Parse(stock),
                Imagen = stream.ToArray()
            }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            return Ok(await service.Delete(id));
        }
    }
}
