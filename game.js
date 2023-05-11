const hands = [
    {
        name: 'グー',
        img: './img/janken_gu.png', // グーの画像パス
    },
    {
        name: 'チョキ',
        img: './img/janken_choki.png', // チョキの画像パス
    },
    {
        name: 'パー',
        img: './img/janken_pa.png', // パーの画像パス
    },

];

let playerHand = [];
let cpuHand = [];
let playerStars = 3;
let cpuStars = 3;

// プレイヤーとCPUの手札を初期化
playerHand = ["グー", "グー", "グー", "グー", "パー", "パー", "パー", "パー", "チョキ", "チョキ", "チョキ", "チョキ"];
cpuHand = ["グー", "グー", "グー", "グー", "パー", "パー", "パー", "パー", "チョキ", "チョキ", "チョキ", "チョキ"];

function init() {
    // プレイヤーとCPUの星の初期化
    playerStars = 3;
    cpuStars = 3;

    // 手札と星を表示するためのコードを一度呼び出し
    updateUI();

    // 手札をクリックしたときのイベントリスナーを登録する
    const playerHandContainer = document.getElementById("playerHand");
    playerHandContainer.addEventListener("click", selectCard);
}

// クリックされたカードを選択して、playGameを呼び出す
function selectCard(event) {
    // クリックされた画像が手札にあるかを確認
    const cardName = event.target.alt;
    const index = playerHand.indexOf(cardName);
    if (index === -1) {
        // クリックされた画像が手札にない場合は何もしない
        return;
    }

    // クリックされたカードを選択して、playGameを呼び出す
    const selectedCard = playerHand[index];
    playGame(selectedCard);
}



// 更新するたびにinitを呼び出す
window.addEventListener("load", init);

// 手札と星を表示させるコード
function updateUI() {
    const playerHandContainer = document.getElementById("playerHand");
    playerHandContainer.innerHTML = "";
    for (let i = 0; i < playerHand.length; i++) {
        const hand = hands.find((h) => h.name === playerHand[i]);
        const img = document.createElement("img");
        img.src = hand.img;
        img.alt = hand.name;
        img.style.width = "60px";
        playerHandContainer.appendChild(img);
    }

    const cpuHandContainer = document.getElementById("cpuHand");
    cpuHandContainer.innerHTML = "";
    for (let i = 0; i < cpuHand.length; i++) {
        const hand = hands.find((h) => h.name === cpuHand[i]);
        const img = document.createElement("img");
        img.src = hand.img;
        img.alt = hand.name;
        img.style.width = "60px";
        cpuHandContainer.appendChild(img);
    }

    // プレイヤーの星を更新するためのコード
    const playerStarsContainer = document.getElementById("playerStars");
    playerStarsContainer.innerHTML = "";
    for (let i = 0; i < playerStars; i++) {
        const img = document.createElement("img");
        img.src = "./img/star.png";
        img.style.width = "60px";
        playerStarsContainer.appendChild(img);
    }

    // CPUの星を更新するためのコード
    const cpuStarsContainer = document.getElementById("cpuStars");
    cpuStarsContainer.innerHTML = "";
    for (let i = 0; i < cpuStars; i++) {
        const img = document.createElement("img");
        img.src = "./img/star.png";
        img.style.width = "60px";
        cpuStarsContainer.appendChild(img);
    }

}

// 勝敗の判定とカードの有無の判定をするコード
function playGame(playerChoice) {
    if (playerStars === 0 || cpuStars === 0) {
        // どちらかの星の残数が0になったら終了
        return;
    }

    let playerIndex = playerHand.indexOf(playerChoice);
    if (playerIndex !== -1) {
        playerHand.splice(playerIndex, 1);
    } else {
        alert("選択したカードがありません！");
        return;
    }

    let cpuIndex = Math.floor(Math.random() * cpuHand.length);
    let cpuChoice = cpuHand[cpuIndex];
    cpuHand.splice(cpuIndex, 1);

    let result;
    if (playerChoice === cpuChoice) {
        result = "引き分けです！";
    } else if (
        (playerChoice === "グー" && cpuChoice === "チョキ") ||
        (playerChoice === "パー" && cpuChoice === "グー") ||
        (playerChoice === "チョキ" && cpuChoice === "パー")
    ) {
        result = "勝ちました！相手の星を1つ手に入れました！";
        cpuStars--;
        playerStars++;
    } else {
        result = "負けました！自分の星を1つ失いました！";
        playerStars--;
        cpuStars++;
    }

    document.getElementById("result").textContent = result;
    updateUI();

    if (playerStars === 0 || cpuStars === 0) {
        // どちらかの星の残数が0になったら終了
        let gameResult = playerStars === 0 ? "あなたの負けです！" : "あなたの勝ちです！";
        alert(gameResult);
    } else if (playerHand.length === 0 && cpuHand.length === 0) {
        // 手札が残っていない場合は引き分け
        alert("このゲームは引き分けです！");
    }
}
