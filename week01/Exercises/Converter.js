// Convert a number to Roman number and England text;
const convertToRomanNumber = (numb) => {
    if (Number.isNaN(numb) || numb <= 0) {
        return "Invalid";
    } else {
        let romanNumber = "";

        const romanCharacter = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        const respectiveValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

        for (let i = 0; i < respectiveValues.length; ++i) {
            while (numb - respectiveValues[i] >= 0) {
                romanNumber += romanCharacter[i];
                numb -= respectiveValues[i];
            }
        }
        return romanNumber;
    }
}


const convertToEnglandText = (numb) => {
    if (Number.isNaN(numb)) {
        return "Invalid";
    } else if (numb >= 0) {
        const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tens = ["skip", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

        if (numb < 10)
            return digits[numb];

        if (numb < 20)
            return teens[numb - 10];

        if (numb < 100) {
            if (numb % 10 == 0)
                return tens[numb / 10];
            else
                return tens[parseInt(numb / 10)] + ' ' + digits[numb % 10];
        }

        if (numb < 1000) {
            if (numb % 100 == 0) {
                return digits[numb / 100] + " hundred ";
            } else {
                return digits[parseInt(numb / 100)] + " hundred " + convertToEnglandText(numb % 100);
            }
        }

        // xxx xxx
        if (numb < 1000000) {
            if (numb < 10000) {
                if (numb % 1000 == 0) {
                    return digits[parseInt(numb / 1000)] + " thousand ";
                } else {
                    return digits[parseInt(numb / 1000)] + " thousand " + convertToEnglandText(numb % 1000);
                }
            }
            if (numb < 100000) {
                // x0000
                if (numb % 10000 == 0) {
                    return tens[parseInt(numb / 10000)] + " thousand ";
                } else if (parseInt(numb / 10000) > 1) {
                    if (numb % 10000 != 0 && parseInt(numb % 1000) == 0) {
                        // xx000
                        return tens[parseInt(numb / 10000)] + ' ' + digits[parseInt((numb % 10000) / 1000)] + " thousand ";
                    } else {
                        // xxxxx
                        return tens[parseInt(numb / 10000)] + ' ' + digits[parseInt((numb % 10000) / 1000)] + " thousand " + convertToEnglandText(numb % 1000);
                    }
                } else if (parseInt(numb / 10000) == 1) {
                    if (numb % 10000 != 0 && parseInt(numb % 1000) == 0) {
                        // xx000
                        return teens[parseInt((numb % 10000) / 1000)] + " thousand ";
                    } else {
                        // xxxxx
                        return teens[parseInt((numb % 10000) / 1000)] + " thousand " + convertToEnglandText(numb % 1000);
                    }
                }
            }
        }
    }
}
const converter = (numb) => {
    let romanNumber = convertToRomanNumber(numb);
    let englandText = convertToEnglandText(numb);
    return (`${numb} = ${romanNumber} = ${englandText}`);
}

const testcase_01 = converter(1);
const testcase_02 = converter(12);
const testcase_03 = converter(123);
const testcase_04 = converter(1234);
const testcase_05 = converter(12345);

console.log(`
TEST CASE 01: ${testcase_01}
TEST CASE 02: ${testcase_02}
TEST CASE 03: ${testcase_03}
TEST CASE 04: ${testcase_04}
TEST CASE 05: ${testcase_05}
`);