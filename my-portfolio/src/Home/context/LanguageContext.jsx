import { createContext, useState, useContext, useEffect } from 'react';

const translations = {
    es: {
        hero: {
            subtitle: "Explora mi universo digital. Un sistema planetario interactivo donde cada planeta es una parte de mi trabajo.",
            howItWorks: "¿Cómo funciona?",
            ariaHowItWorks: "Cómo funciona"
        },
        tutorial: {
            shipTitle: "La Nave",
            shipDesc: "Haz clic en la nave para explorar el espacio en 3D. Pilótala y acércate a los planetas para entrar en sus páginas. Los controles están dentro del juego.",
            satelliteTitle: "El Satélite",
            satelliteDesc: "El satélite de arriba a la derecha es tu acceso rápido. Haz clic para abrir el menú y elige Sol, Portfolio, Projects, Work o Lab para ir directamente a su página. Puedes cerrar el menú con Cerrar, Esc o pulsando fuera del panel.",
            planetsTitle: "Los Planetas",
            planetsDesc: "Portfolio reúne mis trabajos y diseños; Projects, mis proyectos y SaaS; Work, mis servicios y experiencia; y Lab, mis experimentos. Haz clic en un planeta para ver su descripción y pulsa Entrar para explorar su sección.",
            sunTitle: "El Sol",
            sunDesc: "El centro de mi universo. Haz clic en el Sol para abrir su vista previa y pulsa Entrar para conocer más sobre mí. También puedes llegar desde el menú del satélite o pilotando la nave.",
            trashTitle: "Basura Espacial",
            trashDesc: "Haz clic en el asteroide de arriba a la izquierda para hacerlo explotar: reaparecerá unos segundos después. También puedes arrastrar al astronauta con el ratón o con el dedo para moverlo por la escena.",
            infobotTitle: "InfoBot",
            infobotDesc: "Tu asistente personal. Haz clic en el InfoBot flotante (esquina inferior derecha) para ver mi CV completo y descargarlo en PDF.",
            prev: "Anterior",
            "next": "Siguiente",
            understood: "Entendido"
        },
        infobot: {
            downloadPDF: "📥 Descargar PDF"
        },
        orbit: {
            portfolioDesc: "Mis trabajos, diseños y efectos.",
            projectsDesc: "Mis proyectos y SaaS que estoy creando.",
            workDesc: "Freelance, landings y curro técnico.",
            labDesc: "Pruebas, caos y experimentos.",
            sunDesc: "El centro del sistema. Aquí comienza todo."
        },
        zoom: {
            enter: "Entrar al planeta",
            close: "Cerrar"
        },
        launcher: {
            boot: "INICIANDO SISTEMA NAVE... OK",
            connect: "CONECTANDO CON SATÉLITES... OK",
            loading: "CARGANDO PLANETAS...",
            close: "Cerrar"
        },
        sun: {
            title: "NÚCLEO SOLAR - ABOUT ME",
            subtitle: "Explora mi esencia",
            back: "<< VOLVER AL HUB",
            guide: {
                title: "MAPA HUMANO",
                head: "Cabeza: Quién soy",
                throat: "Garganta: Idiomas",
                heart: "Corazón: Objetivos",
                ear: "Oreja: Contacto",
                leftHand: "Mano izquierda: Frontend",
                rightArm: "Brazo derecho: Fortalezas",
                leftFoot: "Pie izquierdo: Formación",
                rightKnee: "Rodilla derecha: Backend"
            },
            status: {
                loading: "CARGANDO DEV",
                systems: "SISTEMAS NEURALES: OK",
                contact: "PROTOCOLO DE CONTACTO: ACTIVO",
                coffee: "NIVEL DE CAFÉ: CRÍTICO"
            },
            parts: {
                head: {
                    title: "¿Quién soy?",
                    p1: "Soy <strong>Mikel Rivera</strong>, un ingeniero de software full-stack de Bilbao. Construyo productos digitales desde cero: SaaS, webs, sistemas completos y experiencias visuales cuidadas al detalle.",
                    p2: "Me muevo entre <strong>Next.js, React, Node, MySQL, Kubernetes</strong> y todo lo que implique lanzar proyectos reales, escalables y con diseño sólido.",
                    p3: "También soy fundador de <strong>Siéntame</strong> y creador de <strong>Webrior</strong>, mis dos mayores armas como desarrollador y emprendedor."
                },
                throat: {
                    title: "Idiomas",
                    l1: "🇪🇸 <strong>Español</strong> — Nativo",
                    l2: "🇬🇧 <strong>Inglés</strong> — Avanzado (C1 / B2)",
                    l3: "💻 <strong>Código</strong> — Con fluidez en varios lenguajes sin drama"
                },
                heart: {
                    title: "Mis Objetivos",
                    p1: "Quiero construir productos digitales que funcionen, enamoren y aporten valor real. Con una combinación de tecnología sólida y diseño cuidado.",
                    p2: "<strong>Ahora mismo enfocado en:</strong>",
                    l1: "Escalar <strong>Siéntame</strong> como SaaS sólido y rentable",
                    l2: "Subir de nivel Webrior con landings premium",
                    l3: "Migrar todo mi stack a <strong>Next/Nest</strong>",
                    l4: "Convertirme en un desarrollador top con arquitectura limpia"
                },
                ear: {
                    title: "Contáctame",
                    p1: "¿Proyecto, colaboración o idea? Escríbeme sin miedo.",
                    p2: "Intento contestar rápido. Si tardo, culpa del café ☕"
                },
                leftHand: {
                    title: "Herramientas Frontend",
                    p1: "<strong>Frameworks:</strong>",
                    p2: "<strong>Diseño:</strong>",
                    p3: "<strong>Mi estilo:</strong> diseño futurista, neon, limpio, animado y con mimo."
                },
                rightFoot: {
                    title: "Herramientas Backend",
                    p1: "<strong>Backend stack:</strong>",
                    p2: "<strong>Infraestructura:</strong>",
                    p3: "Soy muy de montar cosas que escalen sin drama."
                },
                leftFoot: {
                    title: "Formación Académica",
                    p1: "<strong>Educación:</strong>",
                    l1: "Grado en Ingeniería Informática",
                    p2: "<strong>Experiencia profesional:</strong>",
                    l2: "Analyst en Deloitte – SAP/ABAP + arquitectura",
                    l3: "CTO y cofundador de <strong>Siéntame</strong>",
                    l4: "Creador de <strong>Webrior</strong>",
                    p3: "Aprendiendo siempre: arquitectura, IA, diseño, cloud."
                },
                rightHand: {
                    title: "Fortalezas Personales",
                    p1: "<strong>Skills técnicas:</strong>",
                    l1: "Resolución de problemas con cabeza fría",
                    l2: "Arquitectura moderna y escalable",
                    l3: "Optimización de rendimiento web",
                    l4: "Diseño intuitivo y futurista",
                    p2: "<strong>Soft Skills:</strong>",
                    l5: "Liderazgo natural",
                    l6: "Buena comunicación y visión de producto",
                    l7: "Constancia y capacidad de trabajar duro"
                }
            }
        },
        portfolio: {
            title: "Portfolio",
            desc: "Mis trabajos, diseños y efectos."
        },
        portfolioPage: {
            title: "EXPLORACIÓN DE PORTFOLIO",
            subtitle: "Selecciona un hito temporal",
            back: "<< VOLVER AL HUB",
            preview: {
                year: "AÑO:",
                number: "Nº",
                view: "VER PROYECTO COMPLETO <<"
            },
            items: {
                portfolio1: {
                    title: "Ecosistema Financiero IA",
                    desc: "Plataforma de análisis predictivo para mercados emergentes usando TensorFlow."
                },
                portfolio2: {
                    title: "Metaverso Educativo",
                    desc: "Entorno de realidad virtual para aprendizaje colaborativo en medicina."
                },
                p3: {
                    title: "Blockchain Supply Chain",
                    desc: "Sistema de trazabilidad descentralizada para logística internacional."
                },
                p4: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                },
                p5: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                },
                p6: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                }
            }
        },
        projects: {
            title: "Proyectos",
            desc: "Mis proyectos y SaaS que estoy creando."
        },
        projectsPage: {
            title: "SELECCIONA TU DESTINO",
            back: "<< VOLVER AL SISTEMA SOLAR",
            tooltips: {
                holo: "Seleccionar Tecnología Holográfica",
                steam: "Seleccionar Industria Steampunk"
            },
            panels: {
                holo: {
                    title: "SECTOR: LANDINGS",
                    desc: "Interfaces inmersivas de alta tecnología. Acceso a galería de despliegue rápido y sistemas UX/UI avanzados.",
                    items: ["Iniciar Galería", "Protocolos UX/UI", "Sistemas React"],
                    button: "Ver Landings"
                },
                steam: {
                    title: "SECTOR: PROYECTOS",
                    desc: "Complejo industrial de desarrollo. Arquitectura de backend robusta, maquinaria de base de datos y APIs.",
                    items: ["Planos de Arquitectura", "Sala de Máquinas (Stack)", "Ingeniería Node.js"],
                    button: "Ver proyectos"
                }
            }
        },
        work: {
            title: "Trabajo",
            desc: "Freelance, landings y curro técnico."
        },
        workPage: {
            back: "<< VOLVER AL HUB",
            banner: {
                title: "METRÓPOLIS LABORAL",
                subtitle: "El origen del viaje"
            },
            items: {
                work1: {
                    role: "Desarrollador Web / Technical Web Developer",
                    desc: "Desarrollo web end-to-end en entorno presencial. Implementación de funcionalidades en WordPress, mantenimiento de plataformas internas y soporte técnico. Trabajo centrado en optimización, resolución de incidencias y desarrollo de nuevas features."
                },
                work2: {
                    role: "IT Auditor (Prácticas)",
                    desc: "Auditoría de sistemas y plataformas digitales, análisis de riesgos tecnológicos y evaluación de controles IT. Validación de integridad de datos, revisión de ciberseguridad y elaboración de informes técnicos. Trabajo directo con estándares como ISO 27001, SOC 1 y SOC 2."
                },
                work3: {
                    role: "Analyst – Enterprise Technology (SAP)",
                    desc: "Soporte técnico y funcional en soluciones SAP para clientes enterprise. Desarrollo y personalización de sistemas SAP, integración entre plataformas y participación en proyectos de transformación digital en el sector T&T. Aporto una visión híbrida entre ingeniería de software y consultoría tecnológica."
                },
                work4: {
                    role: "Full Stack Developer",
                    desc: "Desarrollo de soluciones SaaS, aplicaciones web y consultoría para pequeñas empresas y startups. Trabajo en productos propios y servicios digitales con foco en escalabilidad, UX moderna y despliegues cloud."
                }
            }
        },
        lab: {
            title: "Laboratorio",
            desc: "Pruebas, caos y experimentos."
        },
        labPage: {
            title: "LABORATORIO DE EXPERIMENTOS",
            subtitle: "Explora mis pruebas y prototipos",
            back: "<< VOLVER AL HUB",
            preview: {
                year: "AÑO:",
                number: "Nº",
                view: "VER EXPERIMENTO <<"
            },
            items: {
                lab1: {
                    title: "EXPERIMENTO ALPHA",
                    desc: "Investigación inicial sobre interfaces neuronales y su aplicación en entornos web inmersivos."
                },
                lab2: {
                    title: "PROTOTIPO BETA",
                    desc: "Desarrollo de un sistema de partículas reactivo al cursor utilizando WebGL y shaders personalizados."
                },
                lab3: {
                    title: "SISTEMA GAMMA",
                    desc: "Implementación de algoritmos genéticos para la optimización de rutas en visualizaciones de datos complejas."
                },
                lab4: {
                    title: "SISTEMA GAMMA",
                    desc: "Implementación de algoritmos genéticos para la optimización de rutas en visualizaciones de datos complejas."
                },
                lab5: {
                    title: "SISTEMA GAMMA",
                    desc: ""
                }
            }
        },
        apo: {
            nav_home: "Inicio",
            nav_privacy: "Política de Privacidad",
            nav_terms: "Términos y Condiciones",
            nav_cookies: "Política de Cookies",
            nav_contact: "Contacto y Soporte",
            nav_delete_account: "Eliminar Cuenta",
            lang_switch: "Idioma",

            home_badge: "Sitio Oficial y Centro Legal • Sakura Eclipse TCG",
            home_title_main: "ANIME",
            home_title_sub: "PACK OPENING",
            home_japanese: "サクラ・エクリプス • SAKURA ECLIPSE",
            home_subtitle: "Portal oficial de información, términos de uso, política de privacidad y gestión de derechos para la aplicación móvil Anime Pack Opening.",
            home_section_title: "Documentación y Cumplimiento Legal",
            home_section_sub: "Acceso directo a las políticas de privacidad y condiciones de uso",
            
            home_card_privacy_title: "Política de Privacidad",
            home_card_privacy_desc: "Conoce detalladamente cómo se tratan los datos técnicos, la infraestructura de la app, anuncios AdMob y tus derechos ARCO+.",
            home_card_privacy_btn: "Ver Política de Privacidad →",
            
            home_card_terms_title: "Términos y Condiciones",
            home_card_terms_desc: "Condiciones generales de uso de la aplicación, requisitos de edad, propiedad intelectual y exención de dinero real.",
            home_card_terms_btn: "Ver Términos y Condiciones →",
            
            home_card_deletion_title: "Eliminación de Cuenta",
            home_card_deletion_desc: "La eliminación de tu cuenta y datos se realiza directamente desde el botón ubicado dentro de los ajustes de la aplicación móvil.",
            home_card_deletion_btn: "Información de Eliminación →",
            
            home_card_contact_title: "Contacto Legal y Soporte",
            home_card_contact_desc: "Formulario de atención directa al desarrollador para resolver dudas, incidencias o ejercitar tus derechos de privacidad.",
            home_card_contact_btn: "Formulario de Contacto →",

            deletion_badge: "CUMPLIMIENTO DE PRIVACIDAD GOOGLE PLAY",
            deletion_title: "Eliminación de Cuenta y Datos",
            deletion_meta: "Página oficial pública de información sobre el borrado de datos de usuario para Anime Pack Opening (Sakura Eclipse)",
            deletion_sec1_title: "1. Cómo eliminar tu cuenta desde la Aplicación Móvil",
            deletion_sec1_box_title: "📱 Eliminación directa desde el menú de la App",
            deletion_sec1_box_desc: "La eliminación de la cuenta se realiza única y exclusivamente desde la propia aplicación móvil de Sakura Eclipse (Anime Pack Opening).",
            deletion_step1: "Abre la aplicación móvil en tu dispositivo.",
            deletion_step2: "Accede al menú de Ajustes / Perfil.",
            deletion_step3: "Pulsa el botón 'Eliminar Cuenta' y confirma la acción por escrito.",
            deletion_sec2_title: "2. ¿Qué datos se ELIMINAN permanentemente?",
            deletion_sec2_desc: "Al confirmar la eliminación desde el botón de la app, se suprimen de forma irreversible:",
            deletion_data1: "Datos de Cuenta: Registro de usuario en la base de datos y correo electrónico asociado.",
            deletion_data2: "Perfil de Jugador: Nombre de usuario público, avatar y fecha de registro.",
            deletion_data3: "Colección de Cartas: Mazo acumulado y cartas desveladas.",
            deletion_data4: "Recursos y Progreso: Balance de Esencia mística e historial de aperturas.",
            deletion_sec3_title: "3. Datos conservados temporalmente por imperativo legal",
            deletion_sec3_desc: "Por razones estrictas de seguridad, auditoría y prevención de fraudes:",
            deletion_ret1: "Registros Técnicos de Seguridad: Se podrán conservar logs de auditoría anónimos para la protección de la infraestructura.",
            deletion_ret2: "Período de Conservación Adicional: Hasta 30 días. Tras este plazo, los registros se purgan definitivamente.",
            deletion_sec4_title: "4. Soporte e Incidencias por Correo",
            deletion_sec4_desc: "Si has perdido el acceso a tu dispositivo o necesitas soporte sobre la eliminación, puedes ponerte en contacto con el equipo de desarrollo a través del Formulario de Contacto o escribiendo directamente a",
            deletion_sec4_note: "📌 Nota de Seguridad: Para proteger las cuentas de nuestros usuarios y evitar eliminaciones no autorizadas, se requerirá un proceso estricto de verificación previa de identidad y titularidad de la cuenta antes de gestionar cualquier solicitud por correo.",

            privacy_badge: "DOCUMENTACIÓN LEGAL OFICIAL",
            privacy_title: "Política de Privacidad",
            privacy_meta: "Última actualización: 23 de septiembre de 2026 | Aplicable a Anime Pack Opening",
            privacy_sec1_title: "1. Identidad del Responsable del Tratamiento",
            privacy_sec1_desc: "Los responsables del tratamiento de los datos personales recopilados a través del juego de cartas coleccionables y sitio web Anime Pack Opening (Sakura Eclipse) son:",
            privacy_dev_names: "Nombres Legales / Desarrolladores:",
            privacy_dev_email: "Correo de Soporte y Privacidad:",
            privacy_dev_phone: "Teléfono de Contacto:",
            privacy_dev_domain: "Dominio Oficial:",
            privacy_dev_location: "Ubicación / Jurisdicción:",
            privacy_sec2_title: "2. Datos Personales y de Publicidad que Recopilamos",
            privacy_sec2_desc: "En función de tu interacción con Anime Pack Opening (modo visitante o cuenta registrada), procesamos datos para la experiencia de juego y publicidad:",
            privacy_data_id: "Datos de Identificación y Cuenta: Dirección de correo electrónico, nombre de usuario público e identificador único de usuario (UUID Supabase).",
            privacy_data_progress: "Datos de Progreso y Colección: Cartas desveladas, inventario de sobres, balance de Esencia y registros.",
            privacy_data_tech: "Datos Técnicos de Seguridad: Dirección IP anonimizada, tokens de sesión JWT, versión del dispositivo e informes de errores.",
            privacy_data_admob: "Identificadores Publicitarios Móviles (Google AdMob): GAID/IDFA, interacciones con anuncios e IP anonimizada para servir anuncios y recompensas.",
            privacy_sec3_title: "3. Finalidad y Base Legal del Tratamiento",
            privacy_purpose_contract: "Ejecución del Servicio (Contrato): Creación de cuenta, guardado de mazo y sincronización de colección.",
            privacy_purpose_ads: "Monetización y Publicidad (Google AdMob): Anuncios publicitarios intersticiales, banners o recompensados.",
            privacy_purpose_security: "Interés Legítimo y Seguridad: Prevención de fraudes, protección de la infraestructura y atención de soporte.",
            privacy_purpose_consent: "Consentimiento Explícito: Responder mensajes de contacto y gestionar eliminaciones de cuenta.",
            privacy_sec4_title: "4. Proveedores de Infraestructura, Publicidad y Terceros",
            privacy_sec4_desc: "Para prestar el servicio y gestionar los anuncios publicitarios utilizamos los siguientes proveedores certificados:",
            privacy_provider_supabase: "Supabase Inc. (Base de Datos y Autenticación): Aloja la infraestructura de autenticación de usuarios y almacenamiento de colecciones (RLS).",
            privacy_provider_admob: "Google AdMob - Google LLC (Red Publicitaria Móvil): Distribución e impresión de anuncios. AdMob recopila identificadores publicitarios e IP para anuncios personalizados y prevención de fraude. Consulta la ",
            privacy_no_sell: "No vendemos ni comercializamos tus datos personales directos a terceros para bases comerciales ajenas o telemarketing.",
            privacy_sec5_title: "5. Plazos de Conservación de los Datos",
            privacy_sec5_desc: "Los datos se conservan mientras la cuenta permanezca activa. Si solicitas la eliminación, los datos se suprimen de inmediato o en un máximo de 30 días.",
            privacy_sec6_title: "6. Derechos de los Usuarios (ARCO+ / RGPD)",
            privacy_sec6_desc: "Conforme al RGPD y LOPDGDD, tienes derecho de Acceso, Rectificación, Supresión, Limitación y Portabilidad.",
            privacy_sec7_title: "7. Protección de Menores",
            privacy_sec7_desc: "Anime Pack Opening no está dirigido intencionadamente a menores de 14 años sin supervisión de tutores legales.",

            terms_badge: "DOCUMENTACIÓN LEGAL OFICIAL",
            terms_title: "Términos y Condiciones de Uso",
            terms_meta: "Fecha de entrada en vigor: 23 de septiembre de 2026 | Desarrollado por Mikel Rivera Guerrero & Luis Estival Cantó",
            terms_sec1_title: "1. Identificación del Desarrollador y Aceptación",
            terms_sec1_desc: "Los presentes Términos regulan el acceso y uso del juego Anime Pack Opening (Sakura Eclipse), gestionado por Mikel Rivera Guerrero & Luis Estival Cantó ('los Desarrolladores').",
            terms_sec2_title: "2. Descripción del Servicio y Mecánica de Sobres",
            terms_sec2_desc: "Anime Pack Opening es un juego digital de cartas coleccionables. Las cartas, sobres y puntos de Esencia son bienes virtuales sin valor monetario real.",
            terms_sec2_no_gambling: "Aclaración Importante: Las cartas digitales no constituyen apuestas ni premios canjeables por dinero real.",
            terms_sec3_title: "3. Requisitos de Edad y Registro de Cuenta",
            terms_sec3_desc: "Debes tener al menos 14 años para crear una cuenta. El usuario es responsable de mantener la confidencialidad de sus credenciales.",
            terms_sec4_title: "4. Conductas Prohibidas",
            terms_sec4_desc: "Queda prohibido el uso de bots, hacks, alterar probabilidades, ataques a la base de datos y la venta de cuentas por dinero real.",
            terms_sec5_title: "5. Propiedad Intelectual",
            terms_sec5_desc: "El nombre Anime Pack Opening, logotipo de Sakura Eclipse, diseño, código fuente e ilustraciones SVG pertenecen a los Desarrolladores.",
            terms_sec6_title: "6. Disponibilidad y Suspensión del Servicio",
            terms_sec6_desc: "Los Desarrolladores se reservan el derecho de realizar mantenimientos o suspender el servicio temporalmente por seguridad.",
            terms_sec7_title: "7. Cancelación y Eliminación de Datos",
            terms_sec7_desc: "Puedes solicitar el borrado de tu cuenta en cualquier momento desde la sección de Eliminación de Cuenta.",
            terms_sec8_title: "8. Legislación Aplicable y Jurisdicción",
            terms_sec8_desc: "Estos Términos se rigen por la legislación de España / Unión Europea.",

            cookies_badge: "INFORMACIÓN SOBRE NAVEGACIÓN",
            cookies_title: "Política de Cookies y Almacenamiento",
            cookies_meta: "Transparencia técnica en el uso de cookies y LocalStorage en Anime Pack Opening",
            cookies_sec1_title: "1. ¿Qué son las cookies y el almacenamiento local?",
            cookies_sec1_desc: "Las cookies y LocalStorage guardan pequeños archivos en tu dispositivo para mantener activa tu sesión y recordar preferencias.",
            cookies_sec2_title: "2. Cookies y Tecnologías utilizadas en Anime Pack Opening",
            cookies_sec2_essential: "Cookies Técnicas Esenciales (Supabase Auth): Almacenan el token de sesión JWT necesario para la autenticación.",
            cookies_sec2_local: "Almacenamiento Local de Preferencias: Guarda el mazo local y balance de sobres en modo visitante.",
            cookies_sec3_title: "3. Ausencia de Cookies Publicitarias Web de Terceros",
            cookies_sec3_desc: "No utilizamos cookies de rastreo publicitario de terceros en nuestro portal web.",
            cookies_sec4_title: "4. Gestión de Cookies",
            cookies_sec4_desc: "Puedes borrar o bloquear cookies en cualquier momento desde los ajustes de tu navegador.",

            contact_badge: "ATENCIÓN AL USUARIO",
            contact_title: "Contacto Legal y Soporte Técnico",
            contact_meta: "Ponte en contacto con el equipo de desarrollo de Anime Pack Opening",
            contact_form_title: "Formulario de Contacto Directo",
            contact_form_desc: "Completa los campos a continuación para consultas legales, soporte sobre cartas, problemas con la cuenta o derechos de privacidad:",
            contact_name_label: "Nombre Completo / Apodo:",
            contact_email_label: "Correo Electrónico:",
            contact_subject_label: "Asunto de la Consulta:",
            contact_message_label: "Mensaje / Detalle:",
            contact_consent_label: "He leído y acepto expresamente la Política de Privacidad para el tratamiento de mis datos personales con la finalidad de responder a esta consulta.",
            contact_submit_btn: "✉️ Enviar Mensaje de Contacto",
            contact_submitting: "Enviando...",
            contact_dev_info_title: "Datos del Desarrollador",
            contact_opt_tech: "Soporte Técnico o Error en Juego",
            contact_opt_privacy: "Privacidad, Datos y Derechos ARCO+",
            contact_opt_ip: "Consulta de Propiedad Intelectual",
            contact_opt_other: "Otra consulta general",

            footer_desc: "La experiencia definitiva de coleccionar y abrir sobres de cartas anime en Sakura Eclipse. Sumérgete en el cosmos de los guerreros astrales y los espíritus sakura.",
            footer_dev_label: "Desarrolladores Oficiales:",
            footer_legal_heading: "Cumplimiento Legal",
            footer_support_heading: "Soporte y Google Play",
            footer_support_text: "Para consultas legales, ejercitar derechos ARCO+ o solicitar soporte técnico directo:",
            footer_gp_tag: "✅ Enlaces públicos aptos para la Ficha de Google Play Console",
            footer_ip_disclaimer: "Aviso de Propiedad Intelectual: Anime Pack Opening de Sakura Eclipse es una obra original independiente de juego de cartas coleccionables (TCG). Todas las marcas, ilustraciones, nombres y mecánicas son propiedad exclusiva de su desarrollador. No se utiliza material ni propiedad intelectual de terceros protegida por copyright sin licencia.",
            footer_copyright: "© 2026 Anime Pack Opening • Sakura Eclipse TCG. Mikel Rivera Guerrero & Luis Estival Cantó.",

            cookie_banner_title: "Gestión de Cookies y Privacidad",
            cookie_banner_desc: "En Anime Pack Opening utilizamos cookies técnicas estrictamente necesarias para autenticar tu sesión mediante Supabase y recordar tu colección. No instalamos cookies de terceros sin tu consentimiento. Lee nuestra ",
            cookie_btn_all: "Aceptar Todas",
            cookie_btn_essential: "Solo Esenciales",
            cookie_btn_config: "Configurar",
            cookie_modal_title: "Configurar Preferencias de Cookies",
            cookie_modal_sub: "Elige qué categorías de cookies deseas permitir durante tu navegación en Anime Pack Opening.",
            cookie_modal_r1_title: "Cookies Técnicas Esenciales",
            cookie_modal_r1_desc: "Necesarias para la autenticación de Supabase, tokens de sesión y el funcionamiento básico del juego.",
            cookie_modal_r2_title: "Cookies de Preferencia de Usuario",
            cookie_modal_r2_desc: "Guardan localmente el estado de tus sobres y filtros de mazo sin enviar datos a terceros.",
            cookie_modal_r3_title: "Métricas y Rendimiento Anónimo",
            cookie_modal_r3_desc: "Permite recopilar datos de rendimiento del servidor y tiempos de carga sin identificar usuarios.",
            cookie_modal_save: "Guardar Configuración",
            cookie_modal_cancel: "Cancelar"
        }
    },
    en: {
        hero: {
            subtitle: "Explore my digital universe. An interactive planetary system where each planet is a part of my work.",
            howItWorks: "How does it work?",
            ariaHowItWorks: "How it works"
        },
        tutorial: {
            shipTitle: "The Spaceship",
            shipDesc: "Click the spaceship to explore space in 3D. Pilot it toward the planets to enter their pages. The controls are shown inside the game.",
            satelliteTitle: "The Satellite",
            satelliteDesc: "The satellite at the top right is your shortcut. Click it to open the menu, then choose Sun, Portfolio, Projects, Work or Lab to go straight to its page. Close the menu with Close, Esc or a click outside the panel.",
            planetsTitle: "The Planets",
            planetsDesc: "Portfolio contains my work and designs; Projects, my projects and SaaS; Work, my services and experience; and Lab, my experiments. Click a planet to preview its description, then choose Enter to explore its section.",
            sunTitle: "The Sun",
            sunDesc: "The center of my universe. Click the Sun to open its preview, then choose Enter to learn more about me. You can also get there through the satellite menu or by piloting the spaceship.",
            trashTitle: "Space Junk",
            trashDesc: "Click the asteroid at the top left to make it explode: it reappears a few seconds later. You can also drag the astronaut with your mouse or finger to move it around the scene.",
            infobotTitle: "InfoBot",
            infobotDesc: "Your personal assistant. Click the floating InfoBot (bottom-right corner) to view my full CV and download it as PDF.",
            prev: "Previous",
            "next": "Next",
            understood: "Got it"
        },
        infobot: {
            downloadPDF: "📥 Download PDF"
        },
        orbit: {
            portfolioDesc: "My works, designs, and effects.",
            projectsDesc: "My projects and SaaS I'm building.",
            workDesc: "Freelance, landings, and technical work.",
            labDesc: "Tests, chaos, and experiments.",
            sunDesc: "The center of the system. It all starts here."
        },
        zoom: {
            enter: "Enter planet",
            close: "Close"
        },
        launcher: {
            boot: "SYSTEM BOOT... OK",
            connect: "CONNECTING SATELLITES... OK",
            loading: "LOADING PLANETS...",
            close: "Close"
        },
        sun: {
            title: "SOLAR CORE - ABOUT ME",
            subtitle: "Explore my essence",
            back: "<< BACK TO HUB",
            guide: {
                title: "HUMAN MAP",
                head: "Head: Who am I?",
                throat: "Throat: Languages",
                heart: "Heart: Objectives",
                ear: "Ear: Contact",
                leftHand: "Left Hand: Frontend",
                rightArm: "Right Arm: Strengths",
                leftFoot: "Left Foot: Education",
                rightKnee: "Right Knee: Backend"
            },
            status: {
                loading: "LOADING DEV",
                systems: "NEURAL SYSTEMS: OK",
                contact: "CONTACT PROTOCOL: ACTIVE",
                coffee: "COFFEE LEVEL: CRITICAL"
            },
            parts: {
                head: {
                    title: "Who am I?",
                    p1: "I am <strong>Mikel Rivera</strong>, a full-stack software engineer from Bilbao. I build digital products from scratch: SaaS, webs, complete systems, and detail-oriented visual experiences.",
                    p2: "I move between <strong>Next.js, React, Node, MySQL, Kubernetes</strong> and everything involved in launching real, scalable projects with solid design.",
                    p3: "I am also the founder of <strong>Siéntame</strong> and creator of <strong>Webrior</strong>, my two biggest weapons as a developer and entrepreneur."
                },
                throat: {
                    title: "Languages",
                    l1: "🇪🇸 <strong>Spanish</strong> — Native",
                    l2: "🇬🇧 <strong>English</strong> — Advanced (C1 / B2)",
                    l3: "💻 <strong>Code</strong> — Fluent in several languages without drama"
                },
                heart: {
                    title: "My Objectives",
                    p1: "I want to build digital products that work, captivate, and provide real value. With a combination of solid technology and careful design.",
                    p2: "<strong>Right now focused on:</strong>",
                    l1: "Scaling <strong>Siéntame</strong> as a solid and profitable SaaS",
                    l2: "Leveling up Webrior with premium landings",
                    l3: "Migrating my entire stack to <strong>Next/Nest</strong>",
                    l4: "Becoming a top developer with clean architecture"
                },
                ear: {
                    title: "Contact Me",
                    p1: "Project, collaboration, or idea? Write to me without fear.",
                    p2: "I try to answer fast. If I delay, blame the coffee ☕"
                },
                leftHand: {
                    title: "Frontend Tools",
                    p1: "<strong>Frameworks:</strong>",
                    p2: "<strong>Design:</strong>",
                    p3: "<strong>My style:</strong> futuristic design, neon, clean, animated, and with care."
                },
                rightFoot: {
                    title: "Backend Tools",
                    p1: "<strong>Backend stack:</strong>",
                    p2: "<strong>Infrastructure:</strong>",
                    p3: "I love building things that scale without drama."
                },
                leftFoot: {
                    title: "Academic Background",
                    p1: "<strong>Education:</strong>",
                    l1: "Degree in Computer Engineering",
                    p2: "<strong>Professional Experience:</strong>",
                    l2: "Analyst at Deloitte – SAP/ABAP + architecture",
                    l3: "CTO and Co-founder of <strong>Siéntame</strong>",
                    l4: "Creator of <strong>Webrior</strong>",
                    p3: "Always learning: architecture, AI, design, cloud."
                },
                rightHand: {
                    title: "Personal Strengths",
                    p1: "<strong>Technical Skills:</strong>",
                    l1: "Problem solving with a cool head",
                    l2: "Modern and scalable architecture",
                    l3: "Web performance optimization",
                    l4: "Intuitive and futuristic design",
                    p2: "<strong>Soft Skills:</strong>",
                    l5: "Natural leadership",
                    l6: "Good communication and product vision",
                    l7: "Constancy and capacity for hard work"
                }
            }
        },
        portfolio: {
            title: "Portfolio",
            desc: "My works, designs, and effects."
        },
        portfolioPage: {
            title: "PORTFOLIO EXPLORATION",
            subtitle: "Select a timeline milestone",
            back: "<< BACK TO HUB",
            preview: {
                year: "YEAR:",
                number: "NO.",
                view: "VIEW FULL PROJECT <<"
            },
            items: {
                portfolio1: {
                    title: "AI Financial Ecosystem",
                    desc: "Predictive analysis platform for emerging markets using TensorFlow."
                },
                portfolio2: {
                    title: "Educational Metaverse",
                    desc: "Virtual reality environment for collaborative learning in medicine."
                },
                p3: {
                    title: "Blockchain Supply Chain",
                    desc: "Decentralized traceability system for international logistics."
                },
                p4: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                },
                p5: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                },
                p6: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                }
            }
        },
        projects: {
            title: "Projects",
            desc: "My projects and SaaS I'm building."
        },
        projectsPage: {
            title: "SELECT YOUR DESTINATION",
            back: "<< BACK TO SOLAR SYSTEM",
            tooltips: {
                holo: "Select Holographic Technology",
                steam: "Select Steampunk Industry"
            },
            panels: {
                holo: {
                    title: "SECTOR: LANDINGS",
                    desc: "High-tech immersive interfaces. Access to rapid deployment gallery and advanced UX/UI systems.",
                    items: ["Start Gallery", "UX/UI Protocols", "React Systems"],
                    button: "View Landings"
                },
                steam: {
                    title: "SECTOR: PROJECTS",
                    desc: "Industrial development complex. Robust backend architecture, database machinery, and APIs.",
                    items: ["Architecture Blueprints", "Engine Room (Stack)", "Node.js Engineering"],
                    button: "View Projects"
                }
            }
        },
        work: {
            title: "Work",
            desc: "Freelance, landings, and technical work."
        },
        workPage: {
            back: "<< BACK TO HUB",
            banner: {
                title: "WORK METROPOLIS",
                subtitle: "The origin of the journey"
            },
            items: {
                work1: {
                    role: "Web Developer / Technical Web Developer",
                    desc: "End-to-end web development in an on-site environment. Implementation of features in WordPress, maintenance of internal platforms, and technical support. Work focused on optimization, issue resolution, and development of new features."
                },
                work2: {
                    role: "IT Auditor (Internship)",
                    desc: "Audit of digital systems and platforms, analysis of technological risks, and evaluation of IT controls. Data integrity validation, cybersecurity review, and preparation of technical reports. Direct work with standards such as ISO 27001, SOC 1, and SOC 2."
                },
                work3: {
                    role: "Analyst – Enterprise Technology (SAP)",
                    desc: "Technical and functional support in SAP solutions for enterprise clients. Development and customization of SAP systems, integration between platforms, and participation in digital transformation projects in the T&T sector. I bring a hybrid vision between software engineering and technological consulting."
                },
                work4: {
                    role: "Full Stack Developer",
                    desc: "Development of SaaS solutions, web applications, and consulting for small businesses and startups. Work on own products and digital services with a focus on scalability, modern UX, and cloud deployments."
                }
            }
        },
        lab: {
            title: "Lab",
            desc: "Tests, chaos, and experiments."
        },
        labPage: {
            title: "EXPERIMENT LABORATORY",
            subtitle: "Explore my tests and prototypes",
            back: "<< BACK TO HUB",
            preview: {
                year: "YEAR:",
                number: "NO.",
                view: "VIEW EXPERIMENT <<"
            },
            items: {
                lab1: {
                    title: "ALPHA EXPERIMENT",
                    desc: "Initial research on neural interfaces and their application in immersive web environments."
                },
                lab2: {
                    title: "BETA PROTOTYPE",
                    desc: "Development of a particle system reactive to the cursor using WebGL and custom shaders."
                },
                lab3: {
                    title: "GAMMA SYSTEM",
                    desc: "Implementation of genetic algorithms for route optimization in complex data visualizations."
                },
                lab4: {
                    title: "GAMMA SYSTEM",
                    desc: "Implementation of genetic algorithms for route optimization in complex data visualizations."
                },
                lab5: {
                    title: "GAMMA SYSTEM",
                    desc: ""
                }
            }
        },
        apo: {
            nav_home: "Home",
            nav_privacy: "Privacy Policy",
            nav_terms: "Terms & Conditions",
            nav_cookies: "Cookie Policy",
            nav_contact: "Contact & Support",
            nav_delete_account: "Delete Account",
            lang_switch: "Language",

            home_badge: "Official Hub & Legal Center • Sakura Eclipse TCG",
            home_title_main: "ANIME",
            home_title_sub: "PACK OPENING",
            home_japanese: "サクラ・エクリプス • SAKURA ECLIPSE",
            home_subtitle: "Official portal for legal compliance, terms of use, privacy policy, and user rights management for the Anime Pack Opening mobile application.",
            home_section_title: "Documentation & Legal Compliance",
            home_section_sub: "Direct access to privacy policies and terms of service",
            
            home_card_privacy_title: "Privacy Policy",
            home_card_privacy_desc: "Detailed information on technical data handling, app infrastructure, AdMob ads, and your GDPR / ARCO+ rights.",
            home_card_privacy_btn: "View Privacy Policy →",
            
            home_card_terms_title: "Terms & Conditions",
            home_card_terms_desc: "General terms of service, age requirements, intellectual property, and no real-money gambling declaration.",
            home_card_terms_btn: "View Terms & Conditions →",
            
            home_card_deletion_title: "Account Deletion",
            home_card_deletion_desc: "Account and data deletion is initiated directly via the button located inside the mobile application settings.",
            home_card_deletion_btn: "Account Deletion Info →",
            
            home_card_contact_title: "Legal Contact & Support",
            home_card_contact_desc: "Direct support contact form for developers to answer inquiries, issues, or exercise privacy rights.",
            home_card_contact_btn: "Contact Form →",

            deletion_badge: "GOOGLE PLAY PRIVACY COMPLIANCE",
            deletion_title: "Account & Data Deletion",
            deletion_meta: "Official public information page regarding user data deletion for Anime Pack Opening (Sakura Eclipse)",
            deletion_sec1_title: "1. How to Delete Your Account from the Mobile App",
            deletion_sec1_box_title: "📱 Direct deletion from the App Settings menu",
            deletion_sec1_box_desc: "Account deletion is carried out strictly from within the Sakura Eclipse (Anime Pack Opening) mobile application.",
            deletion_step1: "Open the mobile application on your device.",
            deletion_step2: "Go to the Settings / Profile menu.",
            deletion_step3: "Tap the 'Delete Account' button and confirm the action.",
            deletion_sec2_title: "2. What Data is PERMANENTLY Deleted?",
            deletion_sec2_desc: "Upon confirming deletion via the app button, the following are irreversibly removed:",
            deletion_data1: "Account Data: User record in the database and associated email address.",
            deletion_data2: "Player Profile: Public username, avatar, and registration date.",
            deletion_data3: "Card Collection: Accumulated card deck and unlocked cards.",
            deletion_data4: "Resources & Progress: Mystic Essence balance and opening history.",
            deletion_sec3_title: "3. Temporarily Retained Data for Legal Imperatives",
            deletion_sec3_desc: "For strict security, auditing, and fraud prevention reasons:",
            deletion_ret1: "Technical Security Logs: Anonymous audit logs may be retained to protect the infrastructure.",
            deletion_ret2: "Retention Period: Up to 30 days. After this period, logs are permanently purged.",
            deletion_sec4_title: "4. Support & Email Enquiries",
            deletion_sec4_desc: "If you have lost access to your device or need assistance with account deletion, you may contact the developer team via the Contact Form or by emailing directly to",
            deletion_sec4_note: "📌 Security Note: To protect our users' accounts and prevent unauthorized deletion requests, strict identity and account ownership verification is required before processing any email request.",

            privacy_badge: "OFFICIAL LEGAL DOCUMENTATION",
            privacy_title: "Privacy Policy",
            privacy_meta: "Last updated: September 23, 2026 | Applicable to Anime Pack Opening",
            privacy_sec1_title: "1. Data Controller Identity",
            privacy_sec1_desc: "The data controllers responsible for personal data collected through the trading card game and website Anime Pack Opening (Sakura Eclipse) are:",
            privacy_dev_names: "Legal Names / Developers:",
            privacy_dev_email: "Support & Privacy Email:",
            privacy_dev_phone: "Phone Number:",
            privacy_dev_domain: "Official Domain:",
            privacy_dev_location: "Jurisdiction / Location:",
            privacy_sec2_title: "2. Personal & Advertising Data We Collect",
            privacy_sec2_desc: "Depending on your interaction with Anime Pack Opening (visitor mode or registered account), we process data necessary to provide game experience and serve ads:",
            privacy_data_id: "Account & ID Data: Email address, public username, and unique user ID (Supabase UUID).",
            privacy_data_progress: "Progress & Collection Data: Revealed cards, pack inventory, Mystic Essence balance, and opening logs.",
            privacy_data_tech: "Technical & Security Data: Anonymized IP address, session JWT tokens, device/browser version, and error logs.",
            privacy_data_admob: "Mobile Advertising Identifiers (Google AdMob): Device advertising ID (GAID/IDFA), ad interaction logs, and coarse geolocation IP to serve ads and verify rewards.",
            privacy_sec3_title: "3. Purpose and Legal Basis of Processing",
            privacy_purpose_contract: "Service Execution (Contract): Account creation, card deck saving, and collection synchronization.",
            privacy_purpose_ads: "Monetization & Advertising (Google AdMob): Displaying rewarded, interstitial, or banner ads for in-game items.",
            privacy_purpose_security: "Legitimate Interest & Security: Fraud prevention, infrastructure protection, and support request handling.",
            privacy_purpose_consent: "Explicit Consent: Answering support messages and managing account deletion requests.",
            privacy_sec4_title: "4. Infrastructure Providers, Advertising & Third Parties",
            privacy_sec4_desc: "To deliver the service and handle advertisements, we use the following certified service providers:",
            privacy_provider_supabase: "Supabase Inc. (Database & Auth): Infrastructure hosting for user authentication and collection storage via Row Level Security (RLS) policies.",
            privacy_provider_admob: "Google AdMob - Google LLC (Mobile Ad Network): Used for serving and rendering advertisements in the mobile app. Google AdMob collects advertising IDs, IP addresses, and performance metrics. Learn more at ",
            privacy_no_sell: "We do NOT sell or market your direct personal data to third parties for commercial telemarketing or external databases.",
            privacy_sec5_title: "5. Data Retention Periods",
            privacy_sec5_desc: "Data is retained while the user account remains active. Upon requesting account deletion, associated personal data is purged immediately or within a maximum of 30 days.",
            privacy_sec6_title: "6. User Rights (GDPR / ARCO+)",
            privacy_sec6_desc: "Under the General Data Protection Regulation (GDPR), you have the right to request Access, Rectification, Erasure, Restriction, and Data Portability.",
            privacy_sec7_title: "7. Protection of Minors",
            privacy_sec7_desc: "Anime Pack Opening is not intentionally directed at children under 14 without legal guardian supervision.",

            terms_badge: "OFFICIAL LEGAL DOCUMENTATION",
            terms_title: "Terms and Conditions of Use",
            terms_meta: "Effective date: September 23, 2026 | Developed by Mikel Rivera Guerrero & Luis Estival Cantó",
            terms_sec1_title: "1. Developer Identification & Acceptance",
            terms_sec1_desc: "These Terms govern access to and use of the website and game Anime Pack Opening (Sakura Eclipse), managed by Mikel Rivera Guerrero & Luis Estival Cantó ('the Developers').",
            terms_sec2_title: "2. Service Description & Card Pack Mechanics",
            terms_sec2_desc: "Anime Pack Opening is a digital entertainment trading card game platform. Cards, packs, and Mystic Essence points are virtual digital goods with no real-world monetary value.",
            terms_sec2_no_gambling: "Important Notice: Digital cards do not constitute real-money gambling or cash payouts.",
            terms_sec3_title: "3. Age Requirements & Account Registration",
            terms_sec3_desc: "You must be at least 14 years old to register an account in Anime Pack Opening. Users are responsible for maintaining account confidentiality.",
            terms_sec4_title: "4. Prohibited Conduct",
            terms_sec4_desc: "Automated bots, hacks, altering drop odds, database breach attempts, and third-party real-money account trading are strictly prohibited.",
            terms_sec5_title: "5. Intellectual Property",
            terms_sec5_desc: "The name Anime Pack Opening, Sakura Eclipse logo, UI design, source code, and original SVG card artwork belong exclusively to the Developers.",
            terms_sec6_title: "6. Service Availability & Suspension",
            terms_sec6_desc: "Developers reserve the right to perform maintenance, update cards, or suspend services temporarily for security reasons.",
            terms_sec7_title: "7. Account Cancellation & Data Removal",
            terms_sec7_desc: "You may request account deletion at any time via the Account Deletion section.",
            terms_sec8_title: "8. Applicable Law & Jurisdiction",
            terms_sec8_desc: "These Terms are governed by the laws of Spain / European Union.",

            cookies_badge: "BROWSING INFORMATION",
            cookies_title: "Cookie and Storage Policy",
            cookies_meta: "Technical transparency in cookie usage and LocalStorage in Anime Pack Opening",
            cookies_sec1_title: "1. What are cookies and local storage?",
            cookies_sec1_desc: "Cookies and LocalStorage store small data files on your device to retain session authentication state and user preferences.",
            cookies_sec2_title: "2. Cookies & Technologies used in Anime Pack Opening",
            cookies_sec2_essential: "Essential Technical Cookies (Supabase Auth): Store secure JWT session tokens necessary for login.",
            cookies_sec2_local: "Local Storage Preferences: Save local pack balances and unlocked cards during visitor mode.",
            cookies_sec3_title: "3. Absence of Third-Party Web Tracking Cookies",
            cookies_sec3_desc: "We do not install third-party tracking cookies on our web portal.",
            cookies_sec4_title: "4. Managing Cookies",
            cookies_sec4_desc: "You can manage or clear cookies at any time via your browser settings.",

            contact_badge: "USER SUPPORT",
            contact_title: "Legal Contact & Technical Support",
            contact_meta: "Get in touch with the Anime Pack Opening developer team",
            contact_form_title: "Direct Contact Form",
            contact_form_desc: "Fill in the fields below for legal inquiries, card support, account issues, or privacy rights:",
            contact_name_label: "Full Name / Nickname:",
            contact_email_label: "Email Address:",
            contact_subject_label: "Inquiry Subject:",
            contact_message_label: "Detailed Message:",
            contact_consent_label: "I have read and expressly accept the Privacy Policy for processing my personal data to answer this inquiry.",
            contact_submit_btn: "✉️ Send Contact Message",
            contact_submitting: "Sending...",
            contact_dev_info_title: "Developer Information",
            contact_opt_tech: "Technical Support / Game Issue",
            contact_opt_privacy: "Privacy, Data & GDPR Rights",
            contact_opt_ip: "Intellectual Property Inquiry",
            contact_opt_other: "Other General Inquiry",

            footer_desc: "The ultimate anime card pack opening experience in Sakura Eclipse. Collect astral warriors and sakura spirits.",
            footer_dev_label: "Official Developers:",
            footer_legal_heading: "Legal Compliance",
            footer_support_heading: "Support & Google Play",
            footer_support_text: "For legal inquiries, exercising privacy rights, or direct technical support:",
            footer_gp_tag: "✅ Public links suited for Google Play Console Store Listing",
            footer_ip_disclaimer: "Intellectual Property Notice: Anime Pack Opening by Sakura Eclipse is an original independent trading card game (TCG). All trademarks, illustrations, names, and mechanics are owned by its developers. No copyrighted third-party material is used without license.",
            footer_copyright: "© 2026 Anime Pack Opening • Sakura Eclipse TCG. Mikel Rivera Guerrero & Luis Estival Cantó.",

            cookie_banner_title: "Cookie & Privacy Management",
            cookie_banner_desc: "We use strictly necessary technical cookies to authenticate session state via Supabase and save preferences. Read our ",
            cookie_btn_all: "Accept All",
            cookie_btn_essential: "Essential Only",
            cookie_btn_config: "Configure",
            cookie_modal_title: "Configure Cookie Preferences",
            cookie_modal_sub: "Choose which categories of cookies you wish to allow during your navigation on Anime Pack Opening.",
            cookie_modal_r1_title: "Essential Technical Cookies",
            cookie_modal_r1_desc: "Necessary for Supabase authentication, session tokens, and basic game operation.",
            cookie_modal_r2_title: "User Preference Cookies",
            cookie_modal_r2_desc: "Save locally your pack status and collection filters without sending data to third parties.",
            cookie_modal_r3_title: "Anonymous Metrics & Performance",
            cookie_modal_r3_desc: "Allows collecting server performance and load times without identifying users.",
            cookie_modal_save: "Save Settings",
            cookie_modal_cancel: "Cancel"
        }
    }
};

function detectPreferredLanguage() {
    // 1. Check URL search param (?lang=es or ?lang=en)
    if (typeof window !== 'undefined' && window.location) {
        try {
            const params = new URLSearchParams(window.location.search);
            const queryLang = params.get('lang')?.toLowerCase();
            if (queryLang === 'es' || queryLang === 'en') {
                return queryLang;
            }
        } catch {
            // Ignore URL parsing errors
        }
    }

    // 2. Check if user explicitly set a preference in localStorage
    if (typeof localStorage !== 'undefined') {
        try {
            const manualChoice = localStorage.getItem('language_manual_choice');
            const savedLang = localStorage.getItem('language');
            if (manualChoice === 'true' && (savedLang === 'es' || savedLang === 'en')) {
                return savedLang;
            }
        } catch {
            // Ignore storage errors
        }
    }

    // 3. Auto-detect from browser / OS language settings
    if (typeof navigator !== 'undefined') {
        try {
            const candidates = [];
            if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
                candidates.push(...navigator.languages);
            }
            if (navigator.language) candidates.push(navigator.language);
            if (navigator.userLanguage) candidates.push(navigator.userLanguage);
            if (navigator.browserLanguage) candidates.push(navigator.browserLanguage);

            for (const item of candidates) {
                if (!item || typeof item !== 'string') continue;
                const normalized = item.toLowerCase().trim();
                // Spanish language or co-official languages in Spain (Basque, Catalan, Galician)
                if (
                    normalized.startsWith('es') ||
                    normalized.startsWith('eu') ||
                    normalized.startsWith('ca') ||
                    normalized.startsWith('gl')
                ) {
                    return 'es';
                }
                if (normalized.startsWith('en')) {
                    return 'en';
                }
            }
        } catch {
            // Ignore detection errors
        }
    }

    // 4. Default fallback: Spanish
    return 'es';
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => detectPreferredLanguage());

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (newLang) => {
        if (newLang === 'es' || newLang === 'en') {
            setLanguageState(newLang);
            // A query override must agree with a later explicit selection on reload.
            const url = new URL(window.location.href);
            if (url.searchParams.has('lang')) {
                url.searchParams.set('lang', newLang);
                window.history.replaceState(window.history.state, '', url);
            }
            try {
                localStorage.setItem('language', newLang);
                localStorage.setItem('language_manual_choice', 'true');
            } catch {
                // Ignore storage errors
            }
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const currentTrans = translations[language] || translations.es;
    const t = (key) => {
        if (typeof key === 'string') {
            if (key.startsWith('apo.')) {
                const subKey = key.slice(4);
                return currentTrans.apo?.[subKey] || key;
            }
            return currentTrans.apo?.[key] || currentTrans[key] || key;
        }
        return currentTrans;
    };
    Object.assign(t, currentTrans);

    return (
        <LanguageContext.Provider value={{ language, lang: language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
