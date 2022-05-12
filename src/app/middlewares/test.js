/**
 * TestMiddleware
 * 
 * 
 * 
 *  */

export default (req, res, next) => {
    // toDo
    console.log('test middleware next');
    next();
}