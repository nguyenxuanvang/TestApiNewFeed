const loaderPageNode = document.querySelector('body > .loader');
const tableDataNode = document.querySelector('#table-data');
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => {
    loaderPageNode.classList.add('hidden');
    data.forEach(item => {
        const containerNode = document.createElement('div');
        containerNode.classList.add('container');
        tableDataNode.appendChild(containerNode);
        containerNode.innerHTML = `
            <p>#${item.id}</p>
            <p class="title">${item.title}</p>
            <p class="content">${item.body}</p>
            <div class="comment-container">
                <p class="comment-display">Hiển thị comment</p>
                <div class="loader hidden"></div>
            </div>
        `;
    });
    const cmtDisplayButtons = document.querySelectorAll('.comment-container');
        cmtDisplayButtons.forEach(element => {
            element.addEventListener('click',() => {
                const idPost = Number(element.parentElement.children[0].textContent.slice(1,element.parentElement.children[0].textContent.length));
                element.children[1].classList.remove('hidden');
                element.replaceChild(element.children[1],element.children[0]);
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idPost}`)
                .then(response => response.json())
                .then(cmtList => {
                    cmtList.forEach(infor => {
                            const cmtItemNode = document.createElement('div');
                            cmtItemNode.classList.add('comment-item');
                            element.appendChild(cmtItemNode);
                            cmtItemNode.innerHTML = `
                            <p class="comment-name">${infor.name}</p>
                            <p class="comment-content">${infor.body}</p>
                            `;   
                    });
                    element.children[0].remove();
                });
            });
        });
});