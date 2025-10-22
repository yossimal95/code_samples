# HttpServiceUtil
This C# console project demonstrates how to make synchronous HTTP GET and POST requests using HttpClient.
The HttpServiceUtil class handles HTTP requests, serializes request bodies with System.Text.Json, and reads configuration values (like base URL and authorization key) from appsettings.json.
Responses can be used as JSON strings or deserialized into typed objects.

## Required NuGet packages:
```
package Microsoft.Extensions.Configuration
package Microsoft.Extensions.Configuration.Json
package Microsoft.Extensions.Configuration.FileExtensions
package Microsoft.Extensions.Configuration.Binder
```
