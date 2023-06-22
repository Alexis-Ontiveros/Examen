using Examen.Dto;
using Examen.Interface.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Examen.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteArticuloService clienteArticuloService;
        public ClientesController(IClienteArticuloService clienteArticuloService)
        {
            this.clienteArticuloService = clienteArticuloService;
        }

        [HttpGet("Compras/{id}")]
        public async Task<IActionResult> GetComprados([FromRoute] int id)
        {
            return Ok(await clienteArticuloService.GetComprado(id));
        }

        [HttpGet("Pendientes/{id}")]
        public async Task<IActionResult> GetPendientes([FromRoute] int id)
        {
            return Ok(await clienteArticuloService.GetProceso(id));
        }

        [HttpGet("Cancelados/{id}")]
        public async Task<IActionResult> GetCancelados([FromRoute] int id)
        {
            return Ok(await clienteArticuloService.GetCancelado(id));
        }

        [HttpPost("Agregar")]
        public async Task<IActionResult> Post([FromBody] ClienteArticuloDto value)
        {
            return Ok(await clienteArticuloService.AddArticulo(value));
        }

        [HttpPost("Cancelar/{id}")]
        public async Task<IActionResult> PostCncelar([FromRoute] int id)
        {
            return Ok(await clienteArticuloService.CancelarLista(id));
        }

        [HttpPost("Comprar/{id}")]
        public async Task<IActionResult> Post([FromRoute] int id)
        {
            return Ok(await clienteArticuloService.ComprarLista(id));
        }

        [HttpDelete("Quitar/{IdCliente}/{IdArticulo}")]
        public async Task<IActionResult> Delete(int IdCliente, int IdArticulo)
        {
            return Ok(await clienteArticuloService.RemoveArticulo(IdCliente, IdArticulo));
        }
    }
}
