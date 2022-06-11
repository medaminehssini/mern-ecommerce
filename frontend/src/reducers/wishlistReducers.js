export const userChangeWishList = (state = 0 , action) => {
    switch (action.type) {

        case "WISHLIST_LISTENER" :
            return ++state
        default : 
            return state 

    }
}