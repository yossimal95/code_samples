namespace LearnAsync
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<string> l = MyScyncClass.GetMsgListAsync().Result;

            foreach (var item in l)
            {
                Console.WriteLine(item + "\n");
            }
        }

        // Or:
        static void Main(string[] args)
        {
            Task<List<string>> l = MyScyncClass.GetMsgListAsync();

            foreach (var item in l.Result)
            {
                Console.WriteLine(item + "\n");
            }
        }

        // Or:
        static async Task Main(string[] args)
        {
            List<string> l = await MyDal.GetMsgListAsync();

            foreach (var item in l)
            {
                Console.WriteLine(item + "\n");
            }
        }
    }

    public class MyScyncClass
    {
        static public async Task<List<string>> GetMsgListAsync()
        {
            await Task.Delay(3000);
            // Or:
            // Task.Delay(3000).Wait();
            // but then it won't be an async method..
          
            List<string> l = [];

            for (int i = 0; i < 10; i++)
            {
                l.Add("" + i);
            }

            return l;
        }
    }
}
