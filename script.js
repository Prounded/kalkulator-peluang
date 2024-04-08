const ERRORDISPLAY = document.getElementById('errorDisplay');
const displayResult = [document.getElementById('fractionMethod'), document.getElementById('decimalMethod'), document.getElementById('percentMethod')];


function howToUse(){
    const theCalculator = document.getElementById('teoritisContainer').style.visibility;
    const theManual = document.getElementById('howToUseContainer').style.visibility;

    if(theCalculator === 'hidden' && theManual === 'visible'){
        document.getElementById('teoritisContainer').style.visibility = 'visible';
        document.getElementById('howToUseContainer').style.visibility = 'hidden';
    }
    else{
        document.getElementById('teoritisContainer').style.visibility = 'hidden';
        document.getElementById('howToUseContainer').style.visibility = 'visible';
    }
}

function findAnswer(){
    const totalVariable = Number(document.getElementById('totalBenda').value);
    const repeatSample = Number(document.getElementById('banyakPengambilan').value);
    const sameSample = Number(document.getElementById('bendaSejenis').value);
    const returnsSample = document.getElementById('cbx-46').checked;

    if(totalVariable === 0 || repeatSample === 0 || sameSample === 0){
        ERRORDISPLAY.textContent = '*Input Angka Salah!';
    }
    else if(totalVariable > 25 || sameSample > 25){
        ERRORDISPLAY.textContent = '*Angka Terlalu Besar! (Maksimal 25)';
    }
    else if(repeatSample > 5){
        ERRORDISPLAY.textContent = '*Angka Terlalu Besar! (Maksimal 5)';
    }
    else if(totalVariable < sameSample){
        ERRORDISPLAY.textContent = '*Angka Total Harus Lebih besar Dari Sampel Sejenis!';
    }
    else if(repeatSample > sameSample && !returnsSample){
        ERRORDISPLAY.textContent = '*Angka Kurang Tepat! Coba Aktifkan pengembalian sampel';
    }
    else{
        ERRORDISPLAY.textContent = '';
        if(!returnsSample){
            let i = 0;
            let thePossibleProb = 1;
            let theCorrectProb = 1;
            for(i; i < repeatSample; i++){
                let nowSample = totalVariable - i;         
                thePossibleProb *= nowSample;                //Bagian bawah pecahan
                let allPossible = sameSample - i;
                theCorrectProb *= allPossible;               //Bagian atas pecahan
            }
            setAllFuncs(theCorrectProb, thePossibleProb);
            console.log(`${theCorrectProb}/${thePossibleProb}`);
        }
        else if(returnsSample){
            let i = 0;
            let thePossibleProb = 1;
            let theCorrectProb = 1;
            for(i; i < repeatSample; i++){
                thePossibleProb *= totalVariable;
                theCorrectProb *= sameSample;
            }
            setAllFuncs(theCorrectProb, thePossibleProb);
            console.log(`${theCorrectProb}/${thePossibleProb}`);
        }
    }
}

function changeMethodDisplay(){
    const theDisplayNow = document.getElementById('changeMethod');
    const theFraction = document.getElementById('fractionMethod');
    const theDecimal = document.getElementById('decimalMethod');
    const thePercent = document.getElementById('percentMethod');
    if(theDisplayNow.textContent === 'Pecahan'){
        theDisplayNow.textContent = 'Desimal';
        theFraction.style.visibility = 'hidden';
        theDecimal.style.visibility = 'visible';
    }
    else if(theDisplayNow.textContent === 'Desimal'){
        theDisplayNow.textContent = 'Persentase';
        theDecimal.style.visibility = 'hidden';
        thePercent.style.visibility = 'visible';
    }
    else if(theDisplayNow.textContent === 'Persentase'){
        theDisplayNow.textContent = 'Pecahan';
        theFraction.style.visibility = 'visible';
        thePercent.style.visibility = 'hidden';
    }
}

function changeUserDisplay(values){
    const theDisplayNow = document.getElementById('changeMethod');
    if(values === 'toCalculator'){
        document.getElementById('resultContainer').style.visibility = 'hidden';
        for(index in displayResult){
            displayResult[index].style.visibility = 'hidden';
        }
        setTimeout(() => {
            document.getElementById('teoritisContainer').style.visibility = 'visible';
        }, 1950);
    }
    else if(values === 'toResult'){
        document.getElementById('teoritisContainer').style.visibility = 'hidden';
        setTimeout(() => {
            document.getElementById('fractionMethod').style.visibility = 'visible';
            theDisplayNow.textContent = 'Pecahan';
            document.getElementById('resultContainer').style.visibility = 'visible';
        }, 1950);
    }
    document.getElementById('loadingScreenContainer').style.visibility = 'visible';
    document.getElementById('loaderBars').classList.add('loaderbar');
    
    setTimeout(() => {
        document.getElementById('loadingScreenContainer').style.visibility = 'hidden';
        document.getElementById('loaderBars').classList.remove('loaderbar');
    }, 1950);
}

function setAllFuncs(topValue, bottomValue){
    const display1 = document.getElementById('InputFirst');
    const display2 = document.getElementById('InputSecond');
    const display3 = document.getElementById('InputThird');
    const display4 = document.getElementById('InputFourth');
    const fractionDisplay = document.getElementById('fractionMethod');
    const decimalDisplay = document.getElementById('decimalMethod');
    const percentDisplay = document.getElementById('percentMethod');
    const totalVariable = Number(document.getElementById('totalBenda').value);
    const repeatSample = Number(document.getElementById('banyakPengambilan').value);
    const sameSample = Number(document.getElementById('bendaSejenis').value);
    const returnsSample = document.getElementById('cbx-46').checked;
    
    let tofixNum = 1;

    function simplify(tops, bottoms){
        let doAgain = false;
        let resultTop = tops;
        let resultBottom = bottoms;
        switch(true){
            case(resultBottom % resultTop === 0 && resultTop > 1):
                console.log(resultTop, resultBottom);
                resultBottom = resultBottom / resultTop;
                resultTop = 1;
                doAgain = true;
                break;

            case(resultTop % 10 === 0 && resultBottom % 10 === 0):
                resultTop = resultTop / 10;
                resultBottom = resultBottom / 10;
                doAgain = true;
                break;

            case(resultTop % 9 === 0 && resultBottom % 9 === 0):
                resultTop = resultTop / 9;
                resultBottom = resultBottom / 9;
                doAgain = true;
                break;

            case(resultTop % 8 === 0 && resultBottom % 8 === 0):
                resultTop = resultTop / 8;
                resultBottom = resultBottom / 8;
                doAgain = true;
                break;

            case(resultTop % 7 === 0 && resultBottom % 7 === 0):
                resultTop = resultTop / 7;
                resultBottom = resultBottom / 7;
                doAgain = true;
                break;

            case(resultTop % 6 === 0 && resultBottom % 6 === 0):
                resultTop = resultTop / 6;
                resultBottom = resultBottom / 6;
                doAgain = true;
                break;

            case(resultTop % 5 === 0 && resultBottom % 5 === 0):
                resultTop = resultTop / 5;
                resultBottom = resultBottom / 5;
                doAgain = true;
                break;

            case(resultTop % 4 === 0 && resultBottom % 4 === 0):
                resultTop = resultTop / 4;
                resultBottom = resultBottom / 4;
                doAgain = true;
                break;

            case(resultTop % 3 === 0 && resultBottom % 3 === 0):
                resultTop = resultTop / 3;
                resultBottom = resultBottom / 3;
                doAgain = true;
                break;

            case(resultTop % 2 === 0 && resultBottom % 2 === 0):
                resultTop = resultTop / 2;
                resultBottom = resultBottom / 2;
                doAgain = true;
                break;
            default:
                doAgain = false;
            }

            if(!doAgain){
                nextExecutions(resultTop, resultBottom);
            }
            else{
                simplify(resultTop, resultBottom);
            }
    }

    display1.textContent = `- Total Titik Sampel : ${totalVariable}`;
    display2.textContent = `- Banyak Pengambilan Sampel : ${repeatSample}`;
    display3.textContent = `- Banyak Sampel Sejenis : ${sameSample}`;

    if(returnsSample){
        display4.textContent = '- Dilakukan Pengembalian Sampel';
    }
    else{
        display4.textContent = '- Tidak Dilakukan Pengembalian Sampel';
    }

    simplify(topValue, bottomValue);

    function nextExecutions(topVal, botVal){
        fractionDisplay.attributes.top.textContent = topVal;
        fractionDisplay.attributes.bottom.textContent = botVal;

        let decimalDisplays = (topVal/botVal).toFixed(tofixNum);
        let again = true;
        while(again){
            if(decimalDisplays[decimalDisplays.length - 1] == 0 && decimalDisplays.includes('.')){
                decimalDisplays = decimalDisplays.slice(0, decimalDisplays.length - 1);
                again = true;
            }
            else if(decimalDisplays[decimalDisplays.length - 1] == 0 && decimalDisplays.includes(',')){
                decimalDisplays = decimalDisplays.slice(0, decimalDisplays.length - 1);
                again = true;
            }
            else if(decimalDisplays[decimalDisplays.length - 1] == '.' || decimalDisplays[decimalDisplays.length - 1] == ','){
                decimalDisplays = decimalDisplays.slice(0, decimalDisplays.length - 1);
                again = true;
            }
            else{
                again = false;
            }
        }

        let percentValues = (topVal/botVal.toFixed(tofixNum) * 100).toFixed(tofixNum);
        again = true;
        while(again){
            if(percentValues[percentValues.length - 1] == 0 && percentValues.includes('.')){
                percentValues = percentValues.slice(0, percentValues.length - 1);
                again = true;
            }
            else if(percentValues[percentValues.length - 1] == 0 && percentValues.includes(',')){
                percentValues = percentValues.slice(0, percentValues.length - 1);
                again = true;
            }
            else if(percentValues[percentValues.length - 1] == '.' || percentValues[percentValues.length - 1] == ','){
                percentValues = percentValues.slice(0, percentValues.length - 1);
                again = true;
            }
            else{
                again = false;
            }
        }

        if(decimalDisplays == 0 || percentValues == 0){
            tofixNum ++;
            nextExecutions(topVal, botVal);
        }
        else{
            decimalDisplay.textContent = decimalDisplays;

            percentDisplay.textContent = `${percentValues}%`
            changeUserDisplay('toResult');
        }
    }
}