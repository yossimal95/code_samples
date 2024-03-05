// in *aspx.cs*
[WebMethod]
public static string GetHello(string name)
{
    return $"Hello {name}";
} 


// Js ajax:
fetch('http://url/to/aspx_file.aspx/GetHello', { // <-- 
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: 'Moshe'
    })
}).then(res => res.json()).then(json => console.log(json)); // {d: 'Hello Moshe'}
