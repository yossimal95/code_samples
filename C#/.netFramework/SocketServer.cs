using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Threading;

namespace socketServerSide
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            await Task.Run(() =>
            {
                while (true)
                {
                    ServerSocket sc = null;
                    try
                    {
                        sc = new ServerSocket(13131);
                        sc.Listen();
                    }
                    catch (Exception)
                    {
                        sc.Dispose();
                    }
                }
            });
        }

        private void notifyIcon1_DoubleClick(object sender, EventArgs e)
        {

        }
    }
    public class ServerSocket : IDisposable
    {        
        private Socket socket;
        private IPEndPoint endpoint;

        public void Dispose()
        {
            socket.Close();
            endpoint = null;
        }

        public ServerSocket(int port)
        {
            socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            endpoint = new IPEndPoint(IPAddress.Parse("0.0.0.0"), port); // or 127.0.0.1
        }

        public void Listen()
        {
            socket.Bind(endpoint);
            socket.Listen(10);

            string data = null;
            byte[] bytes = null;

            Socket clientSocket = socket.Accept();

            while (true)
            {
                try
                {
                    bytes = new byte[1024];

                    int bytesRec = clientSocket.Receive(bytes);
                    if (bytesRec == 0)
                    {
                        continue;
                    }
                    data += Encoding.ASCII.GetString(bytes, 0, bytesRec);

                    MessageBox.Show($"Text received : {data}");
                    data = null;
                }
                catch (SocketException ex)
                {
                    throw ex;
                }
            }
        }
    }
}
