host_ip = 'http://192.168.1.7/';

function RenderContent()
{
    //Add handlers
    exp_btn = document.getElementById("StartTimer")
    stop_btn = document.getElementById("StopTimer")
    exp_btn.onclick = StartTimer;
    stop_btn.onclick = StopTimer;
    GetLedStatus();
    GetTimerStatus();
}

function GetTimerStatus()
{
    fetch(host_ip + "api/GetTimerStatus")
      .then((response) => {
        return response.text();  })
    .then((data) => {
        console.log(data);
        if(data == "RUNNING")
        {
            RefreshPageTimer();
        }
    });

}
function RefreshPageTimer()
{
    fetch(host_ip + "api/GetTimerTime")
      .then((response) => {
        return response.text();  })
    .then((data) => {
        console.log(data);
        StartPageTimer(Math.round(Number(data)/1000));
    });
}
function StartTimer()
{
    expose_time = document.getElementById("expose_time");
    fetch(host_ip + "api/StartTimer",{
        mode:'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({time:expose_time.value})
      })
      .then((response) => {
        return response.text();  })
    .then((data) => {
        console.log(data);
    });
    StartPageTimer(expose_time.value);
    GetLedStatus();
}

function StopTimer()
{
    fetch(host_ip + "api/StopTimer",{
        mode:'no-cors',
        method: 'POST'}).then((response) => {
        return response.text();  })
    .then((data) => {
        console.log(data);
    });
    GetLedStatus();
    StopPageTimer();
}

function GetLedStatus()
{
    led_status = document.getElementById("led_status");
    fetch(host_ip + "api/GetLedStatus").then((response) => {
        return response.text();  })
    .then((data) => {
        console.log(data);
        if(data == "ON")
        {
            led_status.innerHTML = "ON";
            led_status.style.color = 'red';
        }
        else
        {
            led_status.innerHTML = "OFF";
            led_status.style.color = 'green';
        }
    }).catch((e) => {
        console.log('Error: ' + e.message);
        console.log(e.response);
    });
}


// Page timer

var timer = 0;
var timer_interval;
function StartPageTimer(seconds)
{
    timer = seconds;
    timer_interval =setInterval(RenderPageTimer,1000);
}

function StopPageTimer()
{
    clearInterval(timer_interval);
    el = document.getElementById("cdown");
    el.innerHTML = "off";
}
function RenderPageTimer()
{
    if(timer == 0)
    {
        OnPageTimerEnd();
        StopPageTimer();
        return;
    }
    else
    {
        el = document.getElementById("cdown");
        el.innerHTML = timer;
        timer-=1;
    }
}

function OnPageTimerEnd()
{
    el = document.getElementById("cdown");
    el.innerHTML = "off";
    window.navigator.vibrate(2000);
    console.log("Timer up!")
}
// function OnTimerStart()
// {
//     const queryString = window.location.search;
//     var searchParams = new URLSearchParams(queryString);
//     let time_s = Number(searchParams.get('time'))
//     if(!isNaN(time_s))
//     {
//         RenderTimer(Number(searchParams.get('time')))
//     }
// }

// function RenderTimer(seconds)
// {
//     if(seconds == 0)
//     {
//         OnTimerEnd();
//         return;
//     }
//     else
//     {
//         el = document.getElementById("cdown");
//         el.innerHTML = seconds;
//         setTimeout(RenderTimer, 1000, (seconds-1));
//     }
// }
// function CancelTimer()
// {

// }

// function OnTimerEnd()
// {
//     el = document.getElementById("cdown");
//     el.innerHTML = "off";
//     console.log("Timer up!")
// }

// function OnTimerCanceled()
// {
//     el = document.getElementById("cdown");
//     el.innerHTML = "off";
//     console.log("Timer canceled!")
// }