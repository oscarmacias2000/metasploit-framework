import typer
import socket
import subprocess

app = typer.Typer(help="Herramienta CLI para manejo básico de red")


# ---------------- IP ----------------

@app.command()
def ip():
    """
    Muestra la IP local del equipo.
    """
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)

    typer.echo(f"\nHostname: {hostname}")
    typer.echo(f"IP Local: {local_ip}\n")


# ---------------- PING ----------------

@app.command()
def ping(host: str):
    """
    Hace ping a un host.
    """
    typer.echo(f"\nHaciendo ping a {host}...\n")

    try:
        subprocess.check_output(
            ["ping", "-n", "1", host],
            stderr=subprocess.STDOUT
        )
        typer.secho("Host activo ✅", fg=typer.colors.GREEN)

    except subprocess.CalledProcessError:
        typer.secho("No responde ❌", fg=typer.colors.RED)


# ---------------- ESCANEAR PUERTO ----------------

@app.command()
def scan(host: str, port: int):
    """
    Escanea un puerto específico.
    """
    typer.echo(f"\nEscaneando {host}:{port}...\n")

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)

    result = s.connect_ex((host, port))

    if result == 0:
        typer.secho(f"Puerto {port} abierto ✅", fg=typer.colors.GREEN)
    else:
        typer.secho(f"Puerto {port} cerrado ❌", fg=typer.colors.RED)

    s.close()


if __name__ == "__main__":
    app()
