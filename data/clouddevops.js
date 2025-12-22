// Cloud Computing, DevOps y Cultura DevOps - 30 preguntas

const clouddevopsQuestions = [
    // Tema 1: Introducción a DevOps y Conceptos Básicos (5 preguntas)
    {
        tema: "Tema 1: Introducción a DevOps y Conceptos Básicos",
        question: "Según la definición dada en clase, ¿qué es fundamentalmente DevOps?",
        options: [
            "Es un rol específico (DevOps Engineer) que fusiona responsabilidades de Dev y Ops en una sola persona",
            "Es un conjunto de herramientas (Jenkins, Docker, Kubernetes) para automatizar el ciclo de vida del software",
            "Es un cambio de mentalidad y cultura que afecta a toda la organización, no solo a herramientas",
            "Es una certificación profesional requerida para trabajar en empresas tecnológicas modernas"
        ],
        answer: "Es un cambio de mentalidad y cultura que afecta a toda la organización, no solo a herramientas",
        comment: "Tema 1: Introducción a DevOps y Conceptos Básicos - DevOps no es solo tecnología o herramientas; es un cambio cultural y de mentalidad que debe involucrar a desarrollo, operaciones, calidad y negocio para maximizar la eficiencia y agilidad."
    },
    {
        tema: "Tema 1: Introducción a DevOps y Conceptos Básicos",
        question: "¿Cuál de los siguientes es un principio clave (\"automate first\") mencionado por el profesor?",
        options: [
            "Automatizar solo tareas que se repitan más de 10 veces para justificar el esfuerzo inicial",
            "Siempre es mejor automatizar, incluso si es un script para una tarea que parece única, para dejar el proceso documentado",
            "Priorizar la automatización de pruebas sobre la automatización de despliegues",
            "Delegar la automatización al equipo de QA mientras Dev se enfoca en features"
        ],
        answer: "Siempre es mejor automatizar, incluso si es un script para una tarea que parece única, para dejar el proceso documentado",
        comment: "Tema 1: Introducción a DevOps y Conceptos Básicos - El principio es automatizar siempre. Incluso si crees que lo harás una vez, hacerlo con un script es mejor porque garantiza que el proceso queda documentado y es repetible."
    },
    {
        tema: "Tema 1: Introducción a DevOps y Conceptos Básicos",
        question: "En el ciclo infinito de DevOps, ¿dónde debería comenzar idealmente un proyecto nuevo?",
        options: [
            "En la fase de \"Build\" (Construcción) para validar la arquitectura técnica",
            "En la fase de \"Monitor\" (Monitorización) estableciendo métricas base antes de desarrollar",
            "En la fase de \"Plan\" (Planificación), aunque sea un plan ágil y pequeño",
            "En la fase de \"Release\" (Liberación) configurando pipelines de CI/CD primero"
        ],
        answer: "En la fase de \"Plan\" (Planificación), aunque sea un plan ágil y pequeño",
        comment: "Tema 1: Introducción a DevOps y Conceptos Básicos - Aunque es un ciclo continuo, si un proyecto empieza desde cero, lo lógico es comenzar con una planificación (Plan), aunque sea un plan mínimo viable o historias de usuario ágiles, antes de codificar."
    },
    {
        tema: "Tema 1: Introducción a DevOps y Conceptos Básicos",
        question: "¿Cuál de los siguientes es un \"Mito de DevOps\" que se desmintió en clase?",
        options: [
            "DevOps requiere colaboración estrecha entre equipos de desarrollo y operaciones",
            "DevOps solo sirve para organizaciones nacidas en la web (startups)",
            "DevOps busca automatizar procesos repetitivos para reducir errores humanos",
            "DevOps mide el éxito con métricas como MTTR y frecuencia de despliegue"
        ],
        answer: "DevOps solo sirve para organizaciones nacidas en la web (startups)",
        comment: "Tema 1: Introducción a DevOps y Conceptos Básicos - Es un mito creer que solo sirve para empresas web. DevOps se puede aplicar a organizaciones tradicionales, sistemas legacy y empresas grandes con infraestructuras complejas."
    },
    {
        tema: "Tema 1: Introducción a DevOps y Conceptos Básicos",
        question: "¿Por qué es fundamental la medición en DevOps según la explicación del profesor?",
        options: [
            "Para generar dashboards visualmente atractivos que impresionen a los stakeholders",
            "Porque las cosas que no se miden no se pueden mejorar; necesitas una línea base para saber si avanzas",
            "Para cumplir con requisitos de auditoría y certificaciones ISO obligatorias",
            "Para alimentar algoritmos de machine learning que predicen fallos futuros"
        ],
        answer: "Porque las cosas que no se miden no se pueden mejorar; necesitas una línea base para saber si avanzas",
        comment: "Tema 1: Introducción a DevOps y Conceptos Básicos - La medición es crítica (como pesarse antes de una dieta) porque si no mides el estado actual, no puedes saber si estás mejorando la calidad, el testing o la velocidad tras aplicar cambios."
    },

    // Tema 2: Cultura de la Colaboración (6 preguntas)
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "¿Qué métrica es útil para convencer a \"Negocio\" de invertir en deuda técnica y DevOps?",
        options: [
            "El número de líneas de código escritas por día",
            "El MTTR (Tiempo Medio de Restauración del Servicio) convertido a coste monetario por caída",
            "La cantidad de canales de Slack creados",
            "El número de reuniones diarias del equipo"
        ],
        answer: "El MTTR (Tiempo Medio de Restauración del Servicio) convertido a coste monetario por caída",
        comment: "Tema 2: Cultura de la Colaboración - Convertir métricas técnicas como el MTTR o el tiempo de caída a dinero (coste para la empresa) es la forma más efectiva de justificar la inversión ante la gerencia o producto."
    },
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "Para mejorar la colaboración y romper los \"silos\", ¿qué práctica de código se recomienda?",
        options: [
            "Cada desarrollador debe proteger su código con contraseña",
            "Propiedad colectiva del código (Share code ownership) donde los repositorios son internos y visibles para todos",
            "Solo los arquitectos senior pueden ver el código de otros equipos",
            "Usar repositorios privados para cada microservicio sin acceso externo"
        ],
        answer: "Propiedad colectiva del código (Share code ownership) donde los repositorios son internos y visibles para todos",
        comment: "Tema 2: Cultura de la Colaboración - Fomentar que todos los repositorios sean internos permite que cualquiera pueda ver el código, sugerir mejoras mediante Pull Requests y aumenta la calidad y la colaboración."
    },
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "¿Qué significa el concepto de \"No Blame\" (Sin culpas) en la cultura DevOps?",
        options: [
            "Que nunca hay responsables de los errores",
            "Que los errores se ignoran para no ofender a nadie",
            "Enfocarse en solucionar el problema y mejorar el proceso en lugar de buscar y señalar culpables",
            "Que el jefe siempre tiene la culpa"
        ],
        answer: "Enfocarse en solucionar el problema y mejorar el proceso en lugar de buscar y señalar culpables",
        comment: "Tema 2: Cultura de la Colaboración - Se debe recompensar el comportamiento positivo y evitar señalar culpables (pointing fingers). El objetivo es aprender del error y arreglarlo rápido, no castigar al individuo."
    },
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "¿Qué estrategia ayuda a que los desarrolladores adopten herramientas nuevas (como IA o seguridad)?",
        options: [
            "Obligarlos mediante contratos estrictos",
            "Hacer que sea más fácil y \"barato\" (en esfuerzo) usar la herramienta nueva que hacerlo a la antigua",
            "Bloquear el acceso a internet hasta que la usen",
            "Descontar sueldo a quien no la use"
        ],
        answer: "Hacer que sea más fácil y \"barato\" (en esfuerzo) usar la herramienta nueva que hacerlo a la antigua",
        comment: "Tema 2: Cultura de la Colaboración - Una táctica psicológica efectiva es hacer que adoptar la herramienta correcta sea el camino de menor resistencia. Si es fácil de usar, la gente se convierte en defensora de la herramienta."
    },
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "¿Cuál es una característica de un equipo \"cuello de botella\" que DevOps intenta eliminar?",
        options: [
            "Un equipo que entrega valor constantemente",
            "Un equipo donde Operaciones solo recibe peticiones y Desarrollo solo recibe quejas",
            "Un equipo multidisciplinar",
            "Un equipo que utiliza Kanban"
        ],
        answer: "Un equipo donde Operaciones solo recibe peticiones y Desarrollo solo recibe quejas",
        comment: "Tema 2: Cultura de la Colaboración - Se busca romper la dinámica donde un equipo es un cuello de botella y solo hay comunicación para pedir cosas o reportar fallos. La solución es el autoservicio y la autonomía."
    },
    {
        tema: "Tema 2: Cultura de la Colaboración",
        question: "Según las métricas DORA, ¿cuál de los siguientes NO es uno de los 4 indicadores clave?",
        options: [
            "Frecuencia de despliegue (Deployment Frequency)",
            "Tiempo de entrega de cambios (Lead Time for Changes)",
            "Tasa de fallos en cambios (Change Failure Rate)",
            "Número de líneas de código (Lines of Code)"
        ],
        answer: "Número de líneas de código (Lines of Code)",
        comment: "Tema 2: Cultura de la Colaboración - Las métricas DORA se centran en velocidad y estabilidad (frecuencia, lead time, tasa de fallos, tiempo de restauración), no en volumen de código, que es una métrica de vanidad."
    },

    // Tema 3: DevOps Dojos (6 preguntas)
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Qué significa literalmente la palabra \"Dojo\" en el contexto explicado en clase?",
        options: [
            "Lugar de lucha",
            "Lugar del camino (donde se va a aprender y mejorar)",
            "Centro de datos",
            "Sala de reuniones ágiles"
        ],
        answer: "Lugar del camino (donde se va a aprender y mejorar)",
        comment: "Tema 3: DevOps Dojos - Proviene de las artes marciales japonesas y significa \"lugar del camino\". En tecnología, es un espacio de aprendizaje inmersivo y práctico."
    },
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Cuál es el \"Mantra\" principal de un DevOps Dojo?",
        options: [
            "Optimizar para reducir costes inmediatamente",
            "Optimizar para velocidad y eficacia, no necesariamente para costes al inicio",
            "Evitar el uso de consultores externos",
            "Priorizar la documentación sobre la práctica"
        ],
        answer: "Optimizar para velocidad y eficacia, no necesariamente para costes al inicio",
        comment: "Tema 3: DevOps Dojos - Los Dojos buscan acelerar la adopción y eficacia. Al principio, esto puede subir los costes (licencias, tiempo de aprendizaje), pero el beneficio viene de la velocidad y calidad a largo plazo."
    },
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Cuál es el mejor tipo de equipo candidato para ingresar primero a un Dojo?",
        options: [
            "Un equipo con un proyecto que va a morir pronto",
            "El equipo con peor desempeño para arreglarlo urgente",
            "Un equipo orientado a producto, motivado y con un proyecto de alta visibilidad/valor",
            "Un equipo disperso geográficamente que nunca ha trabajado junto"
        ],
        answer: "Un equipo orientado a producto, motivado y con un proyecto de alta visibilidad/valor",
        comment: "Tema 3: DevOps Dojos - Para garantizar un caso de éxito inicial (Quick Win), se debe elegir un equipo capaz, orientado a producto y cuyo trabajo tenga impacto visible, creando un efecto \"bola de nieve\"."
    },
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Qué es un \"Green Dojo\" o \"Leadership Dojo\"?",
        options: [
            "Un dojo enfocado en tecnologías ecológicas",
            "Una sesión para directivos y managers para evangelizar sobre la importancia de DevOps",
            "Un taller para juniors recién ingresados",
            "Un espacio de relajación"
        ],
        answer: "Una sesión para directivos y managers para evangelizar sobre la importancia de DevOps",
        comment: "Tema 3: DevOps Dojos - Son sesiones pensadas para convencer y educar a la capa directiva sobre por qué es necesaria la transformación y obtener su apoyo."
    },
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Qué formato de Dojo implica trabajar en un reto real del equipo durante 4 a 8 semanas?",
        options: [
            "FlashBuild",
            "Taller teórico (Workshop)",
            "Desafío (Challenge) o Black Belt",
            "Seminario web"
        ],
        answer: "Desafío (Challenge) o Black Belt",
        comment: "Tema 3: DevOps Dojos - El formato de desafío o inmersivo (a veces llamado Black Belt) implica que el equipo trabaja con los coaches en su propio producto o un reto complejo durante varias semanas."
    },
    {
        tema: "Tema 3: DevOps Dojos",
        question: "¿Qué ventaja tiene un modelo de equipo de Dojo \"Híbrido\" (Internos + Externos)?",
        options: [
            "Es el más barato",
            "Combina el conocimiento experto de los consultores con el conocimiento de la cultura interna de la empresa",
            "Permite culpar a los externos si algo sale mal",
            "No requiere que los empleados internos aprendan nada"
        ],
        answer: "Combina el conocimiento experto de los consultores con el conocimiento de la cultura interna de la empresa",
        comment: "Tema 3: DevOps Dojos - El modelo híbrido es ideal para empezar: traes expertos (externos) para acelerar, pero mantienes internos para no perder el conocimiento y navegar la política/cultura de la empresa."
    },

    // Tema 4: Tecnologías de Virtualización (6 preguntas)
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "¿Cuál es la principal función de un Hipervisor (o monitor de máquina virtual)?",
        options: [
            "Aumentar la velocidad del reloj del procesador",
            "Abstraer el hardware para permitir que múltiples sistemas operativos se ejecuten concurrentemente",
            "Eliminar la necesidad de memoria RAM",
            "Convertir el código Java en código máquina"
        ],
        answer: "Abstraer el hardware para permitir que múltiples sistemas operativos se ejecuten concurrentemente",
        comment: "Tema 4: Tecnologías de Virtualización - La virtualización usa una capa llamada hipervisor que simula el hardware y gestiona los recursos para las máquinas virtuales, aislándolas del hardware físico real."
    },
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "Aunque existen hipervisores Tipo 1 (Nativo) y Tipo 2 (Hosted), ¿cuál es la realidad actual mencionada en clase?",
        options: [
            "Los de Tipo 1 ya no existen",
            "Casi todos los modernos son realmente de Tipo 2 o híbridos (basados en un Kernel como Linux)",
            "Los de Tipo 2 son solo para juegos",
            "La virtualización ha desaparecido por culpa de los contenedores"
        ],
        answer: "Casi todos los modernos son realmente de Tipo 2 o híbridos (basados en un Kernel como Linux)",
        comment: "Tema 4: Tecnologías de Virtualización - Aunque se mantiene la clasificación teórica, en la práctica, sistemas como KVM o ESXi usan núcleos de Linux optimizados, difuminando la línea hacia el Tipo 2 o híbridos."
    },
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "¿Qué es el \"Edge Computing\" y por qué es importante en virtualización?",
        options: [
            "Computación en el borde (cerca del cliente) para reducir la latencia al mínimo",
            "Computación en la nube central de Amazon",
            "Computación exclusiva para navegadores web \"Edge\"",
            "Una técnica para ahorrar disco duro"
        ],
        answer: "Computación en el borde (cerca del cliente) para reducir la latencia al mínimo",
        comment: "Tema 4: Tecnologías de Virtualización - El Edge Computing lleva la capacidad de cómputo y virtualización físicamente cerca del usuario (última milla) para aplicaciones críticas de tiempo real (latencia <5ms), como juegos o salud."
    },
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "¿Qué relación tiene la virtualización con la nube (Cloud Computing)?",
        options: [
            "La nube ha eliminado la virtualización; ya no se usa",
            "La nube ES virtualización a gran escala, con automatización y pago por uso",
            "La virtualización es más cara que la nube",
            "Son tecnologías opuestas e incompatibles"
        ],
        answer: "La nube ES virtualización a gran escala, con automatización y pago por uso",
        comment: "Tema 4: Tecnologías de Virtualización - La nube no reemplaza la tecnología de virtualización; está construida sobre ella. La nube añade escalabilidad, elasticidad y el modelo económico de pago por uso (OPEX)."
    },
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "¿Cuál es una ventaja clave de usar una AMI (Amazon Machine Image) o \"Golden Image\" en virtualización?",
        options: [
            "Hace que el despliegue sea más lento",
            "Garantiza homogeneidad: todos los nodos tienen exactamente la misma versión de SO y configuraciones",
            "Permite usar hardware incompatible",
            "Evita tener que usar Linux"
        ],
        answer: "Garantiza homogeneidad: todos los nodos tienen exactamente la misma versión de SO y configuraciones",
        comment: "Tema 4: Tecnologías de Virtualización - Usar plantillas o imágenes (como AMIs) preconfiguradas asegura que cada máquina virtual desplegada sea idéntica, facilitando la gestión y evitando errores de configuración (\"configuration drift\")."
    },
    {
        tema: "Tema 4: Tecnologías de Virtualización",
        question: "¿Qué concepto financiero es crítico entender al moverse de Data Centers físicos (inversión) a la Nube (gasto)?",
        options: [
            "El cambio de CAPEX (Inversión de Capital) a OPEX (Gasto Operativo)",
            "El cambio de Dólares a Euros",
            "El cambio de ROI a KPI",
            "La eliminación de los impuestos"
        ],
        answer: "El cambio de CAPEX (Inversión de Capital) a OPEX (Gasto Operativo)",
        comment: "Tema 4: Tecnologías de Virtualización - Moverse a la nube suele implicar pasar de CAPEX (comprar servidores, se deprecia en años) a OPEX (pagar suscripción mensual, afecta el presupuesto directo del año), lo cual tiene gran impacto contable."
    },

    // Tema 5: Casos de Uso y Estrategias (7 preguntas)
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "¿Qué significa \"Escalado Horizontal\" (Scale Out)?",
        options: [
            "Añadir más RAM y CPU a una misma máquina virtual",
            "Añadir más máquinas (nodos) al clúster para repartir la carga",
            "Comprar una pantalla más ancha",
            "Cambiar el proveedor de nube"
        ],
        answer: "Añadir más máquinas (nodos) al clúster para repartir la carga",
        comment: "Tema 5: Casos de Uso y Estrategias - El escalado horizontal consiste en añadir más instancias (servidores) en paralelo, a diferencia del vertical que es hacer la máquina más grande. Requiere que la aplicación soporte clustering."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "En el caso de uso de \"VDI\" (Virtual Desktop Infrastructure) en universidades, ¿cuál fue el principal beneficio económico mencionado?",
        options: [
            "Los estudiantes pagaban más matrícula",
            "Se extendió la vida útil de los PCs físicos de los laboratorios, ya que el procesamiento real ocurría en el servidor",
            "Se eliminaron los profesores",
            "Se vendieron los ordenadores viejos a un precio alto"
        ],
        answer: "Se extendió la vida útil de los PCs físicos de los laboratorios, ya que el procesamiento real ocurría en el servidor",
        comment: "Tema 5: Casos de Uso y Estrategias - Al virtualizar el escritorio, el PC del alumno solo actúa como pantalla y teclado. Esto permite no tener que renovar el hardware de los laboratorios cada año, generando un gran ahorro."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "Para lograr una alta disponibilidad (ej. 99.99%), ¿qué configuración es habitual?",
        options: [
            "Tener un solo servidor muy potente",
            "Tener sistemas duplicados o en clúster (activo-pasivo o activo-activo) en diferentes ubicaciones",
            "Hacer copias de seguridad en cinta una vez al mes",
            "Reiniciar el servidor cada noche"
        ],
        answer: "Tener sistemas duplicados o en clúster (activo-pasivo o activo-activo) en diferentes ubicaciones",
        comment: "Tema 5: Casos de Uso y Estrategias - La alta disponibilidad y calidad de servicio requieren redundancia. Si falla un nodo, otro debe tomar el control inmediatamente (failover)."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "En el ejemplo de la empresa de videojuegos (Dina), ¿por qué les ayudó la virtualización?",
        options: [
            "Porque los juegos corrían más rápido",
            "Por la capacidad de crear y destruir entornos completos para equipos temporales de desarrollo rápidamente",
            "Porque era obligatorio por ley",
            "Porque usaban mainframes antiguos"
        ],
        answer: "Por la capacidad de crear y destruir entornos completos para equipos temporales de desarrollo rápidamente",
        comment: "Tema 5: Casos de Uso y Estrategias - Al trabajar por proyectos temporales (crear un juego y disolver el equipo), la virtualización permitía aprovisionar infraestructura al inicio y decomisionarla al final con gran agilidad."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "¿Qué problema genera la \"Ley de Conway\" en el desarrollo de software según el caso estudiado?",
        options: [
            "El software tiende a replicar la estructura de comunicación y complejidad de la organización que lo crea",
            "El software siempre será más lento cada 2 años",
            "El hardware es más barato que el software",
            "Los equipos pequeños siempre fallan"
        ],
        answer: "El software tiende a replicar la estructura de comunicación y complejidad de la organización que lo crea",
        comment: "Tema 5: Casos de Uso y Estrategias - Si una organización es burocrática y compleja, su software y arquitectura tenderán a ser complejos y monolíticos. Cambiar el software requiere cambiar la organización."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "¿Qué estrategia de copias de seguridad se recomienda para evitar desastres reales (como el caso de la inundación comentado)?",
        options: [
            "Copia en el mismo disco duro",
            "Estrategia 3-2-1 (3 copias, 2 medios, 1 fuera del sitio/offsite) o copias inmutables en la nube",
            "Sincronización simple con Google Drive (si borras en el móvil, se borra en la nube)",
            "Imprimir todos los documentos"
        ],
        answer: "Estrategia 3-2-1 (3 copias, 2 medios, 1 fuera del sitio/offsite) o copias inmutables en la nube",
        comment: "Tema 5: Casos de Uso y Estrategias - No basta con sincronizar. Se necesita un backup real (snapshot) y que al menos una copia esté en una ubicación física o nube diferente para sobrevivir a desastres físicos o ransomware."
    },
    {
        tema: "Tema 5: Casos de Uso y Estrategias",
        question: "¿Qué se debe evitar para que un proyecto de virtualización tenga éxito?",
        options: [
            "Empezar con un piloto",
            "Buscar la perfección desde el día uno en lugar de una mejora iterativa",
            "Entrenar al personal",
            "Monitorizar los sistemas"
        ],
        answer: "Buscar la perfección desde el día uno en lugar de una mejora iterativa",
        comment: "Tema 5: Casos de Uso y Estrategias - Un error común es querer que el sistema sea perfecto antes de lanzarlo. Es mejor que \"funcione y mejore la situación actual\" e ir iterando (mejora continua)."
    }
];
