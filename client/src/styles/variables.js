//All provided variables must be derived fom TailwindCSS classes and should be written in the following formats

//All colors to be provided by removing the initial prefix,
//i.e, class 'text-gray-800' should be written as 'gray-800'

//All sizes to be provided by removing the initial prefix,
//i.e, class 'text-2xl' should be written as '2xl'

//All font weights to be provided by removing the initial prefix,
//i.e, class 'font-semibold' should be written as 'semibold'  


const sv = {
    primary: 'green-800', //try changing this to gray-800 to see a changed theme
    secondary: 'gray-50',
    sidePanel: {
        category: {
            0: {
                textColor: 'green-800',
                textSize: 'base',
                textWeight: 'semibold',
            },
            1: {
                textColor: 'green-800',
                textSize: 'base',
                textWeight: 'semibold',
            },
            2: {
                textColor: 'green-800',
                textSize: 'base',
                textWeight: 'semibold',
            },
        },
        record: {
            textColor: 'green-800',
            textSize: 'base',
            textWeight: 'normal',
        }
    },
    mainPanel: {
        record: {
            info: {
                textColor: 'text-gray-900',
                textWeight: '',
                sm: {//on small screens
                    textSize: '2xl',
                },
                lg: {//on large screens
                    textSize: '3xl',
                },
            },
            mnemonic: {
                textColor: 'text-gray-900',
                textWeight: '',
                sm: {//on small screens
                    textSize: 'xl',
                },
                lg: {//on large screens
                    textSize: '2xl',
                },
            },
            explanationHeader: {
                textColor: 'gray-900',
                textSize: 'xl',
                textWeight: 'bold',
            },
            explanationPara: {
                textColor: 'gray-900',
                textSize: 'base',
                textWeight: 'normal',
            },
        }
    }

}

export default sv;