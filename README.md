# 🔧 Dynamic Plugin Loader in .NET Framework  
### 🧪 Nice-to-Have POC

This project is a simple **Proof of Concept (POC)** showing how to dynamically load DLLs at runtime in a .NET Framework application, discover implementations of a common interface, and invoke methods — all without prior compile-time knowledge of the classes.

---

## 🚀 Features

- 🔍 Load DLLs dynamically from the `bin` directory  
- 🔄 Discover all public classes that implement the `ITask` interface  
- 🧾 Display each task’s name and description  
- ▶️ Execute the `RunTask()` method dynamically  
- 🔌 Simple plugin architecture foundation

---

## 🧩 Interface Definition

The plugin DLLs must implement the following interface:

```csharp
public interface ITask
{
    string taskName { get; }
    string taskDescription { get; }
    void RunTask();
}

// In a separate Class Library project (MyPlugin.dll)
public class HelloWorldTask : ITask
{
    public string taskName => "Hello World";
    public string taskDescription => "Prints Hello World to the console";

    public void RunTask()
    {
        Console.WriteLine("Hello from HelloWorldTask!");
    }
}
