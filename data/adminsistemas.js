const adminsistemasData = [
  {
    tema: "Bloque 1: Paradigmas Cloud y Conceptos Base",
    question: "En la gestión moderna de TI, ¿qué persigue exactamente el objetivo o regla '90-8-2'?",
    options: [
      "Que el 90% del tiempo se dedique a desarrollo, 8% a pruebas y 2% a despliegue.",
      "Que los usuarios resuelvan el 90% de incidencias (autoservicio/Knowledge Base), el 8% el soporte Nivel 2, y solo el 2% llegue al administrador (Nivel 3).",
      "Que el 90% de la infraestructura esté en la nube, 8% on-premise y 2% en backup.",
      "Que el 90% de los scripts sean en Bash, 8% en PowerShell y 2% en Python."
    ],
    answer: "Que los usuarios resuelvan el 90% de incidencias (autoservicio/Knowledge Base), el 8% el soporte Nivel 2, y solo el 2% llegue al administrador (Nivel 3).",
    comment: "El profesor señala que este objetivo hay que entenderlo como una base importante de la comunicación en los equipos para que el usuario sea autosuficiente."
  },
  {
    tema: "Bloque 1: Paradigmas Cloud y Conceptos Base",
    question: "¿Cuál es la diferencia principal en el paradigma de 'Mascotas vs. Ganado' (Pets vs. Cattle)?",
    options: [
      "Las mascotas son servidores Windows y el ganado son servidores Linux.",
      "Las mascotas son más baratas de mantener que el ganado.",
      "Las mascotas se reparan y cuidan individualmente con nombres propios; el ganado si falla se reemplaza y elimina de forma automatizada.",
      "El ganado requiere atención manual constante mientras que las mascotas se autogestionan."
    ],
    answer: "Las mascotas se reparan y cuidan individualmente con nombres propios; el ganado si falla se reemplaza y elimina de forma automatizada.",
    comment: "En la nube, las instancias no son únicas, no se 'curan' si fallan, sino que se eliminan y se levanta una nueva automáticamente."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "¿Cuáles son los dos componentes fundamentales que definen una 'Distribución' de Linux?",
    options: [
      "El entorno gráfico y el navegador web.",
      "El sistema de archivos y el antivirus.",
      "El núcleo (Kernel) y una colección de paquetes o aplicaciones.",
      "La consola de comandos y el gestor de arranque."
    ],
    answer: "El núcleo (Kernel) y una colección de paquetes o aplicaciones.",
    comment: "Una distro es un paquete formado por el kernel y aplicaciones/funcionalidades específicas."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "Dentro de Linux, ¿qué son las utilidades GNU?",
    options: [
      "Son los juegos instalados por defecto.",
      "Es el framework de herramientas en línea de comandos que permite administrar el servidor (ficheros, información del sistema, etc.).",
      "Son las herramientas exclusivas para compilar código fuente.",
      "Son los drivers propietarios del hardware."
    ],
    answer: "Es el framework de herramientas en línea de comandos que permite administrar el servidor (ficheros, información del sistema, etc.).",
    comment: "Es un punto marcado como importante para entender con qué interactuamos al administrar servidores."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "Según la teoría vista en clase, ¿cuál es la definición técnica de una Shell?",
    options: [
      "Un editor de texto gráfico avanzado.",
      "Un programa antivirus integrado en el kernel.",
      "El sistema de ventanas de Ubuntu.",
      "Un componente intermedio entre el usuario y el kernel, que actúa como macroprocesador e intérprete de comandos."
    ],
    answer: "Un componente intermedio entre el usuario y el kernel, que actúa como macroprocesador e intérprete de comandos.",
    comment: "Hay que saber lo que es una shell y que se encuentra entre medias del usuario y el kernel."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "Para la edición del archivo /etc/sudoers de forma segura, ¿qué comando específico se debe utilizar?",
    options: [
      "nano /etc/sudoers",
      "visudo",
      "edit sudo",
      "vim sudoers"
    ],
    answer: "visudo",
    comment: "Concepto clave de administración de usuarios. visudo bloquea el archivo y verifica la sintaxis antes de guardar."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "En los scripts de Bash, ¿para qué sirve la herramienta o estructura Heredocs (<<)?",
    options: [
      "Para comprimir múltiples archivos en un .zip.",
      "Para descargar documentación de internet.",
      "Para insertar bloques de texto multilínea en ficheros o salidas, respetando espacios y saltos de línea.",
      "Para ejecutar procesos en segundo plano."
    ],
    answer: "Para insertar bloques de texto multilínea en ficheros o salidas, respetando espacios y saltos de línea.",
    comment: "Comando calificado como 'super importante'. Se usa para inyectar bloques de configuración completos en archivos."
  },
  {
    tema: "Bloque 2: Ecosistema Linux y Bash",
    question: "En el campo 'User Data' al desplegar una instancia en AWS, ¿qué dos lenguajes/formatos principales se pueden usar para automatizar la configuración inicial?",
    options: [
      "HTML y CSS.",
      "C++ y Java.",
      "Scripts de Bash puro o directivas de Cloud-init.",
      "Scripts de PowerShell y código SQL."
    ],
    answer: "Scripts de Bash puro o directivas de Cloud-init.",
    comment: "Hay que saber que se puede utilizar Cloud-init o un Script bash para configurar la instancia durante el arranque."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "Si hacemos un ls -l y los permisos de un archivo se muestran como rwx r-x --- (750 en octal), ¿qué significa?",
    options: [
      "Todo el mundo tiene acceso total.",
      "El usuario tiene control total, el grupo lectura/ejecución, y el resto no tiene permisos.",
      "Solo el usuario dueño puede leerlo.",
      "El archivo está bloqueado por el sistema."
    ],
    answer: "El usuario tiene control total, el grupo lectura/ejecución, y el resto no tiene permisos.",
    comment: "El sistema de permisos hay que conocerlo porque es fundamental. El primer trío es usuario, el segundo grupo y el tercero el resto."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "¿Cuál es la diferencia fundamental entre un enlace simbólico y un enlace fuerte en Linux?",
    options: [
      "El fuerte usa más memoria RAM.",
      "Si borras el archivo original, el enlace simbólico se rompe, pero el fuerte sigue manteniendo los datos porque apunta directamente al inodo.",
      "El simbólico solo funciona en redes, el fuerte en local.",
      "No hay diferencia, son sinónimos."
    ],
    answer: "Si borras el archivo original, el enlace simbólico se rompe, pero el fuerte sigue manteniendo los datos porque apunta directamente al inodo.",
    comment: "El simbólico es como un acceso directo de Windows; el fuerte mantiene el contenido aunque se elimine la referencia original."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "Si queremos terminar un proceso en Linux de forma forzada y abrupta ('sí o sí'), ¿qué señal debemos enviarle mediante el comando kill?",
    options: [
      "-15 (SIGTERM)",
      "-1 (SIGHUP)",
      "-9 (SIGKILL)",
      "-0 (SIGZERO)"
    ],
    answer: "-9 (SIGKILL)",
    comment: "La -9 es la más brusca (desaparece), la -15 es 'educada' y la -1 es para recargar configuración."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "¿Qué información en tiempo real se aloja en el directorio virtual /proc?",
    options: [
      "Las copias de seguridad de las bases de datos.",
      "Los logs de errores de Apache.",
      "Información del hardware, estado del sistema operativo y procesos en ejecución.",
      "Los correos electrónicos de los usuarios."
    ],
    answer: "Información del hardware, estado del sistema operativo y procesos en ejecución.",
    comment: "Es un directorio especial del sistema de archivo de procesos con información sobre el SO en vivo."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "De las siguientes herramientas de sistema, ¿cuál se utiliza para ver el consumo de CPU y memoria de los procesos ordenados dinámicamente?",
    options: [
      "df",
      "top",
      "uptime",
      "vmstat"
    ],
    answer: "top",
    comment: "top muestra procesos y CPU, uptime el tiempo de sesión, df el espacio en disco."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "¿Cuál es la diferencia de uso entre las herramientas de programación at y cron?",
    options: [
      "at se usa para comandos gráficos, cron para consola.",
      "at es para programar tareas una sola vez en el futuro, cron es para tareas recurrentes (periódicas).",
      "at requiere permisos root, cron no.",
      "No hay diferencia, hacen exactamente lo mismo."
    ],
    answer: "at es para programar tareas una sola vez en el futuro, cron es para tareas recurrentes (periódicas).",
    comment: "at es de un solo uso; cron es infinito y recurrente."
  },
  {
    tema: "Bloque 3: Administración y Procesos en Linux",
    question: "¿Cuál es el orden correcto de los cinco dígitos de programación en la sintaxis de un Crontab?",
    options: [
      "Hora, Minuto, Segundo, Día, Mes.",
      "Día de la semana, Mes, Día del mes, Hora, Minuto.",
      "Minuto, Hora, Día del mes, Mes, Día de la semana.",
      "Año, Mes, Día, Hora, Minuto."
    ],
    answer: "Minuto, Hora, Día del mes, Mes, Día de la semana.",
    comment: "El truco es recordarlo de más pequeño a más grande (minuto -> hora -> día -> mes), terminando siempre con el día de la semana."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "En Windows Server, ¿qué modos de ejecución e instalación existen que debemos conocer?",
    options: [
      "Modo Fácil, Medio y Difícil.",
      "Modo Escritorio (con GUI), Modo Core y Modo Nano.",
      "Modo Desarrollo, Producción y Testing.",
      "Modo Gráfico y Modo MS-DOS."
    ],
    answer: "Modo Escritorio (con GUI), Modo Core y Modo Nano.",
    comment: "Hay que saber los modos de ejecución: qué es el modo escritorio, el modo core y el modo nano."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "¿Qué protocolos principales utiliza el Directorio Activo (Active Directory) para su funcionamiento y autenticación?",
    options: [
      "HTTP y FTP.",
      "DNS y Kerberos.",
      "SSH y Telnet.",
      "SMTP y POP3."
    ],
    answer: "DNS y Kerberos.",
    comment: "Hay que saber qué es el Directorio Activo, qué elementos tiene y qué protocolos utiliza: DNS y Kerberos."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "A diferencia de Bash (que trata con texto y flujos de caracteres), ¿sobre qué framework está basado PowerShell y con qué tipo de elementos trabaja en las tuberías?",
    options: [
      "Basado en Java, trabaja con Applets.",
      "Basado en C++, trabaja con punteros de memoria.",
      "Basado en .NET, trabaja pasando 'Objetos' completos (con propiedades y métodos).",
      "Basado en Python, trabaja con Diccionarios."
    ],
    answer: "Basado en .NET, trabaja pasando 'Objetos' completos (con propiedades y métodos).",
    comment: "PowerShell está basado en .NET, lo que significa que trabaja con objetos."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "Si deseas asegurarte de que en tu servidor de Windows solo se puedan ejecutar scripts de PowerShell que tengan una firma digital válida, ¿qué Política de Ejecución (Execution Policy) debes configurar?",
    options: [
      "Restricted",
      "Unrestricted",
      "AllSigned",
      "RemoteSigned"
    ],
    answer: "AllSigned",
    comment: "Existen 4 modos, de más a menos restrictivo. AllSigned exige firma para todos los scripts, RemoteSigned solo para los descargados."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "En PowerShell, ¿para qué sirve el concepto de 'Dot Sourcing' (ejecutar un script precedido de un punto . )?",
    options: [
      "Para ocultar el código fuente del script.",
      "Para ejecutar el script dentro del ámbito local de la sesión, en lugar de crear un sub-ámbito, manteniendo vivas sus variables y funciones al terminar.",
      "Para ejecutar el script como Administrador.",
      "Para compilar el script en un archivo .exe."
    ],
    answer: "Para ejecutar el script dentro del ámbito local de la sesión, en lugar de crear un sub-ámbito, manteniendo vivas sus variables y funciones al terminar.",
    comment: "El ámbito de los scripts: el dotsourcing hace que lo que se cree se añada a la sesión de trabajo actual."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "Al configurar scripts que utilicen credenciales en PowerShell, ¿por qué es crítico utilizar el CMDLet ConvertTo-SecureString?",
    options: [
      "Porque comprime la contraseña para ahorrar espacio.",
      "Porque cifra la contraseña en un objeto seguro, evitando que se lea en texto plano o salte en auditorías de código (ej. GitHub).",
      "Porque traduce la contraseña a otro idioma.",
      "Porque permite saltarse el doble factor de autenticación."
    ],
    answer: "Porque cifra la contraseña en un objeto seguro, evitando que se lea en texto plano o salte en auditorías de código (ej. GitHub).",
    comment: "En general no se utiliza un stream normal para contraseñas, sino que se securiza para evitar bloqueos por secrets expuestos."
  },
  {
    tema: "Bloque 4: Windows, Directorio Activo y PowerShell",
    question: "¿Cuál es la función principal de crear 'Jobs' (ej: Start-Job) en PowerShell?",
    options: [
      "Actualizar el sistema operativo en segundo plano.",
      "Crear tareas visuales en el Escritorio.",
      "Ejecutar un bloque de código o proceso en segundo plano (background) mientras el script principal continúa o espera (Wait-Job).",
      "Instalar el Directorio Activo automáticamente."
    ],
    answer: "Ejecutar un bloque de código o proceso en segundo plano (background) mientras el script principal continúa o espera (Wait-Job).",
    comment: "Cuando se arranca un proceso en background, se ejecuta y si se pone Wait-Job, el script se para esperando a que termine."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "¿A qué tipo de objetos dentro del Directorio Activo se aplican las Directivas de Grupo (GPO)?",
    options: [
      "Solo a impresoras y escáneres.",
      "A usuarios y equipos informáticos (servidores/estaciones).",
      "A las bases de datos de la nube pública.",
      "A los switches y routers físicos exclusivamente."
    ],
    answer: "A usuarios y equipos informáticos (servidores/estaciones).",
    comment: "Las GPO aplican a un grupo de objetos conectados al directorio activo, fundamentalmente usuarios y equipos."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "Dentro de la configuración de un elemento individual en una Directiva de Grupo, ¿cuáles son los tres estados posibles ('triestado')?",
    options: [
      "Público, Privado y Oculto.",
      "Lectura, Escritura y Ejecución.",
      "Habilitado (Enabled), Deshabilitado (Disabled) o No Configurado (Not Configured).",
      "Activo, Pausado y Destruido."
    ],
    answer: "Habilitado (Enabled), Deshabilitado (Disabled) o No Configurado (Not Configured).",
    comment: "Hay que saber el triestado: que puede estar habilitado un ítem en concreto, deshabilitado o simplemente no configurado."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "En una arquitectura de Directorio Activo, las GPOs se aplican en el orden LSDU. Si hay contradicciones entre ellas, ¿cuál tiene la prioridad final (la que prevalece)?",
    options: [
      "Las directivas Locales (Local).",
      "Las directivas de Sitio (Site).",
      "Las directivas de Dominio (Domain).",
      "Las directivas de Unidad Organizativa (OU)."
    ],
    answer: "Las directivas de Unidad Organizativa (OU).",
    comment: "Los niveles de prioridad de procesamiento son LSDU. Si existen contradicciones, prevalece la última, que es la de la unidad organizativa."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "Si un administrador quiere abrir una sesión interactiva en PowerShell contra un servidor remoto (similar a cómo funcionaría SSH), ¿qué CMDLet debe utilizar?",
    options: [
      "Connect-RemoteServer",
      "Enter-PSSession",
      "Start-RemoteDesktop",
      "Invoke-Terminal"
    ],
    answer: "Enter-PSSession",
    comment: "En la PowerShell remota se diferencia entre mandar un comando suelto (ComputerName) o abrir una sesión interactiva con Enter-PSSession."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "Entre las herramientas del sistema de Windows, ¿para qué sirve la herramienta de Sysinternals llamada BGInfo?",
    options: [
      "Para monitorizar el consumo de la tarjeta gráfica.",
      "Para poner en el fondo de escritorio la información crítica del sistema (IP, Dominio, Hostname) y facilitar la administración remota por RDP.",
      "Para ver las conexiones TCP abiertas.",
      "Para programar copias de seguridad a medianoche."
    ],
    answer: "Para poner en el fondo de escritorio la información crítica del sistema (IP, Dominio, Hostname) y facilitar la administración remota por RDP.",
    comment: "BGInfo sirve para poner en el fondo de escritorio los datos de IP y DNS del servidor."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "¿Cuál es la diferencia entre actualizar una aplicación mediante un 'Despliegue basado en Instancias' frente a un 'Despliegue basado en Imágenes'?",
    options: [
      "En instancias se cambian los discos duros físicos; en imágenes se cambian los monitores.",
      "En instancias se cambia el script de inicio de la máquina existente (User Data); en imágenes se crea una plantilla nueva desde cero con la aplicación ya instalada.",
      "Las instancias solo se usan en AWS, las imágenes solo en Azure.",
      "No hay diferencia, ambos procesos requieren apagar el centro de datos completo."
    ],
    answer: "En instancias se cambia el script de inicio de la máquina existente (User Data); en imágenes se crea una plantilla nueva desde cero con la aplicación ya instalada.",
    comment: "Basado en instancias modifica el script para descargar la nueva versión. Basado en imágenes arranca una máquina, configura todo y crea un snapshot maestro inmutable para desplegar."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "El concepto de 'Inmutabilidad de la aplicación' en entornos de servidores en la nube (Servidores Ganado) significa que:",
    options: [
      "La aplicación no puede ser borrada nunca.",
      "Cada vez que se despliega una nueva versión, el servidor no se parchea, sino que se reemplaza por uno nuevo con estado conocido, evitando la 'deriva de la configuración'.",
      "Las contraseñas de los usuarios no pueden ser modificadas.",
      "Las máquinas virtuales no pueden cambiar de zona de disponibilidad."
    ],
    answer: "Cada vez que se despliega una nueva versión, el servidor no se parchea, sino que se reemplaza por uno nuevo con estado conocido, evitando la 'deriva de la configuración'.",
    comment: "Usar servidores en modo ganado en vez de mascota evita la deriva de configuración (configuration drift)."
  },
  {
    tema: "Bloque 5: Directivas de Grupo (GPO) y Despliegue en Cloud",
    question: "Al crear una imagen maestra en Windows para la nube, se ejecuta la herramienta Sysprep. ¿Por qué es fundamental usar el parámetro /generalize en este proceso?",
    options: [
      "Para borrar todos los programas instalados y dejarlo de fábrica.",
      "Para generar aleatoriamente identificadores únicos (como el nombre del equipo y el SID) y evitar colisiones de red al clonar la imagen múltiples veces.",
      "Para subir la imagen a internet de forma pública y general.",
      "Para instalar automáticamente Microsoft Office."
    ],
    answer: "Para generar aleatoriamente identificadores únicos (como el nombre del equipo y el SID) y evitar colisiones de red al clonar la imagen múltiples veces.",
    comment: "El /generalize generaliza los parámetros o IDs que tienen que ser diferentes para que no haya colisiones en la red."
  }
];
