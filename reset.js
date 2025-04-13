(() => {

    const $scores = document.querySelectorAll(`[id*="P1"], [id*="P2"]`);
    const scores_array = Array.from($scores);

    const warning = () => {
        if (window.confirm("本当にリセットしますか？\n Are you sure to reset all the current game's scores?")) {
            for (let i = 0; i < scores_array.length; i++) {
                scores_array[i].value = "";
                scores_array[i].textContent = 0;
                scores_array[i].checked = false;
            }
        }
    }

    document.getElementById("reset_button").addEventListener("click", warning);

})();