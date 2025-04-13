let st=0;
const randomcolor = () =>
{
    return `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
}
document.getElementById("create_elem").addEventListener("click",function()
{
    let comp=document.createElement("div");
    let columnstart=Math.round(Math.random()*48+1);
    let columnend=Math.round(Math.random()*(50-columnstart)+columnstart+1);
    let diametr=columnend-columnstart;
    let rowstart = Math.round(Math.random()*(50-diametr)+1);
    comp.style=`grid-area:${rowstart} / ${columnstart} / ${rowstart+diametr} / ${columnend};background-color:${randomcolor()};border-radius:50%;`;
    document.getElementById("drawing_field").appendChild(comp);
    st++;
    document.getElementById("count").innerText=st;
    console.log(columnstart, rowstart, columnend, rowstart+diametr);
})
document.getElementById("drawing_field").addEventListener("click",function(event)
{
    if(event.target &&event.target.id!="drawing_field")
    {
        (event.target).remove();
        st--;
        document.getElementById("count").innerText=st;
    }
})
document.documentElement.style.setProperty('--border1',`${randomcolor()}`);
document.documentElement.style.setProperty('--border2',`${randomcolor()}`);
document.documentElement.style.setProperty('--border3',`${randomcolor()}`);
document.documentElement.style.setProperty('--color1',`${randomcolor()}`);
document.documentElement.style.setProperty('--color2',`${randomcolor()}`);
document.documentElement.style.setProperty('--color3',`${randomcolor()}`);
document.documentElement.style.setProperty('--color4',`${randomcolor()}`);
document.documentElement.style.setProperty('--color5',`${randomcolor()}`);
document.documentElement.style.setProperty('--color6',`${randomcolor()}`);