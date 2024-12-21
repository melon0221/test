// 初始化数据
let totalDraws = 0;
const counts = { ssr: 0, sr: 0, hr: 0, other: 0 };

// 卡池信息
const groups = [
    {
        name: "套组 1",
        probability: 5,
        cards: [
            { name: "SSR 卡牌 1", rarity: "ssr", image: "images/ssr1.png" },
            { name: "SSR 卡牌 2", rarity: "ssr", image: "images/ssr2.png" }
        ]
    },
    {
        name: "套组 2",
        probability: 15,
        cards: [
            { name: "SR 卡牌 1", rarity: "sr", image: "images/sr1.png" },
            { name: "SR 卡牌 2", rarity: "sr", image: "images/sr2.png" }
        ]
    },
    {
        name: "套组 3",
        probability: 30,
        cards: [
            { name: "HR 卡牌 1", rarity: "hr", image: "images/hr1.png" },
            { name: "HR 卡牌 2", rarity: "hr", image: "images/hr2.png" }
        ]
    },
    {
        name: "套组 4",
        probability: 50,
        cards: [
            { name: "普通卡牌 1", rarity: "other", image: "images/common1.png" },
            { name: "普通卡牌 2", rarity: "other", image: "images/common2.png" }
        ]
    }
];

// 抽卡函数
function drawCard() {
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedGroup;

    // 根据概率选择套组
    for (let group of groups) {
        cumulative += group.probability;
        if (random <= cumulative) {
            selectedGroup = group;
            break;
        }
    }

    // 从选择的套组中随机抽取卡牌
    const cardIndex = Math.floor(Math.random() * selectedGroup.cards.length);
    const card = selectedGroup.cards[cardIndex];
    displayCard(card.name, card.rarity, card.image);
    updateStats(card.rarity);
}

// 显示卡片
function displayCard(name, rarity, image) {
    const cardDisplay = document.getElementById("cardDisplay");
    const isSpecial = rarity === "sr" || rarity === "ssr";

    cardDisplay.innerHTML = ` 
        <img src="${image}" alt="${name}" class="${isSpecial ? 'special-effect-img' : ''}">
        <h2 class="${rarity}">${name}</h2>
        <p>稀有度：<span class="${rarity}">${rarity.toUpperCase()}</span></p>
    `;

    if (isSpecial) {
        cardDisplay.classList.add("special-effect");

        // 确保特效不超过 3 秒
        setTimeout(() => {
            cardDisplay.classList.remove("special-effect");
        }, 3000);
    }

    updateHistory(name, rarity);
}

// 更新统计数据
function updateStats(rarity) {
    totalDraws++;
    counts[rarity]++;
    document.getElementById("totalDraws").textContent = totalDraws;
    document.getElementById("ssrCount").textContent = counts["ssr"];
    document.getElementById("srCount").textContent = counts["sr"];
    document.getElementById("hrCount").textContent = counts["hr"];
    document.getElementById("otherCount").textContent = counts["other"];
}

// 更新抽卡历史
function updateHistory(name, rarity) {
    if (rarity === "other") return;

    const history = document.getElementById("drawHistory");
    const newEntry = `<p class="${rarity}">${name} (${rarity.toUpperCase()})</p>`;
    history.innerHTML = newEntry + history.innerHTML;
}

// 重置统计数据
function resetStats() {
    totalDraws = 0;
    counts.ssr = counts.sr = counts.hr = counts.other = 0;
    document.getElementById("totalDraws").textContent = totalDraws;
    document.getElementById("ssrCount").textContent = counts["ssr"];
    document.getElementById("srCount").textContent = counts["sr"];
    document.getElementById("hrCount").textContent = counts["hr"];
    document.getElementById("otherCount").textContent = counts["other"];
    document.getElementById("drawHistory").innerHTML = "<h3>稀有卡牌历史</h3>";
    displayCard("点击抽卡！", "--", "");
}
