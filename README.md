# Caisse Chlorophylle Night

Application de caisse pour la soirée **Chlorophylle Night by 'Xa**, sur tablette ou smartphone Android. Elle regroupe trois caisses et fonctionne hors ligne une fois installée.

| Caisse | Rôle |
|---|---|
| **Entrées** | Entrée 15 €, table VIP 300 €, encaissement Cash / Bancontact / Mixte. Bouton **Scanner une prévente** : la caméra lit le QR code du billet, l'entrée est comptée à 0 € et un billet déjà scanné est signalé en rouge (refuser ou laisser entrer quand même). Le code peut aussi être saisi à la main. |
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

## Pendant la soirée

- **Historique** (par caisse) : tout ce qui a été enregistré, avec **Annuler** (motif facultatif). L'enregistrement reste visible, barré, mais n'est plus compté.
- **Préventes** : le contrôle des doublons porte sur les billets scannés **sur cet appareil**. Si deux appareils scannent à l'entrée, un même billet pourrait passer une fois sur chacun : de préférence, un seul appareil pour les préventes.
- La lecture des QR codes utilise la fonction intégrée de Chrome sur Android. Sur un appareil qui ne la propose pas (iPhone/iPad, navigateur de bureau), saisir le code à la main.

## Contrôle des préventes

À chaque scan, la caisse Entrées vérifie, dans l'ordre :

1. **Le format du QR** : un QR officiel est de la forme
   `https://chlorophylle-night-by-xa.be/Chloropylle/admin/display_ev.php?q=<code de 32 caractères 0-9 a-f>&action=control`
   (attention : « Chloropylle » sans « h » dans l'adresse officielle). Tout autre QR affiche **« QR non reconnu »**. Seul le code de 32 caractères est enregistré. Le modèle est dans `catalogue.json` (`prevente.modele`).
2. **Le doublon** : billet déjà scanné sur cet appareil → **« Déjà scannée »** avec l'heure du premier passage.
3. **La liste des billets vendus** (si elle est chargée) : code absent → **« Billet inconnu »**.

Dans chaque cas d'alerte : **Refuser** ou **Laisser entrer quand même** (l'entrée est alors marquée dans l'historique et dans les fichiers envoyés : doublon, QR non reconnu ou hors liste).
Le code du billet peut aussi être saisi à la main (code seul ou adresse complète).

**Liste des préventes validées** : toucher le compteur **« Préventes QR »** de la caisse Entrées affiche les codes déjà validés ce soir sur l'appareil (heure, code, pastille si l'entrée a été forcée), avec une recherche par code (quelques caractères, ou l'adresse complète collée).

**Liste des billets vendus** : pas encore en place (elle sera intégrée plus tard). En attendant, seuls le format et les doublons sont contrôlés.

**Phase de test** : menu **⋮ → TEST · Effacer les préventes** efface toutes les préventes scannées sur l'appareil, pour pouvoir rescanner les mêmes QR codes. Les entrées payantes, tickets et commandes ne sont pas touchés. **À retirer avant la soirée** (`TEST_EFFACER_PREVENTES = false` dans `index.html`).

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

## Mettre à jour l'app

Remplacer les fichiers sur GitHub, **et augmenter le numéro de cache dans `sw.js`** (actuellement `PREFIX + 'v18'`) ainsi que `APP_VERSION` dans `index.html` (même numéro).

- Le numéro de version s'affiche en bas de l'accueil (« App v18 · … ») : c'est le moyen de vérifier qu'un appareil a bien la dernière version.
- GitHub Pages met 1 à 2 minutes à publier après le commit.
- Depuis la v12, l'appareil prend la nouvelle version à l'ouverture de l'app avec réseau et se recharge tout seul (sur l'accueil, jamais pendant une vente).
- Si un appareil reste sur une ancienne version : fermer complètement l'app (balayer dans les apps récentes), attendre une dizaine de minutes, la rouvrir avec réseau, puis la fermer et rouvrir encore une fois. **Ne jamais effacer les données de Chrome** pour forcer la mise à jour : les ventes de l'appareil seraient perdues.

## Bonnes pratiques

- Exporter la soirée sur chaque appareil à la fermeture (et idéalement une fois en cours de soirée).
- Ne jamais effacer les données de Chrome sur les appareils de caisse.
- **Mémoire** (~5 Mo, partagée avec les autres caisses du même compte GitHub) : menu **⋮ → Soirées enregistrées** (jauge, téléchargement, effacement des soirées déjà exportées). Bandeau orange au-delà de 80 %, alerte rouge si un enregistrement échoue : exporter immédiatement.

## Cohabitation avec les autres caisses du même compte GitHub

Clés de stockage propres (`chlorophylle-caisse…`), préfixe de cache propre (`caisse-chlorophylle-`) et nom court propre (« Chlorophylle ») : la caisse sapins et la caisse bar ne sont pas touchées.
