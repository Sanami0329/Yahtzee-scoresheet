
(() => {

    // player, sectionごとにスコアを合計する関数を定義
    const total_sum = (player, section) => {
        const score_elements = document.querySelectorAll(`[id*="${player}-${section}-score"]`);   // 各要素を取得→各要素が配列（厳密にはnodlist）になる
        const score_array = Array.from(score_elements).map(scores => {  // 各要素の配列から値の配列へ変換（Array.fromで配列へ変換＆mapで値を取り出す）。
            const eachscore = parseInt(scores.value, 10);
            return isNaN(eachscore) ? 0 : eachscore; //もしスコアが空欄なら0として読み取り。
        });
        return score_array.reduce((sum, score) => sum + score, 0);
    };

    const update_total = (player) => {
        // upper score
        const $upper_score = document.getElementById(`${player}-upper_score`);
        $upper_score.textContent = total_sum(player, 'upper');
        // bonus
        const $bonus = document.getElementById(`${player}-bonus`);
        if (Number($upper_score.textContent) >= 63) {
            $bonus.textContent = 35;
        }
        // upper total
        const $upper_total = document.getElementById(`${player}-upper_total`);
        $upper_total.textContent = Number($upper_score.textContent) + Number($bonus.textContent);
        // lower total
        const $lower_total = document.getElementById(`${player}-lower_total`);
        $lower_total.textContent = total_sum(player, 'lower');
        // grand_total
        const $grand_total = document.getElementById(`${player}-grand_total`);
        $grand_total.textContent = Number($upper_total.textContent) + Number($lower_total.textContent);
    };


    // plus/minusボタンをクリックするとスコアが反映される関数
    const $buttons = document.querySelectorAll(`[class*='minus'], [class*='plus']`);

    for (let i = 0; i < $buttons.length; i++) {
        $buttons[i].addEventListener('click', (e) => {
            const event_button = e.target;
            const get_target = event_button.closest('div').querySelector('.score');
            const player_num = get_target.id.slice(0,2);

            let t = Number(get_target.value);
            if (isNaN(t)) t = 0;

            console.log(get_target.max);
            console.log();

            const plus_calc = () => {
                if (get_target.value < Number(get_target.max)) {
                    get_target.value = t + Number(get_target.step);
                }
            };
            const minus_calc = () => {
                if (get_target.value > Number(get_target.min)) {
                    get_target.value = t - Number(get_target.step);
                }
            };

            if (event_button.classList.contains("plus")) {
                plus_calc();
            } else {
                minus_calc();
            }

            update_total(player_num);
        });
    }
        

    const update_YB_checkbox = (player) => {
        let count = 0;
        const $P_checkbox = document.querySelectorAll(`[id*="${player}-YB_checkbox"]`); 
        count = Array.from($P_checkbox).filter(checkbox => checkbox.checked).length;
        if (count > 0) {
            document.getElementById(`${player}-lower-score100`).value = 100 * count;
        } else {
            document.getElementById(`${player}-lower-score100`).value = 0;
        }
    };

    const $YB_checkboxes = document.querySelectorAll(`[id*="P1-YB_checkbox"], [id*="P2-YB_checkbox"]`);

    for (let i = 0; i < $YB_checkboxes.length; i++) {
        $YB_checkboxes[i].addEventListener('change', (e) => {
            const event_id = e.currentTarget.id;
            const player_num = event_id.slice(0,2);
            
            update_YB_checkbox(player_num);
            update_total(player_num);
        });
    }

})();
