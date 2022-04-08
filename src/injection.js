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

function showEmojis(context, commentTextarea) {
  const node = document.createElement("div");
  node.setAttribute(
    'style',
    'position:absolute; z-index: 100; left: 0; background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); color: white;',
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
      'padding: 2px 4px; cursor: pointer; color: var(--color-fg-muted);',
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

  node.appendChild(list);

  context.appendChild(node);
}

function createButton(context, commentTextarea, floating = false) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "🌱"; 
  button.classList.add('toolbar-item');
  button.classList.add('btn-octicon');
  button.setAttribute(
    'style',
    !floating ? 'background-color: transparent; border: 0;' : 'background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); border-radius: 8px; position: absolute; right: 8px; bottom: -8px; padding: 4px;',
  );  
  button.onclick = (e) => { showEmojis(context, commentTextarea) };
  context.appendChild(button);
}

let addedNodes = [];

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(addedNode => {
      if (addedNode && addedNode.classList && addedNode.classList.contains('js-inline-comments-container') && addedNode.querySelector('markdown-toolbar')) {
        const suggestionDiv = addedNode.querySelector('markdown-toolbar');
        const commentTextarea = addedNode.querySelector('textarea');
        createButton(suggestionDiv, commentTextarea);
      }
    })
  })
});

observer.observe(document.querySelector('body'), { subtree: true, childList: true });

const applyButtonToForm = (context, floating = false) => {
  if (!context) {
    return;
  }

  const suggestionDiv = context.querySelector('markdown-toolbar');
  if (!suggestionDiv) {
    return;
  }

  const commentTextarea = context.querySelector('textarea');
  createButton(suggestionDiv, commentTextarea, floating);
}

const addEmojiButtonsToInlineForms = () => {
  const reviewChangesButtonForm = document.querySelector('.js-previewable-comment-form');
  if (reviewChangesButtonForm) {
    applyButtonToForm(reviewChangesButtonForm)
  }

  const reviewInlineCommentForms = Array.from(document.querySelectorAll('.js-inline-comment-form'));
  if (reviewInlineCommentForms) {
    'div.flex-nowrap.d-inline-block.mr-3'
    reviewInlineCommentForms.forEach((element) => applyButtonToForm(element, true));
  }
}

addEmojiButtonsToInlineForms();
