import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

import RecordsService from "../Services/RecordsService";
import MiscService from "../Services/MiscService";
import { useHistory } from "react-router-dom";
import sv from "../styles/variables";

const ContributionsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    yog: "",
    hobby: "",
    subject: "",
    area: "",
    subArea: "",
    info: "",
    mnemonic: "",
    explanation: [],
    tags: [],
  });

  const [unorderedListItem, setUnorderedListItem] = useState("");
  const [orderedListItem, setOrderedListItem] = useState("");
  const [tagItem, setTagItem] = useState("");

  const [explanation, setExplanation] = useState({
    header: "",
    paragraph: "",
    orderedList: [],
    unorderedList: [],
    img: "",
  });

  const [submitState, setSubmitState] = useState({
    loading: 0,
    response: "",
    validImage: 0, // '0' Initial State , '1' Valid URL, '2' Invalid URL, '3' Testing URL
  });

  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  useEffect(() => {
    RecordsService.fetchCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 503) history.push('/503')
      });
  }, []);//eslint-disable-line

  function testImage(url, timeoutT) {
    return new Promise(function (resolve, reject) {
      var timeout = timeoutT || 15000;
      var timer,
        img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject("Invalid URL");
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve("Valid URL");
      };
      timer = setTimeout(function () {
        img.src = "//!!!!/test.jpg";
        reject("timeout");
      }, timeout);

      img.src = url;
    });
  }

  function translateExplanationData(Data) {
    var tempExplanation = [];
    Object.keys(explanation).forEach((key) => {
      if (explanation[key].length > 0) {
        let Data = {};
        let Key = key;
        switch (key) {
          case "orderedList":
            Key = "list";
            Data.items = explanation.orderedList;
            Data.style = "ordered";
            break;
          case "unorderedList":
            Key = "list";
            Data.items = explanation.unorderedList;
            Data.style = "unordered";
            break;
          case "img":
            Key = "image";
            Data.file = { url: explanation[key] };
            break;
          default:
            Data.text = explanation[key];
            break;
        }
        let item = {
          type: Key,
          data: Data,
        };
        tempExplanation.push(item);
      }
    });
    Data.explanation = tempExplanation;
  }

  useEffect(() => {
    setSubmitState({
      ...submitState,
      validImage: 0,
    });
    if (explanation.img === "") return;
    let timeOutId = setTimeout(async () => {
      setSubmitState({
        ...submitState,
        validImage: 3,
      });
      let previewImg = document.getElementById("preview");
      try {
        await testImage(explanation.img);
        previewImg.src = explanation.img;
        setSubmitState({
          ...submitState,
          validImage: 1,
        });
      } catch (error) {
        console.log(error);
        previewImg.src = "/placeholder-image.png";
        setSubmitState({
          ...submitState,
          validImage: 2,
        });
      }
    }, 500);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line
  }, [explanation.img]);

  const handleExplanationChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setExplanation({
      ...explanation,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "info") {
      value = value.charAt(0).toUpperCase() + value.substr(1);
    } else if (name !== "mnemonic") {
      value = value.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitState.validImage === 2) {
      setSubmitState({
        ...submitState,
        loading: -1,
        response:
          "Invalid Image URL. Please enter a valid Image URL",
      });
      return;
    }
    setSubmitState({
      ...submitState,
      loading: 1,
      response: "Submitting Contribution...",
    });

    let Data = {
      categories: [formData.subject, formData.area, formData.subArea],
      info: formData.info,
      mnemonic: formData.mnemonic,
      tags: formData.tags.join(),
      explanation: [],
    };

    if (formData.name.length !== 0) {
      Data["contributor"] = {
        name: formData.name,
        email: formData.email,
        major: formData.major,
        yog: formData.yog,
        hobby: formData.hobby,
      }
    }

    //Translating Explanation Field To Supported JSON Format
    translateExplanationData(Data);

    setSubmitState({
      ...submitState,
      loading: 1,
      response: "Submitting Fields...",
    });

    MiscService.submitContribution(Data)
      .then((res) => {
        setSubmitState({
          ...submitState,
          loading: 2,
          response: "Contribution Submitted!",
        });

        setTimeout(() => {
          history.push("/contributions/success");
        }, 500);
      })
      .catch((err) => {
        setSubmitState({
          ...submitState,
          loading: -1,
          response:
            "An error occurred while submitting your contribution. Please try again later.",
        });
        if (err.response && err.response.status === 503) history.push('/503')
      });
  };

  function addListItem(type) {
    console.log(type);
    if (type === "ol" && !!orderedListItem) {
      setExplanation((prevState) => {
        return {
          ...explanation,
          orderedList: [...prevState.orderedList, orderedListItem],
        };
      });
      setOrderedListItem("");
    } else if (type === "ul" && !!unorderedListItem) {
      setExplanation((prevState) => {
        return {
          ...explanation,
          unorderedList: [...prevState.unorderedList, unorderedListItem],
        };
      });
      setUnorderedListItem("");
    } else if (type === "tag" && !!tagItem) {
      if (formData.tags.includes(tagItem)) { setTagItem(""); return; }
      setFormData((prevState) => {
        return {
          ...formData,
          tags: [...prevState.tags, tagItem],
        };
      });
      setTagItem("");
    } else {
      console.log(
        "List Type Not Supported OR You're trying to enter an empty string",
      );
    }
  }

  function removeListItem(type, item) {
    if (type === "ol" && explanation.orderedList.length > 0) {
      let tempOList = [...explanation.orderedList];
      let oIndex = tempOList.indexOf(item);
      if (oIndex > -1) {
        tempOList.splice(oIndex, 1);
        setExplanation({
          ...explanation,
          orderedList: tempOList,
        });
      }
    } else if (type === "ul" && explanation.unorderedList.length > 0) {
      let tempUList = [...explanation.unorderedList];
      let uIndex = tempUList.indexOf(item);

      if (uIndex > -1) {
        tempUList.splice(uIndex, 1);
        setExplanation({
          ...explanation,
          unorderedList: tempUList,
        });
      }
    } else if (type === "tag" && formData.tags.length > 0) {
      let tempTagsList = [...formData.tags];
      let tIndex = tempTagsList.indexOf(item);

      if (tIndex > -1) {
        tempTagsList.splice(tIndex, 1);
        setFormData({
          ...formData,
          tags: tempTagsList,
        });
      }
    } else {
      console.log(
        "List Type Not Supported OR You're trying to enter an empty string",
      );
    }
  }
  return (
    <div>
      <h1
        className={`text-2xl sm:text-4xl mt-10 text-center text-${sv.primary} opacity-50`}>
        Add Contribution
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='container max-w-5xl px-5 mx-auto mt-10 mb-20'>
        <div className='shadow overflow-hidden sm:rounded-md border-2'>
          <div className={`px-4 py-5 bg-white sm:p-6`}>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 -mb-12 text-gray-600'>
                Contributor's Information (Optional)
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  required={!!formData.email || !!formData.major || !!formData.yog || !!formData.hobby}
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  required={!!formData.name || !!formData.major || !!formData.yog || !!formData.hobby}
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='major'
                  className='block text-sm font-medium text-gray-700'>
                  Major
                </label>
                <input
                  required={!!formData.name || !!formData.email || !!formData.yog || !!formData.hobby}
                  type='text'
                  name='major'
                  id='major'
                  value={formData.major}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='yog'
                  className='block text-sm font-medium text-gray-700'>
                  Year Of Graduation
                </label>
                <input
                  pattern="\d{4}"
                  onInvalid={(e) => { e.target.setCustomValidity(`Please enter a valid year. Ex: ${(new Date()).getFullYear()}`) }}
                  onInput={(e) => { e.target.setCustomValidity('') }}
                  required={!!formData.name || !!formData.email || !!formData.major || !!formData.hobby}
                  type='text'
                  name='yog'
                  id='yog'
                  value={formData.yog}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='yog'
                  className='block text-sm font-medium text-gray-700'>
                  A fun blurb/hobby about you
                </label>
                <textarea
                  required={!!formData.name || !!formData.email || !!formData.major || !!formData.yog}
                  name='hobby'
                  id='hobby'
                  value={formData.hobby}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></textarea>
              </div>

              <div className='col-span-6 mt-6 -mb-6 text-gray-600'>
                Mnemonic Details
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700'>
                  Subject
                </label>
                <input
                  required
                  onFocus={() => setToggle1(true)}
                  onBlur={() => setToggle1(false)}
                  type='text'
                  name='subject'
                  id='subject'
                  value={formData.subject}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:outline-none focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                {!!toggle1 && (
                  <div className={`relative w-full`}>
                    <div className='w-full flex flex-col absolute z-10 bg-white border border-gray-300 rounded-md mt-1'>
                      <div className="overflow-y-auto max-h-60">
                        {categories
                          .filter((c) => c.name.startsWith(formData.subject))
                          .map((c, i) => (
                            <button
                              onMouseDown={() =>
                                handleChange({
                                  target: { value: c.name, name: "subject" },
                                })
                              }
                              className='text-sm text-left w-full truncate hover:bg-gray-100 px-2 py-2'
                              key={i}>
                              {c.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='area'
                  className='block text-sm font-medium text-gray-700'>
                  Area
                </label>
                <input
                  required
                  onFocus={() => setToggle2(true)}
                  onBlur={() => setToggle2(false)}
                  type='text'
                  name='area'
                  id='area'
                  value={formData.area}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                {!!toggle2 &&
                  categories.find((c) => c.name === formData.subject) && (
                    <div className={`relative w-full`}>
                      <div className='w-full flex flex-col absolute z-10 bg-white border border-gray-300 rounded-md mt-1'>
                        <div className="overflow-y-auto max-h-60">
                          {categories
                            .find((c) => c.name === formData.subject)
                            .categories.map((c, i) => (
                              <button
                                onMouseDown={() =>
                                  handleChange({
                                    target: { value: c.name, name: "area" },
                                  })
                                }
                                className='text-sm text-left w-full truncate hover:bg-gray-100 p-2'
                                key={i}>
                                {c.name}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='subArea'
                  className='block text-sm font-medium text-gray-700'>
                  Subarea
                </label>
                <input
                  required
                  onFocus={() => setToggle3(true)}
                  onBlur={() => setToggle3(false)}
                  type='text'
                  name='subArea'
                  id='subArea'
                  value={formData.subArea}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                {!!toggle3 &&
                  categories.find((c) => c.name === formData.subject) &&
                  categories
                    .find((c) => c.name === formData.subject)
                    .categories.find((c) => c.name === formData.area) && (
                    <div className={`relative w-full`}>
                      <div className='w-full flex flex-col absolute z-10 bg-white border border-gray-300 rounded-md mt-1'>
                        <div className="overflow-y-auto max-h-60">
                          {categories
                            .find((c) => c.name === formData.subject)
                            .categories.find((c) => c.name === formData.area)
                            .categories.map((c, i) => (
                              <button
                                onMouseDown={() =>
                                  handleChange({
                                    target: { value: c.name, name: "subArea" },
                                  })
                                }
                                className='text-sm text-left w-full truncate hover:bg-gray-100 p-2'
                                key={i}>
                                {c.name}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='mnemonic'
                  className='block text-sm font-medium text-gray-700'>
                  Mnemonic
                </label>
                <input
                  required
                  type='text'
                  name='mnemonic'
                  id='mnemonic'
                  value={formData.mnemonic}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='information'
                  className='block text-sm font-medium text-gray-700'>
                  Information
                </label>
                <input
                  required
                  type='text'
                  name='info'
                  id='information'
                  value={formData.info}
                  onChange={(e) => handleChange(e)}
                  className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
              </div>
            </div>

            <div className='mt-10'>
              <label className='block font-semibold text-gray-700 border-b-2 pb-1 mb-10'>
                Explanation
              </label>
              <div id='explanation' name='explanation' className='space-y-7'>
                {/* Heading */}
                <div>
                  <label
                    htmlFor='header'
                    className='block text-sm font-medium text-gray-700'>
                    Heading
                  </label>
                  <input
                    type='text'
                    name='header'
                    id='header'
                    value={explanation.header}
                    onChange={(e) => handleExplanationChange(e)}
                    className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                </div>
                {/* Paragraph */}
                <div>
                  <label
                    htmlFor='paragraph'
                    className='block text-sm font-medium text-gray-700'>
                    Paragraph
                  </label>
                  <textarea
                    name='paragraph'
                    id='paragraph'
                    value={explanation.paragraph}
                    onChange={(e) => handleExplanationChange(e)}
                    className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></textarea>
                </div>
                {/* Ordered List */}
                <div>
                  <label
                    htmlFor='oList'
                    className='block text-sm font-medium text-gray-700'>
                    Ordered List
                  </label>
                  <div id='oList' className='group flex space-x-2 mt-1'>
                    <input
                      type='text'
                      name='oList'
                      value={orderedListItem}
                      onChange={(e) => setOrderedListItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                          addListItem("ol");
                        }
                      }}
                      className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                    <button
                      type='button'
                      style={{ right: 0 }}
                      className={`focus:outline-none text-${sv.primary} hover:opacity-100 opacity-80 bg-transparent p-2 rounded-md`}
                      onClick={() => addListItem("ol")}>
                      <FontAwesomeIcon icon={faPlus} size='lg' />
                    </button>
                  </div>

                  {explanation.orderedList.length > 0 && (
                    <ol className='bg-gray-50 border shadow-sm rounded mt-2'>
                      {explanation.orderedList.map((item, index) => (
                        <li className='flex justify-between group hover:bg-gray-100 p-2' key={index}>
                          <div>
                            <span className=''>{index + 1}. </span>
                            <span>{item}</span>
                          </div>
                          <button
                            type='button'
                            onClick={() => removeListItem("ol", item)}
                            className=' text-gray-600 group-hover:block hidden focus:outline-none'>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
                {/* Unordered List */}
                <div>
                  <label
                    htmlFor='uList'
                    className='block text-sm font-medium text-gray-700'>
                    Unordered List
                  </label>
                  <div id='uList' className='flex space-x-2 mt-1'>
                    <input
                      type='text'
                      name='uList'
                      value={unorderedListItem}
                      onChange={(e) => setUnorderedListItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                          addListItem("ul");
                        }
                      }}
                      className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                    <button
                      type='button'
                      className={`focus:outline-none text-${sv.primary} hover:opacity-100 opacity-80 bg-transparent p-2 rounded-md`}
                      onClick={() => addListItem("ul")}>
                      <FontAwesomeIcon icon={faPlus} size='lg' />
                    </button>
                  </div>

                  {explanation.unorderedList.length > 0 && (

                    <ul className='bg-gray-50 border shadow-sm rounded mt-2'>
                      {explanation.unorderedList.map((item, index) => (
                        <li className='flex justify-between group hover:bg-gray-100 p-2' key={index}>
                          <div>
                            <div className='rounded-full bg-black w-2 h-2 mr-3 inline-block'></div>
                            <span>{item}</span>
                          </div>
                          <button
                            type='button'
                            onClick={() => removeListItem("ul", item)}
                            className=' text-gray-600 group-hover:block hidden focus:outline-none'>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='img'
                    className='block text-sm font-medium text-gray-700'>
                    Image
                    {submitState.validImage === 3 && (
                      <span className='text-sm ml-2'>
                        <svg
                          className='animate-spin border-l-2 border-t-2 border-r-0 inline-block rounded-full border-black h-3 w-3'
                          viewBox='0 0 24 24'></svg>
                      </span>
                    )}
                  </label>
                  <input
                    type='text'
                    name='img'
                    id='img'
                    placeholder='Enter A Valid Image URL or Try Pasting Again'
                    value={explanation.img}
                    onChange={(e) => handleExplanationChange(e)}
                    className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>

                  {submitState.validImage === 2 && (
                    <span className='text-red-700 text-sm'>
                      Invalid Image URL
                    </span>
                  )}
                </div>
                {/* Image Preview */}
                <div className='flex justify-center'>
                  <img
                    className={`object-contain max-h-96 w-full ${submitState.validImage === 1 ? 'block' : 'hidden'}`}
                    id='preview'
                    src='/placeholder-image.png'
                    alt=''></img>
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor='tagsList'
                    className='block text-sm font-medium text-gray-700'>
                    Tags
                  </label>
                  <div id='tagsList' className='flex space-x-2 mt-1'>
                    <input
                      type='text'
                      name='tagsList'
                      value={tagItem}
                      onChange={(e) => setTagItem(e.target.value.toLowerCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.stopPropagation();
                          addListItem("tag");
                        }
                      }}
                      className={`mt-1 focus:ring-${sv.primary} focus:border-${sv.primary} block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}></input>
                    <button
                      type='button'
                      className={`focus:outline-none text-${sv.primary} hover:opacity-100 opacity-80 bg-transparent p-2 rounded-md`}
                      onClick={() => addListItem("tag")}>
                      <FontAwesomeIcon icon={faPlus} size='lg' />
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className='flex flex-wrap rounded mt-2'>
                      {formData.tags.map((item, index) => (
                        <span
                          className={`group rounded-3xl bg-${sv.primary} text-${sv.secondary} py-1 px-4 ml-2 mt-2`}
                          key={index}>
                          <span>{item}</span>
                          <button
                            type='button'
                            onClick={() => removeListItem("tag", item)}
                            className='ml-5 focus:outline-none hidden group-hover:inline-block'>
                            <FontAwesomeIcon
                              className='rounded-full'
                              icon={faTimes}
                            />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 flex flex-row items-center justify-end sm:px-6'>
            <div
              className={`text-lg mr-5 font-semibold ${submitState.loading === -1 ? "text-red-600" : "text-green-400"
                }`}>
              {submitState.response}
            </div>
            <button
              type='submit'
              className={`
          flex w-24 items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm
          font-medium rounded-md text-white bg-${sv.primary} hover:opacity-90 focus:outline-none focus:ring-2
          `}>
              <span>Submit</span>
              {submitState.loading === 1 && (
                <div className='ml-3'>
                  <div className='w-4 h-4 rounded-full border-t-2 border-grey-500 animate-spin'></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContributionsForm;
