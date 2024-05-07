const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    const response = await fetch(url).then((response) => response.body)
        .then((rb) => {
            const reader = rb!.getReader();
            console.log('#reader', reader);
            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log("done", done);
                                controller.close();
                                return;
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            // Check chunks by logging to the console
                            console.log(done, value);
                            push();
                        });
                    }

                    push();
                },
            });
        })
        .then((stream) =>
            // Respond with our stream
            new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
        )
        .then((result) => {
            // Do things with result
            console.log(result);
            return result;
        });
    console.log('response', response);
    return response
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    console.log('parseContentIntoSentences', content);
    const parser = new DOMParser();

    const xmlString = content;
    const doc1 = parser.parseFromString(xmlString, "text/html");
    const errorNode = doc1.querySelector("parsererror");

    if (errorNode) {
        throw Error('This is not valid ssml')
    } else {
        console.log('doc1', doc1.body.querySelector('speak'));
        const element = doc1.body.querySelector('speak');
    
        if (element) {
            const target = [];
            for (const child of element.children) {
                target.push(child.textContent || '');
    
            }
            console.log('target', target);
            return target;
        } else {
            return []
        }
    }
   

};

export { fetchContent, parseContentIntoSentences };
