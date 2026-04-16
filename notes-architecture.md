# Notes sur l'architecture

## Problèmes rencontrés

- duplication de code
    - récupération des données `this.http.get<any[]>(this.olympicUrl).pipe().subscribe(` 
- couplage
    - couplage fort entre l'application et le composant de Chart (utilisation directe)
- organisation du code
    - revoir l'arborescence
    - refactorisation
    - fichiers component volumineux, code à factoriser
    - les données de pays sont récupérées directement dans les composants
    - le fichier de data est dans assets ( disponible directement en téléchargement )

- obsolescence
    - l'utilisation de subscribe est dépréciée ( HomeComponent:24 )
    - utilisation de console.log ( HomeComponent:26 ) pour debug
    - 56 vulnerabilités dans les node_modules dont 39 high    
- Angular
    - utilisation du type `any` déconseillée
    - version obsolète de Angular ( v18 vs v21 actuellement )
- UX
    - il n'existe pas de demi médaille ( sur pays "Espagne" ) => composant chart à configurer ?
    - absence de header ( pour avoir le nom de l'app sur le détail d'un pays )