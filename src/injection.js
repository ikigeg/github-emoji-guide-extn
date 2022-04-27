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

const validCommentBoxNames = [
  'comment[body]',
  'pull_request_review[body]',
];

// // // TODO: Find new position for the icon, the review changes textarea is in a block with overflow hidden 🤦
// // function closeButton(node) {
// //   var button = document.createElement("input");
// //   button.type = "button";
// //   button.value = "❌"; 
// //   button.classList.add('toolbar-item');
// //   button.classList.add('btn-octicon');
// //   button.setAttribute(
// //     'style',
// //     'border: 1px solid var(--color-border-default); position: absolute; right: 0; top: 0; padding: 4px;',
// //   );

// //   button.onclick = () => {
// //     node.parentNode.removeChild(node);
// //   };

// //   node.appendChild(button);
// // }

// // function showEmojis(context, commentTextarea) {
// //   const node = document.createElement("div");
// //   node.classList.add('emoji-guide-list-container');
// //   node.setAttribute(
// //     'style',
// //     'position:absolute; z-index: 100; top: -68px; left: -6px; background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); color: white;',
// //   );
// //   const list = document.createElement("ul");
// //   list.setAttribute(
// //     'style',
// //     'list-style: none; padding: 4px;',
// //   );
// //   emojis.forEach(([emoji, description]) => {
// //     const li = document.createElement("li");
// //     const text = document.createTextNode(`${emoji} ${description}`);
// //     li.setAttribute('data-emoji', emoji);
// //     li.setAttribute('data-description', description);
// //     li.setAttribute(
// //       'style',
// //       'padding: 2px 4px; cursor: pointer; color: var(--color-btn-text);',
// //     );
// //     li.appendChild(text);

// //     li.onclick = (e) => { 
// //       console.log(e.currentTarget.dataset.emoji)
// //       console.log(e.currentTarget.dataset.description)
// //       const comment = `${e.currentTarget.dataset.emoji} `;
// //       commentTextarea.value += commentTextarea.value.length > 0 ? `\n${comment}` : comment;
// //       commentTextarea.focus();
// //       node.parentNode.removeChild(node);
// //     };

// //     list.appendChild(li);
// //   });
  
// //   closeButton(node);
// //   node.appendChild(list);


// //   context.appendChild(node);
// // }

// // function showEmojisLite(context) {
// //   const node = document.createElement("div");
// //   node.classList.add('emoji-guide-list-container');
// //   node.setAttribute(
// //     'style',
// //     'position:absolute; z-index: 100; top: -68px; left: -6px; background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); color: white;',
// //   );
// //   const list = document.createElement("ul");
// //   list.setAttribute(
// //     'style',
// //     'list-style: none; padding: 4px;',
// //   );
// //   emojis.forEach(([emoji, description]) => {
// //     const li = document.createElement("li");
// //     const text = document.createTextNode(`${emoji} ${description}`);
// //     li.setAttribute('data-emoji', emoji);
// //     li.setAttribute('data-description', description);
// //     li.setAttribute(
// //       'style',
// //       'padding: 2px 4px; cursor: pointer; color: var(--color-btn-text);',
// //     );
// //     li.appendChild(text);

// //     list.appendChild(li);
// //   });
  
// //   closeButton(node);
// //   node.appendChild(list);


// //   context.appendChild(node);
// // }

// function createButton(container, commentTextarea) {
//   var button = document.createElement("input");
//   button.type = "button";
//   button.value = "🌱"; 
//   button.classList.add('toolbar-item');
//   button.classList.add('btn-octicon');
//   button.setAttribute(
//     'style',
//     'background: var(--color-canvas-subtle); border: 1px solid var(--color-border-default); border-radius: 4px; position: absolute; left: 0; top: 0; padding: 4px; display: none;',
//   );

//   button.onclick = (e) => {
//     if (!container.querySelector('.emoji-guide-list-container')) {
//       console.log('showEmojis');
//       // showEmojis(container, commentTextarea);
//     }
//   };

//   container.appendChild(button);
//   return button;
// }

// // let divsWithButton = [];



// const applyButtonToCommentBody = (commentTextarea) => {
//   // console.log('applyButtonToCommentBody', commentTextarea, commentTextarea.getAttribute('name'), validCommentBoxNames.includes(commentTextarea.getAttribute('name')))
//   if (validCommentBoxNames.includes(commentTextarea.getAttribute('name'))) {
//     const parentDiv = commentTextarea.closest('div');

//     if (!divsWithButton.includes(parentDiv)) {
//       console.log('yoyo', parentDiv)
//       parentDiv.style.position = 'relative';
//       createButton(parentDiv, commentTextarea);
//       divsWithButton.push(parentDiv);
//     }

//     // commentTextarea.addEventListener("focus", focusInHandler, true);
//       // commentTextarea.addEventListener("focus", focusInHandler, true);
//   }
// }
// // const focusInHandler = (e) => {
// //   console.log('focusInHandler', e)
// // }



const applyButtonToToolbar = (toolbar) => {
  if (toolbar.querySelector('.github-emoji-guide-button-section')) {
    return;
  }

  const tabContainer = toolbar.closest('tab-container');
  if (!tabContainer) { 
    return;
  }

  const textarea = tabContainer.querySelector('textarea');

  if (validCommentBoxNames.includes(textarea.getAttribute('name'))) {
    const section = document.createElement("div");
    section.className = 'd-flex d-md-inline-block github-emoji-guide-button-section';

    const button = document.createElement("input");
    button.type = "button";
    button.value = "🌱"; 
    button.classList.add('toolbar-item');
    button.classList.add('btn-octicon');

    button.onclick = (e) => {
      if (!tabContainer.querySelector('.emoji-guide-list-container')) {
        console.log('showEmojis');
        // showEmojis(container, commentTextarea);
      }
    };

    section.appendChild(button);
    toolbar.appendChild(section);
  }
}

const addEmojiButtonsToInlineForms = () => {
  const commentTextareaToolbars = Array.from(document.querySelectorAll('markdown-toolbar'));

  if (commentTextareaToolbars) {
    commentTextareaToolbars.forEach((commentTextareaToolbar) => applyButtonToToolbar(commentTextareaToolbar));
  }
}
addEmojiButtonsToInlineForms();

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(addedNode => {
      if (!addedNode || !addedNode.querySelector) {
        return;
      }

      const commentTextarea = addedNode.querySelector('textarea');
      const toolbar = addedNode.querySelector('markdown-toolbar');
      if (!toolbar || !commentTextarea) {
        return;
      }

      applyButtonToToolbar(toolbar);
    })
  })
});
observer.observe(document.querySelector('body'), { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((request) => {
  if (request && request.type === 'page-rendered') {
    console.log('pushstate')
    addEmojiButtonsToInlineForms();
  }
});

// let focusedElement = null;

// const body = document.querySelector('body');
// // showEmojisLite(body);
// const emojiGuideButton = createButton(body);

// const relocateButton = (el, relativeToViewport = true) => {
//   const rect = el.getBoundingClientRect();
//   const left = relativeToViewport ? rect.left + window.scrollX : rect.left + document.body.scrollLeft;
//   const top = relativeToViewport ? rect.top + window.scrollY : rect.top + document.body.scrollTop;
//   emojiGuideButton.style.left = `${left - 34}px`;
//   emojiGuideButton.style.top = `${top}px`;
//   emojiGuideButton.style.display = 'block';
//   emojiGuideButton.style.zIndex = 'block';
//   focusedElement = el;
// }

// const hideButton = () => {
//   focusedElement = null;
//   emojiGuideButton.style.display = 'none';
// }

// document.addEventListener('focusin', function(e) {
//   // console.log('focusedin: ', {el: document.activeElement, e})

//   if (e.target && focusedElement !== e.target && e.target.type === 'textarea' && validCommentBoxNames.includes(e.target.getAttribute('name'))) {
//     console.log('valid focus')
//     return relocateButton(e.target, e.target.getAttribute('name') !== 'pull_request_review[body]')
//   }

//   if (focusedElement !== null) {
//     console.log('invalid focus, tidying up')
//     return hideButton();
//   }
// }, true);

// document.addEventListener('focusout', function(e) {
//   // console.log('focusedout: ', {e})
// }, true);

// console.log('🌱 Emoji guide online!')
