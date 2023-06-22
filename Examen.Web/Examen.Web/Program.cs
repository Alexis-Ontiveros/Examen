using Examen.Data.DB;
using Examen.Interface.Repository;
using Examen.Interface.Service;
using Examen.Repository;
using Examen.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string CORSOpenPolicy = "OpenCORSPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
      name: CORSOpenPolicy,
      builder => {
          builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cofiguracion para la autenticacion JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Configuracion de la instancia de entity framework y la cadena de conexion
var connectionString = builder.Configuration.GetConnectionString("DbConnection");
builder.Services.AddDbContextPool<DbPuntoVentaContext>(options => options.UseSqlServer(connectionString));

// Configuracion del contrato con el servicio para la inyeccion de dependecias
builder.Services.AddTransient<IUsarioRepository, UsuarioRepository>();
builder.Services.AddTransient<IUsuarioService, UsuarioService>();
builder.Services.AddTransient<ITiendaRepository, TiendaRepository>();
builder.Services.AddTransient<ITiendaService,  TiendaService>();
builder.Services.AddTransient<IArticuloRepository, ArticuloRepository>();
builder.Services.AddTransient<IArticuloService, ArticuloService>();
builder.Services.AddTransient<IClienteArticuloRepository, ClienteArticuloRepository>();
builder.Services.AddTransient<IClienteArticuloService, ClienteArticuloService>();
builder.Services.AddTransient<IArticuloTiendaRepository, ArticuloTiendaRepository>();
builder.Services.AddTransient<IArticuloTiendaService, ArticuloTiendaService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(CORSOpenPolicy);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
