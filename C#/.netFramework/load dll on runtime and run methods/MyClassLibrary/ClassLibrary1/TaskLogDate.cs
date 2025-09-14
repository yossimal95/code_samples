using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1
{
    public class TaskLogDate : ITask
    {
        public string taskName
        {
            get
            {
                return "LogTheDate";
            }
        }

        public string taskDescription
        {
            get
            {
                return "Print the current date in to Log.. bla bla..";
            }
        }

        public void RunTask()
        {
            Console.WriteLine(DateTime.Now.ToLongTimeString());
        }
    }
}
