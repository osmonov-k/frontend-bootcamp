const myPromise = new Promise((resolve, reject) => {
setTimeout(() => {
console.log("Hello World");
}, 500);

})

myPromise.then((data)=> {
console.log("Resolved", data)
}).catch((error) => {
console.log("Rejected", error)
})
