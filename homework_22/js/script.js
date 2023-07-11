'use strict'
window.onload = () => {
    createCategories(categories, document.querySelector('.navigation__menu'));
}
const categories = [
    {
        name: 'keys',
        goods: [
            {
                name: 'Wrench',
                description: 'A wrench is a hand tool used for gripping and turning nuts and bolts. It has an adjustable jaw or jaws to accommodate different sizes of fasteners.',
                img: './img/wrench.jpg',
                oldPrice: 50000,
                price: 499,
                inStock: true,
            },
            {
                name: 'Adjustable wrench',
                description: 'An adjustable wrench is a hand tool with a movable jaw that can be adjusted to fit various sizes of nuts and bolts, making it versatile for different applications.',
                img: './img/adjustableWrench.jpg',
                oldPrice: 70000,
                price: 899,
                inStock: true,
            },
            {
                name: 'Cartoon key',
                description: 'A cartoon key is a whimsical representation of a key often found in animated or illustrated media. It typically features exaggerated or stylized characteristics, adding a playful and imaginative element to its appearance.',
                img: './img/cartoonKey.jpg',
                oldPrice: 100000,
                price: 999.99,
                inStock: true,
            }

        ]
    },
    {
        name: 'boxes',
        goods: [
            {
                name: 'Simple Box',
                description: 'A box is a three-dimensional object with six sides, typically made of cardboard, wood, or other materials. It serves as a container for storing, transporting, or organizing various items. Boxes come in different shapes and sizes and can be opened or closed using lids, flaps, or other mechanisms. They are commonly used in packaging, storage, shipping, and organization in various industries and everyday life.',
                img: './img/simpleBox.jpg',
                oldPrice: 500,
                price: 49.90,
                inStock: true,
            },
            {
                name: 'Box 4 your cat',
                description: 'Cats are known for their fondness for boxes, regardless of their size or shape. A simple box can provide a sense of comfort, security, and privacy for a cat. It offers a cozy space for them to curl up, rest, and observe their surroundings while feeling protected. ',
                img: './img/boxForYourCat.png',
                oldPrice: 10000,
                price: 999,
                inStock: true,
            },

        ]
    },
    {
        name: 'mirrors',
        goods: [
            {
                name: 'Big mirror',
                description: 'A big mirror is a large reflective surface that typically consists of a glass pane mounted within a frame. It is designed to reflect light and provide a clear and accurate reflection of objects and people in front of it. A big mirror can serve both functional and aesthetic purposes. It is commonly used in bedrooms, bathrooms, dressing areas, and other living spaces for personal grooming, checking appearances, and creating an illusion of more space. The size and presence of a big mirror can also enhance the visual appeal and brightness of a room, making it a popular choice for interior decoration.',
                img: './img/bigMirror.jpg',
                oldPrice: 50000,
                price: 49999.90,
                inStock: true,
            },
            {
                name: 'Road mirror',
                description: 'A road mirror is a convex mirror installed at strategic locations on roads and driveways to improve safety. Its curved surface provides a wide field of view, eliminating blind spots and helping drivers see around corners and obstructed areas. Road mirrors enhance visibility and aid in accident prevention.',
                img: './img/roadMirror.jpg',
                oldPrice: 10000,
                price: 999,
                inStock: true,
            },
            {
                name: 'Little mirror',
                description: 'A little mirror is a small reflective surface typically made of glass or plastic. It is compact and portable, making it convenient for personal use. Little mirrors are commonly used for tasks such as applying makeup, grooming, or checking one\'s appearance.',
                img: './img/littleMirror.jpg',
                oldPrice: 200,
                price: 99,
                inStock: true,
            },


        ]
    },
]
let currentCategory;
let currentGood;
function createCategories(categories, parent){
    categories.forEach(categ => {
        const category = document.createElement('div');
        category.textContent = capitalizeFirstLetter(categ.name);
        category.dataset.id = categ.name;
        category.classList.add('navigation__item');
        parent.appendChild(category);
        createGoods(categ.goods, categ.name);
        category.addEventListener('click', showGoods);
    });
}
function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
}
function createGoods(goodsList, key){
    const goodsGrid = document.createElement('section');
    const panel = document.querySelector('.board__panel');
    const footer = document.querySelector('.board__footer');
    panel.insertBefore(goodsGrid, footer);
    goodsGrid.classList.add('board__goodsGrid');
    goodsList.forEach((good) => {
        const card = document.createElement('div');
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('div');
        const description = document.createElement('div');
        const oldPrice = document.createElement('div');
        const newPrice = document.createElement('div');
        const buyButton = document.createElement('button');

        card.classList.add('board__goodsCard');
        card.classList.add('goodsCard');
        card.appendChild(imgContainer);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(oldPrice);
        card.appendChild(newPrice);
        card.appendChild(buyButton);

        imgContainer.classList.add('imageContainer');
        imgContainer.appendChild(img);
        img.setAttribute('src', good.img);
        
        title.textContent = good.name;
        description.textContent = good.description;
        oldPrice.textContent = "₴" + good.oldPrice;
        newPrice.textContent = "₴" + good.price;
        buyButton.textContent = "Buy now";

        title.classList.add('title');
        description.classList.add('description');
        
        oldPrice.classList.add('oldPrice');
        newPrice.classList.add('newPrice');
        buyButton.classList.add('buyButton')
        
        goodsGrid.style.display = 'none';
        description.style.display = 'none';
        buyButton.style.display = 'none';
        
        goodsGrid.appendChild(card);
        goodsGrid.setAttribute('id', key);
        

        card.addEventListener('click', showDetails);
    })
}

function showGoods(event){
    if (currentCategory) currentCategory.style.display = 'none';
    const id = '#' + event.target.dataset.id;
    const goods = document.querySelector(id);
    const boardName = document.querySelector('.board_name')

    currentCategory = goods;
    goods.style.display = 'grid';
    boardName.textContent = event.target.dataset.id.toUpperCase();
}
function showDetails(event){
    const info = document.querySelector('.info');
    const targetGood = event.currentTarget.cloneNode(true);
    let button = targetGood.querySelector('.buyButton');
    let description = targetGood.querySelector('.description');
    currentGood = targetGood;
    info.innerHTML = '';
    info.appendChild(targetGood);
    description.style.display = "inline-block";
    button.style.display = "block";
    button.dataset.goodInfo = [targetGood.querySelector('.title').textContent, targetGood.querySelector('.newPrice').textContent];
    button.addEventListener('click', buy);
}
function buy(event){
    console.log(event.target.dataset);
    const info = event.target.dataset.goodInfo.split(',');
    alert(`Thank you for buying ${info[0]}! Amount due is: ${info[1]}`);
    
    event.target.style.display = 'none';
    currentCategory.style.display = 'none';
    currentGood.style.display = 'none';
}