// import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
// import Warning from "@editorjs/warning";
// import Code from "@editorjs/code";
// import LinkTool from "@editorjs/link";
// import Raw from "@editorjs/raw";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
// import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";

// import Header from "@editorjs/header";
// import Delimiter from "@editorjs/delimiter";
// import List from "@editorjs/list"
// import ImageTool from "@editorjs/image";
// import Paragraph from '@editorjs/paragraph'



// import RecordsService from '../Services/RecordsService'
// import request from '../Services/Request'

// export const EDITOR_JS_TOOLS = {
//     paragraph: {
//       class: Paragraph,
//       config: {
//         placeholder: 'Enter a paragraph',
//       }
//     },
//     h: {
//       class: Header,
//       config: {
//         placeholder: 'Enter a heading',
//         levels: [4, 5, 6],
//         defaultLevel: 4
//       }
//     },
//     l: List,
//     br: Delimiter,
//     img: {
//       class: ImageTool,
//       config: {
//         uploader: {
//           /**
//            * Upload file to the server and return an uploaded image data
//            * @param {File} file - file selected from the device or pasted by drag-n-drop
//            * @return {Promise.<{success, file: {url}}>}
//            */
//           uploadByFile(file){
//             // your own uploading logic here
//             return RecordsService.uploadImage(file).then(() => {
//               let urlCreator = window.URL || window.webkitURL;
//               let imageUrl = urlCreator.createObjectURL(file);
//               return {
//                 success: 1,
//                 file: {
//                   url: imageUrl,
//                 }
//               };
//             })
//             // .catch(err => {
//             //   console.log(err)
//             // });
//           },
//         }
//       }
//     },
// };












export const DATA = {
  time: 1556098174501,
  blocks: [
    {
      type: "header",
      data: {
        text: "Editor.js",
        level: 4
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
      }
    },
    {
      type: "header",
      data: {
        text: "Key features",
        level: 5
      }
    },
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API"
        ]
      }
    },
    {
      type: "list",
      data: {
        style: "ordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API"
        ]
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 5
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 5
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Clean data is useful to sanitize, validate and process on the backend."
      }
    },
    // {
    //   type: "delimiter",
    //   data: {}
    // },
    {
      type: "paragraph",
      data: {
        text:
          "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
      }
    },
    {
      type: "image",
      data: {
        file: {
          url:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fmrybllma9z3y.png&f=1&nofb=1",
        },
        caption: "",
        withBorder: true,
        stretched: true,
        withBackground: true
      }
    }
  ],
  version: "2.12.4"
}
