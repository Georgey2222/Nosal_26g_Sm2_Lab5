let size,width,height;
function updatesize()
{
if(width!=document.documentElement.clientWidth || height!=document.documentElement.clientHeight)
{
    width =document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    gorizontal_size=width/151.6;
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
const createelem_2 = function()
{
    let a=Array.from(arguments);
    a[0].id=a[1];
    return a[0];
}
const create_check =function()
{
    const tot_box = document.createElement("div");
    tot_box.classList.add("total_box");
    const items = document.createElement("div");
    items.classList.add("items");
    items.id = "Items";
    tot_box.appendChild(items);
    const promocode = document.createElement("div");
    const promtext =document.createElement("span");
    promtext.innerText="I have a promocode";
    promocode.classList.add("promocode");
    const selectcode = document.createElement("button");
    selectcode.innerText="▼";
    selectcode.classList.add("selectcode");
    promocode.appendChild(promtext);
    promocode.appendChild(selectcode);
    tot_box.appendChild(promocode);
    const totalprice = document.createElement("div");
    totalprice.style="display:flex;justify-content:space-beetween;";
    const text =document.createElement("span");
    text.innerText="Total";
    text.style="font-size:1.1em;font-weight:bold;";
    const cina = document.createElement("span");
    cina.innerText="$00.00";
    cina.id="total_price";
    cina.style = "font-size:1.1em;font-weight:bold;";
    totalprice.appendChild(text);
    totalprice.appendChild(cina);
    totalprice.id="total";
    tot_box.appendChild(totalprice);
    const checkout = document.createElement("button");
    checkout.innerText = "Checkout";
    checkout.classList.add("checkout");
    tot_box.appendChild(checkout);
    tot_box.id="total_box";
    document.getElementById("main").appendChild(tot_box);
}
function getparameter(...a) 
{
    let obj = JSON.parse(localStorage.getItem(a[0])) || {};
    if 
    (a.length === 2) 
    {
        return obj[a[1]];
    } 
    else 
    {
        obj[a[1]] = a[2];
        localStorage.setItem(a[0], JSON.stringify(obj));
    }
}
const create_item = function()
{
    let a = Array.from(arguments);
    let title=a[0], subtitle=a[1], type=a[2],price=a[3],src=a[4];
    let count=getparameter(title,"contity");
    let img = document.createElement("img");
    img.classList.add("goods-container_img");
    img.src=src;
    img.onload = function() 
    {
        let prop=img.naturalHeight/img.naturalWidth;
        let widthh=size*16/prop;
        let marg=size*8-widthh/2;
        img.style.marginLeft=`${marg}px`;
        img.style.marginRight=`${marg+size*2}px`;
    };
    let result =  createelem("div","goods-container","","",
                        img,
                        createelem("div","book-description","","",
                            createelem("h2","",`${title}`,""),
                            createelem("p","",`${subtitle}`,""),
                            createelem("span","",`${type}`,"")),
                        createelem("div","count","","",
                            createelem("button","","-",""),
                            createelem("div","",`${count}`,""),
                            createelem("button","","+","")),
                        createelem("div","right","","",
                            createelem("div","price",`$${price}`,""),
                            createelem("div","actions","","",
                                createelem("button","like-but","",'<img src="../img/heart.png">'),
                                createelem("button","trash-but","",'<img src="../img/trash-512.png">'))))
    document.getElementById("items").appendChild(result);
}
function getSiblings(element) 
{
    return [...element.parentElement.children].filter(child => child !== element);
}
const add_item = function()
{
    let a =Array.from(arguments)[0];
    let pricce = getparameter(a,"price");
    let contity = getparameter(a,"contity");
    const item = document.createElement("div");
    item.classList.add("item");
    const name = document.createElement("span");
    name.innerText=`${contity}x ${a}`;
    name.id=`${a}`;
    const price = document.createElement("span");
    price.innerText=`$${(pricce*contity).toFixed(2)}`;
    item.appendChild(name);
    item.appendChild(price);
    document.getElementById("Items").appendChild(item);
}
function ggetLocalStorage() 
{
    return Object.keys(localStorage).filter(key => key!="total-cost").map(key=>localStorage.getItem(key));
}
window.onload = function()
{
    if(localStorage.length==0||localStorage.length==1&&localStorage.getItem("total-cost")!=null)
    {
        document.querySelector("section").appendChild(
            createelem("h1","","Cart","")
        )
        document.querySelector("section").appendChild(
            createelem("p","empty_massage","Your cart is empty","")
        )
    }
    else
    {
        document.querySelector("section").appendChild(
            createelem("h1","","Cart","")
        )
        document.querySelector("section").appendChild(
            createelem_2(createelem("div","","","",
                createelem_2(createelem("div","","","",
                    createelem("div","","","",
                        createelem_2(createelem("p","","",""),"count_items"),
                        createelem_2(createelem("button","t2","Empty cart",""),"clear_button")
                    )
                ),"items")
            ),"main")
        )
        create_check();
    let locstor= ggetLocalStorage();
    let subtotal=0;
    for(let i=0;i<locstor.length;i++)
    {
    let obj=JSON.parse(locstor[i]);
    let mas=Object.values(obj);
    create_item(`${mas[0]}`,`${mas[1]}`,`${mas[2]}`,`${mas[3]}`,`${mas[4]}`,Number(mas[5]));
    add_item(`${mas[0]}`,`${mas[1]}`,`${mas[2]}`,`${mas[3]}`,`${mas[4]}`,Number(mas[5]));
    subtotal+=Number(mas[3])*Number(mas[6]);
    } 
    localStorage.setItem("total-cost",subtotal);
    document.getElementById("count_items").innerText=`${localStorage.length-1} items`;
    document.getElementById("total_price").innerText="$"+subtotal.toFixed(2);
    document.getElementById("clear_button").addEventListener("click",function()
    {
        document.querySelector("section").innerHTML="";
        document.querySelector("section").appendChild(
            createelem("h1","","Cart","")
        )
        document.querySelector("section").appendChild(
            createelem("p","empty_massage","Your cart is empty","")
        )
    localStorage.clear();
    })

    document.getElementById("main").addEventListener("click",function(event)
    {
    if(event.target && (event.target.classList.contains("trash-but") || event.target.closest(".trash-but")))
    {

        const parentelemen = event.target.closest(".goods-container");
        const tit = getSiblings(event.target.closest(".right"))[1].children[0].innerText;
        document.getElementById("total_price").innerText="$"+(localStorage.getItem("total-cost")-Number(getparameter(tit,"price")*getparameter(tit,"contity"))).toFixed(2);
        localStorage.setItem("total-cost",localStorage.getItem("total-cost")-getparameter(tit,"price")*getparameter(tit,"contity"));
        localStorage.removeItem(tit);
        parentelemen.remove();
        document.getElementById(tit).parentElement.remove();
        document.getElementById("count_items").innerText=localStorage.length-1+" items";
        if(localStorage.length==1)
        {
            document.querySelector("section").innerHTML="";
            document.querySelector("section").appendChild(
                createelem("h1","","Cart","")
            )
            document.querySelector("section").appendChild(
                createelem("p","empty_massage","Your cart is empty","")
            )
        } 
    }
    if(event.target && (event.target.tagName.toLowerCase()==="img"))
    {
        let isrc=event.target.src.split("/").pop();
        if(isrc==="heart.png")
        {
            isrc="../img/red_heart.png";
            event.target.src=isrc;
        }
        if(isrc=="red_heart.png")
        {
            isrc="../img/heart.png";
            event.target.src=isrc;
            let b=getSiblings(event.target.parentElement.closest(".right"))[2].children;
        }
    } 
    if(event.target && (event.target.tagName.toLowerCase()==="button"&&event.target.innerText=="+"))
    {
        let b=event.target;
        let a=getSiblings(b);
        const tit = getSiblings(event.target.closest(".count"))[1].children[0].innerText;
        if(Number(getparameter(tit,"contity_stock"))>=Number(a[1].innerText)+1)
        {
            getparameter(tit,"contity",getparameter(tit,"contity")+1);
            a[1].innerText=Number(a[1].innerText)+1;
            getparameter(tit,"contity",a[1].innerText);
            const dop =  document.getElementById(tit);
            dop.innerText=getparameter(tit,"contity")+"x "+tit;
            const dopdop=getSiblings(dop)[0];
            dopdop.innerText ="$" + (Number(getparameter(tit,"price"))*Number(getparameter(tit,"contity"))).toFixed(2);
            document.getElementById("total_price").innerText="$"+(Number(localStorage.getItem("total-cost"))+Number(getparameter(tit,"price"))).toFixed(2);
            localStorage.setItem("total-cost",Number(localStorage.getItem("total-cost"))+Number(getparameter(tit,"price")));
        }
    }
    if(event.target && (event.target.tagName.toLowerCase()==="button"&&event.target.innerText=="-"))
    {
        let b=event.target;
        let a=getSiblings(b);
        const tit = getSiblings(b.closest(".count"))[1].children[0].innerText
        a[0].innerText=Number(a[0].innerText)-1;
        getparameter(tit,"contity",getparameter(tit,"contity")-1);
        localStorage.setItem("total-cost",localStorage.getItem("total-cost")-getparameter(tit,"price"));
        document.getElementById("total_price").innerText="$"+(localStorage.getItem("total-cost"));
        if(a[0].innerText==0)
        {
            const parentelement = event.target.closest(".goods-container");
            parentelement.remove();
            localStorage.removeItem(tit);
            document.getElementById(tit).parentElement.remove();
            document.getElementById("count_items").innerText=localStorage.length-1+" items";
            if(localStorage.length==1)
            {
                document.querySelector("section").innerHTML="";
                document.querySelector("section").appendChild(
                    createelem("h1","","Cart","")
                )
                document.querySelector("section").appendChild(
                    createelem("p","empty_massage","Your cart is empty","")
                )
            } 
        }
        else
        {
            getparameter(tit,"contity",a[0].innerText);
            const dop =  document.getElementById(tit);
            dop.innerText=getparameter(tit,"contity")+"x "+tit;
            const dopdop=getSiblings(dop)[0];
            dopdop.innerText ="$" + (Number(getparameter(tit,"price"))*Number(getparameter(tit,"contity"))).toFixed(2);
        }
    }
})
}
}
