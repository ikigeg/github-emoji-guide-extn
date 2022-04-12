// Based on https://github.com/erikthedeveloper/code-review-emoji-guide
const emojis = [
  ["😃","I like this"],
  ["🔧","Needs change"],
  ["❓","Question"], 
  ["🤔","Thinking out loud"], 
  ["🌱","Future thoughts"], 
  ["📝","Note without action"], 
  ["⛏","Personal nitpick"], 
  ["♻️","Refactor suggestion"], 
  ["🏕","Opportunity to clean up"], 
  ["📌","Needs follow up discussion"], 
];
const emojiLines = emojis.map(emojiLine => emojiLine.join(' '));

// TODO: Find new position for the icon, the review changes textarea is in a block with overflow hidden 🤦
function closeButton(node) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "❌"; 
  button.classList.add('toolbar-item');
  button.classList.add('btn-octicon');
  button.setAttribute(
    'style',
    'border: 1px solid var(--color-border-default); position: absolute; right: 0; top: 0; padding: 4px;',
  );

  button.onclick = () => {
    node.parentNode.removeChild(node);
  };

  node.appendChild(button);
}

function showEmojis(context, commentTextarea) {
  const node = document.createElement("div");
  node.classList.add('emoji-guide-list-container');
  node.setAttribute(
    'style',
    'position:absolute; z-index: 100; top: -68px; left: -6px; background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); color: white;',
  );
  const list = document.createElement("ul");
  list.setAttribute(
    'style',
    'list-style: none; padding: 4px;',
  );
  emojis.forEach(([emoji, description]) => {
    const li = document.createElement("li");
    const text = document.createTextNode(`${emoji} ${description}`);
    li.setAttribute('data-emoji', emoji);
    li.setAttribute('data-description', description);
    li.setAttribute(
      'style',
      'padding: 2px 4px; cursor: pointer; color: var(--color-btn-text);',
    );
    li.appendChild(text);

    li.onclick = (e) => { 
      console.log(e.currentTarget.dataset.emoji)
      console.log(e.currentTarget.dataset.description)
      const comment = `${e.currentTarget.dataset.emoji} `;
      commentTextarea.value += commentTextarea.value.length > 0 ? `\n${comment}` : comment;
      commentTextarea.focus();
      node.parentNode.removeChild(node);
    };

    list.appendChild(li);
  });
  
  closeButton(node);
  node.appendChild(list);


  context.appendChild(node);
}

function createButton(container, commentTextarea) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "🌱"; 
  button.classList.add('toolbar-item');
  button.classList.add('btn-octicon');
  button.setAttribute(
    'style',
    'background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); border-radius: 4px; position: absolute; left: -34px; top: 6px; padding: 4px;',
  );

  button.onclick = (e) => {
    if (!container.querySelector('.emoji-guide-list-container')) {
      showEmojis(container, commentTextarea);
    }
  };

  container.appendChild(button);
}

let divsWithButton = [];

const validCommentBoxNames = [
  'comment[body]',
  'pull_request_review[body]',
];

const applyButtonToCommentBody = (commentTextarea) => {
  console.log('applyButtonToCommentBody', commentTextarea, commentTextarea.getAttribute('name'), validCommentBoxNames.includes(commentTextarea.getAttribute('name')))
  if (validCommentBoxNames.includes(commentTextarea.getAttribute('name'))) {
    const parentDiv = commentTextarea.closest('div');

    if (!divsWithButton.includes(parentDiv)) {
      console.log('yoyo', parentDiv)
      parentDiv.style.position = 'relative';
      createButton(parentDiv, commentTextarea);
      divsWithButton.push(parentDiv);
    }
  }
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(addedNode => {
      if (!addedNode || !addedNode.querySelector) {
        return;
      }

      const commentTextarea = addedNode.querySelector('textarea');
      if (!commentTextarea) {
        return;
      }

      applyButtonToCommentBody(commentTextarea);
    })
  })
});
observer.observe(document.querySelector('body'), { subtree: true, childList: true });

const addEmojiButtonsToInlineForms = () => {
  const commentTextareas = Array.from(document.querySelectorAll('textarea'));

  if (commentTextareas) {
    commentTextareas.forEach((commentTextarea) => applyButtonToCommentBody(commentTextarea));
  }
}
addEmojiButtonsToInlineForms();

console.log('🌱 Emoji guide online!')
