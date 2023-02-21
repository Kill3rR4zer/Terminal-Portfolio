
const config = {

    "help": [
        {
            "title": "help",
            "description": "for a list of commands(add flags '-d' for commands description)",
            "info": ["help or ls command gives the list of commands","add '-d' flag for description of all commands also","write command after help to get info about that specific command like 'help typing'"]
        },
        {
            "title": "clear",
            "description": "to clear the terminal",
            "info": ["clear or cls command clears the terminal"]
        },
        {
            "title": "about",
            "description": "to learn more about me",
            "info": ["use about command to learn more about me"]
        },
        {
            "title": "social",
            "description": "to see my social links (add flags '-l' for links and '-d' for detailed results)",
            "info": ["use social command to see my social links","add '-l' flag for links and '-d' flag for detailed results"]
        },
        {
            "title": "projects",
            "description": "to see my projects",
            "info": ["use projects command to see my projects"]
        },
        {
            "title": "contact",
            "description": "to enquire about my services",
            "info": ["use enquire command to enquire about my services"]
        },
        {
            "title": "cheer",
            "description": "to appreciate my work",
            "info": ["use cheer command to appreciate my work"]
        },
        {
            "title": "ipconfig",
            "description": "to see your IP details",
            "info": ["use ipconfig command to see your IP details"]
        },
        {
            "title": "calc",
            "description": "to evaluate an expression, for eg: (2 + 3)",
            "info": ["use calc command to evaluate an expression","for eg: write 'calc 2+6*5/3'"]
        },
        {
            "title": "history",
            "description": "shows the last 10 valid commands performed, use --clear flag to clear the history",
            "info": ["use history command to show your last 10 commands history","use --clear flag to clear the history","use history {id} command to run command of that id in your history"]
        },
        {
            "title": "typing",
            "description": "shows typing animation status",
            "info": ["use typing command to see typing animation status","Turn typing animation on and off by adding -on or -off flags respectively","Also u can write a number(in ms) to set typing custom animation speed"]
        },
        {
            "title": "reset",
            "description": "to reload site",
            "info": ["use reset command to to reload site"]
        }
    ],
    "terminal": {
        "user": "$Sidharth_Sethi",
        "host": "sudo",
        "path": "~/guest"
    },
   
    "cheer": {
        "responseArray": [
            "Thank you! It makes my day😊😊😊",
            "It is great to hear that way!😁😁😁",
            "I would love to take credit😂😂😂",
            "That's so good to hear! I'm glad😍😍😍"
        ]
    },
    "about": "Hi, I'm Nico",
    "social": [
        {
            "title": "Matrix",
            "link": "https://matrix.to/#/@xnm:matrix.org"
        },
        
    ],

    "projects": [
        {
            "title": "Make-Meme",
            "link": "https://makememe.de/",
            "description": "Erstelle aus Bildern ein meme."
        },
    ],

    "contact": {
        "email": "admin@xnm.icu"
    },
    
}
export default config
