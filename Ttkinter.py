from tkinter import LEFT
import tkinter as tk
from tkinter import ttk
import subprocess
import socket
import os
from PIL import Image, ImageTk
import webbrowser

class NetworkApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Network Control Panel")
        self.geometry("1500x800")
        self.configure(bg="#1e1e2f")
        self.resizable(False, False)
        self.create_styles()
        self.create_layout()
        listbox = tk.Listbox(self.main_area)
        listbox.insert(tk.END, *(f"Elemento {i}" for i in range(100)))
     
   
        print(os.getcwd())
    # ------------------ ESTILOS ------------------

    def create_styles(self):
        style = ttk.Style()
        style.theme_use("clam")

        style.configure("TFrame", background="#1e1e2f")
        style.configure("Side.TFrame", background="#111827")

        style.configure("TLabel", background="#1e1e2f",
                        foreground="white", font=("Segoe UI", 10))

        style.configure("Title.TLabel",
                        font=("Segoe UI", 16, "bold"),
                        foreground="#4cc9f0")

        style.configure("TButton",
                        font=("Segoe UI", 10),
                        padding=6)

    # ------------------ LAYOUT ------------------

    def create_layout(self):

        # Panel lateral
        self.sidebar = ttk.Frame(self, style="Side.TFrame", width=200)
        self.sidebar.pack(side="left", fill="y")

        # Área principal
        self.main_area = ttk.Frame(self)
        self.main_area.pack(side="right", expand=True, fill="both")

        ttk.Label(self.sidebar, text="MENÚ",
                  style="Title.TLabel").pack(pady=20)

        ttk.Button(self.sidebar, text="IP",
                   command=self.show_ip_panel).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="Ping Host",
                   command=self.show_ping_panel).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="Escanear Puerto",
                   command=self.show_port_panel).pack(fill="x", padx=20, pady=10)

        self.current_panel = None
     
        ttk.Button(self.sidebar, text="settings",command=self.settings_tools).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="payloads", command=self.show_payloads_panel).pack(fill="x", padx=20, pady=10)
   
       #settings buttons
        ttk.Button(self.sidebar, text="modules", command=self.show_settings_panel).pack(fill="x", padx=20, pady=10)
        ttk.Button(self.sidebar, text="exit", command=self.destroy).pack(fill="x", padx=20, pady=10) 
       #metasploit
        ttk.Button(self.sidebar, text="metasploit", command=self.show_metasploit_panel).pack(fill="x", padx=20, pady=10)
  
  
  
  
   #settings support
    def settings_tools(self):
        self.clear_main()
        ttk.Button(self.main_area, text="settings", style="Title.TLabel").pack(pady=20)
  
  
   #metasploit2
    def show_metasploit_panel(self):
       self.clear_main()
       ttk.Label(self.main_area, text="Información de metasploit2",
                 style="Title.TLabel").pack(pady=20)


    # ------------------ CAMBIO DE PANEL ------------------
    def show_modules_panel(self):
        self.clear_main()

        ttk.Label(self.main_area, text="Información de modules/metasploit",
                  style="Title.TLabel").pack(pady=20)

    def show_payloads_panel(self):
        self.clear_main()

        ttk.Label(self.main_area, text="Información de payloads/metasploit",
                  style="Title.TLabel").pack(pady=20)
  


  #settings panel
    def show_settings_panel(self):
        self.clear_main()
   
        ttk.Label(self.main_area, text="Información de metasploit/modules",
                  style="Title.TLabel").pack(pady=10)      
        ttk.Checkbutton(self.main_area, text="meterpreter/windows/x64/meterpreter", command = self.show_modules_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/Unix/x64/meterpreter", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/Unix/x32/meterpreter", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/Android", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/ios", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/windows/x64/meterpreter", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="meterpreter/windows/x64/meterpreter", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="encoder/metasploit", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="nops/metasploit", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="all/metasploit", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="http/metasploit", command=self.show_Exploits_http).pack(fill="x", padx=500, pady=5)
        ttk.Checkbutton(self.main_area, text="ftp/metasploit", command=self.show_settings_panel).pack(fill="x", padx=500, pady=5)
        
      
    def show_modules_panel(self):
        self.clear_main()
        ttk.Label(self.main_area, text="Información de meterpreter2",style="Title.TLabel").pack(pady=20)
      

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        img_path = os.path.join(BASE_DIR, "assets", "Windows 11.png")

        if os.path.exists(img_path):
            img = Image.open(img_path)
            img = img.resize((25,25), Image.LANCZOS)
            self.img = ImageTk.PhotoImage(img)

            btn = ttk.Button(self.main_area, image=self.img, command=self.show_settings_panel)
            btn.image = self.img
            btn.pack()

           
        else:
            ttk.Label(self.main_area, text="Image no encontrada", foreground="red").pack(fill="x", padx=110, pady=5)



        
        for f in os.listdir(os.path.join(BASE_DIR, "assets")):
            print(f)    

        print(img_path)
        print(os.path.exists(img_path))

        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x64/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x32/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x32/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x32/meterpreter").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="meterpreter/windows/x32/meterpreter").pack(fill="x", padx=110, pady=5)
      
    def show_Exploits_http(self):
        self.clear_main()
        ttk.Label(self.main_area, text="Información de Exploits http",style="Title.TLabel").pack(pady=20)
        ttk.Label(self.main_area, text="Msf::Exploit::Remote::HTTP").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="Msf::Exploit::Remote::HttpServer::HTML").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="Msf::Exploit::Remote::BrowserExploitServer").pack(fill="x", padx=110, pady=5)
        ttk.Label(self.main_area, text="Msf::Exploit::Remote::Browser::IE").pack(fill="x", padx=110, pady=5)


    def clear_main(self):
        for widget in self.main_area.winfo_children():
            widget.destroy()

    # ------------------ PANEL IP ------------------
    

    def show_ip_panel(self):
        self.clear_main()
        resultJSON = ttk.Label(self.main_area, text="")
        resultJSON.pack(pady=10)
       
        ttk.Label(self.main_area, text="Información de IP",
                  style="Title.TLabel").pack(pady=20)

        hostname = socket.gethostname()
        ip = socket.gethostbyname(hostname)

        ttk.Label(self.main_area, text=f"Hostname: {hostname}").pack(pady=10)
        ttk.Label(self.main_area, text=f"IP Local: {ip}").pack(pady=10)

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        img_path = os.path.join(BASE_DIR, "assets", "PostgresSQL.png")
        img_path2 = os.path.join(BASE_DIR, "assets", "SQLite.png")
        img_path3 = os.path.join(BASE_DIR, "assets", "Nodemon.png")
        img_path4 = os.path.join(BASE_DIR, "assets", "Python.png")
        img_path5 = os.path.join(BASE_DIR, "assets", "Android.png")
        img_path6 = os.path.join(BASE_DIR, "assets", "Ruby on Rails.png")
        img_path7 = os.path.join(BASE_DIR, "assets", "Filezilla.png")
        img_path8 = os.path.join(BASE_DIR, "assets", "sql.png")
        img_path9 = os.path.join(BASE_DIR, "assets", "Bash.png")
        img_path10 = os.path.join(BASE_DIR, "assets", "PuTTY.png")

        if os.path.exists(img_path and img_path2 and img_path3 and img_path4):
            img = Image.open(img_path)
            img2 = Image.open(img_path2)
            img3 = Image.open(img_path3)
            img4 = Image.open(img_path4)
            img5 = Image.open(img_path5)
            img6 = Image.open(img_path6)
            img7 = Image.open(img_path7)
            img8 = Image.open(img_path8)
            img9 = Image.open(img_path9)
            img10 = Image.open(img_path10)
            img = img.resize((30,30), Image.LANCZOS)
            img2 = img2.resize((30,30), Image.LANCZOS)
            img3 = img3.resize((30,30), Image.LANCZOS)
            img4 = img4.resize((30,30), Image.LANCZOS)
            img5 = img5.resize((30,30), Image.LANCZOS)
            img6 = img6.resize((30,30), Image.LANCZOS)
            img7 = img7.resize((30,30), Image.LANCZOS)
            img8 = img8.resize((30,30), Image.LANCZOS)
            img9 = img9.resize((30,30), Image.LANCZOS)
            img10 = img10.resize((30,30), Image.LANCZOS)
            self.img = ImageTk.PhotoImage(img)
            self.img2 = ImageTk.PhotoImage(img2)
            self.img3 = ImageTk.PhotoImage(img3)
            self.img4 = ImageTk.PhotoImage(img4)
            self.img5 = ImageTk.PhotoImage(img5)
            self.img6 = ImageTk.PhotoImage(img6)
            self.img7 = ImageTk.PhotoImage(img7)
            self.img8 = ImageTk.PhotoImage(img8)
            self.img9 = ImageTk.PhotoImage(img9)
            self.img10 = ImageTk.PhotoImage(img10)

            btn = ttk.Button(self.main_area, image=self.img, command=self.postgresql)
            btn2 = ttk.Button(self.main_area, image=self.img2, command=self.show_settings_panel)
            btn3 = ttk.Button(self.main_area, image=self.img3, command=self.show_settings_panel)
            btn4 = ttk.Button(self.main_area, image=self.img4, command=self.show_settings_panel)
            btn5 = ttk.Button(self.main_area, image=self.img5, command=self.show_settings_panel)
            btn6 = ttk.Button(self.main_area, image=self.img6, command=self.show_settings_panel)
            btn7 = ttk.Button(self.main_area, image=self.img7, command=self.show_settings_panel)
            btn8 = ttk.Button(self.main_area, image=self.img8, command=self.show_settings_panel)
            btn9 = ttk.Button(self.main_area, image=self.img9, command=self.show_settings_panel)
            btn10 = ttk.Button(self.main_area, image=self.img10, command=self.show_settings_panel)

            btn.image = self.img
            btn2.image2 = self.img2
            btn3.image3 = self.img3
            btn4.image4 = self.img4
            btn5.image5 = self.img5
            btn6.image6 = self.img6
            btn7.image7 = self.img7
            btn8.image8 = self.img8
            btn9.image9 = self.img9
            btn10.image10 = self.img10
            btn.pack(side="left", padx=5)   
            btn2.pack(side="left", padx=5)
            btn3.pack(side="left", padx=5)
            btn4.pack(side="left", padx=5)
            btn5.pack(side="left", padx=5)
            btn6.pack(side="left", padx=5)
            btn7.pack(side="left", padx=5)
            btn8.pack(side="left", padx=5)
            btn9.pack(side="left", padx=5)
            btn10.pack(side="left", padx=5)

    #information about the IPaddress
    
        try:
            output = subprocess.check_output(
                ["ipconfig"],
                stderr=subprocess.STDOUT,
                universal_newlines=True
            )
            resultJSON.config(text=f"JSON: {output}")
        except subprocess.CalledProcessError:
            resultJSON.config(text=f"JSON: {output}")
   
    def postgresql(self):
        self.clear_main()
        ttk.Label(self.main_area, text="PostgreSQL",
                  style="Title.TLabel").pack(pady=20)
        ttk.Label(self.main_area, text="¿Qué es PostgreSQL?",
                  style="Title.TLabel").pack(pady=20)
        link = ttk.Label(self.main_area,cursor="hand2", image=self.img, compound="left", text="Ir a la pagina de PostgreSQL",
                  style="Title.TLabel")
        link.pack(pady=20)
        link.bind("<Button-1>", lambda e: webbrowser.open("https://www.postgresql.org/"))  
        
        

            # ------------------ PANEL PING ------------------
   
    def show_port_panel(self):
        self.clear_main()
         
        try:
            output = subprocess.check_output(
                ["nmap", "-sV", "-p", "80", "localhost"],
                stderr=subprocess.STDOUT,
                universal_newlines=True
            )
            resultJSON.config(text=f"JSON: {output}")
        except subprocess.CalledProcessError:
            resultJSON.config(text=f"JSON: {output}")

        ttk.Label(self.main_area, text="Escanear Puerto",
                  style="Title.TLabel").pack(pady=20)

        host_entry = ttk.Entry(self.main_area)
        host_entry.pack(pady=5)
        host_entry.insert(0, "127.0.0.1")

        port_entry = ttk.Entry(self.main_area)
        port_entry.pack(pady=5)
        port_entry.insert(0, "80")

        result_label = ttk.Label(self.main_area, text="")
        resultJSON = ttk.Label(self.main_area, text="")
        resultJSON.pack(pady=10)
        result_label.pack(pady=10)

        def scan():
            host = host_entry.get()
            port = int(port_entry.get())

            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(1)

            result = s.connect_ex((host, port))

            if result == 0:
                result_label.config(text=f"Puerto {port} abierto ✅")
                resultJSON.config(text=f"JSON: {result}")
            else:
                result_label.config(text=f"Puerto {port} cerrado ❌")
                resultJSON.config(text=f"JSON: {result}")
            s.close()

        ttk.Button(self.main_area, text="Escanear",
                   command=scan).pack(pady=10)

    def show_ping_panel(self):
        self.clear_main()

        ttk.Label(self.main_area, text="Ping Host",
                  style="Title.TLabel").pack(pady=20)

        entry = ttk.Entry(self.main_area, width=30)
        entry.pack(pady=10)

        result_label = ttk.Label(self.main_area, text="")
        result_label.pack(pady=10)

        resultJSON = ttk.Label(self.main_area, text="")
        resultJSON.pack(pady=10)

        def ping():
            host = entry.get()
            try:
                output = subprocess.check_output(
                    ["ping", "-n", "1", host],
                    stderr=subprocess.STDOUT,
                    universal_newlines=True
                )
                result_label.config(text="Host activo ✅")
                resultJSON.config(text=f"JSON: {output}")
            except subprocess.CalledProcessError:
                result_label.config(text="No responde ❌")
                resultJSON.config(text=f"JSON: {output}")

        ttk.Button(self.main_area, text="Ejecutar Ping",
                   command=ping).pack(pady=10)

    # ------------------ PANEL PUERTO ------------------

    def show_port_panel(self):
        self.clear_main()

        ttk.Label(self.main_area, text="Escanear Puerto",
                  style="Title.TLabel").pack(pady=20)

        host_entry = ttk.Entry(self.main_area)
        host_entry.pack(pady=5)
        host_entry.insert(0, "127.0.0.1")

        port_entry = ttk.Entry(self.main_area)
        port_entry.pack(pady=5)
        port_entry.insert(0, "80")

        result_label = ttk.Label(self.main_area, text="")
        result_label.pack(pady=10)

        def scan():
            host = host_entry.get()
            port = int(port_entry.get())

            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(1)

            result = s.connect_ex((host, port))

            if result == 0:
                result_label.config(text=f"Puerto {port} abierto ✅")
            else:
                result_label.config(text=f"Puerto {port} cerrado ❌")

            s.close()

        ttk.Button(self.main_area, text="Escanear",
                   command=scan).pack(pady=10)


if __name__ == "__main__":
    app = NetworkApp()
    app.mainloop()
