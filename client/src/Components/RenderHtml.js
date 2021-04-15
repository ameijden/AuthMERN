import React, { useState, useEffect } from "react";
import sv from "../styles/variables";

export default function RenderHtml(props) {
  const [html, setHtml] = useState("");
  const typeToTag = {
    paragraph: "p",
    header: "h4",
    orderedlist: "ol",
    unorderedlist: "ul",
    image: "img",
  };

  const blockClasses = {
    h4: `text-${sv.mainPanel.record.explanationHeader.textColor} text-${sv.mainPanel.record.explanationHeader.textSize} font-${sv.mainPanel.record.explanationHeader.textWeight}`,
    h5: "text-xl font-bold",
    h6: "text-lg font-bold text-gray-600",
    p: `text-${sv.mainPanel.record.explanationPara.textColor} text-${sv.mainPanel.record.explanationPara.textSize} font-${sv.mainPanel.record.explanationPara.textWeight}`,
    ul: `list-disc text-${sv.mainPanel.record.explanationPara.textColor} text-${sv.mainPanel.record.explanationPara.textSize} font-${sv.mainPanel.record.explanationPara.textWeight}`,
    ol: `list-decimal text-${sv.mainPanel.record.explanationPara.textColor} text-${sv.mainPanel.record.explanationPara.textSize} font-${sv.mainPanel.record.explanationPara.textWeight}`,
  };

  useEffect(() => {
    if (!props.block.data) return;

    let tag =
      typeToTag[
      (props.block.data.style ? props.block.data.style : "") +
      props.block.type
      ];

    let code;
    switch (tag) {
      case "img":
        let imgDivClasses = `flex justify-center ${props.block.data.withBackground ? "bg-blue-200" : ""
          } ${props.block.data.stretched ? "w-4/5" : "w-full"} ${props.block.data.withBorder ? "border-2 border-blue-600" : ""
          }`;
        let imgClasses = props.block.data.withBackground ? "w-1/2" : "";
        code = `
							<div class="flex flex-col items-center space-y-1 mb-3 ">
								<div class="p-3 ${imgDivClasses}">
									<img alt="image" class="${imgClasses}" src="${props.block.data.file.url}">
								</div>
							</div>
							`;
        break;
      case "ul":
      case "ol":
        let itemsCode = "";
        let items = props.block.data.items;
        items.forEach((item) => {
          itemsCode += `<li>${item}</li>`;
        });
        code = `
							<${tag} class="my-5 ml-10  ${blockClasses[tag]}">${itemsCode}</${tag}>
							`;
        break;

      default:
        code = `
							<${tag} style="white-space: pre-wrap;" class="mb-5 ${blockClasses[tag]}">${props.block.data.text}</${tag}>
							`;
        break;
    }
    code = code.replace(/&lt;/g, "<");
    // console.log(code);
    setHtml(code);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.block]);

  // function htmlSanitize(input) {
  // 	var doc = new DOMParser().parseFromString(input, "text/html");
  // 	return doc.documentElement.textContent;
  // }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
