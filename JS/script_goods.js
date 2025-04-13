let size,width,height;
function updatesize()
{
if(width!=document.documentElement.clientWidth || height!=document.documentElement.clientHeight)
{
    width =document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    gorizontal_size=width/157;
    vertical_size=100;
    document.documentElement.style.setProperty('--size',`${Math.min(gorizontal_size,vertical_size)}px`);
    size = Math.min(gorizontal_size,vertical_size);
}
}
updatesize();
window.addEventListener('resize',updatesize);
const createelem = function()
{
    let args =Array.from(arguments);
    let tagname =args[0];
    let classname = args[1];
    let text = args[2];
    let html = args [3];
    const result = document.createElement(`${tagname}`);
    if(classname!="")
    {
        result.classList.add(`${classname}`);
    }
    if(text!="")
    {
        result.innerText=text;
    }
    if(html!="")
    {
        result.innerHTML=html;
    }
    for(let i=4;i<args.length;i++)
    {
        result.appendChild(args[i]);
    }
    return result;
}
const create_goods = function()
{
    let a = Array.from(arguments);
    let title=a[0], subtitle=a[1], type=a[2],price=a[3],src=a[4],contity=a[5];
    const img = document.createElement("img");
    img.src=src;
    const result = createelem("div","","","",
                        img,
                        createelem("h2","",`${title}`,""),
                        createelem("p","",`${subtitle}`,""),
                        createelem("span","",`${type}`,""),
                        createelem("p","",`${price}`,""),
                        createelem("p","",`Contity in stock: ${contity}`,""),
                        createelem("button","","Add to cart",""));
    document.getElementById("main").appendChild(result);
}
create_goods("Cook This Book",  "Molly Baz",  "PaperBack",  "$22.69",  "../img/cookbook.jpg",  8);
create_goods("Harry Potter part 3",  "Joanne Rowling",  "PaperBack",  "$25.00",  "../img/HarryPotter.jpg"  ,12);
create_goods("Kobzar",  "Taras Shevchenko",  "PaperBack",  "$100.00",  "../img/Kobzar.jpg",  4);
create_goods("Treasure Island",  "Robert Louis Stevenson",  "PaperBack",  "$64.50",  "../img/Treasure-Island.jpg",  7);
create_goods("The Universe in a Nutshell",  "Stephen Hawking",  "PaperBack",  "$30.50",  "../img/Universe.jpg",  2);
create_goods("The Beautiful fall",  "Hugh Breakey",  "Ebook",  "$12.40",  "../img/beautifulfall.png", 3);
create_goods("The Little Prince",  "Antoine de Saint-Exupery",  "PaperBack","$22.00",  "../img/LittlePrince.jpg",  7);
create_goods("Eragon",  "Cristopher Paolini",  "PaperBack",  "$30.20",  "../img/Eragon.jpg",  7);
function getSiblings(element) 
{
    return [...element.parentElement.children].filter(child => child !== element);
}
document.getElementById("main").addEventListener("click",function(event)
{
    if(event.target && (event.target.tagName.toLowerCase()==="button"))
    {
        let b=event.target;
        let a=getSiblings(b);
        let mas =[];
        let obj =
        {
            title:a[1].innerText,
            subtitle:a[2].innerText,
            type:a[3].innerText,
            price:a[4].innerText.substring(1),
            src:a[0].src,
            contity_stock:a[5].innerText.split("Contity in stock:")[1],
            contity:1
        }
        if(localStorage.getItem(a[1].innerText)==null)
        {
        localStorage.setItem(`${a[1].innerText}`,JSON.stringify(obj));
        }
    }
}
)