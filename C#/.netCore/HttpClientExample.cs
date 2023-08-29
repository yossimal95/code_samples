using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestClient
{
    public class Client
    {
        public static async Task<string> HttpGet(string url)
        {
            try
            {
                // use this handler if you need to send credentials
                HttpClientHandler handler = new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                };

                using (HttpClient client = new HttpClient(handler))
                {
                    HttpResponseMessage response = await client.GetAsync(url);

                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;

                    // you can also use:
                    // string response = await client.GetStringAsync(url);
                    // return response;
                }
            }
            catch (Exception ex)
            {
                return "Error.. :-(";
            }
        }

        public static async Task<string> HttpGetWithParams(string url, Dictionary<string, string> parameters)
        {
            try
            {
                List<string> parametersArr = new List<string>();

                foreach (var parameter in parameters)
                {
                    parametersArr.Add($"{parameter.Key}={parameter.Value}");
                }

                // use this handler if you need to send credentials
                HttpClientHandler handler = new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                };

                using (HttpClient client = new HttpClient(handler))
                {
                    HttpResponseMessage response = await client.GetAsync($"{url}?{String.Join('&', parametersArr)}");

                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;

                    // you can also use:
                    // string response = await client.GetStringAsync($"{url}?{String.Join('&', parametersArr)}");
                    // return response;
                }
            }
            catch (Exception ex)
            {
                return "Error.. :-(";
            }
        }

        public static async Task<string> HttpPost(string url)
        {
            try
            {
                // use this handler if you need to send credentials
                HttpClientHandler handler = new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                };

                using (HttpClient client = new HttpClient(handler))
                {
                    HttpResponseMessage response = await client.PostAsync(url, null);

                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;
                }
            }
            catch (Exception ex)
            {
                return "Error.. :-(";
            }
        }

        public static async Task<string> HttpPostWithParamsInQuery(string url, Dictionary<string, string> parameters)
        {
            try
            {
                List<string> parametersArr = new List<string>();

                foreach (var parameter in parameters)
                {
                    parametersArr.Add($"{parameter.Key}={parameter.Value}");
                }

                // use this handler if you need to send credentials
                HttpClientHandler handler = new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                };

                using (HttpClient client = new HttpClient(handler))
                {
                    HttpResponseMessage response = await client.PostAsync($"{url}?{String.Join('&', parametersArr)}", null);

                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;
                }
            }
            catch (Exception ex)
            {
                return "Error.. :-(";
            }
        }

        public static async Task<string> HttpPostWithParamsInBody(string url, string body)
        {
            try
            {
                // use this handler if you need to send credentials
                HttpClientHandler handler = new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                };

                using (HttpClient client = new HttpClient(handler))
                {
                    // for json body
                    StringContent httpContent = new StringContent(body, System.Text.Encoding.UTF8, "application/json");

                    // for xml body
                    //StringContent httpContent = new StringContent("", System.Text.Encoding.UTF8, "application/xml");

                    HttpResponseMessage response = await client.PostAsync(url, httpContent);

                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    return responseBody;
                }
            }
            catch (Exception ex)
            {
                return "Error.. :-(";
            }
        }
    }
}
