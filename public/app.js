document.getElementById('eggAvatar').addEventListener('click', function() {
    fetch('./getAdvice')
        .then(response => response.json())
        .then(data => {
            document.getElementById('adviceBox').style.fontSize ='20px'
            document.getElementById('adviceBox').innerText = data.advice;
        })
        .catch(error => {
            console.log(error)
            document.getElementById('adviceBox').innerText = "EggBot is scrambled... Try again! [[error on frontend egg click request / response cycle in app.js]]";
        });
});


document.getElementById('askButton').addEventListener('click', function(){
    let userQuestion = document.getElementById('userQuestion').value;
    
    //just checking to make sure user typed something into input / it's not blank
    if (userQuestion.trim() !== "") {

        //ensuring GPT response wont' be too wordy for my token limit....
        userQuestion = `${userQuestion}. curt response under 60 words`
        
        fetch(`/getAdvice?question=${encodeURIComponent(userQuestion)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('adviceBox').style.fontSize ='20px';
                document.getElementById('adviceBox').innerText = data.advice;
            })
            .catch(error => {
                console.log(error)
                document.getElementById('adviceBox').innerText = "You have confused the mighty EggBot... Try again! [[JK. It's probably something wrong with Scott's janky code or OpenAI's stupid API --> askButton / input function on app.js]]";
            });
    } 
    
    else {
        //possibly my favorite piece of code I've ever written lol....
        userQuestion = "please talk to me as if I am an ungrateful servent who is hungover and pitiful, and you are the allmighty Egg God who needs to educate me on the ways of the universe and my own existence, but you are impatient and curt and limited to 50 words. mention the egg god"
        fetch(`/getAdvice?question=${encodeURIComponent(userQuestion)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('adviceBox').style.fontSize ='20px'
                document.getElementById('adviceBox').innerText = data.advice;
            })
            .catch(error => {
                console.log(error)
                document.getElementById('adviceBox').innerText = "You have confused the mighty Eggbot... Try again! [[JK. It's probably something wrong with Scott's janky code or OpenAI's stupid API --> askButton input function]]";
            });
    }
})