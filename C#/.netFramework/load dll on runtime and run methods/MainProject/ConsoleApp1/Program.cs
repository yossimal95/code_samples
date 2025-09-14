using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string dllName = "ClassLibrary1.dll";
            string dllPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, dllName);

            if (!File.Exists(dllPath))
            {
                Console.WriteLine("DLL not found: " + dllPath);
                return;
            }

            try
            {
                Assembly loadedAssembly = Assembly.LoadFrom(dllPath);

                string interfaceFullName = "ClassLibrary1.ITask";

                Type interfaceType = loadedAssembly.GetType(interfaceFullName);
                if (interfaceType == null || !interfaceType.IsInterface)
                {
                    Console.WriteLine("Interface not found in the DLL.");
                    return;
                }

                var implementingTypes = loadedAssembly.GetTypes()
                    .Where(t => t.IsClass && !t.IsAbstract && t.IsPublic && interfaceType.IsAssignableFrom(t))
                    .ToList();

                Console.WriteLine($"Found {implementingTypes.Count} class(es) implementing {interfaceFullName}:");
                foreach (var type in implementingTypes)
                {
                    object instance = Activator.CreateInstance(type);

                    PropertyInfo nameProp = interfaceType.GetProperty("taskName");
                    PropertyInfo descProp = interfaceType.GetProperty("taskDescription");

                    string name = nameProp?.GetValue(instance)?.ToString();
                    string desc = descProp?.GetValue(instance)?.ToString();

                    Console.WriteLine($"- {name}: {desc}");

                    MethodInfo runMethod = interfaceType.GetMethod("RunTask");
                    runMethod?.Invoke(instance, null);  // invoke with no parameters
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
            }

            Console.ReadLine();
        }
    }
}
