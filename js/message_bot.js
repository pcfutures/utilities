const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simulateClick = (element) => {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });

    const canceled = !element.dispatchEvent(event);
};

const friendElements = Array.from(document.getElementById('chatFriendsListUL').children);

const openRandomChat = () => {
    const randomElement = friendElements[getRandomInt(0, friendElements.length - 1)].children[0].children[1];
    
    simulateClick(randomElement);
}

const input = document.getElementsByClassName('chatTextBox')[0];
const send = document.getElementsByClassName('chatSendBtnPhp')[0];

let timeout = null;

const loop = (words) => {    
    input.value = words[getRandomInt(0, words.length - 1)];

    send.click();
    
    // 1 in 5 chance to switch the chat after we've sent a message.
    if (getRandomInt(0, 5) === 5) {
        openRandomChat();
    }

    timeout = setTimeout(() => loop(words), getRandomInt(5, 30) * 1000);
}

fetch("https://raw.githubusercontent.com/words/an-array-of-english-words/master/index.json").then((res) => res.json()).then((words) => {
    openRandomChat();
    
    loop(words);
})
