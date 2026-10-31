# Caisse Chlorophylle Night

Application de caisse pour la soirée **Chlorophylle Night by 'Xa**, sur tablette ou smartphone Android. Elle regroupe trois caisses et fonctionne hors ligne une fois installée.

| Caisse | Rôle |
|---|---|
| **Entrées** | Entrée 15 €, Table VIP 300 €, **Entrée invité/prévente (0 €)**, **Table VIP invité (0 €)**, encaissement Cash / Bancontact / Mixte. **Remise** : toucher une ligne payante du panier (nom de l'entrée) pour encoder une remise en euros sur cette ligne (limitée au montant de la ligne) ; elle apparaît dans le panier, l'historique et les fichiers envoyés (`remise` sur la ligne, `total` = montant après remise). Un panier qui ne contient que des articles à 0 € se valide directement (bouton **Valider (0 €)**, sans écran de paiement). Tuile **Scanner une prévente** : contrôle du format du QR officiel, puis choix du **nombre d'entrées** liées au QR (pas de contrôle des doublons). |
| **Tickets** | Cartes de 18 cases à 3 € la case (54 € la carte). Boutons + / − 1 carte et + / − 1 case. Pavé « Le client demande… » : **un nombre de cases** (calcule le prix) ou **un budget** (calcule le maximum de cases et ce qui reste). Encaissement normal. |
| **Boissons** | Le serveur encode la commande ; l'app affiche le **nombre de cases à barrer** sur la carte du client. Aucun encaissement. |

L'accueil propose les 3 caisses. Pour changer de caisse, revenir à l'accueil (toucher le logo en haut à gauche). Chaque appareil peut servir n'importe quelle caisse.

## Une soirée = de midi à midi

Tout ce qui est enregistré entre midi et midi le lendemain appartient à la même soirée : une commande à 2 h du matin compte pour la soirée de la veille.

## Mise en ligne sur GitHub Pages (une seule fois)

1. Sur https://github.com : **New** → nom du dépôt (ex. `chlorophylle`), **Public**, **Create repository**.
2. **Add file → Upload files** : déposer `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` et le dossier `icons`. Le `catalogue.json` est publié par l'**app Admin** (ne pas le déposer à la main). **Commit changes**.
3. **Settings → Pages** : *Deploy from a branch*, branche **main**, dossier **/ (root)**, **Save**.
4. Après 1 à 2 minutes : `https://<compte>.github.io/<dépôt>/` (ex. https://scraper147.github.io/chlorophylle/).

Ne plus renommer le dépôt une fois les appareils installés.

## Installation sur chaque appareil

1. Connecter l'appareil à internet, ouvrir l'adresse dans **Chrome**.
2. Menu **⋮ → Installer l'application**. Lancer l'icône **« Chlorophylle »**.
3. Sur l'accueil : **Nom de l'appareil** (ex. « Entrée », « Caisse tickets », « Bar 1 »). Ce nom apparaît dans les fichiers envoyés.
4. Ouvrir une fois la caisse **Entrées → Scanner une prévente** et **autoriser la caméra**.

Ensuite l'app fonctionne sans internet.

### Sur iPhone / iPad

Sur iPhone, Chrome n'a pas de menu « Installer l'application » : on ajoute l'app à l'écran d'accueil.
- **Chrome** : ouvrir l'adresse, toucher l'icône **Partager** (carré avec une flèche vers le haut, à droite de la barre d'adresse), puis **Ajouter à l'écran d'accueil**. Si l'option n'apparaît pas, mettre Chrome et iOS à jour (iOS 16.4 minimum), ou utiliser Safari.
- **Safari** : bouton **Partager** → **Sur l'écran d'accueil** → **Ajouter**.
- Toujours ouvrir la caisse depuis l'icône « Chlorophylle » ainsi créée (les données de l'icône et celles d'un onglet du navigateur sont séparées).
- Limite : la **lecture des QR codes par la caméra ne fonctionne pas sur iPhone/iPad** ; il faut taper le code. Pour l'entrée avec scan des préventes, utiliser une tablette ou un téléphone **Android** avec Chrome.

## Pendant la soirée

- **Écran toujours allumé** : tant que l'app est ouverte au premier plan, la tablette ne se met pas en veille (fonction de Chrome). Si l'app passe en arrière-plan, la mise en veille normale reprend ; elle est de nouveau bloquée au retour dans l'app. Pensez à brancher les tablettes.

- **Historique** (par caisse) : tout ce qui a été enregistré, avec **Annuler** (motif facultatif). L'enregistrement reste visible, barré, mais n'est plus compté.
- La lecture des QR codes utilise la fonction intégrée de Chrome sur Android. Sur un appareil qui ne la propose pas (iPhone/iPad, navigateur de bureau), saisir le code à la main.

## Contrôle des préventes

Tuile **« Scanner une prévente »** de la caisse Entrées (sous les 4 tuiles) :

1. La caméra lit le QR code du billet (ou on tape le code dans le champ).
2. **Contrôle du format** : un QR officiel est de la forme
   `https://chlorophylle-night-by-xa.be/Chloropylle/admin/display_ev.php?q=<code de 32 caractères 0-9 a-f>&action=control`
   (attention : « Chloropylle » sans « h » dans l'adresse officielle). Le modèle est dans `catalogue.json` (`prevente.modele`). Un autre QR affiche **« QR non reconnu »** : **Refuser** ou **Laisser entrer quand même**.
3. **Nombre d'entrées** : un QR peut valoir plusieurs entrées. Choisir le nombre (boutons 1 à 6, ou − / + jusqu'à 99), puis **Valider N entrées**. **Annuler · scanner le suivant** n'enregistre rien.
4. « ✓ N entrées validées » reste affiché jusqu'à **Scanner le suivant**.

**Pas de contrôle des doublons** : un même QR peut être lu plusieurs fois (par exemple si un groupe arrive en plusieurs fois). Chaque lecture validée est enregistrée comme une **vente d'entrée à 0 €** sur un produit propre aux préventes scannées : **`prevente-qr` « Prévente QR code »**, quantité = nombre d'entrées (paiement « gratuit », avec le code du QR). Ce produit n'a pas de tuile : il n'est utilisé que par le scan. Ces entrées comptent dans « Entrées ce soir » et dans « Préventes QR », pas dans « Payantes ».

Prévente **sans QR code** ou invité : tuile **« Entrée invité/prévente »** (0 €).

**Liste des préventes validées** : toucher le compteur **« Préventes QR »** de la caisse Entrées affiche les codes déjà validés ce soir sur l'appareil (heure, code, pastille si l'entrée a été forcée), avec une recherche par code (quelques caractères, ou l'adresse complète collée).

**Liste des billets vendus** (v26) : export de la billetterie (CSV « ; ») déposé dans le dossier **`preventes/`** du dépôt **privé** `scraper147/ventes` (jamais dans le dépôt public de l'app). Colonnes utilisées : `control` (code du QR), `cout` (prix ; **nombre d'entrées = prix ÷ 12**), `paye` (vide/NULL = non payé), `reference` (AAAAMMJJ) et `date` (jour de la soirée). Le fichier complet de la billetterie convient ; un fichier réduit à ces 5 colonnes (sans noms ni e-mails) est préférable.

- **Chargement automatique** sur chaque appareil déverrouillé pour l'envoi GitHub : au démarrage, au déverrouillage, au retour du réseau / au premier plan, puis toutes les 10 minutes. Hors ligne, la dernière liste chargée est utilisée. Pour une liste mise à jour, remplacer le fichier dans `preventes/` (tous les fichiers du dossier sont fusionnés).
- La fenêtre de scan affiche l'état : « Liste des préventes : N billets dont X (Y entrées) pour ce soir · mise à jour à HH:MM ».
- Au scan, avec la liste : code absent → **Billet inconnu** ; billet d'une **autre soirée** → **Mauvaise soirée** ; billet **non payé** → **Paiement non confirmé** (demander la preuve). Chaque fois : Refuser ou Laisser entrer quand même.
- Sinon, l'écran du nombre d'entrées affiche « Billet : N entrées · soirée du JJ/MM » et propose N, moins les entrées déjà validées ce soir pour ce QR (affichées en orange, sans bloquer).

**Phase de test** : menu **⋮ → TEST · Effacer les préventes** efface toutes les préventes scannées sur l'appareil (remise à zéro du compteur pendant les tests). Les entrées payantes, tickets et commandes ne sont pas touchés. **À retirer avant la soirée** (`TEST_EFFACER_PREVENTES = false` dans `index.html`).

## Envoi des ventes sur GitHub (dépôt privé `scraper147/ventes`)

Les soirées vont dans le dossier **`soiree/`** du dépôt privé des ventes, avec le jeton et la phrase de passe des caisses.

- **Déverrouiller (une fois par appareil)** : accueil → **Envoi GitHub**, saisir la phrase de passe des caisses. La phrase n'est jamais enregistrée ; **Verrouiller cet appareil** efface le jeton.
- **Envoi automatique** : dès que l'appareil a internet, chaque soirée modifiée depuis son dernier envoi part toute seule (environ 15 s après une vente ou une commande, au plus une fois par minute ; aussi au démarrage, au retour du réseau et au retour de l'app au premier plan). Sans réseau, les envois attendent et partent dès le retour d'internet.
- **État de l'envoi** : bandeau ☁ sur l'accueil (« à jour », « en attente de réseau », « inactif : touchez pour déverrouiller »…) et mention ☁ sous le nom de l'appareil dans l'en-tête des caisses (tablette).
- **Envoyer maintenant** (menu ⋮) ou **Soirées enregistrées → Envoyer / Renvoyer sur GitHub** : envoi immédiat à la main.
- Si GitHub refuse le jeton (expiré), l'envoi se verrouille et le bandeau devient rouge : déverrouiller à nouveau (avec une nouvelle version de la caisse si la clé a changé).
- Fichier : `soiree/AAAA-MM-JJ_<nom de l'appareil>_<id>.json` (même contenu que l'export). Chaque envoi remplace le fichier de l'appareil ; si l'appareil est renommé, l'ancien fichier est supprimé.
- Une soirée envoyée compte comme sauvegardée : elle peut ensuite être effacée de l'appareil.

## Fin de soirée

Sur **chaque appareil** : menu **⋮ → Envoyer sur GitHub** (ou **Exporter la soirée** sans réseau). L'analyse de la soirée se fait dans l'**app Admin**, à partir des fichiers du dossier `soiree/`.

## Catalogue (`catalogue.json`)

Le catalogue (prix des entrées, prix de la case et nombre de cases par carte, boissons et nombre de cases, modèle des QR de prévente) est **géré et publié par l'app Admin** dans le dépôt de la caisse. Il ne fait pas partie du paquet de l'app et ne se modifie pas ici.

- À la prochaine ouverture avec réseau, chaque appareil propose **Installer** le nouveau catalogue ; menu **⋮ → Vérifier le catalogue** pour forcer la vérification.
- Un catalogue de secours est intégré à l'app : il sert uniquement si `catalogue.json` n'a jamais pu être chargé.
- Les `id` des boissons ne doivent pas changer pendant une soirée.
- Entrées : le prix peut être **0** (invités). Champ facultatif `compte` : `"personne"` (compte dans les entrées) ou `"table"` (compte dans les tables VIP) ; sans ce champ, un `id` ou libellé contenant « vip » ou « table » est compté comme table.
- L'id **`prevente-qr`** est réservé aux préventes scannées. On peut l'ajouter au catalogue (prix 0) pour changer son libellé ; il n'apparaît jamais comme tuile.

## Mettre à jour l'app

Remplacer les fichiers sur GitHub, **et augmenter le numéro de cache dans `sw.js`** (actuellement `PREFIX + 'v27'`) ainsi que `APP_VERSION` dans `index.html` (même numéro).

- Le numéro de version s'affiche en bas de l'accueil (« App v27 · … ») : c'est le moyen de vérifier qu'un appareil a bien la dernière version.
- GitHub Pages met 1 à 2 minutes à publier après le commit.
- Depuis la v12, l'appareil prend la nouvelle version à l'ouverture de l'app avec réseau et se recharge tout seul (sur l'accueil, jamais pendant une vente).
- Si un appareil reste sur une ancienne version : fermer complètement l'app (balayer dans les apps récentes), attendre une dizaine de minutes, la rouvrir avec réseau, puis la fermer et rouvrir encore une fois. **Ne jamais effacer les données de Chrome** pour forcer la mise à jour : les ventes de l'appareil seraient perdues.

## Bonnes pratiques

- Exporter la soirée sur chaque appareil à la fermeture (et idéalement une fois en cours de soirée).
- Ne jamais effacer les données de Chrome sur les appareils de caisse.
- **Mémoire** (~5 Mo, partagée avec les autres caisses du même compte GitHub) : menu **⋮ → Soirées enregistrées** (jauge, téléchargement, effacement des soirées déjà exportées). Bandeau orange au-delà de 80 %, alerte rouge si un enregistrement échoue : exporter immédiatement.

## Cohabitation avec les autres caisses du même compte GitHub

Clés de stockage propres (`chlorophylle-caisse…`), préfixe de cache propre (`caisse-chlorophylle-`) et nom court propre (« Chlorophylle ») : la caisse sapins et la caisse bar ne sont pas touchées.
