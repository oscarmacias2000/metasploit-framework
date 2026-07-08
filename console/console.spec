# console.spec
# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['console/console.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('core', 'core'),  # Incluir la carpeta core
        ('data', 'data'),  # Incluir carpeta data
    ],
    hiddenimports=[
        'prompt_toolkit',
        'prompt_toolkit.history',
        'prompt_toolkit.auto_suggest',
        'prompt_toolkit.completion',
        'prompt_toolkit.styles',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='msfconsole',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,  # True para consola, False para GUI
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='msf.ico',  # Opcional: icono personalizado
)