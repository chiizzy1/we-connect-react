const styles = {
    buttonStyles: "font-poppins py-2 px-4  text-primary bg-dimWhite hover:bg-buttonColor-dark rounded-md outline-none ",
    boxWidth: "xl:max-w-[1280px] w-full",
  
    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    h3Style: "font-poppins font-medium text-2xl",

    glassM: "backdrop-blur-lg p-2 [ bg-gradient-to-b from-white/25 to-white/5 ] [ border-[1px] border-solid border-white border-opacity-10 ]",
    glassMa: "backdrop-blur-sm bg-white/10",


    formAuthButton: "font-poppins font-sm text-[18px] text-primary bg-slate-400 hover:bg-orange-700 rounded-[10px] outline-none",
    formLabelStyles: "block text-gray-700 text-sm font-bold mb-2",
    formErrorStyles: "text-red-500 text-xs italic",
    formInputStyles: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  };
  
  // [ shadow-black/70 shadow-2xl ]
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
  };
  
  export default styles;