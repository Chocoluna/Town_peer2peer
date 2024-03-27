# tiw8-tp3

## Contributeurs

- COUTURIR-PETRASSON Claire, p1710174
- PHANG Romeo, p1907961

## Build

- `yarn install` pour installer les dépendances.

- `yarn build`pour construire le projet

- `yarn dev` pour démarrer le server en local sur le port 3000.

<http://localhost:3000/>

L'application est déployée sur : <https://town.nautibus.xyz/>

## Utilisation

Chaque utilisateur choisit un avatar et le déplace grâce aux flèches du clavier.
L'appel video / audio se déclenche lorsque les avatars sont à deux cases ou moins l'un de l'autre, et se coupe s'ils s'éloignent à 5 cases ou plus l'un de l'autre.
L'élément "aperçu vidéo" n'apparait sur la page que si l'appel entre les deux utilisateurs est lancé.

## Spécificités du projet

Le projet a été testé sur Firefox et Chrome. Le projet fonctionne bien sur les deux navigateurs mais avec quelques spécifités pour Firefox :

- Si l'utilisateur a une option pour couper physiquement la caméra de son ordinateur, et que sa caméra est éteinte au moment de commencer l'appel, une modale apparait pour indiquer le problème sur les deux navigateurs. Sur Chrome, une fois que l'utilisateur a lancé sa caméra, le call se relance tout seul, mais sur Firefox il faut parfois réactualiser la fenêtre et relancer le call pour que tout fonctionne bien.

- Quand le call se lance sur firefox, l'état de chaque fenêtre ne se met à jour que lorsque la fenêtre est active. Exemple: au lancement du call, seule la caméra de la fenêtre active se lance, et il faut cliquer sur la seconde fenêtre pour que la caméra du 2e utilisateur se lance également. Cette spécifité n'existe que parce que nous sommes dans un cas de figure où les utilisateurs "local" et "distant" sont sur la même machine.

Sans camera / webcam active, le projet ne peux pas être testé. Sur un projet plus vaste, on aurait prévu un cas pour que les utilisateurs puissent utiliser l'audio sans la vidéo.

## Etat du projet

### Fonctionnalités de base

*Tous les points ci-dessous sont fonctionnels.*

- [X] `yarn lint` passe sans erreur
- [X] la séquence yarn install, yarn build et yarn dev qui passe sans erreur
- [X] README détaillé avec les spécificité du projet (build, déploiement, ce qui marche et ce qui ne marche pas…)
</br>

- [X] Un style Tailwind (ou autre) est utilisé de manière judicieuse (aka l’application ressemble à quelque chose) (2pt)
- [X] Les states et props de React sont bien utilisées (1pt).
- [X] Utilisation des hooks appropriées (2pt).
- [X] Mise en relation des pairs
  - [X] signalement au serveur (2pt)
  - [X] établissement de la connexion entre les deux pairs (2pt)
- [X] Data (5pt)
  - [X] les pairs peuvent s’envoyer des messages (2pt)
  - [X] l’envoi de message est géré dans un middleware (2pt)
  - [X] plusieurs participants bougent de manière cohérente (1pt)
- [X] VidéoChat (5pt)
  - [X] le flux local s’affiche
  - [X] le flux distant est bien récupéré
  - [X] le flux distant s’affiche
  - [X] le tout fonctionne sur localhost
  - [X] la fermeture de l’appel se passe correctement

### Fonctionnalités Bonus

- [X] Déploiement
- [ ] Gestion de plus de deux pairs.
- [ ] Gestion de salon
- [ ] Gestion de l’audio et de la vidéo séparé : quand on s’éloigne, la vidéo se coupe, mais l’audio diminue progressivement avec la distance avant de se couper.
