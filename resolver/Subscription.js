const Subscription = {
    post: {
        subscribe(parent, args, {pubSub}, info) {
            return pubSub.asyncIterator('post')
        }
    }
}
module.exports = Subscription