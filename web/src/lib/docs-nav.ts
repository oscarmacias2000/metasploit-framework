export type DocNavItem = {
  title: string;
  slug?: string[];
  children?: DocNavItem[];
};

// Arbol de navegacion de /docs, calcado de la estructura de md/console.md.
export const DOCS_NAV: DocNavItem[] = [
  {
    title: 'Metasploit',
    slug: ['metasploit'],
    children: [
      {
        title: 'Módulos',
        children: [
          { title: 'aux — Auxiliares', slug: ['metasploit', 'modulos', 'aux'] },
          { title: 'post — Post-explotación', slug: ['metasploit', 'modulos', 'post'] },
          { title: 'payloads', slug: ['metasploit', 'modulos', 'payloads'] },
          { title: 'console', slug: ['metasploit', 'modulos', 'console'] },
          { title: 'exploits', slug: ['metasploit', 'modulos', 'exploits'] },
          { title: 'scanners', slug: ['metasploit', 'modulos', 'scanners'] },
          { title: 'injection', slug: ['metasploit', 'modulos', 'injection'] },
          { title: 'network', slug: ['metasploit', 'modulos', 'network'] },
        ],
      },
      { title: 'Alcance (targets)', slug: ['metasploit', 'alcance'] },
      { title: 'Vectores soportados', slug: ['metasploit', 'vectores'] },
      { title: 'Instalación', slug: ['metasploit', 'instalacion'] },
      { title: 'Uso rápido', slug: ['metasploit', 'uso-rapido'] },
      { title: 'Estructura del proyecto', slug: ['metasploit', 'estructura'] },
      { title: 'Contribuir', slug: ['metasploit', 'contribuir'] },
      { title: 'Licencia', slug: ['metasploit', 'licencia'] },
    ],
  },
  {
    title: 'Desarrollo',
    children: [
      {
        title: 'Primeros pasos',
        children: [
          { title: 'Consejos de estilo', slug: ['desarrollo', 'primeros-pasos', 'consejos-de-estilo'] },
          { title: 'Cómo empezar a escribir un exploit', slug: ['desarrollo', 'primeros-pasos', 'escribir-un-exploit'] },
          { title: 'Cómo empezar a escribir un módulo auxiliar', slug: ['desarrollo', 'primeros-pasos', 'escribir-un-modulo-auxiliar'] },
          { title: 'Cómo empezar a escribir un módulo de post-explotación', slug: ['desarrollo', 'primeros-pasos', 'escribir-un-modulo-post'] },
          { title: 'Cómo empezar a escribir un script de Meterpreter', slug: ['desarrollo', 'primeros-pasos', 'escribir-un-script-de-meterpreter'] },
          { title: 'Cómo escribir un check', slug: ['desarrollo', 'primeros-pasos', 'escribir-un-check'] },
        ],
      },
      {
        title: 'Calidad y metadatos',
        children: [
          { title: 'Ejecución de módulos privados', slug: ['desarrollo', 'calidad', 'modulos-privados'] },
          { title: 'Clasificación de exploits', slug: ['desarrollo', 'calidad', 'clasificacion-de-exploits'] },
          { title: 'Identificadores de referencia del módulo', slug: ['desarrollo', 'calidad', 'identificadores-de-referencia'] },
          { title: 'Niveles de parches de Microsoft', slug: ['desarrollo', 'calidad', 'niveles-de-parches-microsoft'] },
          { title: 'Cómo descontinuar un módulo', slug: ['desarrollo', 'calidad', 'descontinuar-un-modulo'] },
          { title: 'Fiabilidad, efectos secundarios y estabilidad', slug: ['desarrollo', 'calidad', 'fiabilidad-efectos-secundarios-estabilidad'] },
        ],
      },
      {
        title: 'HTTP',
        children: [
          { title: 'Cómo analizar una respuesta HTTP', slug: ['desarrollo', 'http', 'analizar-respuesta-http'] },
          { title: 'Enviar una solicitud con HTTPClient', slug: ['desarrollo', 'http', 'httpclient'] },
          { title: 'Enviar una solicitud con Rex Proto HTTP Client', slug: ['desarrollo', 'http', 'rex-proto-http-client'] },
          { title: 'Cómo escribir un módulo HTTP LoginScanner', slug: ['desarrollo', 'http', 'login-scanner'] },
          { title: 'Módulo con HttpServer y HttpClient', slug: ['desarrollo', 'http', 'httpserver-httpclient'] },
          { title: 'Exploit de navegador con BrowserExploitServer', slug: ['desarrollo', 'http', 'browser-exploit-server'] },
          { title: 'Exploit de navegador con HttpServer', slug: ['desarrollo', 'http', 'httpserver-exploit'] },
        ],
      },
      {
        title: 'Mixins de exploit',
        children: [
          { title: 'Mixin FILEFORMAT', slug: ['desarrollo', 'mixins', 'fileformat'] },
          { title: 'Mixin Msf::Exploit::Remote::Tcp', slug: ['desarrollo', 'mixins', 'remote-tcp'] },
          { title: 'Mixin Seh', slug: ['desarrollo', 'mixins', 'seh'] },
          { title: 'PowerShell en un exploit', slug: ['desarrollo', 'mixins', 'powershell-en-exploit'] },
          { title: 'Railgun para Windows post-explotación', slug: ['desarrollo', 'mixins', 'railgun'] },
          { title: 'WbemExec para privilegios de escritura', slug: ['desarrollo', 'mixins', 'wbemexec'] },
          { title: 'PhpEXE para carga de archivos', slug: ['desarrollo', 'mixins', 'phpexe'] },
          { title: 'Inyección ReflectiveDll', slug: ['desarrollo', 'mixins', 'reflective-dll-injection'] },
          { title: 'Uso de Oracle', slug: ['desarrollo', 'mixins', 'oracle'] },
          { title: 'Msf Auxiliary AuthBrute', slug: ['desarrollo', 'mixins', 'authbrute'] },
        ],
      },
      {
        title: 'Utilidades y compilador',
        children: [
          { title: 'Comprimir con Msf::Util::EXE.to_zip', slug: ['desarrollo', 'utilidades', 'comprimir-con-msf-util-exe'] },
          { title: 'Compilador C para Windows', slug: ['desarrollo', 'utilidades', 'compilador-c-windows'] },
          { title: 'CRandomizer de ofuscación', slug: ['desarrollo', 'utilidades', 'crandomizer'] },
          { title: 'Descifrar RC4', slug: ['desarrollo', 'utilidades', 'rc4'] },
          { title: 'Decodificar Base64', slug: ['desarrollo', 'utilidades', 'base64'] },
          { title: 'Operación XOR', slug: ['desarrollo', 'utilidades', 'xor'] },
          { title: 'Ofuscar JavaScript', slug: ['desarrollo', 'utilidades', 'ofuscar-javascript'] },
        ],
      },
      {
        title: 'Datos y ciclo de vida',
        children: [
          { title: 'Cómo usar los comandos stagers', slug: ['desarrollo', 'datos', 'comandos-stagers'] },
          { title: 'Opciones de almacenamiento de datos', slug: ['desarrollo', 'datos', 'opciones-de-datastore'] },
          { title: 'Generar informes o almacenar datos', slug: ['desarrollo', 'datos', 'reportar-y-almacenar-datos'] },
          { title: 'Cómo iniciar sesión en Metasploit', slug: ['desarrollo', 'datos', 'logging'] },
          { title: 'Limpieza post-ejecución del módulo', slug: ['desarrollo', 'datos', 'limpieza-post-ejecucion'] },
        ],
      },
    ],
  },
];
