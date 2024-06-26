import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

//const apiKey = process.env.GEMINI_API_KEY;
const apiKey = 'AIzaSyAw2ozndGrVBrotKjGZwZBXM8X4fUl7lDY';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

/*
 * @type {String[] | null} string
 */
const convertToHtml = (string) => {
    const arr = string.split('**');
    let returnString = '';
    let i = 0;
    while (i < arr.length) {
        if (i === 0 || i % 2 !== 1) {
            if (arr[i].startsWith('##') === true) {
                let nString = arr[i].replace('##', '<h1>');
                arr[i] = nString.concat('</h1>');
            }
            returnString += arr[i];
        } else {
            returnString += '<b>' + arr[i] + '</b>';
        }
        i++;
    }
    return returnString.split('*').join('</br>');
};
/*
 * @type { String | null } prompt
 */
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
    });

    try {
        const responseResult = await chatSession.sendMessage(prompt);
        const result = responseResult.response.text();
        try {
            const ret = convertToHtml(result);
            return ret;
        } catch (e) {
            return '<b> Error formmating Data</b>';
        }
    } catch (e) {
        return 'Error fetching Data from Gemini, Try restarting your network';
    }
}

export default run;
