# 🤖 Configuration du Chatbot Flowise

## Description

Le composant `FlowiseChatbot` intègre un assistant virtuel alimenté par Flowise dans votre portfolio React. Le chatbot apparaît comme une bulle flottante en bas à droite de l'écran.

## Fonctionnalités

- ✅ **Textes entièrement en français**
- ✅ **Ouverture automatique** après 2 secondes (désactivée sur mobile)
- ✅ **Interface personnalisée** aux couleurs de votre portfolio
- ✅ **Messages de démarrage** pour guider les visiteurs
- ✅ **Déplaçable** (drag and drop)
- ✅ **Responsive** (s'adapte au mobile)

## Configuration

### Identifiants

```javascript
chatflowid="9e21a6a4-aca5-482a-9530-6b8ba7fa2f2a"
apiHost="https://flowise.bienetresante.shop"
```

### Messages personnalisables

Dans `src/components/FlowiseChatbot.jsx`, vous pouvez modifier :

1. **Message d'accueil** :
   ```javascript
   welcomeMessage: 'Bonjour ! Je suis votre assistant virtuel...'
   ```

2. **Titre du chatbot** :
   ```javascript
   title: 'Assistant Portfolio'
   ```

3. **Questions de démarrage** :
   ```javascript
   starterPrompts: [
       "Quelles sont vos compétences ?",
       "Parlez-moi de vos projets",
       "Comment vous contacter ?"
   ]
   ```

4. **Message du tooltip** :
   ```javascript
   tooltipMessage: 'Bonjour 👋 !'
   ```

5. **Conditions d'utilisation** :
   ```javascript
   disclaimer: {
       title: 'Conditions d\'utilisation',
       message: "En utilisant ce chatbot...",
       buttonText: 'Commencer la discussion'
   }
   ```

## Personnalisation des couleurs

```javascript
theme: {
    button: {
        backgroundColor: '#3B81F6',  // Couleur du bouton
        iconColor: 'white'
    },
    userMessage: {
        backgroundColor: '#3B81F6',  // Couleur des messages utilisateur
        textColor: '#ffffff'
    },
    botMessage: {
        backgroundColor: '#f7f8ff',  // Couleur des messages du bot
        textColor: '#303235'
    }
}
```

## Position et taille

```javascript
button: {
    right: 20,    // Distance depuis la droite (px)
    bottom: 20,   // Distance depuis le bas (px)
    size: 48      // Taille du bouton (px)
}

chatWindow: {
    height: 700,  // Hauteur de la fenêtre de chat
    width: 400    // Largeur de la fenêtre de chat
}
```

## Ouverture automatique

```javascript
autoWindowOpen: {
    autoOpen: true,           // Activer l'ouverture auto
    openDelay: 2,             // Délai en secondes
    autoOpenOnMobile: false   // Désactiver sur mobile
}
```

Pour **désactiver** l'ouverture automatique :
```javascript
autoWindowOpen: {
    autoOpen: false
}
```

## Sons

Le chatbot peut jouer des sons lors de l'envoi/réception de messages :

```javascript
textInput: {
    sendMessageSound: true,
    sendSoundLocation: 'send_message.mp3',
    receiveMessageSound: true,
    receiveSoundLocation: 'receive_message.mp3'
}
```

Pour **désactiver les sons** :
```javascript
sendMessageSound: false,
receiveMessageSound: false
```

## Intégration dans l'application

Le composant est importé dans `src/App.jsx` :

```javascript
import FlowiseChatbot from './components/FlowiseChatbot';

function App() {
  return (
    <div>
      {/* Votre contenu */}
      <FlowiseChatbot />
    </div>
  );
}
```

Le chatbot s'affichera sur **toutes les pages** de votre application.

## Icônes personnalisées

Vous pouvez changer les avatars et icônes :

```javascript
customIconSrc: 'URL_VERS_VOTRE_ICONE',
titleAvatarSrc: 'URL_VERS_AVATAR_TITRE',
botMessage.avatarSrc: 'URL_VERS_AVATAR_BOT',
userMessage.avatarSrc: 'URL_VERS_AVATAR_UTILISATEUR'
```

## Limites de caractères

```javascript
textInput: {
    maxChars: 500,
    maxCharsWarningMessage: 'Vous avez dépassé la limite...'
}
```

## Désactiver le chatbot temporairement

Pour désactiver temporairement le chatbot sans supprimer le code, commentez simplement l'import dans `App.jsx` :

```javascript
// import FlowiseChatbot from './components/FlowiseChatbot';

// ...

// <FlowiseChatbot />
```

## Troubleshooting

### Le chatbot ne s'affiche pas
1. Vérifiez que le package est installé : `npm list flowise-embed-react`
2. Vérifiez la console du navigateur pour les erreurs
3. Vérifiez que l'API Host est accessible

### Le chatbot ne répond pas
1. Vérifiez que le `chatflowid` est correct
2. Vérifiez que l'`apiHost` est accessible
3. Testez l'URL directement dans votre navigateur

### Problèmes de style
1. Assurez-vous que TailwindCSS et DaisyUI sont bien configurés
2. Vérifiez les conflits CSS potentiels
3. Utilisez `customCSS` pour des styles personnalisés

## Support

Pour plus d'informations sur Flowise :
- Documentation : https://docs.flowiseai.com/
- GitHub : https://github.com/FlowiseAI/Flowise

## Notes

- Le chatbot utilise le port **443** (HTTPS) pour communiquer avec l'API
- Les données sont stockées sur votre instance Flowise
- Le chatbot est compatible avec tous les navigateurs modernes

