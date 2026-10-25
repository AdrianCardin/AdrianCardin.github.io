// Selector de idioma para las páginas de este sitio (soporte + privacidad).
// Recorre cada elemento con [data-i18n="clave"] y sustituye su texto (o su
// HTML, si tiene data-i18n-html) por la traducción del idioma activo.
// El español que hay escrito directamente en el HTML es el contenido por
// defecto: si JS no llega a cargar, la página sigue siendo legible.
(function () {
  const LANGS = ["es", "en", "fr", "de", "it"];
  const LANG_NAMES = { es: "ES", en: "EN", fr: "FR", de: "DE", it: "IT" };

  const translations = {
    "support.eyebrow": { es: "Soporte", en: "Support", fr: "Assistance", de: "Support", it: "Assistenza" },
    "support.h1": {
      es: "¿En qué puedo ayudarte?",
      en: "How can I help?",
      fr: "Comment puis-je vous aider ?",
      de: "Wie kann ich helfen?",
      it: "Come posso aiutarti?",
    },
    "support.lead": {
      es: "Apps hechas por Adrián Cardín. Si algo falla, tienes una duda o una idea, escríbeme — abajo tienes el correo.",
      en: "Apps made by Adrián Cardín. If something's not working, you have a question, or an idea, write to me — the email is below.",
      fr: "Applications créées par Adrián Cardín. Si quelque chose ne fonctionne pas, si vous avez une question ou une idée, écrivez-moi — l'adresse e-mail est ci-dessous.",
      de: "Apps von Adrián Cardín. Wenn etwas nicht funktioniert, du eine Frage oder eine Idee hast, schreib mir — die E-Mail-Adresse steht unten.",
      it: "App create da Adrián Cardín. Se qualcosa non funziona, hai un dubbio o un'idea, scrivimi — trovi l'email qui sotto.",
    },
    "support.apps.title": { es: "Apps", en: "Apps", fr: "Applications", de: "Apps", it: "App" },
    "support.apps.app1.desc": {
      es: "Listas de tareas y compra, con la opción de compartirlas con otras personas.",
      en: "To-do and shopping lists, with the option to share them with other people.",
      fr: "Listes de tâches et de courses, avec la possibilité de les partager avec d'autres personnes.",
      de: "Aufgaben- und Einkaufslisten, die du mit anderen teilen kannst.",
      it: "Liste di cose da fare e della spesa, con la possibilità di condividerle con altre persone.",
    },
    "support.apps.app2.desc": {
      es: "Control y seguimiento de gastos personales.",
      en: "Track and manage your personal expenses.",
      fr: "Suivi et gestion de vos dépenses personnelles.",
      de: "Verwaltung und Überblick über deine persönlichen Ausgaben.",
      it: "Controllo e monitoraggio delle tue spese personali.",
    },
    "support.apps.app3.desc": {
      es: "Diario personal privado.",
      en: "A private personal journal.",
      fr: "Un journal personnel privé.",
      de: "Ein privates persönliches Tagebuch.",
      it: "Un diario personale privato.",
    },
    "support.apps.app4.desc": {
      es: "Calculadora de amortización de préstamos, con simulador de amortizaciones anticipadas.",
      en: "Loan amortization calculator, with an early-repayment simulator.",
      fr: "Calculatrice d'amortissement de prêts, avec simulateur de remboursement anticipé.",
      de: "Tilgungsrechner für Kredite, mit einem Simulator für Sondertilgungen.",
      it: "Calcolatrice di ammortamento prestiti, con simulatore di rimborso anticipato.",
    },
    "support.apps.app5.desc": {
      es: "Registro de los libros, películas, series, videojuegos y música que has disfrutado o tienes pendientes, con recomendaciones según tus gustos.",
      en: "Keep track of the books, movies, TV shows, video games and music you've enjoyed or have on your list, with recommendations based on your taste.",
      fr: "Suivez les livres, films, séries, jeux vidéo et musiques que vous avez appréciés ou que vous avez en attente, avec des recommandations selon vos goûts.",
      de: "Behalte den Überblick über Bücher, Filme, Serien, Videospiele und Musik, die du genossen hast oder noch vorhast, mit Empfehlungen nach deinem Geschmack.",
      it: "Tieni traccia di libri, film, serie, videogiochi e musica che hai apprezzato o che hai in sospeso, con consigli in base ai tuoi gusti.",
    },
    "support.faq.title": {
      es: "Preguntas frecuentes",
      en: "Frequently asked questions",
      fr: "Questions fréquentes",
      de: "Häufige Fragen",
      it: "Domande frequenti",
    },
    "support.faq.q1": {
      es: "Se me ha cerrado la app o no funciona bien",
      en: "The app crashed or isn't working properly",
      fr: "L'application s'est fermée ou ne fonctionne pas correctement",
      de: "Die App ist abgestürzt oder funktioniert nicht richtig",
      it: "L'app si è chiusa o non funziona bene",
    },
    "support.faq.a1": {
      es: "Escríbeme indicando el nombre de la app, el modelo de tu dispositivo y qué estabas haciendo cuando ocurrió. Intento responder lo antes posible.",
      en: "Write to me with the app's name, your device model, and what you were doing when it happened. I try to reply as soon as I can.",
      fr: "Écrivez-moi en indiquant le nom de l'application, le modèle de votre appareil et ce que vous faisiez au moment du problème. J'essaie de répondre le plus vite possible.",
      de: "Schreib mir mit dem Namen der App, deinem Gerätemodell und was du gerade gemacht hast, als es passiert ist. Ich versuche, so schnell wie möglich zu antworten.",
      it: "Scrivimi indicando il nome dell'app, il modello del tuo dispositivo e cosa stavi facendo quando è successo. Cerco di rispondere il prima possibile.",
    },
    "support.faq.q2": {
      es: "¿Mis datos se comparten con terceros?",
      en: "Is my data shared with third parties?",
      fr: "Mes données sont-elles partagées avec des tiers ?",
      de: "Werden meine Daten an Dritte weitergegeben?",
      it: "I miei dati vengono condivisi con terze parti?",
    },
    "support.faq.a2": {
      es: "No. Los datos se guardan en tu dispositivo y, si la app lo permite, en tu propia cuenta de iCloud, para que puedas usarlos entre tus dispositivos o compartirlos con quien tú elijas.",
      en: "No. Your data stays on your device and, if the app supports it, in your own iCloud account, so you can use it across your devices or share it with whoever you choose.",
      fr: "Non. Les données restent sur votre appareil et, si l'application le permet, sur votre propre compte iCloud, afin que vous puissiez les utiliser sur tous vos appareils ou les partager avec qui vous voulez.",
      de: "Nein. Deine Daten bleiben auf deinem Gerät und, sofern die App es unterstützt, in deinem eigenen iCloud-Konto, damit du sie auf all deinen Geräten nutzen oder mit wem du möchtest teilen kannst.",
      it: "No. I dati restano sul tuo dispositivo e, se l'app lo consente, nel tuo account iCloud personale, così puoi usarli su tutti i tuoi dispositivi o condividerli con chi preferisci.",
    },
    "support.faq.q3": {
      es: "Tengo una sugerencia o he encontrado un fallo",
      en: "I have a suggestion or found a bug",
      fr: "J'ai une suggestion ou j'ai trouvé un bug",
      de: "Ich habe einen Vorschlag oder einen Fehler gefunden",
      it: "Ho un suggerimento o ho trovato un errore",
    },
    "support.faq.a3": {
      es: "Cualquier idea o error que me cuentes ayuda a mejorar la app. Escríbeme al correo de abajo.",
      en: "Any idea or bug you report helps improve the app. Write to me at the email below.",
      fr: "Toute idée ou bug signalé aide à améliorer l'application. Écrivez-moi à l'adresse ci-dessous.",
      de: "Jede Idee oder jeder gemeldete Fehler hilft, die App zu verbessern. Schreib mir an die E-Mail-Adresse unten.",
      it: "Qualsiasi idea o errore segnalato aiuta a migliorare l'app. Scrivimi all'email qui sotto.",
    },
    "support.contact.title": { es: "Contacto", en: "Contact", fr: "Contact", de: "Kontakt", it: "Contatti" },
    "support.contact.label": {
      es: "Correo directo",
      en: "Direct email",
      fr: "E-mail direct",
      de: "Direkte E-Mail",
      it: "Email diretta",
    },
    "support.footer.privacyLink": {
      es: "Privacidad →",
      en: "Privacy →",
      fr: "Confidentialité →",
      de: "Datenschutz →",
      it: "Privacy →",
    },

    "privacy.eyebrow": { es: "Privacidad", en: "Privacy", fr: "Confidentialité", de: "Datenschutz", it: "Privacy" },
    "privacy.h1": {
      es: "Política de privacidad",
      en: "Privacy Policy",
      fr: "Politique de confidentialité",
      de: "Datenschutzerklärung",
      it: "Informativa sulla privacy",
    },
    "privacy.lead": {
      es: "Aplica a mis apps: Listas compartidas (Próximamente, iOS), Gastos+ (iOS), Mi Diario (Próximamente, iOS), Amortiza+ (iOS) y LoreTime (Próximamente, iOS y macOS).",
      en: "Applies to my apps: Listas compartidas (Coming soon, iOS), Gastos+ (iOS), Mi Diario (Coming soon, iOS), Amortiza+ (iOS), and LoreTime (Coming soon, iOS and macOS).",
      fr: "S'applique à mes applications : Listas compartidas (Bientôt disponible, iOS), Gastos+ (iOS), Mi Diario (Bientôt disponible, iOS), Amortiza+ (iOS) et LoreTime (Bientôt disponible, iOS et macOS).",
      de: "Gilt für meine Apps: Listas compartidas (Demnächst, iOS), Gastos+ (iOS), Mi Diario (Demnächst, iOS), Amortiza+ (iOS) sowie LoreTime (Demnächst, iOS und macOS).",
      it: "Si applica alle mie app: Listas compartidas (Prossimamente, iOS), Gastos+ (iOS), Mi Diario (Prossimamente, iOS), Amortiza+ (iOS) e LoreTime (Prossimamente, iOS e macOS).",
    },
    "privacy.updated": {
      es: "Última actualización: 25 de octubre de 2026",
      en: "Last updated: October 25, 2026",
      fr: "Dernière mise à jour : 25 octobre 2026",
      de: "Letzte Aktualisierung: 25. Oktober 2026",
      it: "Ultimo aggiornamento: 25 ottobre 2026",
    },
    "privacy.s1.title": {
      es: "Qué datos recopilo",
      en: "What data I collect",
      fr: "Quelles données je collecte",
      de: "Welche Daten ich sammle",
      it: "Quali dati raccolgo",
    },
    "privacy.s1.p1": {
      es: "Ninguno. No tienen registro ni cuenta de usuario, no incluyen analítica, publicidad ni ningún SDK de terceros que recoja información sobre ti o tu uso de la app.",
      en: "None. These apps have no sign-up or user account, and include no analytics, advertising, or third-party SDK that collects information about you or your use of the app.",
      fr: "Aucune. Ces applications n'ont ni inscription ni compte utilisateur, et n'intègrent aucun outil d'analyse, de publicité ou de SDK tiers collectant des informations sur vous ou votre utilisation de l'application.",
      de: "Keine. Diese Apps haben keine Registrierung oder kein Benutzerkonto und enthalten keine Analyse-, Werbe- oder Dritt-SDKs, die Informationen über dich oder deine Nutzung der App sammeln.",
      it: "Nessuno. Queste app non richiedono registrazione né account utente e non includono analisi, pubblicità o SDK di terze parti che raccolgano informazioni su di te o sul tuo utilizzo dell'app.",
    },
    "privacy.s1.p2": {
      es: "Todo lo que escribes en la app (listas, gastos, entradas de diario, tu biblioteca de LoreTime) se queda en tu dispositivo, salvo lo indicado en los siguientes puntos.",
      en: "Everything you write in the app (lists, expenses, journal entries, your LoreTime library) stays on your device, except as noted below.",
      fr: "Tout ce que vous écrivez dans l'application (listes, dépenses, entrées de journal, votre bibliothèque LoreTime) reste sur votre appareil, sauf indication contraire ci-dessous.",
      de: "Alles, was du in der App schreibst (Listen, Ausgaben, Tagebucheinträge, deine LoreTime-Bibliothek), bleibt auf deinem Gerät, außer wie in den folgenden Punkten beschrieben.",
      it: "Tutto ciò che scrivi nell'app (liste, spese, voci del diario, la tua libreria di LoreTime) resta sul tuo dispositivo, salvo quanto indicato di seguito.",
    },
    "privacy.s2.title": {
      es: "Sincronización con iCloud",
      en: "iCloud sync",
      fr: "Synchronisation iCloud",
      de: "iCloud-Synchronisierung",
      it: "Sincronizzazione con iCloud",
    },
    "privacy.s2.p1": {
      es: "Cuando esté activada, la sincronización entre tus dispositivos se hace a través de tu propia cuenta de iCloud, usando CloudKit de Apple. Esos datos viven en tu cuenta de Apple, no en ningún servidor mío — yo no tengo acceso a ellos.",
      en: "When enabled, syncing across your devices happens through your own iCloud account, using Apple's CloudKit. That data lives in your Apple account, not on any server of mine — I have no access to it.",
      fr: "Lorsqu'elle est activée, la synchronisation entre vos appareils se fait via votre propre compte iCloud, grâce à CloudKit d'Apple. Ces données vivent dans votre compte Apple, pas sur un de mes serveurs — je n'y ai aucun accès.",
      de: "Wenn aktiviert, erfolgt die Synchronisierung zwischen deinen Geräten über dein eigenes iCloud-Konto mithilfe von Apples CloudKit. Diese Daten liegen in deinem Apple-Konto, nicht auf einem Server von mir — ich habe keinen Zugriff darauf.",
      it: "Quando attiva, la sincronizzazione tra i tuoi dispositivi avviene tramite il tuo account iCloud personale, usando CloudKit di Apple. Questi dati risiedono nel tuo account Apple, non su un mio server — non ho alcun accesso ad essi.",
    },
    "privacy.s3.title": {
      es: "Compartir listas",
      en: "Sharing lists",
      fr: "Partage de listes",
      de: "Listen teilen",
      it: "Condivisione delle liste",
    },
    "privacy.s3.p1": {
      es: 'En <strong>Listas compartidas</strong>, si decides compartir una lista con otra persona, esa persona podrá ver y editar el contenido de esa lista concreta a través de una invitación de iCloud que tú envías y controlas. Puedes dejar de compartirla cuando quieras.',
      en: 'In <strong>Listas compartidas</strong>, if you choose to share a list with someone else, that person will be able to view and edit that specific list\'s content through an iCloud invitation that you send and control. You can stop sharing it at any time.',
      fr: 'Dans <strong>Listas compartidas</strong>, si vous choisissez de partager une liste avec quelqu\'un, cette personne pourra voir et modifier le contenu de cette liste via une invitation iCloud que vous envoyez et contrôlez. Vous pouvez arrêter le partage à tout moment.',
      de: 'Wenn du in <strong>Listas compartidas</strong> eine Liste mit jemandem teilst, kann diese Person den Inhalt dieser bestimmten Liste über eine iCloud-Einladung, die du sendest und kontrollierst, ansehen und bearbeiten. Du kannst die Freigabe jederzeit beenden.',
      it: 'In <strong>Listas compartidas</strong>, se scegli di condividere una lista con un\'altra persona, questa potrà visualizzare e modificare il contenuto di quella lista tramite un invito iCloud che invii e controlli tu. Puoi interrompere la condivisione in qualsiasi momento.',
    },
    "privacy.s7.title": {
      es: "Catálogos externos (LoreTime)",
      en: "External catalogs (LoreTime)",
      fr: "Catalogues externes (LoreTime)",
      de: "Externe Kataloge (LoreTime)",
      it: "Cataloghi esterni (LoreTime)",
    },
    "privacy.s7.p1": {
      es: "Para buscar obras, mostrar portadas y calcular recomendaciones, <strong>LoreTime</strong> consulta catálogos públicos: Open Library (libros), TMDB (películas y series), IGDB (videojuegos), y MusicBrainz y Cover Art Archive (música). Las consultas a TMDB e IGDB pasan por un pequeño servidor intermedio mío que solo añade las claves de acceso y guarda temporalmente las respuestas de los catálogos; no registra quién hace cada consulta.",
      en: "To search for titles, show covers, and work out recommendations, <strong>LoreTime</strong> queries public catalogs: Open Library (books), TMDB (movies and TV shows), IGDB (video games), and MusicBrainz and Cover Art Archive (music). Requests to TMDB and IGDB go through a small intermediate server of mine that only adds the access keys and temporarily caches the catalogs' responses; it doesn't record who makes each request.",
      fr: "Pour rechercher des œuvres, afficher les couvertures et calculer des recommandations, <strong>LoreTime</strong> interroge des catalogues publics : Open Library (livres), TMDB (films et séries), IGDB (jeux vidéo), ainsi que MusicBrainz et Cover Art Archive (musique). Les requêtes vers TMDB et IGDB passent par un petit serveur intermédiaire à moi qui se contente d'ajouter les clés d'accès et de garder temporairement en cache les réponses des catalogues ; il n'enregistre pas qui fait chaque requête.",
      de: "Um Werke zu suchen, Cover anzuzeigen und Empfehlungen zu berechnen, fragt <strong>LoreTime</strong> öffentliche Kataloge ab: Open Library (Bücher), TMDB (Filme und Serien), IGDB (Videospiele) sowie MusicBrainz und Cover Art Archive (Musik). Anfragen an TMDB und IGDB laufen über einen kleinen Zwischenserver von mir, der nur die Zugangsschlüssel hinzufügt und die Antworten der Kataloge vorübergehend zwischenspeichert; er speichert nicht, wer welche Anfrage stellt.",
      it: "Per cercare opere, mostrare le copertine e calcolare i consigli, <strong>LoreTime</strong> consulta cataloghi pubblici: Open Library (libri), TMDB (film e serie), IGDB (videogiochi), e MusicBrainz e Cover Art Archive (musica). Le richieste a TMDB e IGDB passano per un piccolo server intermedio mio che si limita ad aggiungere le chiavi di accesso e a conservare temporaneamente le risposte dei cataloghi; non registra chi fa ogni richiesta.",
    },
    "privacy.s7.p2": {
      es: "Lo único que se envía es lo que buscas y los identificadores de las obras de las que se piden detalles o recomendaciones (por ejemplo, las que has marcado como vistas). Nunca se envían tus valoraciones ni tus notas. Como en cualquier conexión a internet, estos servicios ven la dirección IP desde la que llega la petición.",
      en: "The only things sent are what you search for and the IDs of the titles whose details or recommendations are requested (for example, the ones you've marked as watched). Your ratings and notes are never sent. As with any internet connection, these services see the IP address the request comes from.",
      fr: "Les seules informations envoyées sont ce que vous recherchez et les identifiants des œuvres dont on demande les détails ou des recommandations (par exemple, celles que vous avez marquées comme vues). Vos notes et vos commentaires ne sont jamais envoyés. Comme pour toute connexion à internet, ces services voient l'adresse IP d'où provient la requête.",
      de: "Gesendet wird nur, wonach du suchst, und die IDs der Werke, zu denen Details oder Empfehlungen abgefragt werden (zum Beispiel die, die du als gesehen markiert hast). Deine Bewertungen und Notizen werden nie gesendet. Wie bei jeder Internetverbindung sehen diese Dienste die IP-Adresse, von der die Anfrage kommt.",
      it: "Le uniche cose inviate sono ciò che cerchi e gli identificativi delle opere di cui si chiedono dettagli o consigli (ad esempio quelle che hai segnato come viste). Le tue valutazioni e le tue note non vengono mai inviate. Come per qualsiasi connessione a internet, questi servizi vedono l'indirizzo IP da cui arriva la richiesta.",
    },
    "privacy.s4.title": {
      es: "Tus derechos",
      en: "Your rights",
      fr: "Vos droits",
      de: "Deine Rechte",
      it: "I tuoi diritti",
    },
    "privacy.s4.p1": {
      es: "Como no guardo ningún dato tuyo en servidores propios, no hay nada que yo pueda entregarte, modificar o borrar en tu nombre: toda la información vive en tu dispositivo y tu cuenta de iCloud, bajo tu control. Borrar la app (o los datos desde Ajustes de iCloud) elimina esa información.",
      en: "Since I don't store any of your data on my own servers, there's nothing for me to hand over, change, or delete on your behalf: all the information lives on your device and your iCloud account, under your control. Deleting the app (or the data from iCloud Settings) removes that information.",
      fr: "Comme je ne stocke aucune de vos données sur mes propres serveurs, il n'y a rien que je puisse vous transmettre, modifier ou supprimer en votre nom : toutes les informations se trouvent sur votre appareil et votre compte iCloud, sous votre contrôle. Supprimer l'application (ou les données depuis les réglages iCloud) supprime ces informations.",
      de: "Da ich keine deiner Daten auf eigenen Servern speichere, gibt es nichts, was ich dir in deinem Namen übergeben, ändern oder löschen könnte: Alle Informationen liegen auf deinem Gerät und in deinem iCloud-Konto, unter deiner Kontrolle. Das Löschen der App (oder der Daten über die iCloud-Einstellungen) entfernt diese Informationen.",
      it: "Poiché non conservo alcun tuo dato su server miei, non c'è nulla che io possa consegnarti, modificare o eliminare per tuo conto: tutte le informazioni risiedono sul tuo dispositivo e nel tuo account iCloud, sotto il tuo controllo. Eliminando l'app (o i dati dalle Impostazioni di iCloud) tali informazioni vengono rimosse.",
    },
    "privacy.s4.p2": {
      es: "Si tienes cualquier duda sobre esto, escríbeme.",
      en: "If you have any questions about this, write to me.",
      fr: "Pour toute question à ce sujet, écrivez-moi.",
      de: "Bei Fragen dazu schreib mir gerne.",
      it: "Per qualsiasi dubbio in merito, scrivimi.",
    },
    "privacy.s5.title": {
      es: "Cambios en esta política",
      en: "Changes to this policy",
      fr: "Modifications de cette politique",
      de: "Änderungen dieser Richtlinie",
      it: "Modifiche a questa informativa",
    },
    "privacy.s5.p1": {
      es: "Si algo cambia (por ejemplo, si en el futuro alguna app añade una función que sí recoja datos), actualizaré esta página y la fecha de arriba.",
      en: "If anything changes (for example, if an app adds a feature that does collect data in the future), I'll update this page and the date above.",
      fr: "Si quelque chose change (par exemple, si une application ajoute à l'avenir une fonctionnalité qui collecte des données), je mettrai à jour cette page et la date ci-dessus.",
      de: "Falls sich etwas ändert (zum Beispiel, wenn eine App in Zukunft eine Funktion hinzufügt, die tatsächlich Daten sammelt), aktualisiere ich diese Seite und das Datum oben.",
      it: "Se qualcosa cambia (ad esempio, se in futuro un'app aggiungerà una funzione che raccoglie dati), aggiornerò questa pagina e la data qui sopra.",
    },
    "privacy.s6.title": { es: "Contacto", en: "Contact", fr: "Contact", de: "Kontakt", it: "Contatti" },
    "privacy.contact.label": {
      es: "Correo directo",
      en: "Direct email",
      fr: "E-mail direct",
      de: "Direkte E-Mail",
      it: "Email diretta",
    },
    "privacy.footer.supportLink": {
      es: "← Soporte",
      en: "← Support",
      fr: "← Assistance",
      de: "← Support",
      it: "← Assistenza",
    },
  };

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const entry = translations[el.getAttribute("data-i18n")];
      if (!entry) return;
      const text = entry[lang] || entry.es;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.setAttribute("aria-current", btn.dataset.lang === lang ? "true" : "false");
    });
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      /* almacenamiento no disponible (ej. modo privado): no pasa nada, solo no se recuerda */
    }
  }

  function initialLang() {
    let stored = null;
    try {
      stored = localStorage.getItem("lang");
    } catch (e) {
      /* ignorar */
    }
    if (stored && LANGS.includes(stored)) return stored;
    const browserLang = (navigator.language || "es").slice(0, 2);
    return LANGS.includes(browserLang) ? browserLang : "es";
  }

  function buildSwitcher() {
    const mount = document.querySelector("[data-lang-switch]");
    if (!mount) return;
    LANGS.forEach((lang) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.lang = lang;
      btn.textContent = LANG_NAMES[lang];
      btn.addEventListener("click", () => applyLang(lang));
      mount.appendChild(btn);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildSwitcher();
    applyLang(initialLang());
  });
})();
