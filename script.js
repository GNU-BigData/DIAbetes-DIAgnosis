document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var btn = document.getElementById('diagnoseButton');
    btn.disabled = true;

    // 데이터 수집
    var data = {
        n_pregnant: document.getElementById('n_pregnant').value,
        glucose_concentration: document.getElementById('glucose_concentration').value,
        blood_pressure: document.getElementById('blood_pressure').value,
        skin_thickness: document.getElementById('skin_thickness').value,
        serum_insulin: document.getElementById('serum_insulin').value,
        BMI: document.getElementById('BMI').value,
        pedigree_function: document.getElementById('pedigree_function').value,
        age: document.getElementById('age').value
    };

    // 서버로 요청 보내기
    fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    
    .then(data => {
        document.getElementById('result').innerHTML = '';
        const result = data.prediction === 1 ? '당신은... 당뇨병입니다!' : '당신은... 당뇨병이 아닙니다!';
        const text = document.querySelector("#result");
        let i = 0;

        function typing(){
            if (i < result.length) {
            let txt = result.charAt(i);
            text.innerHTML += txt;
            i++;
            }
        }
        setInterval(typing, 30)
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = '';
        if (error.message === 'Failed to fetch') {
            result = '서버 연결 실패! 서버를 실행중인지 확인해주세요.';
        }
        else {
            result = '오류 발생: ' + error;
        }
        const text = document.querySelector("#result");
        let i = 0;

        function typing(){
            if (i < result.length) {
            let txt = result.charAt(i);
            text.innerHTML += txt;
            i++;
            }
        }
        setInterval(typing, 30)

    setTimeout(function() {
        btn.disabled = false;
    }, 2000); // 2000밀리초 후에 버튼을 다시 활성화합니다.

    });
});

document.querySelector('button[type="random"]').addEventListener('click', function() {
    // Form_Example 데이터
    var formExample = [
        {'n_pregnant': 6, 'glucose_concentration': 148, 'blood_pressure': 72, 'skin_thickness': 35, 'serum_insulin': 0, 'BMI': 33.6, 'pedigree_function': 0.627, 'age': 50},
        {'n_pregnant': 1, 'glucose_concentration': 0, 'blood_pressure': 48, 'skin_thickness': 20, 'serum_insulin': 0, 'BMI': 24.7, 'pedigree_function': 0.14, 'age': 22},
        {'n_pregnant': 1, 'glucose_concentration': 0, 'blood_pressure': 74, 'skin_thickness': 20, 'serum_insulin': 23, 'BMI': 27.7, 'pedigree_function': 0.299, 'age': 21},
        {'n_pregnant': 1, 'glucose_concentration': 0, 'blood_pressure': 68, 'skin_thickness': 35, 'serum_insulin': 0, 'BMI': 32.0, 'pedigree_function': 0.389, 'age': 22},
        {'n_pregnant': 5, 'glucose_concentration': 0, 'blood_pressure': 80, 'skin_thickness': 32, 'serum_insulin': 0, 'BMI': 41.0, 'pedigree_function': 0.346, 'age': 37},
        {'n_pregnant': 6, 'glucose_concentration': 0, 'blood_pressure': 68, 'skin_thickness': 41, 'serum_insulin': 0, 'BMI': 39.0, 'pedigree_function': 0.727, 'age': 41},
        
        {'n_pregnant': 1, 'glucose_concentration': 85, 'blood_pressure': 66, 'skin_thickness': 29, 'serum_insulin': 0, 'BMI': 26.6, 'pedigree_function': 0.351, 'age': 31},
        {'n_pregnant': 8, 'glucose_concentration': 183, 'blood_pressure': 64, 'skin_thickness': 0, 'serum_insulin': 0, 'BMI': 23.3, 'pedigree_function': 0.672, 'age': 32},
        {'n_pregnant': 1, 'glucose_concentration': 89, 'blood_pressure': 66, 'skin_thickness': 23, 'serum_insulin': 94, 'BMI': 28.1, 'pedigree_function': 0.167, 'age': 21},
        {'n_pregnant': 0, 'glucose_concentration': 137, 'blood_pressure': 40, 'skin_thickness': 35, 'serum_insulin': 168, 'BMI': 43.1, 'pedigree_function': 2.288, 'age': 33},
        {'n_pregnant': 5, 'glucose_concentration': 116, 'blood_pressure': 74, 'skin_thickness': 0, 'serum_insulin': 0, 'BMI': 25.6, 'pedigree_function': 0.201, 'age': 30},
        {'n_pregnant': 3, 'glucose_concentration': 78, 'blood_pressure': 50, 'skin_thickness': 32, 'serum_insulin': 88, 'BMI': 31, 'pedigree_function': 0.248, 'age': 26},
    ];
    

    // 랜덤한 예시 정보 선택
    var randomIndex = Math.floor(Math.random() * formExample.length);
    var randomData = formExample[randomIndex];

    // 데이터를 폼에 채우기
    document.getElementById('n_pregnant').value = randomData.n_pregnant;
    document.getElementById('glucose_concentration').value = randomData.glucose_concentration;
    document.getElementById('blood_pressure').value = randomData.blood_pressure;
    document.getElementById('skin_thickness').value = randomData.skin_thickness;
    document.getElementById('serum_insulin').value = randomData.serum_insulin;
    document.getElementById('BMI').value = randomData.BMI;
    document.getElementById('pedigree_function').value = randomData.pedigree_function;
    document.getElementById('age').value = randomData.age;
});