const p1 = new Promise((resolve) => {
    resolve(2)
})

p1.then((a) => {
    console.log(a, 88)
})

p1.then((a) => {
    console.log(a, 99)
})