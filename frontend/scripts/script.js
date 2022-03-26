async function loadEvent() {
    const reviews_section = document.getElementById("reviews_section");
    /* const reviews_data = await fetch("..data/reviews.json"); */
    const reviews_data = await fetch("frontend/data/reviews.json");
    const reviews_json = await reviews_data.json();
    
    let spans = `<span>&#9670</span>`;
    for (let i = 1; i < reviews_json.length; i++) {
        spans += `<span>&#9671</span>`;
    }

    const reviewHTML = `
        <div class="reviews_div">
            <span class="id">${reviews_json[0].id}</span>
            <h3 class="review_names">${reviews_json[0].names}</h3>
            <div class="reviews">
                <button class="left">&#8249</button>
                <button class="right">&#8250</button>
                <img src="./images/${reviews_json[0].img}" alt="" class="review_image">
                <div class="review_text_div">
                    <p class="review_text">${reviews_json[0].review}</p>
                </div>
                <div class="symbols">
                    ${spans}
                </div>
            </div>
        </div>
        `;
    
    reviews_section.insertAdjacentHTML("beforeend", reviewHTML);

    // Click event
    const leftBtn = reviews_section.querySelector(".left");
    const rightBtn = reviews_section.querySelector(".right");
    const id_span = reviews_section.querySelector(".id");
    const names = reviews_section.querySelector(".review_names");
    const image = reviews_section.querySelector(".review_image");
    const review = reviews_section.querySelector(".review_text");
    const symbols_div = reviews_section.querySelector(".symbols");
    let symbols_from_HTML = reviews_section.querySelector(".symbols").childNodes;
    let symbols = [];
    for (const symbol_from_HTML of Array.from(symbols_from_HTML)) {
         if (symbol_from_HTML.outerHTML !== undefined) {
             symbols.push(symbol_from_HTML.outerHTML);
         }
    }
    
    rightBtn.addEventListener("click", item => {
        const id = Number(reviews_section.querySelector(".id").innerHTML);
        if (id < reviews_json.length - 1) {
            id_span.innerHTML = id + 1
            names.innerHTML = reviews_json[id + 1].names;
            image.src = `./images/${reviews_json[id + 1].img}`;
            review.innerHTML = reviews_json[id + 1].review;
            symbols.unshift(symbols.pop());
            symbols_div.innerHTML = symbols.join("");
        } else {
            id_span.innerHTML = 0
            names.innerHTML = reviews_json[0].names;
            image.src = `./images/${reviews_json[0].img}`;
            review.innerHTML = reviews_json[0].review;
            symbols_div.innerHTML = spans;

            // Reorder symbols
            symbols_from_HTML = reviews_section.querySelector(".symbols").childNodes;
            symbols = [];
            for (const symbol_from_HTML of Array.from(symbols_from_HTML)) {
                if (symbol_from_HTML.outerHTML !== undefined) {
                    symbols.push(symbol_from_HTML.outerHTML);
                }
            }
        }
    })
    
    leftBtn.addEventListener("click", item => {
        const id = Number(reviews_section.querySelector(".id").innerHTML);
        if (id > 0) {
            id_span.innerHTML = id - 1
            names.innerHTML = reviews_json[id - 1].names;
            image.src = `./images/${reviews_json[id - 1].img}`;
            review.innerHTML = reviews_json[id - 1].review;
            symbols.push(symbols.shift());
            symbols_div.innerHTML = symbols.join("");
        } else {
            id_span.innerHTML = reviews_json.length - 1;
            names.innerHTML = reviews_json[reviews_json.length - 1].names;
            image.src = `./images/${reviews_json[reviews_json.length - 1].img}`;
            review.innerHTML = reviews_json[reviews_json.length - 1].review;
            let reverse_symbols = symbols;
            reverse_symbols.push(reverse_symbols.shift());
            symbols_div.innerHTML = reverse_symbols.join("");

            // Reorder symbols
            symbols_from_HTML = reviews_section.querySelector(".symbols").childNodes;
            symbols = [];
            for (const symbol_from_HTML of Array.from(symbols_from_HTML)) {
                if (symbol_from_HTML.outerHTML !== undefined) {
                    symbols.push(symbol_from_HTML.outerHTML);
                }
            }
        }
    })
}

window.addEventListener("load", loadEvent);