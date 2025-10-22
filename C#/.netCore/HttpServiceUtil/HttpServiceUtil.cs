using Microsoft.Extensions.Configuration;
using System.Net;
using System.Text;
using System.Text.Json;

public static class HttpServiceUtil
{
    public static dynamic Get(string urlAndParams, IConfiguration configuration)
    {
        IConfigurationSection serviceConfigurationSection = configuration.GetSection("configuration:serviceConfigurationSection");
        string serviceBaseUrl = serviceConfigurationSection.GetValue<string>("baseServiceUrl");
        string authorizationKey = serviceConfigurationSection.GetValue<string>("authorizationKey");

        using (var client = new HttpClient() { Timeout = Timeout.InfiniteTimeSpan })
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{serviceBaseUrl}{urlAndParams}");

            request.Headers.Add("Authorization", authorizationKey);

            try
            {
                var response = client.SendAsync(request).GetAwaiter().GetResult();

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                    return jsonResponse;
                }
                else
                {
                    if (response.StatusCode == HttpStatusCode.NotFound)
                    {
                        throw new HttpRequestException($"CustomError. url: {urlAndParams}");
                    }
                    throw new HttpRequestException($"{response.Content.ReadAsStringAsync().GetAwaiter().GetResult()}");
                }
            }
            catch (HttpRequestException httpEx)
            {
                throw new HttpRequestException($"CustomError: URL: {urlAndParams}, {httpEx.Message}");
            }
        }
    }

    public static dynamic Post(string urlAndParams, IConfiguration configuration, dynamic jsonBody = null)
    {
        IConfigurationSection serviceConfigurationSection = configuration.GetSection("configuration:serviceConfigurationSection");
        string serviceBaseUrl = serviceConfigurationSection.GetValue<string>("baseServiceUrl");
        string authorizationKey = serviceConfigurationSection.GetValue<string>("authorizationKey");

        using (var client = new HttpClient() { Timeout = Timeout.InfiniteTimeSpan })
        {
            var json = "[]";

            if (jsonBody != null)
            {
                json = JsonSerializer.Serialize(jsonBody);
            }

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, $"{serviceBaseUrl}{urlAndParams}")
            {
                Content = content
            };

            request.Headers.Add("Authorization", authorizationKey);

            try
            {
                var response = client.SendAsync(request).GetAwaiter().GetResult();

                if (response.IsSuccessStatusCode)
                {
                    return response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                }
                else
                {
                    if (response.StatusCode == HttpStatusCode.NotFound)
                    {
                        throw new HttpRequestException($"CustomError. url: {urlAndParams}");
                    }
                    throw new Exception(response.Content.ReadAsStringAsync().GetAwaiter().GetResult());
                }
            }
            catch (HttpRequestException httpEx)
            {
                throw new HttpRequestException($"CustomError. URL: {urlAndParams}, {httpEx.Message}");
            }
        }
    }
}
