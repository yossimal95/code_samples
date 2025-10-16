using System;
using System.Web;
using System.Web.SessionState;

// ExampleHandler – Generic ASP.NET Framework HTTP Handler for Action-Based Web Requests
// This class provides a reusable template for handling HTTP GET and POST requests in ASP.NET Framework applications. 
// It supports action-based routing, permission checks, and structured error responses, making it ideal for lightweight web service endpoints or AJAX-based interactions.

public class ExampleHandler : IHttpHandler, IRequiresSessionState
{
    public void ProcessRequest(HttpContext context)
    {
        try
        {
            // Optional: Check user permissions here
            CheckPermissions(context);

            // Route based on HTTP method
            switch (context.Request.HttpMethod.ToUpper())
            {
                case "GET":
                    HandleGet(context);
                    break;
                case "POST":
                    HandlePost(context);
                    break;
                default:
                    RespondWithError(context, 405, "Method Not Allowed");
                    break;
            }
        }
        catch (Exception ex)
        {
            LogError(ex);
            RespondWithError(context, 500, "Internal Server Error");
        }
    }

    public bool IsReusable => false;

    // Permission check stub
    private void CheckPermissions(HttpContext context)
    {
        // Implement your permission logic here
        // Example: throw new UnauthorizedAccessException("Permission denied");
    }

    // GET handler
    private void HandleGet(HttpContext context)
    {
        string action = context.Request.QueryString["action"]?.ToLower();

        switch (action)
        {
            case "ping":
                context.Response.ContentType = "text/plain";
                context.Response.Write("pong");
                break;
            case "status":
                context.Response.ContentType = "application/json";
                context.Response.Write("{ \"status\": \"ok\" }");
                break;
            default:
                RespondWithError(context, 404, "Action Not Found");
                break;
        }
    }

    // POST handler
    private void HandlePost(HttpContext context)
    {
        string action = context.Request.Form["action"]?.ToLower();

        switch (action)
        {
            case "submit":
                // Handle submission logic
                context.Response.ContentType = "application/json";
                context.Response.Write("{ \"result\": \"submitted\" }");
                break;
            default:
                RespondWithError(context, 404, "Action Not Found");
                break;
        }
    }

    // Error response helper
    private void RespondWithError(HttpContext context, int statusCode, string message)
    {
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";
        context.Response.Write($"{{ \"error\": \"{message}\" }}");
    }

    // Logging helper
    private void LogError(Exception ex)
    {
        // Replace with your logging framework
        System.Diagnostics.Debug.WriteLine($"Error: {ex.Message}");
    }
}
