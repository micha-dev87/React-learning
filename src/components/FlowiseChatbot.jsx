import { BubbleChat } from 'flowise-embed-react'

const FlowiseChatbot = () => {
    return (
        <BubbleChat
            chatflowid="9e21a6a4-aca5-482a-9530-6b8ba7fa2f2a"
            apiHost="https://flowise.bienetresante.shop"
            chatflowConfig={{
                /* Configuration du flux de conversation */
            }}
            observersConfig={{
                /* Configuration des observateurs */
            }}
            theme={{
                button: {
                    backgroundColor: '#3B81F6',
                    right: 20,
                    bottom: 20,
                    size: 48,
                    dragAndDrop: true,
                    iconColor: 'white',
                    customIconSrc: 'chat-icon.svg',
                    autoWindowOpen: {
                        autoOpen: true,
                        openDelay: 2,
                        autoOpenOnMobile: false
                    }
                },
                tooltip: {
                    showTooltip: true,
                    tooltipMessage: 'Bonjour 👋 !',
                    tooltipBackgroundColor: 'black',
                    tooltipTextColor: 'white',
                    tooltipFontSize: 16
                },
                disclaimer: {
                    title: 'Conditions d\'utilisation',
                    message: "En utilisant ce chatbot, vous acceptez les <a target=\"_blank\" href=\"https://flowiseai.com/terms\">Conditions Générales d'Utilisation</a>",
                    textColor: 'black',
                    buttonColor: '#3b82f6',
                    buttonText: 'Commencer la discussion',
                    buttonTextColor: 'white',
                    blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backgroundColor: 'white'
                },
                customCSS: ``,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
                    title: 'Assistant de Michel Ange',
                    titleAvatarSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
                    welcomeMessage: 'Bonjour ! Je suis l\'assistant de Michel Ange. Comment puis-je vous aider aujourd\'hui ?',
                    errorMessage: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
                    backgroundColor: '#ffffff',
                    backgroundImage: '',
                    height: 700,
                    width: 400,
                    fontSize: 16,
                    starterPrompts: [
                        "Quelles sont vos compétences ?",
                        "Parlez-moi de vos projets",
                        "Comment vous contacter ?"
                    ],
                    starterPromptFontSize: 15,
                    clearChatOnReload: false,
                    sourceDocsTitle: 'Sources :',
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: '#f7f8ff',
                        textColor: '#303235',
                        showAvatar: true,
                        avatarSrc: 'https://media.licdn.com/dms/image/v2/D4E35AQEmrvVmvJoFaw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1714939966393?e=1760605200&v=beta&t=cu8Uciry5WExorcaND7wOOerUhoWwP441vwNcoYb-w0'
                    },
                    userMessage: {
                        backgroundColor: '#3B81F6',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
                    },
                    textInput: {
                        placeholder: 'Tapez votre question...',
                        backgroundColor: '#ffffff',
                        textColor: '#303235',
                        sendButtonColor: '#3B81F6',
                        maxChars: 500,
                        maxCharsWarningMessage: 'Vous avez dépassé la limite de caractères. Veuillez saisir moins de 500 caractères.',
                        autoFocus: true,
                        sendMessageSound: true,
                        sendSoundLocation: 'send_message.mp3',
                        receiveMessageSound: true,
                        receiveSoundLocation: 'receive_message.mp3'
                    },
                    feedback: {
                        color: '#303235'
                    },
                    dateTimeToggle: {
                        date: true,
                        time: true
                    },
                    footer: {
                        textColor: '#303235',
                        text: 'Cree par',
                        company: 'Michel Ange',
                        companyLink: 'https://portfolio.bienetresante.shop/'
                    }
                }
            }}
        />
    )
}

export default FlowiseChatbot

