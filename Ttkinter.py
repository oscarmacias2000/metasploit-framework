import tkinter as tk
from tkinter import ttk
import subprocess
import socket


class NetworkApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Network Control Panel")
        self.geometry("800x500")
        self.configure(bg="#1e1e2f")
        self.resizable(False, False)
        self.create_styles()
        self.create_layout()
        listbox = tk.Listbox(self.main_area)
        listbox.insert(tk.END, *(f"Elemento {i}" for i in range(100)))
     


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

        ttk.Button(self.sidebar, text="Información IP",
                   command=self.show_ip_panel).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="Ping Host",
                   command=self.show_ping_panel).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="Escanear Puerto",
                   command=self.show_port_panel).pack(fill="x", padx=20, pady=10)

        self.current_panel = None
     
        ttk.Button(self.sidebar, text="modules", command=self.show_modules_panel).pack(fill="x", padx=20, pady=10)

        ttk.Button(self.sidebar, text="payloads", command=self.show_payloads_panel).pack(fill="x", padx=20, pady=10)
   
       #settings buttons
        ttk.Button(self.sidebar, text="settings", command=self.show_settings_panel).pack(fill="x", padx=20, pady=10)
        ttk.Button(self.sidebar, text="exit", command=self.destroy).pack(fill="x", padx=20, pady=10)

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
   
        ttk.Label(self.main_area, text="Información de settings/metasploit",
                  style="Title.TLabel").pack(pady=10)
        
        #settings buttons
        ttk.Button(self.main_area, text="settings", command=self.show_settings_panel).pack(fill="x", padx=10, pady=10)
        ttk.Button(self.main_area, text="exit", command=self.destroy).pack(fill="x", padx=10, pady=10)

        #list settings
        ttk.Label(self.main_area, text="settings",
                  style="Title.TLabel").pack(pady=20, padx=50)
      
        ttk.Checkbutton(self.main_area, text="modules/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="payloads/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="auxiliary/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="exploit/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="post/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="scanner/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="encoder/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="nops/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="all/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="http/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="ftp/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="ssh/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="smb/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="ftp/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="ssh/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)
        ttk.Checkbutton(self.main_area, text="smb/metasploit", command=self.show_settings_panel).pack(fill="x", padx=110, pady=5)   
      

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
