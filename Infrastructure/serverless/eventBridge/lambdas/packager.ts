function funcA() {
  return funcB()
}
function funcB() {
  return funcC()
}
function funcC() {
  return funcD()
}
function funcD() {
  return funcE()
}
function funcE(something?) {
  let yes = something.hello.id.now
  return funcF()
}
function funcF() {
  throw new Error('Inside Func F')
}

export async function packagerThing(event, context) {
  return funcA()
}