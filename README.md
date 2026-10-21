# Caisse Chlorophylle Night

Application de caisse pour la soirée **Chlorophylle Night by 'Xa**, sur tablette ou smartphone Android. Elle regroupe trois caisses et fonctionne hors ligne une fois installée.

| Caisse | Rôle |
|---|---|
| **Entrées** | Entrée 15 €, table VIP 300 €, encaissement Cash / Bancontact / Mixte. Bouton **Scanner une prévente** : la caméra lit le QR code du billet, l'entrée est comptée à 0 € et un billet déjà scanné est signalé en rouge (refuser ou laisser entrer quand même). Le code peut aussi être saisi à la main. |
| **Tickets** | Cartes de 18 cases à 3 € la case (54 € la carte). Boutons + / − 1 carte et + / − 1 case. Pavé « Le client demande… » : **un nombre de cases** (calcule le prix) ou **un budget** (calcule le maximum de cases et ce qui reste). Encaissement normal. |
| **Boissons** | Le serveur encode la commande ; l'app affiche le **nombre de cases à barrer** sur la carte du client. Aucun encaissement. |

L'accueil propose les 3 caisses ; on passe de l'une à l'autre par les onglets en haut. Chaque appareil peut servir n'importe quelle caisse.

## Une soirée = de midi à midi

Tout ce qui est enregistré entre midi et midi le lendemain appartient à la même soirée : une commande à 2 h du matin compte pour la soirée de la veille.

## Mise en ligne sur GitHub Pages (une seule fois)

1. Sur https://github.com : **New** → nom du dépôt (ex. `chlorophylle`), **Public**, **Create repository**.
2. **Add file → Upload files** : déposer `index.html`, `manifest.webmanifest`, `sw.js`, `catalogue.json`, `README.md` et le dossier `icons`. **Commit changes**.
3. **Settings → Pages** : *Deploy from a branch*, branche **main**, dossier **/ (root)**, **Save**.
4. Après 1 à 2 minutes : `https://<compte>.github.io/<dépôt>/` (ex. https://scraper147.github.io/chlorophylle/).

Ne plus renommer le dépôt une fois les appareils installés.

## Installation sur chaque appareil

1. Connecter l'appareil à internet, ouvrir l'adresse dans **Chrome**.
2. Menu **⋮ → Installer l'application**. Lancer l'icône **« Chlorophylle »**.
3. Sur l'accueil : **Nom de l'appareil** (ex. « Entrée », « Caisse tickets », « Bar 1 »). Ce nom apparaît dans les fichiers et le bilan.
4. Ouvrir une fois la caisse **Entrées → Scanner une prévente** et **autoriser la caméra**.

Ensuite l'app fonctionne sans internet.

## Pendant la soirée

- **Historique** (par caisse) : tout ce qui a été enregistré, avec **Annuler** (motif facultatif). L'enregistrement reste visible, barré, mais n'est plus compté.
- **Préventes** : le contrôle des doublons porte sur les billets scannés **sur cet appareil**. Si deux appareils scannent à l'entrée, un même billet pourrait passer une fois sur chacun : de préférence, un seul appareil pour les préventes.
- La lecture des QR codes utilise la fonction intégrée de Chrome sur Android. Sur un appareil qui ne la propose pas (iPhone/iPad, navigateur de bureau), saisir le code à la main.

## Fin de soirée : bilan

1. Sur **chaque appareil** : menu **⋮ → Exporter la soirée** → fichier `chlorophylle_AAAA-MM-JJ_<appareil>.json` (les 3 caisses de cet appareil).
2. Sur un seul appareil (ou un PC avec l'app ouverte dans Chrome) : **Bilan de la soirée → Importer des fichiers d'autres appareils**, choisir les fichiers.
3. Le bilan consolidé affiche :
   - **Recette** : total, cash, Bancontact, par caisse ;
   - **Entrées** : payantes, préventes (et doublons acceptés), tables VIP ;
   - **Tickets** : cases vendues, équivalent cartes, cartes complètes, cases à l'unité ;
   - **Boissons** : commandes, cases barrées, détail par catégorie et par boisson (quantité, cases, valeur) ;
   - **Cases non barrées** = cases vendues − cases barrées (cases encore sur les cartes des clients) ;
   - **Activité par heure** (entrées et commandes).
4. **Exporter le bilan (CSV)** : tableau pour Excel.

Les fichiers importés restent dans le bilan tant que l'app est ouverte ; les réimporter après une fermeture.

## Modifier les prix ou la carte : `catalogue.json`

- `entrees` : libellé et prix (Entrée 15, Table VIP 300).
- `tickets` : `prixCase` (3) et `casesParCarte` (18).
- `boissons` : catégories, puis pour chaque boisson `libelle`, `format` (`verre` ou `bouteille`) et **`cases`** (nombre de cases à barrer = prix ÷ 3). `actif: false` masque une boisson, `ordre` règle l'ordre d'affichage.
- Augmenter `version`, déposer le fichier sur GitHub. À la prochaine ouverture avec réseau, chaque appareil propose **Installer**. Menu **⋮ → Vérifier le catalogue** pour forcer la vérification.
- Ne pas changer les `id` une fois la soirée commencée (ils servent au bilan).

La carte actuelle (version 1) reprend la carte de la soirée : softs, bières, vins (verre / bouteille), alcools « softs compris » (verre), bouteilles d'alcool, cocktails, bulles (verre / bouteille).

## Mettre à jour l'app

Remplacer les fichiers sur GitHub, **et augmenter le numéro de cache dans `sw.js`** (`PREFIX + 'v1'` → `'v2'`…). Les appareils prennent la nouvelle version à la prochaine ouverture avec réseau.

## Bonnes pratiques

- Exporter la soirée sur chaque appareil à la fermeture (et idéalement une fois en cours de soirée).
- Ne jamais effacer les données de Chrome sur les appareils de caisse.
- **Mémoire** (~5 Mo, partagée avec les autres caisses du même compte GitHub) : menu **⋮ → Soirées enregistrées** (jauge, téléchargement, effacement des soirées déjà exportées). Bandeau orange au-delà de 80 %, alerte rouge si un enregistrement échoue : exporter immédiatement.

## Cohabitation avec les autres caisses du même compte GitHub

Clés de stockage propres (`chlorophylle-caisse…`), préfixe de cache propre (`caisse-chlorophylle-`) et nom court propre (« Chlorophylle ») : la caisse sapins et la caisse bar ne sont pas touchées.
