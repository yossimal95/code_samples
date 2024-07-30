# 1. in web.config:

```
<configuration>
  <system.webServer>
    <modules>
  	  <add name="RatingModule" type="Kmh.RatingModule" />
    </modules>
  </system.webServer>
</configuration>
```


# 2. in root folder (file name: RatingModule.cs):
```
public class RatingModule : IHttpModule
{
    public void Init(HttpApplication context)
    {
        context.BeginRequest += new EventHandler(OnBeginRequest);
    }

    private void OnBeginRequest(object sender, EventArgs e)
    {
        try
        {
            HttpApplication app = (HttpApplication)sender;

            if (app.Context.Request.HttpMethod == "GET")
            {
                string url = app.Context.Request.Url.ToString();
                if (url.IndexOf(".aspx") > -1)
                {
                    System.Diagnostics.Debug.WriteLine("Client requested URL: " + url);
                    // Write to log..
                }
            }
        }
        catch (Exception ex)
        {
            // Write to log..
        }
    }

    public void Dispose() { }
}
```

# 3. log demo: 
![image](https://github.com/user-attachments/assets/0e1dfb01-f96b-4ee7-8b02-a7b6a6a4d583)


