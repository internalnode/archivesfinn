var missions = {
  nightfall: {
    state: "CLOSED",
    system: "OPERATION FILE // NIGHTFALL // CLASSIFIED",
    title: "NIGHTFALL",
    sub: "FILE // 2019 • STATE // CLOSED",
    clearance: "BLACK",
    theatre: "URBAN EDGE",
    risk: "HIGH",
    context: "Opération d’infiltration profonde conduite dans un secteur urbain hostile sous surveillance ennemie diffuse. L’objectif prioritaire consistait à localiser puis extraire un agent infiltré compromis, dont la couverture était considérée comme irrémédiablement dégradée après plusieurs signaux d’exposition.",
    timeline: [
      "Insertion discrète en périphérie de zone sous couverture civile, à faible signature et sans appui visible.",
      "Progression lente à travers plusieurs structures abandonnées servant de couloirs de déplacement hors observation directe.",
      "Confirmation visuelle de l’objectif dans un environnement déstabilisé, avec présence probable d’éléments hostiles à courte distance.",
      "Rupture momentanée du plan initial après apparition d’une menace non anticipée dans l’axe d’exfiltration.",
      "Neutralisation rapide et silencieuse du danger immédiat afin de préserver la discrétion de l’équipe.",
      "Extraction de l’agent sous blackout radio complet, avec modification improvisée de l’itinéraire de sortie.",
      "Repli sécurisé hors périmètre avant verrouillage total de la zone par les forces adverses."
    ],
    outcome: "Objectif extrait vivant et transféré vers zone sécurisée. Plusieurs indices confirment que la cellule ennemie disposait d’informations partielles sur la présence de l’agent, sans toutefois anticiper l’intervention de l’unité. Mission clôturée avec succès. Niveau de classification maintenu : BLACK."
  },

  blackridge: {
    state: "ARCHIVED",
    system: "OPERATION FILE // BLACKRIDGE // RESTRICTED",
    title: "BLACKRIDGE",
    sub: "FILE // 2021 • STATE // ARCHIVED",
    clearance: "RESTRICTED",
    theatre: "MOUNTAIN",
    risk: "ELEVATED",
    context: "Mission de reconnaissance offensive et de neutralisation ciblée menée contre une installation clandestine implantée en zone montagneuse isolée. Le site, absent des registres officiels, présentait une activité intermittente suspecte et des signatures logistiques incompatibles avec une infrastructure civile ordinaire.",
    timeline: [
      "Insertion héliportée de nuit à distance du site afin d’éviter toute détection acoustique ou visuelle immédiate.",
      "Progression au sol en environnement escarpé avec observation longue portée du complexe pendant plus de six heures.",
      "Identification de mouvements humains, de flux matériels et de procédures de sécurité non répertoriées dans les bases alliées.",
      "Confirmation d’une activité clandestine structurée à l’intérieur de l’installation, avec présence d’équipements sensibles.",
      "Déclenchement d’une intervention brève et à très forte intensité pour empêcher la destruction ou l’évacuation des données présentes sur site.",
      "Suppression des capacités opérationnelles du complexe et sécurisation des zones techniques prioritaires.",
      "Collecte de documents, supports numériques et éléments de traçabilité avant arrivée possible de renforts hostiles.",
      "Extraction immédiate de l’équipe avec repli complet avant réactivation des voies d’accès secondaires."
    ],
    outcome: "Installation neutralisée et rendue inopérante. Plusieurs données techniques récupérées ont ensuite été transférées au commandement UKSF pour exploitation approfondie. Le site est désormais classé comme infrastructure clandestine hostile démantelée."
  },

  silent_echo: {
    state: "RESTRICTED",
    system: "OPERATION FILE // SILENT ECHO // HIGHLY RESTRICTED",
    title: "SILENT ECHO",
    sub: "FILE // 2023 • STATE // RESTRICTED",
    clearance: "BLACK",
    theatre: "SUBTERRANEAN",
    risk: "UNKNOWN",
    context: "Mission de récupération d’un dispositif sensible conduite en environnement fermé, souterrain et partiellement cartographié. Les renseignements disponibles avant engagement restaient fragmentaires, et plusieurs indicateurs laissaient supposer une présence inconnue ou des systèmes actifs non identifiés dans la structure.",
    timeline: [
      "Approche discrète et entrée contrôlée dans une infrastructure souterraine à accès restreint.",
      "Progression lente dans un environnement confiné marqué par une visibilité réduite et des perturbations matérielles intermittentes.",
      "Perte volontaire de communications externes pendant trente-deux minutes afin de limiter toute interception ou toute compromission du déplacement.",
      "Localisation du dispositif prioritaire dans une section interne sécurisée, distincte du point estimé initialement.",
      "Détection de perturbations systèmes non identifiées affectant brièvement les capteurs et les procédures de contrôle.",
      "Réévaluation immédiate de la situation tactique et abandon de plusieurs objectifs secondaires pour préserver l’intégrité de l’élément récupéré.",
      "Extraction d’urgence selon protocole raccourci, avec fermeture prématurée de la fenêtre d’exploitation du site.",
      "Évacuation complète de l’équipe sans maintien sur zone et transmission scellée de l’objet aux autorités compétentes."
    ],
    outcome: "Dispositif récupéré et remis sous contrôle sécurisé. Le rapport complet demeure partiellement compartimenté ; plusieurs segments de l’opération restent scellés à diffusion restreinte. Des anomalies relevées sur site n’ont pas été intégralement clarifiées dans la version consultable du dossier."
  },

  cold_veil: {
    state: "CLOSED",
    system: "OPERATION FILE // COLD VEIL // CLASSIFIED",
    title: "COLD VEIL",
    sub: "FILE // 2023 • STATE // CLOSED",
    clearance: "BLACK",
    theatre: "MARITIME",
    risk: "HIGH",
    context: "Opération d’approche maritime menée contre un point de transit clandestin installé dans une zone portuaire sous faible surveillance officielle mais sous contrôle indirect d’une cellule hostile. L’objectif consistait à intercepter un intermédiaire, saisir des supports de transmission et quitter la zone avant réaction coordonnée.",
    timeline: [
      "Insertion nocturne par voie maritime à distance des quais principaux afin d’éviter les points de contrôle visibles.",
      "Approche silencieuse le long d’installations industrielles avec observation préalable des trajectoires de patrouille.",
      "Identification du contact attendu dans une zone de chargement secondaire hors couverture vidéo directe.",
      "Neutralisation discrète de deux sentinelles avancées sans rupture apparente de l’activité sur site.",
      "Saisie d’un conteneur technique utilisé comme point de dépôt pour des supports chiffrés.",
      "Extraction rapide de l’intermédiaire ciblé vers une embarcation légère en fenêtre temporelle réduite.",
      "Repli complet avant verrouillage du secteur par des éléments de sécurité privés."
    ],
    outcome: "Intermédiaire récupéré vivant, supports techniques saisis et route logistique compromise. L’opération a permis d’identifier plusieurs connexions secondaires dans le réseau de transit hostile. Aucun engagement ouvert n’a été officiellement relié à l’unité."
  },

  iron_harbor: {
    state: "ARCHIVED",
    system: "OPERATION FILE // IRON HARBOR // RESTRICTED",
    title: "IRON HARBOR",
    sub: "FILE // 2024 • STATE // ARCHIVED",
    clearance: "RESTRICTED",
    theatre: "EASTERN EUROPE",
    risk: "ELEVATED",
    context: "Mission de surveillance prolongée et d’interception menée contre un relais logistique mobile utilisé pour redistribuer matériel, fonds et identités de couverture à plusieurs cellules en transit. Le site observé changeait fréquemment, mais une fenêtre de vulnérabilité a été détectée lors d’un transfert terrestre en périphérie industrielle.",
    timeline: [
      "Mise en place d’un dispositif d’observation discret sur plusieurs axes d’accès au secteur ciblé.",
      "Confirmation d’un schéma logistique récurrent impliquant véhicules utilitaires, fausses plaques et points relais temporaires.",
      "Marquage progressif de plusieurs individus clefs sans révéler la présence du dispositif allié.",
      "Détection d’un transfert sensible entre deux équipes dans un entrepôt secondaire partiellement désaffecté.",
      "Lancement d’une interception courte visant la capture d’un opérateur prioritaire et la saisie de matériel de liaison.",
      "Sécurisation de documents de route, moyens de communication et éléments de traçabilité financière.",
      "Dispersion contrôlée du dispositif avant arrivée d’un second groupe hostile non engagé.",
      "Exploitation rapide des saisies en zone sécurisée immédiatement après extraction."
    ],
    outcome: "Relais logistique désorganisé, matériel saisi et un opérateur central isolé du reste du réseau. Les éléments récupérés ont permis d’établir des liens entre plusieurs flux transfrontaliers jusque-là dissociés dans les analyses antérieures."
  },

  ember_fall: {
    state: "RESTRICTED",
    system: "OPERATION FILE // EMBER FALL // HIGHLY RESTRICTED",
    title: "EMBER FALL",
    sub: "FILE // 2025 • STATE // RESTRICTED",
    clearance: "BLACK",
    theatre: "INDUSTRIAL ZONE",
    risk: "SEVERE",
    context: "Mission de sabotage discret conduite contre une infrastructure relais servant de nœud technique à une chaîne de coordination hostile. L’objectif n’était pas la destruction spectaculaire du site, mais la neutralisation ciblée de plusieurs systèmes critiques afin de provoquer une panne diffuse, retardée et difficile à attribuer.",
    timeline: [
      "Insertion de l’équipe en lisière de zone industrielle sous couverture de maintenance nocturne.",
      "Progression en environnement faiblement éclairé avec cartographie de dernière minute des accès techniques.",
      "Accès à un local de distribution interne permettant d’atteindre les systèmes de relais sans alerte immédiate.",
      "Pose de charges de sabotage à effet différé sur plusieurs composants clefs du réseau interne.",
      "Altération volontaire de journaux techniques afin de masquer l’origine et la chronologie exacte des manipulations.",
      "Retrait progressif de l’équipe avant déclenchement des premières défaillances opérationnelles.",
      "Observation à distance de l’arrêt en cascade de plusieurs fonctions du site dans les heures suivantes.",
      "Clôture de mission après confirmation qu’aucun lien direct ne pouvait être établi avec l’intervention."
    ],
    outcome: "Infrastructure rendue partiellement inopérante pendant une période suffisante pour interrompre plusieurs flux de coordination hostiles. Les effets observés ont été attribués localement à une défaillance technique interne, conformément à l’intention initiale de l’opération."
  }
};