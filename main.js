function OnTimerStart()
{
    const queryString = window.location.search;
    var searchParams = new URLSearchParams(queryString);
    let time_s = Number(searchParams.get('time'))
    if(!isNaN(time_s))
    {
        RenderTimer(Number(searchParams.get('time')))
    }
}
function RenderTimer(seconds)
{
    if(seconds == 0)
    {
        OnTimerEnd();
        return;
    }
    else
    {
        el = document.getElementById("cdown");
        el.innerHTML = seconds;
        setTimeout(RenderTimer, 1000, (seconds-1));

    }
}

function OnTimerEnd()
{
    el = document.getElementById("cdown");
    el.innerHTML = "-";

    console.log("Timer up!")
}

function OnTimerCanceled()
{
    el = document.getElementById("cdown");
    el.innerHTML = "-";
    console.log("Timer canceled!")
}