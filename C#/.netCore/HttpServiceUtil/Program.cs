using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace ConsoleApp6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

            // HTTP GET Example
            var getResponse = HttpServiceUtil.Get("posts/1", configuration);

            var getJsonData = JsonSerializer.Deserialize<PostItem>(getResponse);

            Console.WriteLine(getJsonData?.title);


            // HTTP POST Example
            PostItem item = new PostItem()
            {
                userId = 1,
                id = 2,
                title = "Some title",
                body = "Some body"
            };

            dynamic postResponse = HttpServiceUtil.Post("/posts", configuration, item);

            var postJsonData = JsonSerializer.Deserialize<PostItem>(postResponse);

            Console.WriteLine(postJsonData?.title);
        }
    }

    public class PostItem
    {
        public int userId { get; set; }
        public int id { get; set; }
        public string title { get; set; }
        public string body { get; set; }
    }
}
