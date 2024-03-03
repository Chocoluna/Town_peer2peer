# tiw8-tp3

## Contributeurs

- COUTURIR-PETRASSON Claire, p1710174
- PHANG Romeo, p

## Build

- `yarn` pour installer les dépendances.

- `yarn build`pour construire le projet

- `yarn dev` pour démarrer le server sur le port 3000.

pour installer des dependances spécifiques au client ou server il faut dabord cd dans dans la repertoire cible avant de `yarn add VOTRE_PACKAGE`

## Evaluation

### Malus (points négatifs)

- [ ] linter original qui ne passe pas (ou trop d’exceptions dans le code) -2pt
- [ ] la séquence yarn install, yarn build et yarn start qui ne passe pas -2pt
- [ ] README pas clair sur les spécificité du projet (build, déploiement, ce qui marche et ce qui ne marche pas, sur comment tester…) -2pt

### Points

- [ ] Un style Tailwind (ou autre) est utilisé de manière judicieuse (aka l’application ressemble à quelque chose) (2pt)
- [ ] Les states et props de React sont bien utilisées (1pt).
- [ ] Utilisation des hooks appropriés (2pt).
- [ ] Mise en relation des pairs
  - [ ] signalement au serveur (2pt)
  - [ ] établissement de la connexion entre les deux pairs (2pt)
- [ ] Data (5pt)
  - [ ] les pairs peuvent s’envoyer des messages (2pt)
  - [ ] l’envoi de message est géré dans un middleware (2pt)
  - [ ] plusieurs participants bougent de manière cohérente (1pt)
- [ ] VidéoChat (5pt)
  - [ ] le flux local s’affiche
  - [ ] le flux distant est bien récupéré
  - [ ] le flux distant s’affiche
  - [ ] le tout fonctionne sur localhost
  - [ ] la fermeture de l’appel se passe correctement

### Bonus

- [ ] Déploiement
- [ ] Gestion de plus de deux pairs.
- [ ] Gestion de salon
- [ ] Gestion de l’audio et de la vidéo séparé : quand on s’éloigne, la vidéo se coupe, mais l’audio diminue progressivement avec la distance avant de se couper.
