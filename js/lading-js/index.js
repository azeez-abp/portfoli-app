let pageControlBtns = document.querySelector(".controls").querySelectorAll(".page-control")
let headerLink = document.querySelector(".header ul").querySelectorAll("li")
console.log(headerLink)
let pages = document.querySelector(".main").querySelectorAll(".page")

function SwitchPage() {
    headerLink.forEach(function(pageControlBtn, i) {
        pageControlBtn.addEventListener("click", function() {
            pageControlBtns[i].dispatchEvent(new Event('click'))

        })

    })
    pageControlBtns.forEach(function(pageControlBtn, i) {
        pageControlBtn.addEventListener("click", function() {
            ///////////////////////////////////////////////////
            pageControlBtns.forEach(function(pageControlBtnActive, i) {
                console.log(pageControlBtnActive)
                if (Array.from(pageControlBtnActive.classList).includes('active')) {
                    pageControlBtnActive.classList.remove('active')
                    headerLink[i].querySelector("a").classList.remove('active-text')
                    pages[i].classList.remove("down")

                }
            })
            pageControlBtn.classList.add('active')
            headerLink[i].querySelector("a").classList.add("active-text")
            pages[i].classList.add("down")
        })
    })

    window.addEventListener("load", function() {
        url_hash = {
            '#home': 0,
            '#about': 1,
            '#portfolio': 2,
            '#contact': 3
        }

        let pageNAmme = this.location.hash
        if(pageNAmme)pageControlBtns[url_hash[pageNAmme]].dispatchEvent(new Event('click'))
       // console.log(url_hash[pageNAmme])

    })
}
SwitchPage()

//
function SetTheme() {
    let btn_themes = document.querySelectorAll(".theme-list-item");
    if (localStorage.getItem('abp-dev-port')) {
        let save_theme = JSON.parse(localStorage.getItem('abp-dev-port'))
        document.body.setAttribute("class", save_theme.theme)
        let prev_classList = Array.from(document.querySelector(".theme-list").classList)
        if (prev_classList.length == 1) {
            prev_classList[prev_classList.length] = save_theme.theme
            console.log(prev_classList)
            document.querySelector(".theme-list").setAttribute('class', ...prev_classList)
            document.querySelector(".header").setAttribute('class', prev_classList[1])
        }

        if (prev_classList.length > 1) {
            prev_classList[prev_classList.length - 1] = save_theme.theme
            console.log(prev_classList)
            document.querySelector(".theme-list").setAttribute('class', prev_classList.join(" "))
           // document.querySelector(".header").setAttribute('class', prev_classList[0])

        }



    }
    btn_themes.forEach(btn => {
        btn.addEventListener("click", function() {
            if (typeof localStorage !== 'undefined') {
                try {
                    localStorage.setItem("abp-dev-port", JSON.stringify({ theme: btn.dataset.theme }))
                    if (localStorage.getItem('abp-dev-port')) {
                        let save_theme = JSON.parse(localStorage.getItem('abp-dev-port'))
                        document.body.setAttribute("class", save_theme.theme)
                        let prev_classList = Array.from(document.querySelector(".theme-list").classList)
                        if (prev_classList.length == 1) {
                            prev_classList[prev_classList.length] = save_theme.theme
                            console.log(prev_classList)
                            document.querySelector(".theme-list").setAttribute('class', ...prev_classList)
                        }

                        if (prev_classList.length > 1) {
                            prev_classList[prev_classList.length - 1] = save_theme.theme
                            console.log(prev_classList)
                            document.querySelector(".theme-list").setAttribute('class', prev_classList.join(" "))
                        }

                    } else {
                        // localStorage is disabled
                    }
                } catch (e) {
                    // localStorage is disabled
                }
            } else {
                // localStorage is not available
            }


            console.log()
        })
    })

}

SetTheme()




function router() {
    return {
        ///////////////////////////////////////////////////////////////
        /////////////////////gertDAta////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        post: async function(data) {
            let form = data.form !== null ? new FormData(data.form) : new FormData()

            //console.log(data.appends)    
            if (typeof data.appends !== 'undefined') {
                data.appends.forEach((a, i) => {
                    form.append('post' + i, a)
                })
            }



            var request = new Request(data.url, {
                method: 'POST',
                mode: 'cors',
                headers: { "Accept": "application/json" },
                body: form
            });


            try {
                const fetchResult = fetch(request)
                const response = await fetchResult;
                const jsonData = await response.json();
                return { bol: true, res: jsonData }

            } catch (e) {


                return { bol: false, res: { err: "Network refuse connection", e: e } };


            }



        }, ///////////////////////////////////////////////////////////////
        /////////////////////gertDAta////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        get: async function(data) {

            var request = new Request(data.url, {
                method: 'get',
                mode: 'cors',
                headers: { "Accept": "application/json" },

            });


            try {
                const fetchResult = fetch(request)
                const response = await fetchResult;
                if (response.status >= 200 && response.status <= 299) {
                    const jsonData = await response.json();
                    return { bol: true, res: jsonData }
                } else {
                    setTimeout(() => {
                        document.querySelector(".err").innerHTML = `
                   <h2>Network refuse connection to  ${data.url} 
                   <br> 
                    ${'status code: '+response.status}
                    ${'why: Document '+response.statusText}
                    <br>
                    ${'can not access '+response.url}

                    </h2>`

                    }, 200)
                    console.log(response.status, response.statusText);
                }



            } catch (e) {

                setTimeout(() => {
                    document.querySelector(".err").innerHTML = `<h2>Network refuse connection to ${data.url}</h2>`

                }, 3000)

                return { bol: false, res: { err: "Network refuse connection", e: e } };


            }



        }, ///////////////////////////////////////////////////////////////



    } ////////////////End of object return///////////////
    //////////////////////////////




}









document.querySelector('.sub').addEventListener("click", function() {
    
        let tags  = ['name','email','subject','message']
         let valErr = false;
         let errTag  = ``
         tags.forEach(tag=>{
           let el  =   document.querySelector(`[name ='${tag}']`)
              if(el.value.toLowerCase() === tag){
                  errTag += `<h6>${tag}  field is required</h6>` 
                 console.log(tag,el)
                 valErr = true;
                
                   
              }
              
               if(el.value.length > 225){
                  errTag += `<h6>${tag}  field length is more that 225 character</h6>` 
                 console.log(tag,el)
                 valErr = true;
                
                   
              }
              
             
             
         }) 
         
         
           if(valErr){ 
               document.querySelector(".err").innerHTML  = errTag;
               setTimeout(()=>{document.querySelector(".err").innerHTML=''},5000)
               return false;
               
           }
        
            this.children[0].style.opacity = "1";
            let fs = router().post({
                url: 'https://abp.com.ng/home/contact',
                form: document.querySelector("form#cont")

            });
            fs.then(response => {
                        console.log(response, "ertyui")
                        setTimeout(() => {
                            this.children[0].style.opacity = "0";
                        }, 3000)

                        if (response.res.err) {
                            document.querySelector(".err").innerHTML = `<h6> ${response.res.err} ${response.res.e?`<br> ErrMsg : ${response.res.e}`:`` } </h6>`
                        }

        if (response.res.suc) {
            document.querySelector(".err").innerHTML = `<h6> ${response.res.suc} </h6>`
            document.querySelector("input[name='email']").value  = ""
            document.querySelector("input[name='name']").value  = ""
            document.querySelector("input[name='subject']").value  = ""
            document.querySelector("[name='message']").value  = ""
        }


    }).catch(err => {
        setTimeout(() => {
            this.children[0].style.opacity = "0";
        }, 3000)
        document.querySelector(".err").innerHTML = `<h6> ${err.res.err} </h6>`
        console.log(err, 'Error')
    })
})







function canMakeHTTPRequest() {
    console.log(this, globalThis)
    return typeof globalThis.XMLHttpRequest === 'function';

}

console.log(canMakeHTTPRequest())

class MyArray extends Array {
    // Overwrite MyArray species to the parent Array constructor
    static get[Symbol.species]() { return Array; }

    constructor() {
        super()
        console.log("dwfd")
    }

    gets(w) {
        return w
    }


}

function TestFactory(aug) {
    let a = "MAYAM"
    return {
        this: this,
        aug,
        a: a

    }
}

function passBind(a) {
    return a;
}
console.log(new MyArray().gets("MAn"))

console.log(TestFactory.call({}, 'augw'))
console.log(TestFactory.apply({}, ['augh']))
console.log(TestFactory.bind(passBind, 'augw'))


const array1 = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 2, 3));

const buffer = new ArrayBuffer(8); //8 byte
const view = new Int32Array(buffer);
const view2 = new DataView(buffer);
console.log(view, view2)


console.log("1999")
setTimeout(() => {
    console.log("999")
}, 0)

console.log("2999")