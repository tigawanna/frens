// @ts-nocheck
// Require Package
import postmanToOpenApi from 'postman-to-openapi'

// Postman Collection Path
const postmanCollection = 'inventory.postman_collection.json'
// Output OpenAPI Path
const outputFile = 'openapi.json'

// Async/await
// try {
//     const result = await postmanToOpenApi(postmanCollection, outputFile, {
//       defaultTag: "General",
//       outputFormat:"json",
//     });
//     // Without save the result in a file
//     // const result2 = await postmanToOpenApi(postmanCollection, null, { defaultTag: 'General' })
//     console.log(`OpenAPI specs: ${result}`)
// } catch (err) {
//     console.log(err)
// }

// Promise callback style
postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General', outputFormat:"json" })
    .then(result => {
        console.log(`OpenAPI specs: ${result}`)
    })
    .catch(err => {
        console.log(err)
    })
