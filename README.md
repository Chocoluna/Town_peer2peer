# tiw8-tp3

## Contributeurs

- COUTURIR-PETRASSON Claire, p1710174
- PHANG Romeo, p1907961

## Build

- `yarn` pour installer les dépendances.

- `yarn build`pour construire le projet

- `yarn dev` pour démarrer le server sur le port 3000.

## Spécificités du projet

Le projet a été testé sur Firefox et Chrome. Le projet fonctionne bien sur les deux navigateurs mais avec quelques spécifités sur Firefox :

- Si l'utilisateur a une option pour couper physiquement la caméra de son ordinateur, et que sa caméra est éteinte au moment de commencer l'appel, une modale apparait pour indiquer le problème sur les deux navigateurs. Sur Chrome, une fois que l'utilisateur a lancé sa caméra, le call se relance tout seul, mais sur Firefox il faut parfois réactualiser la fenêtre et relancer le call pour que tout fonctionne bien.

- Quand le call se lance sur firefox, l'état de chaque fenêtre ne se met à jour que lorsque la fenêtre est active. Exemple: au lancement du call, seule la caméra de la fenêtre active se lance, et il faut cliquer sur la seconde fenêtre pour que la caméra du 2e utilisateur se lance également. Cette spécifité n'existe que parce que nous sommes dans un cas de figure où les utilisateurs "local" et "distant" sont sur la même machine.

## Etat du projet

### Malus (points négatifs)

- [ ] linter original qui ne passe pas (ou trop d’exceptions dans le code) -2pt
- [ ] la séquence yarn install, yarn build et yarn dev qui ne passe pas -2pt
- [ ] README pas clair sur les spécificité du projet (build, déploiement, ce qui marche et ce qui ne marche pas, sur comment tester…) -2pt

### Points

- [ ] Un style Tailwind (ou autre) est utilisé de manière judicieuse (aka l’application ressemble à quelque chose) (2pt)
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

### Bonus

- [ ] Déploiement
- [ ] Gestion de plus de deux pairs.
- [ ] Gestion de salon
- [ ] Gestion de l’audio et de la vidéo séparé : quand on s’éloigne, la vidéo se coupe, mais l’audio diminue progressivement avec la distance avant de se couper.
