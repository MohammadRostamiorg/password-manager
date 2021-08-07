// set item passmg in localstorage
if (localStorage.passmg == undefined) {
    localStorage.setItem('passmg', JSON.stringify([]))
}

// get time for random number
function time() {
    var timestamp = Math.floor(new Date().getTime() / 1000)
    return timestamp;
}

// set variables

var main = document.getElementById('main');
var dark = document.getElementById('dark');
var modal = document.getElementById('modal');


// show item's in browser
function li() {
    // get item's from localstorage
    var items = JSON.parse(localStorage.getItem('passmg'));
    var ul = document.getElementById('items-ul');
    ul.innerHTML = "";
    items.forEach(item => {

        var el = document.createElement('li');
        el.innerHTML = item[0];
        // set li attr's
        el.setAttribute('data-title', item[0])
        el.setAttribute('data-pass', item[1])
        el.setAttribute('data-description', item[2])
        el.setAttribute('data-id', item[3])
        el.setAttribute('onclick', 'show(this)')
        ul.append(el)
    });
}
// add a item
function add() {
    // get data from user
    var title = prompt('please enter your password title');
    var password = prompt('please enter your password');
    var description = prompt('please enter your password description');
    // insert data to localstorage
    var items = [title, password, description, time()];
    var passmg = JSON.parse(localStorage.getItem('passmg'));
    passmg.push(items);
    passmg = JSON.stringify(passmg);
    localStorage.setItem('passmg', passmg)
    li()
}

// show modal
function show(el) {
    // get clicked item data
    var title = el.dataset.title;
    var pass = el.dataset.pass;
    var description = el.dataset.description;
    var id = el.dataset.id;
    document.querySelectorAll('.row')[0].children[1].value = title;
    document.querySelectorAll('.row')[1].children[2].value = pass;
    document.querySelectorAll('.row')[2].children[1].innerHTML = description;
    document.querySelector('#pass_id').value = id;
    modal.setAttribute('data-opass', '')
    main.style.display = "none";
    dark.style.display = "block";
    modal.style.display = "block";



}



// close modal

function close_modal() {
    main.style.display = "block";
    dark.style.display = "none";
    modal.style.display = "none";
}



// delete an item 


// show password by eye icon
function show_pass() {

    let pass_input = document.querySelectorAll('.row')[1].children[2]
    document.getElementById('eye').classList.toggle('active')
    if (pass_input.type == "password") {
        pass_input.type = ""
    } else {
        pass_input.type = "password"
    }

}

function del_item() {

    var deleted_item_id = document.querySelector('#pass_id').value;
    var items = localStorage.getItem('passmg');
    items = JSON.parse(items)
    var i = 0;
    while (i < items.length) {
        if (deleted_item_id == items[i][3]) {
            items.splice(i, 1);
        }

        i++;
    }
    items_new = JSON.stringify(items);
    localStorage.setItem('passmg', items_new);
    close_modal()
    li()

}
// edit a password
function edit() {
    // get all items in localStorage
    var items = localStorage.getItem('passmg');
    // get new data of edited item
    var title = document.querySelectorAll('.row')[0].children[1].value;
    var password = document.querySelectorAll('.row')[1].children[2].value;
    var description = document.querySelectorAll('.row')[2].children[1].value;
    // get edited item id
    var id = document.querySelector('#pass_id').value;
    // srt new data
    var new_item = [title, password, description, id]
    var items = localStorage.getItem('passmg');
    items = JSON.parse(items)
    var i = 0;
    while (i < items.length) {
        if (id == items[i][3]) {
            items.splice(i, 1, new_item);
        }

        i++;
    }
    items_new = JSON.stringify(items);
    localStorage.setItem('passmg', items_new);
    close_modal()
    li()


}
// search
function search(val) {
    var items = JSON.parse(localStorage.getItem('passmg'));
    var ul = document.getElementById('items-ul')
    ul.innerHTML = "";
    items.forEach((item, index) => {
        if (item[0].includes(val)) {
            var el = document.createElement('li');
            el.innerHTML = item[0];
            el.setAttribute('data-title', item[0])
            el.setAttribute('data-pass', item[1])
            el.setAttribute('data-description', item[2])
            el.setAttribute('data-id', item[3])
            el.setAttribute('onclick', 'show(this)')
            ul.append(el)
        }
    });
}
li();