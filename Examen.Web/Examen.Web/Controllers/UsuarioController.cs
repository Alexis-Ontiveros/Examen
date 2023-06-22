using Examen.Dto;
using Examen.Interface.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Examen.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService usuarioService;
        private readonly IConfiguration configuration;

        public UsuarioController(IConfiguration configuration, IUsuarioService usuarioService)
        {
            this.usuarioService = usuarioService;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Get(UsuarioDto usuario)
        {
            var user = await usuarioService.GetUsuario(usuario);

            if(user == null) 
            {
                return Unauthorized();
            }

            var jwt = configuration.GetSection("Jwt").Get<JwtDto>();

            var claims = new[] 
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("userName", user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: singIn 
                );

            return Ok(new
            {
                user,
                token = new JwtSecurityTokenHandler().WriteToken(token)
            }); ;        
        }
    }
}
