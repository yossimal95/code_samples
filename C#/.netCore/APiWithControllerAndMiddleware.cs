// Program.cs 
builder.Services.AddControllers();
...
app.Use(async (context, next) =>
{
Console.Out.WriteLine(context.Request.Headers["name"]);
await next(context);
});
...
app.MapControllers();


// CafaController.cs
[ApiController]
[Route("[controller]")]
public class CafaController : ControllerBase
{
...
[HttpGet(Name = "GetCafa")]
public IActionResult GetCafa()
{
    return Ok("Cafa..");
}
}


// OR:
// CafaController.cs
[ApiController]
[Route("api/[controller]/[action]")]
public class CafaController : ControllerBase
{
...
[HttpGet]
public IActionResult GetCafa()
{
return Ok("Cafa..");
}
}


// JavaScript
fetch('https://localhost:7101/api/Cafa/GetCafa', {
    headers: {'name' : 'Y~C'}
})
